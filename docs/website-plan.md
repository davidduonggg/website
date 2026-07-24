# Personal Website Plan

## 1. Purpose

Build a personal website that works as:

- a professional homepage
- a lightweight portfolio
- a place for writing or notes
- a durable personal URL that is not tied to any single platform

## 2. Primary Audience

- Recruiters and hiring managers who need a quick summary
- Engineers or collaborators who want to inspect projects
- Friends or internet contacts who need a simple way to reach out

## 3. Core Outcomes

Visitors should be able to answer these questions within 30 seconds:

- Who is David?
- What kind of work does he do?
- What projects are worth looking at?
- How can I contact him?

## 4. MVP Pages

### Home

- short introduction
- current role or focus
- featured projects
- contact links

### About

- background
- strengths and interests
- short bio and longer bio

### Projects

- 3 to 6 highlighted projects
- problem, approach, outcome for each
- links to code, demo, or write-up where available

### Contact

- email
- GitHub
- LinkedIn or equivalent

## 5. Optional Phase 2 Pages

- Writing or notes
- Resume page
- Uses / setup page
- Now page

## 6. Content System

Prepare the following source material before design polish:

- 1 sentence bio
- 1 paragraph bio
- project shortlist
- project screenshots or demos
- social links
- resume copy

Content constraints:

- no face photography in the design system
- identity should come from typography, motion, writing, and interactive visual motifs

## 7. Visual Direction

Principles:

- clean but not generic
- strong typography
- restrained color palette
- mobile-first layout
- minimal visual clutter
- motion should feel intentional, not decorative

Potential style directions:

1. Editorial Motion: strong type, lots of whitespace, writing-forward, subtle text choreography
2. Technical Depth: precise grid, project-focused, diagram-friendly, spatial backgrounds and interactive surfaces
3. Personal Atmosphere: warmer tone, softer palette, ambient 3D accents, more tactile transitions

## 8. Motion And Interaction Direction

Recommended animation split:

- `anime.js` for UI choreography, text reveals, section transitions, hover states, and scroll-linked motion
- `three.js` for one or two high-impact 3D moments, not the entire site

Guiding rules:

- keep animations fast and readable
- use motion to reinforce structure and personality
- avoid blocking content behind long intros
- design graceful fallbacks for mobile and reduced-motion users

Promising concepts for a personal site:

1. Signal Field Hero
   A soft 3D particle or line field reacts to cursor movement behind the intro copy. This gives the homepage a technical feel without looking like a crypto landing page.
2. Project Cards With Depth
   Featured project cards tilt slightly in 3D, with `anime.js` handling staggered entry and `three.js` reserved for a subtle reflective or wireframe hover treatment on the active card.
3. Timeline Constellation
   The about page could show experience or interests as points connected by animated lines, turning a resume timeline into something more memorable.
4. Writing As Performance
   Headlines, pull quotes, and section dividers can animate in with controlled text splitting, underline growth, and scroll-triggered reveals instead of generic fades.
5. Ambient Object Motif
   Pick one personal motif like a floating notebook, terminal shard, folded plane, or abstract orb, then reuse it as a small 3D element across pages for visual identity.
6. Scene Shift Navigation
   Page transitions can feel like camera moves between sections of the same world instead of hard cuts, as long as transition timing stays short.

Recommended direction:

- use `Signal Field Hero` as the signature homepage moment
- use `Project Cards With Depth` as the main repeatable interaction pattern
- avoid personal photography and instead build identity through type, shape, and motion

## 9. Technical Direction

Recommended default:

- Framework: Next.js
- App Router: use `app/` with mostly server components
- Styling: CSS modules or Tailwind, but keep a clear design system with tokens for type, spacing, color, and motion
- Animation: `anime.js` for DOM animation and `three.js` for isolated canvas-based scenes
- Content: Markdown or MDX for writing and project entries
- Hosting: Vercel is the cleanest default for a Next.js personal site

