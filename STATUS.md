# STATUS

## Current state
The repository includes a scalable archive foundation for a 6-level learning platform, a working 30-question placement test flow, 3.120 archive tasks (520 per level), cleaner homepage video entry links, completed active 5-level wording migration, and now a first authoring/QA foundation for safer archive growth.

Long-term target remains unchanged and explicitly active:
- 5.000 learning items per level
- 6 levels
- 30.000 items overall

Current implementation status:
- Expanded scalable foundation (not final archive volume)
- Architecture is designed for further growth without major restructuring
- Homepage video cards now provide direct topic-based YouTube entry points instead of generic channel-only links
- Active level framing now consistently reflects the 6-level target through Level 6 ("Forschung & Simulation")
- Archive authoring now has a documented seed-task template and a runnable QA check for taxonomy/data integrity

## Last completed task
Completed the next highest-priority open task from BACKLOG.md (P2 task generation workstream):
- Added `ARCHIVE_AUTHORING.md` with a reusable seed-task template, field rules, series template, and QA usage guidance.
- Added `tools/archive-qa.js`, a runnable QA script that validates archive structure, task fields, duplicate IDs, level/sublevel taxonomy consistency, allowed values, and placement question integrity.
- Kept the change focused to authoring and QA infrastructure only; no archive UI redesign and no content expansion in this run.

## Last validation
- `node tools/archive-qa.js`
- QA result:
  - tasks: 3120
  - placement questions: 30
  - level distribution: 520 tasks for each level 1-6
  - overall result: OK
- Static review confirmed the new files are additive infrastructure and do not change the live website layout.

## Files touched in last task
- `ARCHIVE_AUTHORING.md`
- `tools/archive-qa.js`
- `BACKLOG.md`
- `STATUS.md`

## Blockers
None.

## Next logical step
Start the next highest-priority open task from P2:
- Deep sublevel workstream: expand hierarchical taxonomy where pedagogically meaningful.
