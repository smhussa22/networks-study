const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');

const Engine = require(path.join(__dirname, '..', 'assets', 'engine.js'));
const { loadBank } = require(path.join(__dirname, '..', 'tools', 'load-bank.js'));
const { validateQuestion } = require(path.join(__dirname, '..', 'tools', 'validate.js'));

const TOPIC_ORDER = ['intro', 'internet', 'http', 'dns', 'sockets', 'transport', 'udp', 'rdt', 'tcp'];

function seededRandom(seed) {
  let state = seed >>> 0;
  return function () {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function makeQuestion(multi, correctIds) {
  const ids = ['alpha', 'bravo', 'charlie', 'delta', 'echo'];
  return {
    id: 'sample', topic: 'intro', pool: 'quiz', source: 'conceptual', multi: multi, q: 'Sample question?',
    options: ids.map(id => {
      const option = { id: id, text: 'Option text for ' + id, why: 'Explanation for ' + id };
      if (correctIds.indexOf(id) >= 0) option.correct = true;
      return option;
    })
  };
}

function memoryStore() {
  const data = {};
  return {
    data: data,
    get(key, fallback) { return Object.prototype.hasOwnProperty.call(data, key) ? JSON.parse(data[key]) : fallback; },
    set(key, value) { data[key] = JSON.stringify(value); },
    remove(key) { delete data[key]; }
  };
}

test('gradeQuestion: multi-select with every correct option and no wrong ones scores 1', () => {
  const question = makeQuestion(true, ['alpha', 'charlie', 'echo']);
  assert.equal(Engine.gradeQuestion(question, ['alpha', 'charlie', 'echo']), 1);
});

test('gradeQuestion: multi-select with some correct and no wrong options earns partial credit', () => {
  const question = makeQuestion(true, ['alpha', 'charlie', 'echo']);
  assert.equal(Engine.gradeQuestion(question, ['alpha', 'echo']), 2 / 3);
  assert.equal(Engine.gradeQuestion(question, ['charlie']), 1 / 3);
  const twoCorrect = makeQuestion(true, ['bravo', 'delta']);
  assert.equal(Engine.gradeQuestion(twoCorrect, ['delta']), 0.5);
  const fourCorrect = makeQuestion(true, ['alpha', 'bravo', 'charlie', 'delta']);
  assert.equal(Engine.gradeQuestion(fourCorrect, ['alpha', 'bravo', 'charlie']), 0.75);
});

test('gradeQuestion: multi-select with some correct plus one wrong option scores 0', () => {
  const question = makeQuestion(true, ['alpha', 'charlie', 'echo']);
  assert.equal(Engine.gradeQuestion(question, ['alpha', 'charlie', 'bravo']), 0);
  assert.equal(Engine.gradeQuestion(question, ['alpha', 'charlie', 'echo', 'delta']), 0);
});

test('gradeQuestion: multi-select with only wrong options scores 0', () => {
  const question = makeQuestion(true, ['alpha', 'charlie', 'echo']);
  assert.equal(Engine.gradeQuestion(question, ['bravo']), 0);
  assert.equal(Engine.gradeQuestion(question, ['bravo', 'delta']), 0);
});

test('gradeQuestion: a blank answer scores 0 for both formats', () => {
  assert.equal(Engine.gradeQuestion(makeQuestion(true, ['alpha', 'bravo']), []), 0);
  assert.equal(Engine.gradeQuestion(makeQuestion(true, ['alpha', 'bravo']), undefined), 0);
  assert.equal(Engine.gradeQuestion(makeQuestion(false, ['alpha']), []), 0);
});

test('gradeQuestion: single answer scores 1 only for the one correct option', () => {
  const question = makeQuestion(false, ['delta']);
  assert.equal(Engine.gradeQuestion(question, ['delta']), 1);
  assert.equal(Engine.gradeQuestion(question, ['alpha']), 0);
  assert.equal(Engine.gradeQuestion(question, ['delta', 'alpha']), 0);
});

test('gradeQuestion: repeated or unknown ids cannot inflate a score', () => {
  const question = makeQuestion(true, ['alpha', 'charlie', 'echo']);
  assert.equal(Engine.gradeQuestion(question, ['alpha', 'alpha', 'alpha']), 1 / 3);
  assert.equal(Engine.gradeQuestion(question, ['alpha', 'not-an-option']), 0);
});

test('grading depends only on option ids, never on the displayed order', () => {
  const bank = loadBank();
  const random = seededRandom(7);
  bank.forEach(question => {
    const correctIds = Engine.correctOptionIds(question);
    const picks = [correctIds, correctIds.slice(0, 1), question.options.filter(option => !option.correct).slice(0, 1).map(option => option.id)];
    picks.forEach(picked => {
      const expected = Engine.gradeQuestion(question, picked);
      for (let round = 0; round < 10; ++round) {
        const order = Engine.shuffledOptionIds(question, random);
        const positions = picked.map(id => order.indexOf(id));
        const pickedAgain = positions.map(position => order[position]);
        assert.equal(Engine.gradeQuestion(question, pickedAgain), expected, question.id);
        const shuffledQuestion = Object.assign({}, question, { options: order.map(id => Engine.optionById(question, id)) });
        assert.equal(Engine.gradeQuestion(shuffledQuestion, picked), expected, question.id);
      }
    });
  });
});

test('shuffleList returns a permutation and leaves the input untouched', () => {
  const input = ['alpha', 'bravo', 'charlie', 'delta', 'echo'];
  const output = Engine.shuffleList(input, seededRandom(3));
  assert.deepEqual(input, ['alpha', 'bravo', 'charlie', 'delta', 'echo']);
  assert.deepEqual(output.slice().sort(), input.slice().sort());
});

test('Fisher-Yates shuffle produces varied, unbiased orders over many runs', () => {
  const input = ['alpha', 'bravo', 'charlie', 'delta', 'echo'];
  const runs = 30000;
  const seen = new Set();
  const positionCounts = input.map(() => [0, 0, 0, 0, 0]);
  for (let run = 0; run < runs; ++run) {
    const order = Engine.shuffleList(input);
    seen.add(order.join(','));
    order.forEach((item, position) => { positionCounts[input.indexOf(item)][position] += 1; });
  }
  assert.equal(seen.size, 120, 'every one of the 120 orders of five options should appear');
  positionCounts.forEach(counts => counts.forEach(count => {
    const share = count / runs;
    assert.ok(share > 0.18 && share < 0.22, 'each option should land in each slot about 20% of the time, got ' + share);
  }));
});

test('every displayed shuffle of a real question gives the correct answer a fair chance at every letter', () => {
  const question = loadBank().find(item => !item.multi);
  const correctId = Engine.correctOptionIds(question)[0];
  const letterCounts = [0, 0, 0, 0, 0];
  for (let run = 0; run < 10000; ++run) letterCounts[Engine.shuffledOptionIds(question).indexOf(correctId)] += 1;
  letterCounts.forEach(count => assert.ok(count > 1700 && count < 2300, 'letter share out of range: ' + count));
});

test('an exam attempt keeps the same question and option order after a reload', () => {
  const bank = loadBank();
  const byId = {};
  bank.forEach(question => { byId[question.id] = question; });
  const examPool = bank.filter(question => question.pool === 'exam');
  const store = memoryStore();
  const attempt = Engine.createAttempt('A', Engine.buildExamA(examPool), true, Math.random, 1000);
  attempt.answers[attempt.questionIds[0]] = [attempt.optionOrders[attempt.questionIds[0]][2]];
  attempt.flags[attempt.questionIds[3]] = true;
  Engine.saveAttempt(store, attempt);

  const reloadedStore = memoryStore();
  Object.assign(reloadedStore.data, JSON.parse(JSON.stringify(store.data)));
  const restored = Engine.loadAttempt(reloadedStore, byId);
  assert.ok(restored, 'saved attempt should load');
  assert.deepEqual(restored.questionIds, attempt.questionIds);
  assert.deepEqual(restored.optionOrders, attempt.optionOrders);
  assert.deepEqual(restored.answers, attempt.answers);
  assert.deepEqual(restored.flags, attempt.flags);
  assert.equal(restored.startedAt, 1000);
  const again = Engine.loadAttempt(reloadedStore, byId);
  assert.deepEqual(again.optionOrders, restored.optionOrders, 'loading twice must not reshuffle');
});

test('a saved attempt that no longer matches the question bank is rejected', () => {
  const bank = loadBank();
  const byId = {};
  bank.forEach(question => { byId[question.id] = question; });
  const store = memoryStore();
  const attempt = Engine.createAttempt('B', bank.slice(0, 3), false, Math.random, 0);
  attempt.questionIds.push('removed-question');
  Engine.saveAttempt(store, attempt);
  assert.equal(Engine.loadAttempt(store, byId), null);

  const changed = Engine.createAttempt('B', bank.slice(0, 3), false, Math.random, 0);
  changed.optionOrders[changed.questionIds[0]][0] = 'renamed-option';
  Engine.saveAttempt(store, changed);
  assert.equal(Engine.loadAttempt(store, byId), null);
});

test('different attempts get different question orders and option orders', () => {
  const examPool = loadBank().filter(question => question.pool === 'exam');
  const first = Engine.createAttempt('A', Engine.buildExamA(examPool), true, Math.random, 0);
  const second = Engine.createAttempt('A', Engine.buildExamA(examPool), true, Math.random, 0);
  assert.notDeepEqual(first.questionIds, second.questionIds);
  const sameOrders = first.questionIds.filter(id => first.optionOrders[id].join() === second.optionOrders[id].join()).length;
  assert.ok(sameOrders < 10, 'most questions should get a new option order, but ' + sameOrders + ' of 50 matched');
});

test('scoreAttempt applies the grading rules across a whole exam', () => {
  const single = Object.assign(makeQuestion(false, ['alpha']), { id: 'q-single' });
  const multi = Object.assign(makeQuestion(true, ['alpha', 'bravo', 'charlie']), { id: 'q-multi' });
  const blank = Object.assign(makeQuestion(true, ['alpha', 'bravo']), { id: 'q-blank' });
  const byId = { 'q-single': single, 'q-multi': multi, 'q-blank': blank };
  const attempt = Engine.createAttempt('test', [single, multi, blank], false, Math.random, 0);
  attempt.answers = { 'q-single': ['alpha'], 'q-multi': ['alpha', 'bravo'] };
  const outcome = Engine.scoreAttempt(attempt, byId);
  assert.equal(outcome.perQuestion['q-single'], 1);
  assert.equal(outcome.perQuestion['q-multi'], 2 / 3);
  assert.equal(outcome.perQuestion['q-blank'], 0);
  assert.equal(outcome.score, 1 + 2 / 3);
  assert.equal(outcome.outOf, 3);
});

test('the three practice exams are 50 distinct questions built from the right pools', () => {
  const bank = loadBank();
  const quizPool = bank.filter(question => question.pool === 'quiz');
  const examPool = bank.filter(question => question.pool === 'exam');
  const textbookInBank = quizPool.filter(question => question.source === 'textbook').length;
  const textbookCap = Math.min(35, textbookInBank);

  const examA = Engine.buildExamA(examPool);
  assert.equal(examA.length, 50);
  assert.ok(examA.every(question => question.pool === 'exam'));

  for (let round = 0; round < 25; ++round) {
    const examB = Engine.buildExamB(quizPool, 50, TOPIC_ORDER);
    assert.equal(examB.length, 50);
    assert.equal(new Set(examB.map(question => question.id)).size, 50);
    assert.ok(examB.every(question => question.pool === 'quiz'));
    TOPIC_ORDER.forEach(topic => assert.ok(examB.some(question => question.topic === topic), 'Exam B is missing ' + topic));

    const examC = Engine.buildExamC(quizPool, 50, textbookCap, TOPIC_ORDER);
    assert.equal(examC.length, 50);
    assert.equal(new Set(examC.map(question => question.id)).size, 50);
    assert.equal(examC.filter(question => question.source === 'textbook').length, textbookCap);
  }
});

test('every question in the bank passes the data rules', () => {
  const failures = [];
  const seen = {};
  loadBank().forEach(question => validateQuestion(question, question.topic, seen, failures));
  assert.deepEqual(failures, []);
});

test('the validator rejects each kind of broken question', () => {
  function problems(question) {
    const failures = [];
    validateQuestion(question, 'intro', {}, failures);
    return failures;
  }
  const good = makeQuestion(false, ['alpha']);
  assert.deepEqual(problems(good), []);

  const fourOptions = makeQuestion(false, ['alpha']);
  fourOptions.options.pop();
  assert.ok(problems(fourOptions).some(failure => failure.indexOf('exactly 5') >= 0));

  const noWhy = makeQuestion(false, ['alpha']);
  noWhy.options[2].why = '   ';
  assert.ok(problems(noWhy).some(failure => failure.indexOf('explanation') >= 0));

  const twoCorrectSingle = makeQuestion(false, ['alpha', 'bravo']);
  assert.ok(problems(twoCorrectSingle).some(failure => failure.indexOf('exactly 1') >= 0));

  const oneCorrectMulti = makeQuestion(true, ['alpha']);
  assert.ok(problems(oneCorrectMulti).some(failure => failure.indexOf('2 to 4') >= 0));

  const fiveCorrectMulti = makeQuestion(true, ['alpha', 'bravo', 'charlie', 'delta', 'echo']);
  assert.ok(problems(fiveCorrectMulti).some(failure => failure.indexOf('2 to 4') >= 0));

  ['All of the above', 'None of the above', 'Both A and B', 'Options C and D only', 'A, B and C'].forEach(text => {
    const referring = makeQuestion(false, ['alpha']);
    referring.options[4].text = text;
    assert.ok(problems(referring).length > 0, 'should reject: ' + text);
  });

  const hostNames = makeQuestion(false, ['alpha']);
  hostNames.options[1].text = 'Host A and Host B share one socket.';
  assert.deepEqual(problems(hostNames), []);

  const letterAnswer = makeQuestion(false, ['alpha']);
  letterAnswer.answer = 'B';
  assert.ok(problems(letterAnswer).some(failure => failure.indexOf('"answer"') >= 0));

  const indexAnswer = makeQuestion(false, ['alpha']);
  indexAnswer.correctIndex = 2;
  assert.ok(problems(indexAnswer).some(failure => failure.indexOf('"correctIndex"') >= 0));

  const positionalIds = makeQuestion(false, ['alpha']);
  positionalIds.options[0].id = 'a';
  positionalIds.options[1].id = '2';
  assert.ok(problems(positionalIds).filter(failure => failure.indexOf('positional id') >= 0).length === 2);
});