Implementation notes:

- keep `three.js` scenes isolated to specific sections or components so most pages remain lightweight
- lazy-load heavier visual modules below the fold where possible
- define a motion token system for durations, easing, delay, and reduced-motion behavior
- treat performance as part of the design, especially on mobile
- use Vercel preview deployments for pull requests and branch work
- deploy production from the `main` branch through Vercel

## 10. Information Architecture

Top navigation:

- Home
- About
- Projects
- Writing
- Contact

Homepage section order:

1. Intro
2. Selected work
3. Short bio
4. Writing or notes
5. Contact

## 11. Copy Questions To Resolve

- Is the site optimized for hiring, freelance work, or general presence?
- Should the tone be formal, technical, or personal?
- Should writing be a core feature or optional?
- Do you want a blog CMS later, or mostly static content?
- Which animation concept should be the signature moment of the site?

## 12. Build Plan

### Phase 1

- lock stack around Next.js, `anime.js`, and `three.js`
- define brand direction
- choose one signature animation idea and one secondary motion pattern
- gather copy and links
- create wireframe for homepage

### Phase 2

- scaffold app
- implement homepage and projects page
- build one polished hero interaction before adding more effects
- make mobile and desktop layouts solid
- add SEO basics and metadata

### Phase 3

- add motion polish across remaining pages
- add analytics
- refine performance
- connect custom domain in Vercel
- publish on Vercel and iterate

## 13. Immediate Next Decisions

1. Pick the site's primary purpose.
2. Commit to `Next.js` as the site framework.
3. Choose one visual direction and one signature animation concept.
4. Decide whether the site should feel more editorial, technical, or atmospheric.

## 14. Homepage Concept

Recommended positioning:

- personal site with a technical and atmospheric tone
- clear enough for recruiters, interesting enough for engineers, and personal without relying on portraits

Recommended visual direction:

- base theme: Technical Depth with some Personal Atmosphere
- mood: calm, precise, slightly cinematic
- identity source: typography, animated geometry, restrained color, and project storytelling
- selected direction: off-dark background, Tiffany blue accent, cleaner technical typography

Suggested art direction:

- large high-contrast headline
- muted off-dark background rather than a plain white default
- one accent color for interaction states and animated geometry
- subtle grid, grain, or line texture to keep flat areas from feeling empty

Typography direction:

- cleaner technical headline style with strong geometry
- simpler body font for readability
- oversized section titles and strong spacing rhythm

## 15. Homepage Sections And Interactions

### Hero

Purpose:

- communicate who you are and what kind of work you do within a few seconds

Content:

- short headline
- one-sentence positioning statement
- primary links for projects and contact

Interaction:

- `three.js` renders a soft signal field or line mesh behind the copy
- pointer movement subtly shifts the field, but the text remains dominant
- `anime.js` handles headline reveal, link stagger, and a restrained entrance sequence

Design notes:

- no full-screen cinematic intro
- animation should already be in motion when the page loads
- keep the canvas layered behind content and cheap to disable on small screens

### Selected Work

Purpose:

- show 3 to 4 projects fast, with enough signal to invite deeper clicks

Content:

- project title
- short problem statement
- short outcome statement
- tags or role labels

Interaction:

- cards enter with staggered `anime.js` motion on first scroll into view
- hover or focus adds depth, slight tilt, and glow
- one active card at a time can trigger a lightweight `three.js` accent treatment if performance allows

Design notes:

- cards should feel like objects, not generic blog tiles
- outcome and role should be visible without expanding the card

### About Slice

Purpose:

- add personality without turning the homepage into a full biography

Content:

- 1 paragraph bio
- short list of interests, principles, or current focus areas

Interaction:

- text blocks reveal with directional motion rather than simple fades
- keywords or interest tags can animate in sequence with `anime.js`

Design notes:

- use this section to humanize the site through writing, not imagery

### Writing Or Notes Preview

