const { TOPIC_FILES, loadBankByFile } = require('./load-bank');

const TOPICS = TOPIC_FILES;
const POOLS = ['quiz', 'exam'];
const SOURCES = ['inclass', 'textbook', 'conceptual', 'assignment'];
const OPTION_COUNT = 5;
const POSITION_IDS = ['a', 'b', 'c', 'd', 'e', '0', '1', '2', '3', '4', '5', 'first', 'second', 'third', 'fourth', 'fifth', 'last'];
const ANSWER_KEYS = ['answer', 'answers', 'correct', 'correctIndex', 'correctIndexes', 'correctLetter', 'correctLetters', 'key'];
const BANNED_PHRASES = [
  'all of the above', 'none of the above', 'of the above', 'the above', 'all of these', 'none of these',
  'both of these', 'neither of these', 'the previous option', 'the next option', 'the other options',
  'all options', 'the options above', 'the options below', 'the first option', 'the last option',
  'any of the other', 'each of the other'
];
const LETTER_TOKENS = ['a', 'b', 'c', 'd', 'e'];
const POINTER_WORDS = ['option', 'options', 'choice', 'choices', 'answer', 'answers', 'letter', 'letters', 'both', 'either', 'neither'];
const JOIN_WORDS = ['and', 'or', 'nor'];
const STRIP_CHARACTERS = '.,;:()!?"\'[]';

function tokensOf(text) {
  return text.toLowerCase().split(' ').map(word => {
    let cleaned = '';
    for (const character of word) if (STRIP_CHARACTERS.indexOf(character) < 0) cleaned += character;
    return cleaned;
  }).filter(word => word.length > 0);
}

function refersToOtherOptions(text) {
  const lower = text.toLowerCase();
  const phrase = BANNED_PHRASES.find(banned => lower.indexOf(banned) >= 0);
  if (phrase) return 'contains "' + phrase + '"';
  const tokens = tokensOf(text);
  for (let index = 0; index < tokens.length; ++index) {
    if (LETTER_TOKENS.indexOf(tokens[index]) < 0) continue;
    const previous = index > 0 ? tokens[index - 1] : '';
    const beforePrevious = index > 1 ? tokens[index - 2] : '';
    if (POINTER_WORDS.indexOf(previous) >= 0) return 'refers to an option letter ("' + previous + ' ' + tokens[index] + '")';
    if (JOIN_WORDS.indexOf(previous) >= 0 && LETTER_TOKENS.indexOf(beforePrevious) >= 0) return 'refers to option letters ("' + beforePrevious + ' ' + previous + ' ' + tokens[index] + '")';
  }
  return null;
}

function isBlank(value) {
  return typeof value !== 'string' || value.trim().length === 0;
}

function validateQuestion(question, fileName, seenIds, failures) {
  const label = fileName + '.js ' + (question.id || '(no id)');
  const fail = message => failures.push(label + ': ' + message);

  if (isBlank(question.id)) fail('missing question id');
  else if (seenIds[question.id]) fail('duplicate question id (also in ' + seenIds[question.id] + ')');
  else seenIds[question.id] = fileName;

  if (TOPICS.indexOf(question.topic) < 0) fail('unknown topic "' + question.topic + '"');
  if (question.topic !== fileName) fail('topic "' + question.topic + '" is stored in ' + fileName + '.js');
  if (POOLS.indexOf(question.pool) < 0) fail('pool must be quiz or exam');
  if (SOURCES.indexOf(question.source) < 0) fail('unknown source "' + question.source + '"');
  if (typeof question.multi !== 'boolean') fail('multi must be true or false');
  if (isBlank(question.q)) fail('empty question text');

  ANSWER_KEYS.forEach(key => { if (Object.prototype.hasOwnProperty.call(question, key)) fail('stores the answer in "' + key + '" instead of marking options by id'); });

  const options = Array.isArray(question.options) ? question.options : [];
  if (options.length !== OPTION_COUNT) fail('has ' + options.length + ' options, needs exactly ' + OPTION_COUNT);

  const optionIds = [];
  let correctCount = 0;
  options.forEach((option, index) => {
    const optionLabel = 'option ' + (index + 1) + (option && option.id ? ' (' + option.id + ')' : '');
    if (isBlank(option.id)) fail(optionLabel + ' has no id');
    else {
      if (optionIds.indexOf(option.id) >= 0) fail(optionLabel + ' has a duplicate id');
      optionIds.push(option.id);
      if (POSITION_IDS.indexOf(option.id.toLowerCase()) >= 0) fail(optionLabel + ' uses a positional id');
      if (option.id.toLowerCase().indexOf('opt') === 0 && !isNaN(Number(option.id.slice(3)))) fail(optionLabel + ' uses a positional id');
    }
    if (isBlank(option.text)) fail(optionLabel + ' has empty text');
    if (isBlank(option.why)) fail(optionLabel + ' has a missing or empty explanation');
    if (option.correct !== undefined && option.correct !== true && option.correct !== false) fail(optionLabel + ' has a non-boolean correct flag');
    if (option.correct === true) ++correctCount;
    if (!isBlank(option.text)) {
      const problem = refersToOtherOptions(option.text);
      if (problem) fail(optionLabel + ' ' + problem);
    }
  });

  if (question.multi === false && correctCount !== 1) fail('single-answer question has ' + correctCount + ' correct options, needs exactly 1');
  if (question.multi === true && (correctCount < 2 || correctCount > 4)) fail('multi-select question has ' + correctCount + ' correct options, needs 2 to 4');
}

function run() {
  const byFile = loadBankByFile();
  const failures = [];
  const seenIds = {};
  let total = 0;
  const counts = { pool: {}, source: {}, multi: 0, topic: {} };
  Object.keys(byFile).forEach(fileName => {
    byFile[fileName].forEach(question => {
      ++total;
      validateQuestion(question, fileName, seenIds, failures);
      counts.pool[question.pool] = (counts.pool[question.pool] || 0) + 1;
      counts.source[question.source] = (counts.source[question.source] || 0) + 1;
      counts.topic[fileName] = (counts.topic[fileName] || 0) + 1;
      if (question.multi) ++counts.multi;
    });
  });

  console.log('Checked ' + total + ' questions in ' + Object.keys(byFile).length + ' files.');
  console.log('By pool: ' + JSON.stringify(counts.pool));
  console.log('By source: ' + JSON.stringify(counts.source));
  console.log('By topic: ' + JSON.stringify(counts.topic));
  console.log('Multi-select: ' + counts.multi + ', single answer: ' + (total - counts.multi));
  if (failures.length) {
    console.log('\nFAILED with ' + failures.length + ' problem(s):');
    failures.forEach(failure => console.log('  - ' + failure));
    process.exitCode = 1;
    return;
  }
  console.log('\nAll checks passed.');
}

if (require.main === module) run();

module.exports = { validateQuestion, refersToOtherOptions };
