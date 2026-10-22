const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SITE_ROOT = path.join(__dirname, '..');
const QUESTION_DIR = path.join(SITE_ROOT, 'data', 'questions');
const TOPIC_FILES = ['intro', 'internet', 'http', 'dns', 'sockets', 'transport', 'udp', 'rdt', 'tcp'];

function loadScripts(relativePaths) {
  const sandbox = { window: {} };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  relativePaths.forEach(relativePath => {
    const fullPath = path.join(SITE_ROOT, relativePath);
    vm.runInContext(fs.readFileSync(fullPath, 'utf8'), sandbox, { filename: fullPath });
  });
  return sandbox.window;
}

function loadBank() {
  const files = TOPIC_FILES.map(name => path.join('data', 'questions', name + '.js'));
  const loaded = loadScripts(files);
  return JSON.parse(JSON.stringify(loaded.QUESTION_BANK || []));
}

function loadBankByFile() {
  const byFile = {};
  TOPIC_FILES.forEach(name => {
    const relativePath = path.join('data', 'questions', name + '.js');
    if (!fs.existsSync(path.join(SITE_ROOT, relativePath))) return;
    const loaded = loadScripts([relativePath]);
    byFile[name] = loaded.QUESTION_BANK || [];
  });
  return byFile;
}

module.exports = { SITE_ROOT, QUESTION_DIR, TOPIC_FILES, loadScripts, loadBank, loadBankByFile };
