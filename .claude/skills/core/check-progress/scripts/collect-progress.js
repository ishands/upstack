#!/usr/bin/env node
// .claude/skills/core/check-progress/scripts/collect-progress.js
// Usage: node .claude/skills/core/check-progress/scripts/collect-progress.js [--course <slug>] [--output json|text]

const fs = require('fs');
const path = require('path');
const { parseJournal } = require('../../../../../scripts/utils/parse-journal');
const { getCompletionTimestamp } = require('../../../../../scripts/utils/git-utils');

const PROGRESS_DIR = path.join(__dirname, '..', '..', '..', '..', '..', 'progress');

async function collectProgress(courseSlug = null) {
  const results = [];

  if (!fs.existsSync(PROGRESS_DIR)) return results;

  const courseDirs = fs
    .readdirSync(PROGRESS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((name) => !courseSlug || name === courseSlug);

  for (const courseName of courseDirs) {
    const journalPath = path.join(PROGRESS_DIR, courseName, 'journal.md');
    if (!fs.existsSync(journalPath)) continue;

    const journalData = parseJournal(journalPath);

    // Enrich with git timestamps
    for (const assignment of journalData.assignments) {
      if (assignment.completed) {
        assignment.completedDate = await getCompletionTimestamp(journalPath, assignment.title);
      }
    }

    results.push(journalData);
  }

  return results;
}

// CLI entry point
const args = process.argv.slice(2);
const courseArg = args.includes('--course') ? args[args.indexOf('--course') + 1] : null;
const outputFormat = args.includes('--output') ? args[args.indexOf('--output') + 1] : 'json';

collectProgress(courseArg).then((data) => {
  if (outputFormat === 'json') {
    console.log(JSON.stringify(data, null, 2));
  } else {
    // Human-readable summary
    data.forEach((course) => {
      console.log(`\n📚 ${course.title}`);
      console.log(
        `   Progress: ${course.completionPercent}% ` + `(${course.completedAssignments}/${course.totalAssignments})`,
      );
      course.assignments.forEach((a) => {
        const tick = a.completed ? '✅' : '⬜';
        const date = a.completedDate ? ` — completed ${a.completedDate}` : '';
        console.log(`   ${tick} ${a.title}${date}`);
      });
    });
  }
});

module.exports = { collectProgress };
