# STATUS

## Current version
- `v1.1.6`

## Current state
The repository includes a scalable archive foundation for a 6-level learning platform, a working 30-question placement test flow, 3.120 archive tasks (520 per level), cleaner homepage video entry links, completed active 5-level wording migration, a first authoring/QA foundation for safer archive growth, a deeper hierarchical sublevel taxonomy in the archive data, a direct bridge from archive tasks into matching app exercises, stable deep links plus saved archive filter state in the archive UI, a cleaner mobile layout for the archive and placement sections, a direct handoff from placement results into the recommended archive preset, a first interactive Pythagoras module connected across website and archive, a global search plus a low-friction external suggestion flow on the landing page, a first interactive complex-numbers visual connected across website and archive, and now the global quick search placed directly in the top navigation.

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
- The first interactive visual now exists for the Pythagorean theorem, with a homepage teaser and a live archive module that reacts to kathete sliders and can jump directly into geometry archive filters
- The landing page now includes a global search over website/archive topics directly in the top navigation plus a backend-free suggestion form for external task ideas with level categorization, screenshot preview, and mail/share fallback
- The first complex-number visual now exists as a live Argand-plane module with real/imaginary sliders, modulus, angle, conjugation, and a homepage teaser that links into the archive

## Last completed task
Completed the requested navigation refinement for the landing page search:
- Moved the existing global quick-search UI from its own section into the fixed top navigation in `index.html`.
- Kept the existing search logic and result sources unchanged, so the feature still searches website areas, archive levels, sublevels, and topics.
- Converted the result list into a navigation dropdown below the search field and hid the empty state until a query is entered.
- Preserved the current visual identity and adjusted the mobile navigation so links plus search remain usable on smaller screens.

## Last validation
- `rg -n "nav-right|nav-search|globalSearchInput|globalSearchResults|search-hub" index.html -S`
- Inline script syntax check via Node on `index.html`
- Static diff review confirmed the change stays focused on one navigation/search placement refinement plus run documentation.

## Files touched in last task
- `index.html`
- `STATUS.md`
- `VERSION.md`

## Blockers
None.

## Next logical step
Continue with the next highest-priority open tasks now queued after this run:
1. Prepare local progress architecture for future XP and streak systems.
2. Add daily streak system to archive and placement journey (local first, backend-ready later).
3. Add achievement placeholder architecture without overbuilding.
4. Define content QA workflow and authoring guidelines for scaling to 30.000 tasks.
5. Define Duolingo-aehnliche guided learning journey and mission-map UX for web/app while preserving SOR identity.
