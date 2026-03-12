# Project Structure (Current)

Last updated: 2026-03-12

## Top-Level Overview

```text
impact-port/
├── package.json
├── Procfile
├── server.js
├── README.md
├── PROJECT_STRUCTURE.md
├── .gitignore
├── examples/
│   ├── drop/
│   ├── jumpnrun/
│   └── physics/
├── impact/
├── impact-docs/
├── port/        (currently empty)
└── scripts/     (currently empty)
```

## Directory Details

- `examples/`
  - Contains three complete sample games: `drop`, `jumpnrun`, and `physics`.
  - Each sample includes its own `lib/`, `media/`, and `tools/` folders, plus entry pages (`index*.html`) and `weltmeister.html`.

- `impact/`
  - Main engine package.
  - Key contents:
    - `index.html` and `weltmeister.html` entry pages.
    - `lib/impact/` for core engine modules.
    - `lib/weltmeister/` for level editor code and PHP API files.
    - `lib/game/main.js` as the game entry module.
    - `media/` and `tools/` utility/resources folders.

- `impact-docs/`
  - Markdown documentation set for the project.
  - `README.md` acts as the docs index.
  - Main content is in `documentation*.md` files (getting started, class reference, collision, assets, etc.).
  - Includes supporting assets in `media/` and `font-tool/get_fonts.swf`.

- `port/`
  - Present but currently empty.
  - Can be used for migration/porting work if needed.

- `scripts/`
  - Present but currently empty.
  - Reserved for helper tooling/automation scripts.

## Root Files

- `package.json`: Node app manifest with `start` script and runtime metadata.
- `Procfile`: Heroku process declaration (`web: npm start`).
- `server.js`: Express server that hosts docs, engine pages, and examples.
- `README.md`: GitHub landing page with links to main docs.
- `.gitignore`: Node.js-oriented ignore rules plus common OS/editor artifacts.
- `PROJECT_STRUCTURE.md`: this structure reference.
