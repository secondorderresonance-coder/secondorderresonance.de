#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = process.cwd();
const archivePath = path.join(root, 'app', 'data', 'archive-content.js');

function fail(msg) {
  console.error('FAIL: ' + msg);
  process.exit(1);
}

if (!fs.existsSync(archivePath)) {
  fail('Missing archive data file: ' + archivePath);
}

const code = fs.readFileSync(archivePath, 'latin1');
const context = { window: {} };
vm.createContext(context);

try {
  vm.runInContext(code, context, { filename: 'archive-content.js' });
} catch (err) {
  fail('Could not evaluate archive-content.js: ' + err.message);
}

const data = context.window.SOR_ARCHIVE;
if (!data || typeof data !== 'object') {
  fail('window.SOR_ARCHIVE not found');
}

if (!Array.isArray(data.taxonomy) || data.taxonomy.length !== 6) {
  fail('taxonomy must contain exactly 6 levels');
}

const allowedLevels = new Set(['1', '2', '3', '4', '5', '6']);
const taxonomyLevels = new Set(data.taxonomy.map((t) => String(t.level)));
for (const level of allowedLevels) {
  if (!taxonomyLevels.has(level)) fail('taxonomy missing level ' + level);
}

if (!Array.isArray(data.tasks) || data.tasks.length === 0) {
  fail('tasks must be a non-empty array');
}

const requiredFields = [
  'id',
  'title',
  'level',
  'sublevel',
  'topic',
  'tags',
  'difficulty',
  'question',
  'answer',
  'explanation',
  'type',
  'estimatedTime'
];

const idSet = new Set();
const counts = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0 };

for (const [idx, task] of data.tasks.entries()) {
  for (const field of requiredFields) {
    if (!(field in task)) fail(`task[${idx}] is missing field ${field}`);
  }

  const level = String(task.level);
  if (!allowedLevels.has(level)) {
    fail(`task[${idx}] has invalid level: ${task.level}`);
  }

  if (!Array.isArray(task.tags) || task.tags.length === 0) {
    fail(`task[${idx}] tags must be a non-empty array`);
  }

  const estimated = Number(task.estimatedTime);
  if (!Number.isFinite(estimated) || estimated <= 0) {
    fail(`task[${idx}] estimatedTime must be a positive number`);
  }

  if (idSet.has(task.id)) {
    fail(`duplicate task id: ${task.id}`);
  }
  idSet.add(task.id);
  counts[level] += 1;
}

if (!Array.isArray(data.placementQuestions) || data.placementQuestions.length !== 30) {
  fail('placementQuestions must contain exactly 30 entries');
}

if (Number.isFinite(data.targetTotal) && data.tasks.length > data.targetTotal) {
  fail(`tasks length (${data.tasks.length}) exceeds targetTotal (${data.targetTotal})`);
}

console.log('OK: archive QA passed');
console.log('tasks=' + data.tasks.length);
console.log('perLevel=' + JSON.stringify(counts));
console.log('placementQuestions=' + data.placementQuestions.length);
