#!/usr/bin/env node
/* Archive QA baseline checks for scalable content growth */
const fs = require('fs');
const vm = require('vm');

const ARCHIVE_PATH = 'app/data/archive-content.js';
const REQUIRED_TASK_FIELDS = [
  'id', 'title', 'level', 'sublevel', 'topic', 'tags', 'difficulty',
  'question', 'answer', 'explanation', 'type', 'estimatedTime'
];

function fail(msg) {
  console.error(`[ERROR] ${msg}`);
}

function warn(msg) {
  console.warn(`[WARN] ${msg}`);
}

function info(msg) {
  console.log(`[INFO] ${msg}`);
}

function loadArchive() {
  const src = fs.readFileSync(ARCHIVE_PATH, 'latin1');
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(src, context, { filename: ARCHIVE_PATH });
  return context.window.SOR_ARCHIVE;
}

function validate() {
  const errors = [];
  const data = loadArchive();

  if (!data || typeof data !== 'object') {
    errors.push('window.SOR_ARCHIVE is missing or invalid');
    return { errors, warnings: [] };
  }

  const warnings = [];

  if (!Array.isArray(data.taxonomy) || data.taxonomy.length !== 6) {
    errors.push(`taxonomy must contain exactly 6 levels, got ${Array.isArray(data.taxonomy) ? data.taxonomy.length : 'invalid'}`);
  }

  if (!Array.isArray(data.tasks) || data.tasks.length === 0) {
    errors.push('tasks array is missing or empty');
  }

  if (!Array.isArray(data.placementQuestions) || data.placementQuestions.length !== 30) {
    errors.push(`placementQuestions must contain 30 entries, got ${Array.isArray(data.placementQuestions) ? data.placementQuestions.length : 'invalid'}`);
  }

  const levelSet = new Set(['1', '2', '3', '4', '5', '6']);
  const byLevel = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0 };

  const ids = new Set();
  for (const [idx, task] of (data.tasks || []).entries()) {
    for (const field of REQUIRED_TASK_FIELDS) {
      if (!(field in task)) {
        errors.push(`task[${idx}] missing field '${field}'`);
      }
    }

    if (typeof task.id !== 'string' || !/^T-[1-6]-\d{3}$/.test(task.id)) {
      errors.push(`task[${idx}] has invalid id '${task.id}'`);
    }

    if (ids.has(task.id)) {
      errors.push(`duplicate task id '${task.id}'`);
    }
    ids.add(task.id);

    const lvl = String(task.level);
    if (!levelSet.has(lvl)) {
      errors.push(`task '${task.id}' has invalid level '${task.level}'`);
    } else {
      byLevel[lvl] += 1;
    }

    if (!Array.isArray(task.tags) || task.tags.length === 0) {
      errors.push(`task '${task.id}' must have a non-empty tags array`);
    }

    if (typeof task.estimatedTime !== 'number' || task.estimatedTime <= 0) {
      errors.push(`task '${task.id}' has invalid estimatedTime '${task.estimatedTime}'`);
    }

    for (const key of ['title', 'sublevel', 'topic', 'difficulty', 'question', 'answer', 'explanation', 'type']) {
      if (typeof task[key] !== 'string' || task[key].trim() === '') {
        errors.push(`task '${task.id}' has invalid '${key}'`);
      }
    }
  }

  for (const lvl of Object.keys(byLevel)) {
    if (byLevel[lvl] === 0) {
      errors.push(`no tasks found for level ${lvl}`);
    }
  }

  if (data.targetPerLevel !== 5000) {
    warnings.push(`targetPerLevel is ${data.targetPerLevel}, expected 5000`);
  }

  if (data.targetTotal !== 30000) {
    warnings.push(`targetTotal is ${data.targetTotal}, expected 30000`);
  }

  return { errors, warnings, byLevel, total: (data.tasks || []).length };
}

(function run() {
  let result;
  try {
    result = validate();
  } catch (err) {
    fail(`QA execution failed: ${err.message}`);
    process.exit(1);
  }

  for (const w of result.warnings || []) warn(w);
  for (const e of result.errors || []) fail(e);

  if ((result.errors || []).length > 0) {
    fail(`Archive QA failed with ${(result.errors || []).length} error(s).`);
    process.exit(1);
  }

  info('Archive QA passed.');
  info(`Total tasks: ${result.total}`);
  info(`Distribution: ${JSON.stringify(result.byLevel)}`);
})();
