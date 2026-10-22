(function (root) {
  'use strict';

  const LETTERS = ['A', 'B', 'C', 'D', 'E'];

  function shuffleList(list, randomSource) {
    const random = randomSource || Math.random;
    const copy = list.slice();
    for (let index = copy.length - 1; index > 0; --index) {
      const swapIndex = Math.floor(random() * (index + 1));
      const held = copy[index];
      copy[index] = copy[swapIndex];
      copy[swapIndex] = held;
    }
    return copy;
  }

  function shuffledOptionIds(question, randomSource) {
    return shuffleList(question.options.map(option => option.id), randomSource);
  }

  function correctOptionIds(question) {
    return question.options.filter(option => option.correct === true).map(option => option.id);
  }

  function uniqueIds(ids) {
    const seen = [];
    ids.forEach(id => { if (seen.indexOf(id) < 0) seen.push(id); });
    return seen;
  }

  function gradeQuestion(question, selectedIds) {
    const selected = uniqueIds(selectedIds || []);
    if (selected.length === 0) return 0;
    const correctIds = correctOptionIds(question);
    const pickedWrong = selected.some(id => correctIds.indexOf(id) < 0);
    if (!question.multi) return selected.length === 1 && !pickedWrong ? 1 : 0;
    if (pickedWrong) return 0;
    return selected.length / correctIds.length;
  }

  function optionById(question, optionId) {
    return question.options.find(option => option.id === optionId);
  }

  function drawQuestions(pool, count, randomSource) {
    return shuffleList(pool, randomSource).slice(0, Math.min(count, pool.length));
  }

  function drawSpread(pool, count, topicOrder, randomSource) {
    const picked = [];
    topicOrder.forEach(topic => {
      const topicPool = shuffleList(pool.filter(question => question.topic === topic), randomSource);
      const share = Math.round(count * topicPool.length / pool.length);
      topicPool.slice(0, share).forEach(question => picked.push(question));
    });
    const leftover = shuffleList(pool.filter(question => picked.indexOf(question) < 0), randomSource);
    while (picked.length < count && leftover.length) picked.push(leftover.shift());
    while (picked.length > count) picked.pop();
    return shuffleList(picked, randomSource);
  }

  function buildExamA(examPool, randomSource) {
    return shuffleList(examPool, randomSource);
  }

  function buildExamB(quizPool, size, topicOrder, randomSource) {
    return drawSpread(quizPool, size, topicOrder, randomSource);
  }

  function buildExamC(quizPool, size, textbookCap, topicOrder, randomSource) {
    const textbook = drawQuestions(quizPool.filter(question => question.source === 'textbook'), textbookCap, randomSource);
    const others = quizPool.filter(question => question.source !== 'textbook');
    const filler = drawSpread(others, size - textbook.length, topicOrder, randomSource);
    return shuffleList(textbook.concat(filler), randomSource);
  }

  function createAttempt(version, questions, timed, randomSource, startedAt) {
    const optionOrders = {};
    questions.forEach(question => { optionOrders[question.id] = shuffledOptionIds(question, randomSource); });
    return {
      version: version,
      questionIds: questions.map(question => question.id),
      optionOrders: optionOrders,
      answers: {},
      flags: {},
      startedAt: startedAt,
      timed: timed
    };
  }

  function attemptMatchesBank(attempt, questionsById) {
    if (!attempt || !attempt.questionIds || !attempt.optionOrders) return false;
    return attempt.questionIds.every(questionId => {
      const question = questionsById[questionId];
      const order = attempt.optionOrders[questionId];
      if (!question || !order || order.length !== question.options.length) return false;
      return question.options.every(option => order.indexOf(option.id) >= 0);
    });
  }

  function saveAttempt(store, attempt) {
    store.set('examInProgress', attempt);
  }

  function loadAttempt(store, questionsById) {
    const attempt = store.get('examInProgress', null);
    return attemptMatchesBank(attempt, questionsById) ? attempt : null;
  }

  function scoreAttempt(attempt, questionsById) {
    const perQuestion = {};
    let total = 0;
    attempt.questionIds.forEach(questionId => {
      const points = gradeQuestion(questionsById[questionId], attempt.answers[questionId] || []);
      perQuestion[questionId] = points;
      total += points;
    });
    return { score: total, outOf: attempt.questionIds.length, perQuestion: perQuestion };
  }

  function formatPoints(points) {
    const rounded = Math.round(points * 100) / 100;
    return String(rounded);
  }

  const api = {
    LETTERS, shuffleList, shuffledOptionIds, correctOptionIds, gradeQuestion, optionById,
    drawQuestions, drawSpread, buildExamA, buildExamB, buildExamC,
    createAttempt, attemptMatchesBank, saveAttempt, loadAttempt, scoreAttempt, formatPoints
  };

  root.QuizEngine = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
