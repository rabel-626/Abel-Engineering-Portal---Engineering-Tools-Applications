# Abel Engineering — Engineering Tools & Applications

A centralized GitHub Pages portal for Abel Engineering browser-based engineering utilities.

The portal provides a single professional landing page for opening published tools, navigating to their source repositories, searching the current tool library, and presenting a consistent Abel Engineering identity across the project suite.

## Portal

When this repository is published as the `rabel-626.github.io` GitHub Pages user site, the portal is available at:

**https://rabel-626.github.io/**

## Current Applications

| Application | Purpose | Status |
| --- | --- | --- |
| [Downtime Tracker](https://rabel-626.github.io/Downtime-Tracker/) | Capture, categorize, and review production downtime events. | Active |
| [Cycle Time & Labor Study](https://rabel-626.github.io/Cycle-Time-Labor-Study/) | Collect cycle-time and labor-study observations for production analysis. | Active |
| [Multi-Study Downtime Totalizer](https://rabel-626.github.io/Downtime-Tracker-Multi-Study-Totalizer/) | Aggregate downtime information from multiple studies for consolidated analysis. | Beta |
| [Material Flow & Takt Planner](https://rabel-626.github.io/Material-Flow-Takt-Planner/) | Evaluate material flow and takt-based production planning requirements. | Active |

Each application card provides both an **Open Tool** link and a direct **Repository** link.

## Features

- Abel Engineering dark / purple visual standard
- Centralized navigation for published engineering tools
- Responsive desktop and mobile layout
- Search across tool names, descriptions, categories, status, and tags
- Category filtering
- Status filtering
- A–Z and Z–A sorting
- Direct GitHub repository access
- Abel Engineering About section
- Browser favicon and Apple touch icon
- No build process, package manager, or external JavaScript framework required

## Repository Structure

```text
rabel-626.github.io/
├── index.html
├── favicon.ico
├── README.md
└── assets/
    ├── abel-engineering-logo.jpg
    ├── apple-touch-icon.png
    ├── favicon-16.png
    ├── favicon-32.png
    ├── favicon-48.png
    ├── favicon-192.png
    └── favicon-512.png
```

## Publishing with GitHub Pages

The recommended repository name is:

```text
rabel-626.github.io
```

For a GitHub user site, place the portal files in the root of that repository.

In GitHub:

1. Open the repository.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select the branch containing the site, normally `main`.
5. Select `/ (root)`.
6. Save.

GitHub Pages will publish the portal at:

```text
https://rabel-626.github.io/
```

## Adding a New Engineering Tool

The application cards are data-driven. Open `index.html` and locate:

```js
const projects = [
```

Add a new project object:

```js
{
  name: "New Tool",
  category: "Engineering",
  status: "Active",
  icon: "🛠",
  description: "Short description of what the tool does.",
  tags: ["Utility", "Analysis"],
  app: "https://rabel-626.github.io/New-Tool/",
  github: "https://github.com/rabel-626/New-Tool"
}
```

The portal automatically incorporates the new entry into:

- the application grid
- search results
- category filtering
- status filtering
- sorting
- the published-tool count

No additional card markup is required.

## Recommended Status Conventions

For consistency across the tool suite:

| Status | Suggested Meaning |
| --- | --- |
| **Active** | Current tool intended for regular use. |
| **Beta** | Functional tool still receiving significant testing or refinement. |
| **Published** | Released utility that may not require active development. |

These conventions can be changed in `index.html` if a different release model is preferred.

## Abel Engineering Visual Standard

The portal establishes a reusable design language for the wider Abel Engineering tool suite:

- near-black / charcoal application background
- purple as the primary brand accent
- white primary typography
- muted gray supporting typography
- subtle circuit-board motifs
- purple bordered panels and application cards
- consistent button hierarchy
- Abel Engineering gear / lightning identity
- compact, technical, production-oriented presentation

Using the same header, color variables, spacing, and component styling in the individual tools will make transitions between applications feel like one cohesive software suite.

## Favicon

The browser icon is derived from the purple Abel Engineering gear / lightning mark.

Provided favicon assets include:

- `favicon.ico`
- `assets/favicon-16.png`
- `assets/favicon-32.png`
- `assets/favicon-48.png`
- `assets/favicon-192.png`
- `assets/favicon-512.png`
- `assets/apple-touch-icon.png`

The required `<link>` declarations are already included in `index.html`.

## Customization

The primary theme values are defined near the top of `index.html`:

```css
:root {
  --bg: #07080d;
  --purple: #8b5cf6;
  --purple-2: #a970ff;
  --purple-3: #c49dff;
}
```

Changing these values updates the main interface theme without needing to restyle individual components.

## Design Philosophy

The portal is intentionally kept as a static HTML/CSS/JavaScript project. This provides several practical benefits:

- easy deployment through GitHub Pages
- no server dependency
- no framework upgrade requirements
- simple version control
- straightforward portability
- easy review of changes
- minimal maintenance burden

## About Abel Engineering

Abel Engineering is a growing collection of browser-based engineering utilities intended to support real production and industrial-engineering workflows. The current applications focus on production studies, downtime analysis, cycle-time and labor evaluation, takt planning, and material flow.

The portal is designed to provide a single, consistent entry point as the suite expands.

---

**Abel Engineering**  
Engineering Tools & Applications
