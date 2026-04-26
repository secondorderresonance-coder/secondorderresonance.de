# BACKLOG

## Strategische Produktziele
- Duolingo-aehnliche Lernreise fuer Mathe und Physik, aber im Second-Order-Resonance-Stil statt als Kopie
- Eigene SOR-Accounts auf Website und spaeter in iOS/Android-App
- Zunaechst kostenloses Kernprodukt, spaeter optional kleine Premium-Stufe bei genug Nachfrage

## Archiv Zielbild
- 5.000 Aufgaben pro Level (L1-L6)
- 30.000 Aufgaben insgesamt im Archiv
- 30-Fragen-Einstufungstest fuer Level- und Sublevel-Einstieg
- Strategischer Hinweis: Die aktuelle Umsetzung ist ein fruehes, skalierbares Fundament und nicht das finale Archiv.

## Aktueller Meilenstein
- 1.500 Aufgaben pro Level in dieser Iteration
- 9.000 Aufgaben insgesamt aktuell verfuegbar
- L1-L3 Schulabdeckung erweitert bis T-1-020 / T-2-020 / T-3-020
- L4-L6 Ausbau-Batches aktuell erweitert bis T-4-021 / T-5-021 / T-6-021
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
- [x] Check whether any old 5-level structure still exists and migrate it consistently to the 6-level system

## P2
- [x] Curriculum expansion workstream: raise content depth from 600 to 3.000+ curated tasks while preserving pedagogical quality
- [x] Task generation workstream: add authoring templates + QA pipeline for safe growth toward 5.000 tasks per level
- [x] Deep sublevel workstream: expand hierarchical taxonomy (e.g. 1.1.1 -> 1.1.1.a tracks) where pedagogically meaningful
- [x] Connect archive content more clearly with app exercises
- [x] Add level/sublevel deep links and saved filter state in the archive UI
- [x] Improve mobile layout of archive and placement sections after real-device pass
- [x] Add placement result handoff to recommended archive filter preset
- [x] Expand L1-L3 school curriculum coverage batch with broader topics (Arithmetik, Geometrie, Funktionen, Stochastik, Trigonometrie)
- [ ] Expand L4-L6 archive slices with textbook-style explanations aligned to Karpfinger Buch + Arbeitsbuch (small reviewable batches)
- [ ] Continue L1-L3 school curriculum expansion in small mapped batches (remaining topic matrix toward full school coverage)

## P3
- [x] Add local account creation/login with per-account local progress storage (local-first foundation)
- [x] Prepare local progress architecture for future XP and streak systems
- [x] Add daily streak system to archive and placement journey (local first, backend-ready later)
- [x] Add achievement placeholder architecture without overbuilding
- [x] Define content QA workflow and authoring guidelines for scaling to 30.000 tasks
- [x] Add first interactive visual module for "Satz des Pythagoras" in website + archive context
- [x] Add global search function across website and archive themes
- [x] Add external quick-submit suggestion form for new task ideas with level categorization
- [x] Fix account init bug (loadAccountStore + bindAccountEvents not called on page load)
- [x] Add hearts/lives system (5 hearts, lose on wrong answer, auto-refill every 30 min)
- [x] Overhaul account panel UI (two-state: logged-in card with avatar vs. tabbed login/register form)
- [x] Extend account data model with avatarColor, createdAt, hearts, heartsLastRefill
- [x] Add daily mission widget (progress bar toward 5 Aufgaben/day)
- [x] Activate daily_goal and precision_3 achievements (were placeholders)
- [x] Create profile page (app/profil.html) with stats, heatmap, weekly XP chart, level progress
- [x] Migrate local account registration/login to email-based identity with per-email progress storage
- [ ] Add first interactive visual module for "Komplexe Zahlen" (Argand-Ebene) in website + archive context

## P4
- [ ] Define Duolingo-ähnliche guided learning journey and mission-map UX for web/app while preserving SOR identity
- [ ] Cloud-Sync für SOR-Accounts (Firebase Auth + Firestore, backend-ready architecture exists)
- [ ] Define free-first monetization path with optional small premium tier later
- [ ] Define SOR account and sync architecture for future iOS/Android app login
- [ ] Plan mobile app MVP (iOS/Android) with daily Mathe- und Physikaufgaben linked to SOR account
- [ ] Add backend/moderation pipeline for external task suggestions after validating demand
- [ ] Weekly leaderboard (ISO week XP ranking, local-first display, ready for backend sync)

