# Tiago Systems — instructions for design work

Read `docs/design/RECOVERY_BRIEF.md` before changing the landing. The current user decision is a dark black/blue-black identity with a restrained GOLD primary accent matching DentFlow. The blue-brand `DESIGN.md` from commit `fd03ccb` records a superseded instruction; reconcile it during the requested recovery instead of treating that blue palette as approved.

## Repository skills

The complete verified personal adaptations are vendored in `.agents/skills/`:

- `awesome-design-md/SKILL.md`: reference selection and visual principles.
- `ui-ux-pro-max/SKILL.md`: local design, UX, typography, motion and React guidance.
- `google-design-md/SKILL.md`: one consistent DESIGN.md and bundled official token validator.
- `taste/SKILL.md`: composition, typography and context-sensitive motion.
- `impeccable/SKILL.md`: evidence-based polish; this adaptation does not include the original Impeccable CLI.

Read the actual SKILL.md files and relevant linked resources before implementation. If the selector does not list a skill, read its repository path directly and state that discovery was unavailable. Do not confuse mentioning a name with using its instructions. Resolve resource paths from each skill directory; never assume another machine's absolute paths.

## Visual evidence and scope

Open the three images indexed in `docs/design/references/README.md`, not just their filenames. Inspect the anonymized product references in `src/assets/dentflow-*-publico.png`. Preserve the existing brand, story, founder copy, real links, typography and interactions. Restore lost visual character using the historical candidates in the recovery brief, without erasing the functional React demo.

Record which references were inspected, which principles were applied, typography and motion comparisons, and verification results in `docs/design/RECOVERY_REPORT.md` when performing recovery. Never claim browser review, lint or tests ran when they did not.

Maintain React + TypeScript + Vite. Do not migrate frameworks or add animation libraries just to satisfy a skill. Do not reset the working tree or replace complete files from older commits without reconciling newer functional work.

Keep the demo synthetic, shared-state and interactive. Preserve manual WhatsApp semantics; no real messages from demo actions, no fabricated results, customers or testimonials. Use accessible focus, keyboard navigation, readable mobile layouts and reduced-motion alternatives. Reduced motion must not eliminate animation in the default experience.

Run the existing appropriate checks and inspect rendered desktop/mobile views. A passing build alone does not establish visual quality. Do not deploy to production without an explicit instruction.
