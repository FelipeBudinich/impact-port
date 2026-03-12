# impact-port

Port of the Impact engine and bundled examples, with docs maintained in Markdown for easier maintenance and GitHub browsing.

## Run Locally

```bash
npm install
npm start
```

Server binds to `PORT` (defaults to `3000` locally).

## Project Structure

- [`impact/`](impact/) - core engine and Weltmeister assets
- [`examples/`](examples/) - sample projects (`drop`, `jumpnrun`, `physics`)
- [`impact-docs/`](impact-docs/) - Markdown documentation

## Documentation

- [Docs Index (Markdown)](impact-docs/README.md)
- [Getting Started](impact-docs/documentation-getting-started.md)
- [Weltmeister](impact-docs/documentation-weltmeister.md)
- [Working with Assets](impact-docs/documentation-working-with-assets.md)
- [Collision](impact-docs/documentation-collision.md)
- [Animations](impact-docs/documentation-animations.md)
- [Debug](impact-docs/documentation-debug.md)
- [Baking](impact-docs/documentation-baking.md)
- [Class Reference](impact-docs/documentation-class-reference.md)

## Notes

- Documentation is maintained directly in Markdown under `impact-docs/`.
- `server.js` is a minimal Express host suitable for Heroku-style deployment.
