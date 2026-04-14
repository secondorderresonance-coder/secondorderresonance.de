# Archive Content QA Workflow and Authoring Guidelines

## Purpose
This document defines how we scale archive content from 3,000 toward 30,000 tasks while keeping quality high, explanations textbook-like, and difficulty progression clear.

The focus is not only on tasks, but on teaching-grade explanations that are easy to understand.

## Scope
Applies to:
- `app/data/archive-content.js`
- `templates/archive-task-template.json`
- `tools/archive-qa.js`
- all future content batches for L1-L6

## Source policy (L4-L6)
For L4, L5, and L6 content, use these books as primary reference orientation:
- `C:\Users\azwin\OneDrive\Desktop\Studium\Bachelor Maschinenwesen\1.Semester\Höhere Mathematik 1\HM in Rezepten Buch (Karpfinger).pdf`
- `C:\Users\azwin\OneDrive\Desktop\Studium\Bachelor Maschinenwesen\1.Semester\Höhere Mathematik 1\HM in Rezepten Arbeitsbuch (Karpfinger).pdf`

Source usage rule:
- Explanations must follow the conceptual order and notation style used in the books.
- Task phrasing may be simplified, but mathematical correctness must remain strict.
- If a simpler phrasing is used, keep the formal statement in the explanation block.

## Mandatory explanation format per task
Each task explanation should follow this structure (single text field, fixed order):
1. Core idea: one short sentence about what concept is used.
2. Intuition: what the formula/method means in plain language.
3. Step-by-step solution: 2-6 numbered steps.
4. Common mistake: one concrete pitfall.
5. Quick check: one short self-check rule.

Example skeleton:
- Core idea: ...
- Intuition: ...
- Steps:
  1) ...
  2) ...
- Common mistake: ...
- Quick check: ...

## Difficulty and progression rules
- `easy`: direct application of one rule/formula.
- `medium`: 2 linked operations or one transformation + interpretation.
- `hard`: multistep derivation, model setup, or method selection.

Progression gate per sublevel batch:
- at least 30 percent easy
- at least 40 percent medium
- at least 20 percent hard
- no repeated prompt text within the same topic+sublevel

## L4-L6 didactic guidance

### L4 Universitaetsgrundlagen
Target style:
- bridge from school math to university notation
- explicit symbol introduction before transformation
- small reasoning steps over compact jumps

Required topic mix per batch (minimum):
- analysis foundations (limits, derivatives, integrals)
- linear algebra foundations (vectors, matrices, linear systems)
- first-order ODE basics

### L5 Angewandte Mathematik
Target style:
- model -> method -> interpretation flow
- stronger link to physics/engineering use cases

Required topic mix per batch (minimum):
- differential equations methods
- numerics/error intuition
- optimization constraints and interpretation

### L6 Forschung und Simulation
Target style:
- method choice justification
- assumptions and limitations are explicit
- interpretation of results, not only computation

Required topic mix per batch (minimum):
- stochastic/process reasoning
- simulation or numerical stability
- advanced optimization/modeling context

## QA gates before merge
A content change is done only if all gates pass.

Gate A: Structural QA
- run: `node tools/archive-qa.js`
- result must be OK

Gate B: Explanation QA (manual spot check)
Random sample per changed level:
- 5 tasks per touched level
- all 5 must contain the mandatory explanation format
- all 5 must contain at least one explicit pitfall sentence

Gate C: Pedagogical QA
For each touched level:
- at least one task where answer interpretation is explained in words
- no explanation longer than 220 words unless topic is marked hard
- no unexplained symbol introduction

Gate D: Consistency QA
- level labels must remain L1-L6 taxonomy only
- no mixed legacy 5-level wording

## Authoring workflow (small batches)
1. Select one level and one narrow topic slice.
2. Add a small batch (recommended 12-30 tasks).
3. Run structural QA.
4. Manual explanation QA on sample.
5. Update `STATUS.md` with:
- changed slice
- validation commands
- known weak spots
- next slice

## Review checklist for PRs
- Is the batch focused on one slice?
- Do explanations teach, not only state results?
- Is notation consistent with source books for L4-L6?
- Are pitfalls and quick checks present?
- Does QA output remain green?

## Definition of quality for archive scaling
A larger archive is only accepted if explanation quality stays stable.
Content volume without didactic clarity does not count as progress.

