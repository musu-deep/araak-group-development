# Project memory

## Product intent & audience

- Rebuild/refresh araak.org for **مجموعة اراك للتنمية (Araak Development Group)** — a non-profit development group founded 2008, operating in 53+ countries with 5 subsidiary institutions.
- Arabic-first corporate website, RTL layout, targeting donors, partners, and community stakeholders.
- Hybrid content model: static display sections + dynamic data-driven sections (news, team, contact submissions).
- Slogan: "نحو توطين القيم لتمكين التنمية".

## Brand personality & voice

- High-end, luxury, cinematic; enterprise-grade credibility inspired by McKinsey and MiSK Foundation.
- Tone: authoritative, mission-driven, trustworthy — reflecting non-profit development values (grants, transparency, collaboration, professionalism, innovation).
- Arabic-first copy; clean, formal corporate Arabic throughout.

## Visual design & UX direction

- **Palette**: dark navy `#0A1628` + warm royal gold `#C99E4C`; light sand and deep blue accents for subsidiary cards. (User explicitly prefers blue over emerald — changed mid-project.)
- **Typography**: Tajawal Arabic font.
- **Hero**: fullscreen cinematic with golden network grid lines, light orbs, glassmorphism stats card (53+ countries, 2008, 5 institutions).
- **Layout patterns**: Bento grid for subsidiaries; sticky responsive navbar with scroll-state change and mobile menu; section-based scroll flow.
- **Interactions**: smooth scroll, glassmorphism cards, gradient overlays, hover states.
- **Imagery fallback**: Pexels unavailable in this environment → CSS-based gradients/visuals used instead; swap for real architectural/Riyadh skyline imagery when available.
- **Accessibility**: RTL-aware layout; semantic structure; contrast maintained on dark background.

## Decisions, constraints & rationale

- **Stack**: Vite + React + Tailwind CSS + Lucide React + Supabase. No extra UI/icon packages (per `.bolt/prompt`).
- **Path alias**: `@/` → `src/`.
- **Color migration**: replaced emerald scale with navy scale across Tailwind config, CSS, and all components; subsidiary `color_theme` values updated from `'emerald'` to `'navy'` in both fallback data and DB seed.
- **Dynamic (Supabase)**: news articles, team members, subsidiary institutions, contact form submissions. Each section has static fallback data for resilience if DB fetch fails.
- **Static**: hero, about/vision/mission/values, footer.
- **Supabase security**: RLS policies configured for all tables.
- **Component architecture**: shared types + modular section components (Navbar, Hero, About, Subsidiaries, News, Team, Contact, Footer).
- **Build status**: build + typecheck both pass after navy migration.

## Open questions & assumptions

- Real hero/architectural imagery still needed to replace CSS placeholders.
- Current araak.org full subsidiary details and team roster assumed from fetched content — may need verification against live site.
- News/team/subsidiary seed data is placeholder; admin workflow for content management not yet built.
- Social media links and exact contact details need confirmation from client.