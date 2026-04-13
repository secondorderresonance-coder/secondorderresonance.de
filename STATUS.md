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
Completed the next highest-priority open P2 task: add level/sublevel deep links and saved filter state in the archive UI.
- added URL-based deep-link support for archive filters (`level`, `sublevel`, optional `topic`, `q`)
- added persisted filter state in local storage (`sor-archive-filters-v1`)
- implemented URL-first hydration (URL values override stored values when present)
- synchronized filter changes back into URL via `history.replaceState` for shareable links
- restored search input from hydrated filter state on load
- marked the P2 task as complete in `BACKLOG.md`

## Last validation
- `node --check` on extracted inline script from `app/lernarchiv.html`
- `rg -n 'FILTER_STATE_KEY|loadFilterStateFromUrl|hydrateFilterState|persistFilterState|params.set\\(\"sublevel\"|params.set\\(\"level\"' app/lernarchiv.html`
- `node tools/archive-qa.js`:
  - total tasks: 3600
  - distribution: 600 tasks for each level 1-6
  - QA passed

## Files touched in last task
- `app/lernarchiv.html`
- `BACKLOG.md`
- `STATUS.md`

## Blockers
None.

## Next logical step
Continue with the next open P2 task:
- improve mobile layout of archive and placement sections after real-device pass