Purpose:

- show range and signal that the site is alive

Content:

- 2 to 3 latest notes or essays
- short descriptions

Interaction:

- headlines animate with subtle underline growth or text offset on hover
- optional scroll-linked divider animation between this and the previous section

Design notes:

- if writing is not ready at launch, replace this section with process notes or a now block

### Contact Footer

Purpose:

- end with a clean call to reach out

Content:

- email
- GitHub
- LinkedIn
- optional short availability note

Interaction:

- quiet motion only: link hover states, line growth, or background drift

Design notes:

- keep contact dead simple
- this should feel crisp and intentional, not decorative

## 16. Motion System Plan

Use `anime.js` for:

- headline and paragraph reveals
- staggered section entry
- button and link hover states
- text underline growth
- lightweight scroll-triggered transitions

Use `three.js` for:

- hero signal field background
- optional project-card accent interaction
- one reusable floating motif that can appear on the about or contact section

Rules:

- no more than 1 major `three.js` scene visible at once
- default to CSS for simple transforms before reaching for JavaScript
- respect `prefers-reduced-motion`
- mobile gets a reduced scene complexity mode

## 17. Build Sequence For The Homepage

1. Define color, typography, spacing, and motion tokens.
2. Build the static homepage layout in `Next.js`.
3. Add `anime.js` choreography for hero and section reveals.
4. Build the `three.js` hero signal field as an isolated component.
5. Add project-card depth interactions.
6. Tune mobile performance and reduced-motion behavior.
7. Refine page transitions only after the core interactions feel stable.

## 18. Concrete Visual Spec

### Visual Intent

The homepage should feel like a precise personal interface, not a startup landing page and not a playful portfolio toy. The visual language should suggest technical fluency, calm confidence, and care in execution.

Keywords:

- precise
- quiet
- spatial
- engineered
- modern without looking trendy

Avoid:

- neon cyberpunk palettes
- glassmorphism-heavy UI
- generic black-and-white minimalism
- overly glossy 3D surfaces
- loud gradients that compete with the content

### Color System

Primary palette:

- Background base: near-black with a blue-green bias
- Surface base: slightly lifted charcoal
- Text primary: soft off-white
- Text secondary: muted blue-gray
- Accent: Tiffany blue

Suggested token starting points:

- `--color-bg: #0b0f10`
- `--color-surface: #12191b`
- `--color-surface-2: #182124`
- `--color-text: #ecf4f3`
- `--color-text-muted: #97a9ab`
- `--color-accent: #81d8d0`
- `--color-accent-strong: #9ceee6`
- `--color-line: rgba(129, 216, 208, 0.18)`
- `--color-glow: rgba(129, 216, 208, 0.22)`

Usage rules:

- use Tiffany blue as a controlled highlight, not as a fill color for large sections
- reserve the strongest accent for links, active states, key dividers, and 3D motion elements
- most surfaces should stay charcoal so the accent remains sharp
- body text should never be pure white

### Typography Spec

Direction:

- cleaner technical, low-friction, high-legibility
- headlines should feel engineered rather than expressive

Recommended pairing:

- Heading: `Space Grotesk`, `Sora`, or `Manrope`
- Body: `Inter`, `Instrument Sans`, or `IBM Plex Sans`

Type rules:

- hero headline should be large, compact, and tightly controlled
- use medium or semibold weight for major headings, not ultra-bold by default
- body copy should have generous line height and moderate measure
- use uppercase sparingly for labels, tags, and micro-navigation

Suggested scale:

- Hero headline: `clamp(3rem, 8vw, 6.5rem)`
- Section title: `clamp(1.5rem, 3vw, 2.5rem)`
- Body copy: `1rem` to `1.125rem`
- Meta labels: `0.75rem` to `0.85rem`

### Layout Spec

Global frame:

- max content width: `1200px` to `1280px`
- strong left-right padding that scales down cleanly on mobile
- section spacing should feel generous and architectural

