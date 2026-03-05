// scripts/utils/git-utils.js
// Git log utilities for extracting completion timestamps from journal history

const { execSync } = require('child_process');
const path = require('path');

/**
 * Find the date when an assignment was marked complete in the journal.
 *
 * Searches git log for the commit that changed `- [ ] **<title>` to
 * `- [x] **<title>` in the journal file. Uses git's pickaxe (-S) to
 * find the commit where the string `[x] **<title>` was introduced.
 *
 * @param {string} journalPath - Absolute path to the journal.md file
 * @param {string} assignmentTitle - Assignment title as it appears in the Progress Tracker
 * @returns {Promise<string|null>} Date string YYYY-MM-DD, or null if not found
 */
async function getCompletionTimestamp(journalPath, assignmentTitle) {
  try {
    const repoRoot = execSync('git rev-parse --show-toplevel', {
      encoding: 'utf8',
      cwd: path.dirname(journalPath),
    }).trim();

    // Pickaxe search: find the commit that introduced [x] **<title>
    const searchStr = `[x] **${assignmentTitle}`;
    const result = execSync(
      `git log --diff-filter=M --format="%as" -S "${searchStr}" -- "${journalPath}"`,
      { encoding: 'utf8', cwd: repoRoot },
    ).trim();

    const lines = result.split('\n').filter(Boolean);
    return lines[0] || null;
  } catch {
    return null;
  }
}

module.exports = { getCompletionTimestamp };
