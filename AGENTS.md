# AGENTS.md

## Project
This repository contains the website for **Second Order Resonance**.

The website is already live and has an established visual identity.  
The current design language, branding, layout feel, and overall look should be preserved as much as possible.

This project should be improved **iteratively**.  
Do not redesign the site from scratch.  
Do not introduce unnecessary complexity.  
Do not make large, hard-to-review changes unless explicitly requested.

---

## Core product vision

The website should gradually evolve from an informational site into a **gamified mathematics and physics learning platform**.

The long term direction is a high quality learning experience inspired by:
- structured level progression
- interactive exercises
- XP and progress systems
- daily streaks
- unlockable content
- medals / badges / achievements

However, this should happen **step by step**.  
The first changes should create a stable foundation, not a bloated or unfinished full product.

---

## Design and branding constraints

Always preserve:
- the current visual identity
- the existing color language where possible
- the general layout style
- the brand feeling of the current site
- the clean and educational character of the project

Avoid:
- radical redesigns
- replacing the whole UI unnecessarily
- introducing clashing styles
- making the page feel like a generic template
- over-gamified, childish, or messy UI

Preferred style:
- clean
- modern
- motivating
- high quality
- trustworthy
- educational
- mobile-friendly

---

## Mandatory level structure

The project must consistently use this **6-level structure** everywhere relevant:

- 🟢 L1 – Grundlagen (Grundschule & Unterstufe)
- 🟡 L2 – Aufbauwissen (Unter- & Mittelstufe)
- 🟠 L3 – Vertiefung (Oberstufe / Schulabschlussniveau)
- 🔵 L4 – Universitätsgrundlagen (Studienanfang)
- 🟣 L5 – Angewandte Mathematik (fortgeschrittenes Studium)
- ⚫ L6 – Forschung & Simulation (Wissenschaft / Spezialisierung)

If the repository still uses an older 5-level system, replace it consistently across:
- text
- labels
- badges
- filters
- cards
- internal data structures
- UI descriptions
- any educational categorization

Do not leave mixed old and new level definitions.

---

## Mandatory content addition

The website should include a TikTok link:

`https://www.tiktok.com/@second_order_resonance`

Add it in a way that fits naturally into the current design and social/media/contact structure.

---

## Product development rules

When implementing new functionality:
1. Prefer small, reviewable pull requests.
2. Keep the first implementation simple but extensible.
3. Build a foundation for future growth instead of hardcoding large amounts of content.
4. Do not generate hundreds of static tasks directly in markup.
5. Prefer modular and data-driven structures.
6. Local browser storage is acceptable for early progress features.
7. Avoid introducing a backend unless explicitly required.

---

## Gamification direction

The long term system should support:
- exercises grouped by level
- mathematics and physics content
- XP per completed exercise
- daily streaks
- level unlocking
- badges / medals / achievements
- visible progress
- future extension to many exercises

For early implementations:
- create the architecture first
- include only a small number of demo tasks if needed
- do not try to complete the full end product in one PR

---

## Technical preferences

Prefer:
- readable, maintainable code
- modular components
- reusable data structures
- minimal dependencies
- progressive enhancement
- mobile-friendly layouts
- robust local state handling where needed

Avoid:
- unnecessary frameworks or libraries
- deeply coupled logic
- giant monolithic files
- fragile hacks
- breaking existing pages without a strong reason

If there is already an existing structure in the repo, extend it instead of replacing it unnecessarily.

---

## Expected workflow for Codex

For each requested task:
1. First inspect the repository and understand the current implementation.
2. Summarize the intended approach briefly.
3. Make focused changes only.
4. Keep pull requests small unless explicitly asked otherwise.
5. At the end, explain:
   - what changed
   - what was intentionally not changed
   - what the next logical step would be

---

## Priority for early pull requests

In early PRs, prioritize:
1. preserving the existing design
2. introducing the new 6-level system consistently
3. adding the TikTok link
4. preparing a scalable learning-platform foundation
5. adding only minimal demo gamification where useful

Do not try to fully build the whole learning platform in a single step.

---

## Success criteria

A successful early PR should make the site:
- still look like Second Order Resonance
- clearly reflect the new 6-level structure

## Iterative execution protocol

This repository should be improved continuously in small, reviewable iterations.

For every autonomous run, Codex must follow this protocol:

1. Read `BACKLOG.md` and `STATUS.md` before making any change.
2. Select exactly one highest-priority open task from `BACKLOG.md`.
3. Implement only one focused improvement per run.
4. Prefer changes that are easy to review and validate.
5. After implementation, run the most relevant validation steps available in the repo.
6. Update `STATUS.md` with:
   - what was changed
   - which files were touched
   - how it was validated
   - what the next logical step is
   - whether any blocker remains
7. Mark completed tasks in `BACKLOG.md`.
8. If useful follow-up tasks are discovered, append them to `BACKLOG.md` in the appropriate priority section.
9. Do not stop merely because one task is finished if further open tasks remain in `BACKLOG.md`.
10. If blocked, document the blocker clearly in `STATUS.md` and switch to the next unblocked task only if that task is independent and still small in scope.

## Scope rules for autonomous runs

Each autonomous run should usually do only one of the following:
- fix one localized content or copy issue
- add one small UI section
- improve one navigation path
- refactor one small reusable structure
- add one small archive content module
- add one small video integration section
- improve one mobile or accessibility issue

Avoid combining many unrelated improvements in one run.

## Definition of done per run

A run is complete only when:
1. the selected task is actually implemented
2. the affected area is checked for obvious regressions
3. `STATUS.md` is updated
4. `BACKLOG.md` is updated
- be more extensible for future learning features
- stay clean and easy to review
