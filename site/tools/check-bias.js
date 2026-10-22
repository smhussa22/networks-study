const { loadBank } = require('./load-bank');

function percent(part, whole) {
  return whole === 0 ? '0%' : (Math.round(1000 * part / whole) / 10) + '%';
}

function average(values) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function shareOfRank(question, option) {
  const shares = [0, 0, 0, 0, 0];
  const longer = question.options.filter(other => other.text.length > option.text.length).length;
  const tied = question.options.filter(other => other.text.length === option.text.length).length;
  for (let slot = longer; slot < longer + tied; ++slot) shares[slot] += 1 / tied;
  return shares;
}

function run() {
  const bank = loadBank();
  const singles = bank.filter(question => !question.multi);
  const multis = bank.filter(question => question.multi);

  const rankShares = [0, 0, 0, 0, 0];
  const storedPosition = [0, 0, 0, 0, 0];
  const singleCorrectLengths = [];
  const singleWrongLengths = [];
  let longestGuessScore = 0;
  let shortestGuessScore = 0;
  singles.forEach(question => {
    const correctIndex = question.options.findIndex(option => option.correct === true);
    const correct = question.options[correctIndex];
    storedPosition[correctIndex] += 1;
    shareOfRank(question, correct).forEach((share, slot) => { rankShares[slot] += share; });
    const lengths = question.options.map(option => option.text.length);
    const longest = Math.max.apply(null, lengths);
    const shortest = Math.min.apply(null, lengths);
    if (correct.text.length === longest) longestGuessScore += 1 / lengths.filter(length => length === longest).length;
    if (correct.text.length === shortest) shortestGuessScore += 1 / lengths.filter(length => length === shortest).length;
    singleCorrectLengths.push(correct.text.length);
    question.options.filter(option => option !== correct).forEach(option => singleWrongLengths.push(option.text.length));
  });

  const multiCorrectLengths = [];
  const multiWrongLengths = [];
  const correctCountSpread = { 2: 0, 3: 0, 4: 0 };
  let multiAllLongest = 0;
  let multiLongestIsCorrect = 0;
  multis.forEach(question => {
    const correctOptions = question.options.filter(option => option.correct === true);
    const wrongOptions = question.options.filter(option => option.correct !== true);
    correctCountSpread[correctOptions.length] += 1;
    correctOptions.forEach(option => multiCorrectLengths.push(option.text.length));
    wrongOptions.forEach(option => multiWrongLengths.push(option.text.length));
    const shortestCorrect = Math.min.apply(null, correctOptions.map(option => option.text.length));
    const longestWrong = Math.max.apply(null, wrongOptions.map(option => option.text.length));
    if (shortestCorrect > longestWrong) multiAllLongest += 1;
    const longestOverall = Math.max.apply(null, question.options.map(option => option.text.length));
    const longestOptions = question.options.filter(option => option.text.length === longestOverall);
    multiLongestIsCorrect += longestOptions.filter(option => option.correct === true).length / longestOptions.length;
  });
  const multiCorrectRate = average(multis.map(question => question.options.filter(option => option.correct === true).length / 5));

  console.log('Question bank: ' + bank.length + ' questions (' + singles.length + ' single answer, ' + multis.length + ' select all).');
  console.log('');
  console.log('Single answer (chance level is 20%):');
  console.log('  always picking the longest option would be right ' + percent(longestGuessScore, singles.length) + ' of the time');
  console.log('  always picking the shortest option would be right ' + percent(shortestGuessScore, singles.length) + ' of the time');
  console.log('  length rank of the correct option, ties split evenly (1 = longest):');
  rankShares.forEach((share, slot) => console.log('    rank ' + (slot + 1) + ': ' + percent(share, singles.length)));
  console.log('  average length, correct: ' + Math.round(average(singleCorrectLengths)) + ' chars; wrong: ' + Math.round(average(singleWrongLengths)) + ' chars');
  console.log('');
  console.log('Select all (' + multis.length + ' questions):');
  console.log('  questions with 2 / 3 / 4 correct: ' + correctCountSpread[2] + ' / ' + correctCountSpread[3] + ' / ' + correctCountSpread[4]);
  console.log('  the longest option is correct ' + percent(multiLongestIsCorrect, multis.length) + ' of the time (base rate of correct options: ' + percent(multiCorrectRate, 1) + ')');
  console.log('  average length, correct: ' + Math.round(average(multiCorrectLengths)) + ' chars; wrong: ' + Math.round(average(multiWrongLengths)) + ' chars');
  console.log('  questions where every correct option is longer than every wrong one: ' + multiAllLongest);
  console.log('');
  console.log('Stored slot of the single correct option in the data files (display order is reshuffled every time):');
  storedPosition.forEach((count, slot) => console.log('  slot ' + (slot + 1) + ': ' + count));
}

run();
