#!/usr/bin/env python3
from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
DOCS_DIR = ROOT / "impact-docs"


def clean_ws(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


class HtmlToMarkdown(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.out: list[str] = []
        self.stack: list[str] = []
        self.list_stack: list[str] = []
        self.href_stack: list[str] = []
        self.in_code = False
        self.capture = False
        self.capture_depth = 0

    def write(self, text: str) -> None:
        self.out.append(text)

    def handle_starttag(self, tag: str, attrs):
        attrs_d = dict(attrs)

        if tag == "div" and attrs_d.get("id") == "content":
            self.capture = True
            self.capture_depth = 1
            return

        if not self.capture:
            return

        self.capture_depth += 1
        self.stack.append(tag)

        if tag in {"h1", "h2", "h3", "h4", "h5", "h6"}:
            level = int(tag[1])
            self.write("\n" + ("#" * level) + " ")
        elif tag == "p":
            self.write("\n\n")
        elif tag == "br":
            self.write("\n")
        elif tag == "ul":
            self.list_stack.append("ul")
            self.write("\n")
        elif tag == "ol":
            self.list_stack.append("ol")
            self.write("\n")
        elif tag == "li":
            indent = "  " * max(0, len(self.list_stack) - 1)
            bullet = "- " if (self.list_stack and self.list_stack[-1] == "ul") else "1. "
            self.write(f"\n{indent}{bullet}")
        elif tag == "pre":
            self.in_code = True
            self.write("\n\n```\n")
        elif tag == "code":
            if not self.in_code:
                self.write("`")
        elif tag in {"strong", "b"}:
            self.write("**")
        elif tag in {"em", "i"}:
            self.write("*")
        elif tag == "a":
            self.href_stack.append(attrs_d.get("href", ""))
            self.write("[")

    def handle_endtag(self, tag: str):
        if self.capture and tag == "div":
            self.capture_depth -= 1
            if self.capture_depth == 0:
                self.capture = False
            return

        if not self.capture:
            return

        if tag in self.stack:
            for i in range(len(self.stack) - 1, -1, -1):
                if self.stack[i] == tag:
                    self.stack.pop(i)
                    break

        self.capture_depth -= 1

        if tag in {"h1", "h2", "h3", "h4", "h5", "h6"}:
            self.write("\n")
        elif tag == "p":
            self.write("\n")
        elif tag in {"ul", "ol"}:
            if self.list_stack:
                self.list_stack.pop()
            self.write("\n")
        elif tag == "pre":
            self.in_code = False
            self.write("\n```\n")
        elif tag == "code":
            if not self.in_code:
                self.write("`")
        elif tag in {"strong", "b"}:
            self.write("**")
        elif tag in {"em", "i"}:
            self.write("*")
        elif tag == "a":
            href = self.href_stack.pop() if self.href_stack else ""
            self.write(f"]({href})")

    def handle_data(self, data: str):
        if not self.capture:
            return
        if self.in_code:
            self.write(data)
        else:
            text = clean_ws(data)
            if text:
                self.write(text + " ")


def postprocess(md: str) -> str:
    md = re.sub(r"[ \t]+\n", "\n", md)
    md = re.sub(r"\n{3,}", "\n\n", md)
    md = re.sub(r" +", " ", md)
    md = re.sub(r"\[([^\]]*?)\s+\]\(", r"[\1](", md)
    md = re.sub(r"\)([A-Za-z0-9])", r") \1", md)
    md = re.sub(r"\)-", ") -", md)
    md = re.sub(r"\((documentation[^)#]+?)\.html(#.*?)\)", r"(\1.md\2)", md)
    md = re.sub(r"\((documentation[^)]+?)\.html\)", r"(\1.md)", md)
    return md.strip() + "\n"


def title_from_filename(path: Path) -> str:
    name = path.stem
    if name == "documentation":
        return "Documentation"
    label = name.removeprefix("documentation-").replace("-", " ").title()
    return label


def convert_file(path: Path) -> Path:
    parser = HtmlToMarkdown()
    parser.feed(path.read_text(encoding="utf-8", errors="ignore"))
    body = postprocess("".join(parser.out))

    title = title_from_filename(path)
    header = f"# {title}\n\n"
    md_path = path.with_suffix(".md")
    md_path.write_text(header + body, encoding="utf-8")
    return md_path


def main() -> None:
    html_files = sorted(DOCS_DIR.glob("documentation*.html"))
    converted = [convert_file(p) for p in html_files]

    lines = ["# Impact Docs (Markdown)", "", "Converted from the original HTML docs for easier editing and linking.", "", "## Pages", ""]
    for md in converted:
        rel = md.relative_to(DOCS_DIR)
        title = title_from_filename(md)
        lines.append(f"- [{title}]({rel.as_posix()})")

    (DOCS_DIR / "README.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
