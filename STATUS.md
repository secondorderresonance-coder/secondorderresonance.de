# STATUS

## Current state
The repository includes a scalable archive foundation for a 6-level learning platform, a working 30-question placement test flow, 3.120 archive tasks (520 per level), cleaner homepage video entry links, completed active 5-level wording migration, a first authoring/QA foundation for safer archive growth, a deeper hierarchical sublevel taxonomy in the archive data, a direct bridge from archive tasks into matching app exercises, and now stable deep links plus saved archive filter state in the archive UI.

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
- Archive filters can now be restored from local state and shared via URL parameters for `level`, `sublevel`, `topic`, `search`, and `task`

## Last completed task
Completed the next highest-priority open task from BACKLOG.md (P2 add level/sublevel deep links and saved filter state in the archive UI):
- Added local archive filter persistence in `app/lernarchiv.html` using browser storage.
- Added URL parameter support for `level`, `sublevel`, `topic`, `search`, and `task` so archive views can be reopened and shared directly.
- Added a small `Filter-Link kopieren` control that fits the existing archive UI without redesigning the page.
- Kept the change focused to archive navigation/state handling only; no content-volume or placement-flow redesign in this run.

## Last validation
- `rg -n "function renderFilters|filteredTasksForCurrentLevel|function filteredTasks\(|saveFilterState\(|syncUrlFromState\(|copyFilterLinkBtn|refreshArchiveView|readFilterStateFromUrl|readSavedFilterState|ARCHIVE_STATE_KEY|</script>" app/lernarchiv.html -S`
- `node tools/archive-qa.js`
- QA result:
  - tasks: 3120
  - placement questions: 30
  - level distribution: 520 tasks for each level 1-6
  - overall result: OK
- Static diff review confirmed the new behavior is limited to archive filter persistence, URL deep links, and one small share action in the existing archive UI.

## Files touched in last task
- `app/lernarchiv.html`
- `BACKLOG.md`
- `STATUS.md`

## Blockers
None.

## Next logical step
Start the next highest-priority open task from P2:
- Improve mobile layout of archive and placement sections after real-device pass.
