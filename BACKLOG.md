# BACKLOG

## Archiv Zielbild
- 5.000 Aufgaben pro Level (L1-L6)
- 30.000 Aufgaben insgesamt im Archiv
- 30-Fragen-Einstufungstest fuer Level- und Sublevel-Einstieg
- Strategischer Hinweis: Die aktuelle Umsetzung ist ein fruehes, skalierbares Fundament und nicht das finale Archiv.

## Aktueller Meilenstein
- 100 Aufgaben pro Level in dieser Iteration
- 600 Aufgaben insgesamt aktuell verfuegbar
- Zielstruktur bleibt unveraendert: 30.000 Aufgaben insgesamt

## P1
- [x] Add an Archiv section to the website
- [x] Add first archive entries for:
  - Exponentielles Verhalten
  - Gleichungen loesen und umstellen
- [x] Introduce scalable archive data model (`id`, `title`, `level`, `sublevel`, `topic`, `tags`, `difficulty`, `question`, `answer`, `explanation`, `type`, `estimatedTime`)
- [x] Add level taxonomy for all 6 levels with hierarchical sublevels
- [x] Add archive UI with level/sublevel/topic filters, search, and task detail view
- [x] Add 30-question placement test (single-question flow, progress, scoring, level+sublevel estimate)
- [x] Show transparent archive progress (current task count vs 5.000/level and 30.000 total)
- [x] Expand archive content to 100 tasks per level (600 total) using scalable generation architecture
- [x] Ensure TikTok link is visible in the social/media area
- [x] Add a clean video section linking existing YouTube videos
- [ ] Check whether any old 5-level structure still exists and migrate it consistently to the 6-level system

## P2
- [ ] Curriculum expansion workstream: raise content depth from 600 to 3.000+ curated tasks while preserving pedagogical quality
- [ ] Task generation workstream: add authoring templates + QA pipeline for safe growth toward 5.000 tasks per level
- [ ] Deep sublevel workstream: expand hierarchical taxonomy (e.g. 1.1.1 -> 1.1.1.a tracks) where pedagogically meaningful
- [ ] Connect archive content more clearly with app exercises
- [ ] Add level/sublevel deep links and saved filter state in the archive UI
- [ ] Improve mobile layout of archive and placement sections after real-device pass
- [ ] Add placement result handoff to recommended archive filter preset

## P3
- [ ] Prepare local progress architecture for future XP and streak systems
- [ ] Add daily streak system to archive and placement journey (local first, backend-ready later)
- [ ] Add achievement placeholder architecture without overbuilding
- [ ] Define content QA workflow and authoring guidelines for scaling to 30.000 tasks
