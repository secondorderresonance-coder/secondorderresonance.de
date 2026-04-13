# STATUS

## Current state
The repository now includes a scalable archive foundation for a 6-level learning platform, a working 30-question placement test flow, and 3.600 archive tasks (600 per level) for this iteration.

Long-term target remains unchanged and explicitly active:
- 5.000 learning items per level
- 6 levels
- 30.000 items overall

Current implementation status:
- Early scalable foundation (not final archive volume)
- Architecture is designed for further growth without major restructuring

## Last completed task
Completed the next highest-priority open P2 task: connect archive content more clearly with app exercises.
- repaired malformed inline line breaks in the archive detail view styles/markup (removed literal `` `r`n `` artifacts)
- added a clear call-to-action in archive task details: "In der App ueben"
- wired that CTA to app deep links with level/topic handoff via query params (`./index.html?level=...&topic=...`)
- extended the app entry logic so links from the archive open the matching level and preselect topic when available
- marked the P2 task as complete in `BACKLOG.md`

## Last validation
- `rg -n -F '`r`n' app/lernarchiv.html app/index.html` (no matches after cleanup)
- `rg -n "detail-actions|detail-link|createAppPracticeLink|In der App ueben" app/lernarchiv.html`
- `rg -n "normalizeTopicForLevel|URLSearchParams\\(window.location.search\\)|selectTopic\\(topic, force" app/index.html`
- `node --check` on extracted inline script from `app/lernarchiv.html`
- `node --check` on extracted inline script from `app/index.html`
- `node tools/archive-qa.js`:
  - total tasks: 3600
  - distribution: 600 tasks for each level 1-6
  - QA passed

## Files touched in last task
- `app/lernarchiv.html`
- `app/index.html`
- `BACKLOG.md`
- `STATUS.md`

## Blockers
None.

## Next logical step
Continue with the next open P2 task:
- add level/sublevel deep links and saved filter state in the archive UI