Grid behavior:

- use a 12-column grid on desktop
- collapse to a simple stacked flow on mobile
- keep one dominant column for reading and one support column for metadata where useful

Surface treatment:

- hero can stay mostly open with layered background effects
- later sections should use restrained panel or card surfaces
- dividers can be thin lines or low-contrast grids rather than large blocks

### Hero Spec

Copy structure:

- line 1: your name or short self-definition
- line 2: what you build
- short supporting sentence below
- two primary actions: view projects and get in touch

Suggested visual composition:

- content aligned left or slightly inset from center
- large negative space around the text
- signal field occupying the full hero bounds behind the copy
- a small status line or current-focus note below the main intro

Example tone:

- direct
- technically literate
- not self-promotional

Hero motion:

- background signal field moves continuously at a low idle rate
- pointer movement bends or offsets nearby lines and particles
- headline reveals line-by-line with `anime.js`
- CTA buttons and metadata enter with a short stagger

Motion timing:

- headline reveal: `550ms` to `700ms`
- supporting text: `450ms`
- CTA stagger delay: `70ms` to `100ms`
- field response should feel damped, not twitchy

### Selected Work Spec

Card structure:

- project name
- one-sentence description
- one line for outcome or impact
- compact tags for stack, role, or area

Card look:

- dark elevated surface
- subtle inner line or edge highlight
- light accent glow on hover
- square or softly rounded corners, not pill-heavy

Card interaction:

- cards rise in with staggered `anime.js` transforms
- hover adds small `rotateX` and `rotateY` tilt
- border line brightens toward Tiffany blue
- if a card is featured, a lightweight animated wireframe or reflective sweep can run across it

Rules:

- keep movement within a small range
- never make cards wobble or bounce
- information density matters more than spectacle

### About Slice Spec

Structure:

- short paragraph on the left
- compact list of principles, interests, or current focus areas on the right

Visual treatment:

- use line-based separators and restrained spacing
- consider a small floating motif or orbiting shape in the margin area

Motion:

- paragraph reveals as one controlled block
- list items animate in sequence with short horizontal offsets
- small ambient object can drift slowly if it does not distract from reading

### Writing Or Notes Spec

Structure:

- section title
- 2 to 3 entries in a simple list or compact cards

Visual treatment:

- prioritize typography over boxes
- each entry can use a thin divider and a hover underline rather than heavy card chrome

Motion:

- headline underline grows on hover
- entry summaries shift a few pixels with low-amplitude motion
- section divider can animate on first appearance

### Contact Footer Spec

Structure:

- concise invitation to reach out
- contact links in one row on desktop, stacked on mobile
- optional line about availability or current interests

Visual treatment:

- minimal and crisp
- more open space than earlier sections
- light grid or signal residue in the background if needed for continuity

Motion:

- hover states only
- no dramatic footer reveal

## 19. Component-Level Animation Notes

`anime.js` components:

- `HeroHeadlineReveal`
- `HeroActionsStagger`
- `SectionInViewReveal`
- `ProjectCardHoverState`
- `WritingLinkUnderline`

`three.js` components:

- `HeroSignalField`
- optional `FloatingMotif`

Behavior notes:

- mount `three.js` only on client components that need it
- lazy-load the hero scene after first paint if the static composition already looks complete
- expose intensity settings so mobile and reduced-motion modes can use a simpler preset

## 20. Design Tokens To Define First

Color tokens:

- background
- surface
- elevated surface
- text primary
- text muted
- accent
- accent strong
- line
- glow

Spacing tokens:

- section gap
- content max width
- card padding
- hero padding top and bottom

Motion tokens:

- `--ease-standard`
- `--ease-emphasis`
- `--dur-fast`
- `--dur-base`
- `--dur-slow`
- `--stagger-step`

Radius and line tokens:

- card radius
- border opacity
- glow opacity
- grid line opacity
