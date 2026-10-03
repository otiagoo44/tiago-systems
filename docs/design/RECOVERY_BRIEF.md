# Tiago Systems — recovery brief

## Current decision

The owner wants to recover the visual quality of the landing they liked, preserve its typography and animations, and use the BLACK AND GOLD identity of DentFlow. The previous assistant prompt explicitly requested blue; that instruction is now superseded. This is a targeted recovery and refinement, not a generic redesign.

This installation only adds agent skills, public design references and instructions. It does not change the application or assert that the landing has been visually repaired.

## Evidence from the published history

- `2504ab0`: initial landing with illustrative product views; inspect as a visual candidate only.
- `91c6541`: completed review version with Space Grotesk/DM Sans, adapted product screenshots, entrance motion and an orange accent; inspect its editorial proportions and motion as another candidate.
- `fd03ccb`: blue-palette pass and new functional DentFlow demo; retains the same font families in source but changes surfaces, typography scale and product presentation. Its DESIGN.md explicitly says the four requested design skills were not installed in that environment and browser review was pending.

These commit IDs are candidates for comparison, not proof of which exact screen the owner approved. Inspect historical code and screenshots alongside the supplied references; do not use `git reset --hard`, revert the entire commit or remove newer CRM logic.

## Skills and visual references

Use the five repository skills from `.agents/skills/` and their coordination guides. The complete resource files, licenses and provenance are included. `skills-manifest.json` records the copied resources and their SHA-256 hashes.

Open `references/gazu.png`, `references/urbanx.png`, and `references/formix.png`. The reference colors are NOT the product palette. Take principles of typographic hierarchy, layering, spacing, contrast, framing and section rhythm. Do not copy their logos, models, claims, statistics, store layouts, neon green or orange.

Use `src/assets/dentflow-resumen-publico.png`, `dentflow-pendientes-publico.png` and `dentflow-analisis-publico.png` as product UI references. Reconstruct needed parts as real React controls, preserving their hierarchy, proportions, density and black/gold identity while using fictional data.

## Palette fallback

First inspect the CRM references and any authoritative current local product tokens. If exact tokens are unavailable, use this explicit fallback from the owner's attached brief, rather than a new invented palette:

| Role | Value |
| --- | --- |
| Main background | `#05070B` |
| Secondary background | `#080B11` |
| Alternate background | `#0A0F17` |
| Surface | `#0D1420` |
| Raised surface | `#101927` |
| Hover surface | `#172335` |
| Heading | `#F6F7F9` |
| Body | `#D9DEE7` |
| Secondary text | `#9CA8B9` |
| Primary gold | `#D2B36C` |
| Hover gold | `#E2C67F` |
| Secondary informational blue | `#70A5FF` |
| Border | `rgba(255,255,255,.09)` |

Gold CTA text uses the dark background token. Gold should be restrained: actions, selection, active stages and important small details, not full gold sections or gold paragraphs. Blue may be informational but is not the main brand color. Check rendered contrast, not only opaque token pairs. Semantic success/error colors may remain if readable and meaningful.

## Preserve and improve

- Preserve the founder block beginning “Construyo sistemas para resolver problemas operativos reales”, the product truth and confirmed contact/social links.
- Preserve the replaceable professional portrait slot; no fake founder photo.
- Compare font families, weights, headline scale, italic/emphasis, line breaks and spacing before replacing typography. Existing Space Grotesk/DM Sans are not automatically wrong.
- Inventory hero entry, section reveal, hover, FAQ, navigation, product transitions and ambient movement in both historical candidates and current code. Restore purposeful missing effects; do not flatten motion for convenience or add irrelevant effects.
- Preserve the current shared reducer, metrics, fictional contacts, search/filter logic, pending actions, timeline, scheduling, analysis and reset. Read existing tests first.
- Prefer enriching the existing demo frame to replacing the product section. It must look like DentFlow and behave like a small frontend demo, not a static screenshot or generic dashboard.

## Required verification when implementing recovery

Run the existing build and tests. Inspect actual screenshots at 390, 768 and 1440 pixels, normal-motion and reduced-motion behavior, keyboard navigation, modals, tabs, founder copy, image sizing and global overflow. Verify contact -> schedule -> metrics -> reset through the UI. Do not claim completion of checks unavailable in the environment.

Record before/after evidence and skill-derived decisions in RECOVERY_REPORT.md. Use additional checks only for concrete new changes or failures.
