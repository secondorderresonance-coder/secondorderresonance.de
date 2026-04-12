# STATUS

## Current version
- `v1.1.2`

## Current state
The repository includes a scalable archive foundation for a 6-level learning platform, a working 30-question placement test flow, 3.120 archive tasks (520 per level), cleaner homepage video entry links, completed active 5-level wording migration, a first authoring/QA foundation for safer archive growth, a deeper hierarchical sublevel taxonomy in the archive data, a direct bridge from archive tasks into matching app exercises, stable deep links plus saved archive filter state in the archive UI, a cleaner mobile layout for the archive and placement sections, and now a direct handoff from placement results into the recommended archive preset.

Long-term target remains unchanged and explicitly active:
- 5.000 learning items per level
- 6 levels
- 30.000 items overall
- Duolingo-aehnliche guided learning journey for math/physics in SOR branding
- Own SOR accounts on the website first and later in iOS/Android app flows
- Free-first product direction with optional small premium tier later if demand supports it

Current implementation status:
- Expanded scalable foundation (not final archive volume)
- Architecture is designed for further growth without major restructuring
- Homepage video cards now provide direct topic-based YouTube entry points instead of generic channel-only links
- Active level framing now consistently reflects the 6-level target through Level 6 ("Forschung & Simulation")
- Archive authoring has a documented seed-task template and a runnable QA check for taxonomy/data integrity
- Taxonomy includes deeper pedagogical paths such as `1.1.2.a`, `2.1.1.a`, `3.1.1.a`, `4.1.1.a`, `5.1.1.a`, and `6.1.1.a`
- Archive task details now link into the app with matching level/topic deeplinks where supported
- Archive filters can now be restored from local state and shared via URL parameters for `level`, `sublevel`, `topic`, `search`, and `task`
- Archive and placement sections now compress more cleanly on tablet and phone widths without changing the established visual identity
- Placement results can now apply the recommended level/sublevel directly and jump into the archive browser

## Last completed task
Completed the next highest-priority open task from BACKLOG.md (P2 add placement result handoff to recommended archive filter preset):
- Added `applyPlacementRecommendation(result)` in `app/lernarchiv.html` so the estimated level/sublevel from the test can directly drive the archive filters.
- Extended the placement result card with an `Empfohlenes Archiv oeffnen` action and a fallback archive jump link.
- Added `id="archiveBrowser"` to the archive section so placement-to-archive navigation has a stable target.
- Explicitly recorded Duolingo-like guided learning, web accounts, and a free-first/premium-later path in `BACKLOG.md` as strategic follow-up work.

## Last validation
- `rg -n "archiveBrowser|result-actions|applyPlacementRecommendation|applyPlacementBtn|Empfohlenes Archiv oeffnen|Zum Archiv springen" app/lernarchiv.html -S`
- `node tools/archive-qa.js`
- Inline script syntax check via Node on `app/lernarchiv.html`
- QA result:
  - tasks: 3120
  - placement questions: 30
  - level distribution: 520 tasks for each level 1-6
  - overall result: OK
- Static diff review confirmed the change stays focused on placement-to-archive handoff plus roadmap documentation.

## Files touched in last task
- `app/lernarchiv.html`
- `BACKLOG.md`
- `STATUS.md`
- `VERSION.md`

## Blockers
None.

## Next logical step
Continue with the next highest-priority open tasks now queued after this run:
1. Add first interactive visual module for "Satz des Pythagoras" in website + archive context.
2. Add first interactive visual module for "Komplexe Zahlen" (Argand-Ebene) in website + archive context.
3. Prepare local progress architecture for future XP and streak systems.
4. Add daily streak system to archive and placement journey (local first, backend-ready later).
5. Add achievement placeholder architecture without overbuilding.
