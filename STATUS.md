# STATUS

## Current state
The repository includes a scalable archive foundation for a 6-level learning platform, a working 30-question placement test flow, 3.120 archive tasks (520 per level), cleaner homepage video entry links, completed active 5-level wording migration, a first authoring/QA foundation for safer archive growth, a deeper hierarchical sublevel taxonomy in the archive data, and now a direct bridge from archive tasks into matching app exercises.

Long-term target remains unchanged and explicitly active:
- 5.000 learning items per level
- 6 levels
- 30.000 items overall

Current implementation status:
- Expanded scalable foundation (not final archive volume)
- Architecture is designed for further growth without major restructuring
- Homepage video cards now provide direct topic-based YouTube entry points instead of generic channel-only links
- Active level framing now consistently reflects the 6-level target through Level 6 ("Forschung & Simulation")
- Archive authoring has a documented seed-task template and a runnable QA check for taxonomy/data integrity
- Taxonomy includes deeper pedagogical paths such as `1.1.2.a`, `2.1.1.a`, `3.1.1.a`, `4.1.1.a`, `5.1.1.a`, and `6.1.1.a`
- Archive task details now link into the app with matching level/topic deeplinks where supported

## Last completed task
Completed the next highest-priority open task from BACKLOG.md (P2 connect archive content with app exercises):
- Added archive-to-app linking in `app/lernarchiv.html` so a selected archive task can open a matching app exercise context directly.
- Added level/topic deeplink handling in `app/index.html` so the app can open on the requested level and apply the requested topic when it exists in the app topic set.
- Kept the change focused to archive/app coupling only; no redesign and no content-volume change in this run.

## Last validation
- `node tools/archive-qa.js`
- QA result:
  - tasks: 3120
  - placement questions: 30
  - level distribution: 520 tasks for each level 1-6
  - overall result: OK
- `rg -n "Passende App-Uebung|detail-link|openFromLocation|URLSearchParams\\(window.location.search\\)" app/lernarchiv.html app/index.html`
- Static diff review confirmed the new behavior is limited to archive/app navigation and does not alter the broader layout structure.

## Files touched in last task
- `app/lernarchiv.html`
- `app/index.html`
- `BACKLOG.md`
- `STATUS.md`

## Blockers
None.

## Next logical step
Start the next highest-priority open task from P2:
- Add level/sublevel deep links and saved filter state in the archive UI.
