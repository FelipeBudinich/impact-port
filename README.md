# impact-port

Port of the Impact engine and bundled examples, with docs mirrored into Markdown for easier maintenance and GitHub browsing.

## Project Structure

- [`impact/`](impact/) - core engine and Weltmeister assets
- [`examples/`](examples/) - sample projects (`drop`, `jumpnrun`, `physics`)
- [`impact-docs/`](impact-docs/) - original documentation sources plus Markdown copies

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

- Original HTML docs are preserved.
- Markdown files in `impact-docs/` are generated from `documentation*.html`.
- Regenerate Markdown docs with:

```bash
python3 scripts/convert_impact_docs_to_md.py
```
