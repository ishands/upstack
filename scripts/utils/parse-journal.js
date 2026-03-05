// scripts/utils/parse-journal.js
// Parses progress/<course-slug>/journal.md to extract completion state

const fs = require('fs');
const path = require('path');

function parseJournal(journalPath) {
  const content = fs.readFileSync(journalPath, 'utf8');

  // Extract header fields
  const titleMatch = content.match(/^#\s+(.+?)\s+—\s+Personal Journal/m);
  const learnerMatch = content.match(/\*\*Learner:\*\*\s+(.+)/);
  const startedMatch = content.match(/\*\*Started:\*\*\s+(.+)/);

  // Derive slug from journal path: progress/<slug>/journal.md
  const slug = path.basename(path.dirname(journalPath));

  // Extract Progress Tracker section
  const trackerMatch = content.match(/## Progress Tracker([\s\S]*?)(?=^---|\n## (?!Progress))/m);
  const assignments = [];

  if (trackerMatch) {
    const pattern = /- \[([ x])\] \*\*([^*]+)\*\*/g;
    let match;
    while ((match = pattern.exec(trackerMatch[1])) !== null) {
      const fullTitle = match[2].trim();
      // Strip " — completed YYYY-MM-DD" suffix if present
      const title = fullTitle.replace(/\s+—\s+completed\s+\S+$/, '').trim();
      assignments.push({
        completed: match[1] === 'x',
        title,
        completedDate: null, // enriched by collect-progress.js via git-utils
      });
    }
  }

  const totalAssignments = assignments.length;
  const completedAssignments = assignments.filter((a) => a.completed).length;
  const completionPercent =
    totalAssignments > 0 ? Math.round((completedAssignments / totalAssignments) * 100) : 0;

  return {
    slug,
    title: titleMatch ? titleMatch[1] : slug,
    learner: learnerMatch ? learnerMatch[1].trim() : null,
    started: startedMatch ? startedMatch[1].trim() : null,
    assignments,
    completionPercent,
    totalAssignments,
    completedAssignments,
  };
}

module.exports = { parseJournal };
