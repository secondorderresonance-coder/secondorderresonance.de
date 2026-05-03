# Automation Workflow Rules

These rules are **mandatory** for every autonomous run in this repository.
They must be followed without exception, even if the user does not repeat them.

---

## 1. Always pull before coding

Before touching any file, always sync with the remote branch:

```bash
git fetch origin <branch>
git pull origin <branch>
```

If local uncommitted changes exist, stash first, pull, then pop and resolve conflicts.
Never start coding on a stale local state.

---

## 2. Commit and push after every completed task

After each finished task (not after the whole session — after *each individual task*):

```bash
git add <changed files>
git commit -m "<clear description>"
git push -u origin <branch>
```

A task is "done" when:
- The feature or fix is implemented
- `archive-qa.js` (or equivalent validation) passes
- STATUS.md and BACKLOG.md are updated

Do not batch multiple tasks into one commit unless they are tightly coupled.

---

## 3. Read planning files before starting

At the start of every run, read in this order:
1. `AUTOMATION_WORKFLOW_RULES.md` (this file)
2. `AGENTS.md`
3. `BACKLOG.md`
4. `STATUS.md`

Select exactly **one** highest-priority open task from BACKLOG.md and implement only that.

---

## 4. Update STATUS.md and BACKLOG.md as part of every task

Every commit must include:
- Updated `STATUS.md`: what changed, files touched, validation result, next step, blockers
- Updated `BACKLOG.md`: task marked `[x]`, new follow-up tasks appended if discovered

---

## 5. Conflict resolution on stash pop

If `git stash pop` produces conflicts:
- Resolve all `<<<<<<` markers manually before committing
- Prefer the version that fixes bugs (not just the newer one)
- Verify with `grep -c '<<<<<<' <file>` that no markers remain
- Run QA before committing

---

## 6. Branch

All development happens on the designated feature branch (see session context).
Never push directly to `main` or `master`.
