(function () {
  'use strict';

  const Engine = window.QuizEngine;
  const EXAM_DATE = new Date('2026-10-24T00:00:00-04:00');
  const EXAM_SIZE = 50;
  const EXAM_MINUTES = 60;

  const TOPICS = {
    intro: 'Introduction to networking',
    internet: 'Internetworking and the network edge',
    http: 'Application layer: HTTP',
    dns: 'Application layer: DNS and email',
    sockets: 'Socket programming',
    transport: 'Transport layer and multiplexing',
    udp: 'UDP',
    rdt: 'Reliable data transfer',
    tcp: 'TCP'
  };
  const TOPIC_ORDER = Object.keys(TOPICS);

  const SOURCE_LABEL = { inclass: 'In-class style', textbook: 'Textbook', conceptual: 'Conceptual', assignment: 'Assignment' };
  const SOURCE_ORDER = ['inclass', 'textbook', 'conceptual', 'assignment'];

  const NAMESPACE = 'cis3210-mt:';
  const store = {
    get(key, fallback) {
      try {
        const raw = window.localStorage.getItem(NAMESPACE + key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch (error) { return fallback; }
    },
    set(key, value) {
      try { window.localStorage.setItem(NAMESPACE + key, JSON.stringify(value)); } catch (error) { return; }
    },
    remove(key) {
      try { window.localStorage.removeItem(NAMESPACE + key); } catch (error) { return; }
    }
  };

  function esc(text) {
    return String(text).split('&').join('&amp;').split('<').join('&lt;').split('>').join('&gt;').split('"').join('&quot;');
  }

  function boldText(escapedText) {
    const pieces = escapedText.split('**');
    if (pieces.length < 3) return escapedText;
    return pieces.map((piece, index) => (index % 2 === 1 && index < pieces.length - 1) ? '<strong>' + piece + '</strong>' : piece).join('');
  }

  function md(text) {
    const pieces = String(text).split('`');
    return pieces.map((piece, index) => index % 2 === 1 ? '<code>' + esc(piece) + '</code>' : boldText(esc(piece))).join('');
  }

  function stemHTML(question) {
    let html = question.ctx ? '<div class="q-context">' + md(question.ctx) + '</div>' : '';
    html += '<div class="q-text">' + md(question.q) + '</div>';
    if (question.code) html += '<pre><code>' + esc(question.code) + '</code></pre>';
    if (question.multi) html += '<p class="select-all">Select all that apply.</p>';
    return html;
  }

  function metaTags(question) {
    const tags = [TOPICS[question.topic], SOURCE_LABEL[question.source], question.multi ? 'Multi-select' : 'Single answer'];
    if (question.ref) tags.push(question.ref);
    return tags.map(tag => '<span>' + esc(tag) + '</span>').join('');
  }

  function optionsHTML(question, order, groupName, selectedIds, disabled) {
    const inputType = question.multi ? 'checkbox' : 'radio';
    const chosen = selectedIds || [];
    return order.map((optionId, position) => {
      const option = Engine.optionById(question, optionId);
      const isChecked = chosen.indexOf(optionId) >= 0;
      return '<label class="option' + (isChecked ? ' picked' : '') + '" data-option="' + esc(optionId) + '">' +
        '<input type="' + inputType + '" name="' + esc(groupName) + '" value="' + esc(optionId) + '"' + (isChecked ? ' checked' : '') + (disabled ? ' disabled' : '') + '>' +
        '<span class="letter">' + Engine.LETTERS[position] + '</span>' +
        '<span class="option-text">' + md(option.text) + '</span></label>';
    }).join('');
  }

  function lettersFor(order, ids) {
    return order.map((optionId, position) => ids.indexOf(optionId) >= 0 ? Engine.LETTERS[position] : null).filter(letter => letter !== null);
  }

  function joinLetters(letters) {
    if (letters.length <= 1) return letters.join('');
    return letters.slice(0, -1).join(', ') + ' and ' + letters[letters.length - 1];
  }

  function explainedOptionsHTML(question, order, selectedIds) {
    const chosen = selectedIds || [];
    return order.map((optionId, position) => {
      const option = Engine.optionById(question, optionId);
      const isPicked = chosen.indexOf(optionId) >= 0;
      const isRight = option.correct === true;
      let stateClass = 'neutral';
      let tag = 'Wrong option';
      if (isRight && isPicked) { stateClass = 'correct'; tag = 'Your pick: correct'; }
      else if (isRight) { stateClass = 'missed'; tag = question.multi ? 'Correct option you did not pick' : 'Correct answer'; }
      else if (isPicked) { stateClass = 'wrong'; tag = 'Your pick: wrong'; }
      return '<div class="option explained ' + stateClass + '">' +
        '<span class="mark" aria-hidden="true">' + (question.multi ? '&#9634;' : '&#9711;') + '</span>' +
        '<span class="letter">' + Engine.LETTERS[position] + '</span>' +
        '<span class="option-body"><span class="option-text">' + md(option.text) + '</span>' +
        '<span class="option-tag">' + tag + '</span>' +
        '<span class="option-why">' + md(option.why) + '</span></span></div>';
    }).join('');
  }

  function verdict(question, order, selectedIds) {
    const chosen = selectedIds || [];
    const points = Engine.gradeQuestion(question, chosen);
    const correctIds = Engine.correctOptionIds(question);
    const correctLetters = joinLetters(lettersFor(order, correctIds));
    if (chosen.length === 0) return { points: points, tone: 'no', title: 'Not answered. Scores 0.', detail: 'The correct ' + (correctIds.length > 1 ? 'options are ' : 'answer is ') + correctLetters + '.' };
    if (!question.multi) {
      if (points === 1) return { points: points, tone: 'ok', title: 'Correct. 1 / 1.', detail: '' };
      return { points: points, tone: 'no', title: 'Not quite. Scores 0.', detail: 'The correct answer is ' + correctLetters + '.' };
    }
    const wrongPicked = chosen.filter(optionId => correctIds.indexOf(optionId) < 0);
    if (wrongPicked.length) {
      return { points: 0, tone: 'no', title: 'Scores 0: you picked a wrong option (' + joinLetters(lettersFor(order, wrongPicked)) + ').', detail: 'One wrong pick cancels the whole question. The correct options are ' + correctLetters + '.' };
    }
    if (points === 1) return { points: points, tone: 'ok', title: 'Correct. You found all ' + correctIds.length + ' correct options. 1 / 1.', detail: '' };
    return { points: points, tone: 'part', title: 'Partial credit: ' + chosen.length + ' of ' + correctIds.length + ' correct options, no wrong ones. Scores ' + Engine.formatPoints(points) + '.', detail: 'You also needed ' + joinLetters(lettersFor(order, correctIds.filter(optionId => chosen.indexOf(optionId) < 0))) + '.' };
  }

  function verdictHTML(question, order, selectedIds) {
    const result = verdict(question, order, selectedIds);
    return '<div class="feedback ' + result.tone + '" role="status"><strong>' + esc(result.title) + '</strong>' + (result.detail ? esc(result.detail) : '') + '</div>';
  }

  const PAGES = [
    ['index.html', 'Home', 'home'],
    ['read.html', 'Read', 'read'],
    ['review.html', 'Review', 'review'],
    ['flashcards.html', 'Flashcards', 'flashcards'],
    ['quiz.html', 'Quizzes', 'quiz'],
    ['exam.html', 'Practice exam', 'exam']
  ];

  function applyTheme(theme) {
    if (theme === 'light' || theme === 'dark') document.documentElement.setAttribute('data-theme', theme);
    else document.documentElement.removeAttribute('data-theme');
  }
  applyTheme(store.get('theme', null));

  function currentTheme() {
    const chosen = document.documentElement.getAttribute('data-theme');
    if (chosen) return chosen;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function buildHeader() {
    const host = document.getElementById('site-header');
    if (!host) return;
    const page = document.body.getAttribute('data-page');
    const links = PAGES.map(entry => '<a href="' + entry[0] + '"' + (entry[2] === page ? ' aria-current="page"' : '') + '>' + entry[1] + '</a>').join('');
    host.className = 'site-header';
    host.innerHTML = '<div class="inner">' +
      '<a class="brand" href="index.html"><span class="brand-mark" aria-hidden="true"><span></span><span></span><span></span><span></span></span>CIS*3210 Midterm</a>' +
      '<nav class="site-nav" aria-label="Main">' + links + '</nav>' +
      '<button class="theme-toggle" type="button"></button></div>';
    const button = host.querySelector('.theme-toggle');
    const label = () => { button.textContent = currentTheme() === 'dark' ? 'Light mode' : 'Dark mode'; };
    label();
    button.addEventListener('click', () => {
      const next = currentTheme() === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      store.set('theme', next);
      label();
    });
  }

  function daysUntilExam(now) {
    const millis = EXAM_DATE.getTime() - (now || new Date()).getTime();
    return Math.ceil(millis / 86400000);
  }

  function allQuestions() { return window.QUESTION_BANK || []; }
  function quizPool() { return allQuestions().filter(question => question.pool === 'quiz'); }
  function examPool() { return allQuestions().filter(question => question.pool === 'exam'); }

  document.addEventListener('DOMContentLoaded', buildHeader);

  window.Study = {
    TOPICS, TOPIC_ORDER, SOURCE_LABEL, SOURCE_ORDER, EXAM_DATE, EXAM_SIZE, EXAM_MINUTES,
    store, esc, md, stemHTML, metaTags, optionsHTML, explainedOptionsHTML, verdict, verdictHTML,
    lettersFor, joinLetters, daysUntilExam, allQuestions, quizPool, examPool
  };
})();
