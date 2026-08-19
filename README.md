# Partial Page Scroll

A VS Code extension that replaces the default full-page `Page Up`/`Page Down` behavior with a scroll of a configurable percentage of the visible editor — 50% by default, so a page press moves you half a screen instead of a whole one.

## Features

- **Percentage-based scrolling** — `Page Up`/`Page Down` move the cursor by a percentage of the currently visible lines rather than a full page.
- **Configurable amount** — set the percentage in 10% steps from 10% to 100% (100% matches the original full-page behavior).
- **Cursor recentered** — after each press, the cursor's new line is scrolled to the vertical center of the editor, instead of landing at the very top or bottom edge.
- **Rebindable keys** — bound to `Page Up`/`Page Down` by default, like any other VS Code shortcut you can change it from the Keyboard Shortcuts editor.

## Usage

Press `Page Up` / `Page Down` in the editor as usual — the cursor moves by the configured percentage of the visible lines instead of a full page, and the view is recentered around it.

## Extension Settings

| Setting | Description | Default |
|---|---|---|
| `partialPageScroll.scrollPercentage` | Percentage of the visible editor height to scroll (10–100, in steps of 10) | `50` |

## Changing the keybinding

The default keys are `Page Up` and `Page Down`. To use different keys, open **Preferences: Open Keyboard Shortcuts** (`Ctrl+K Ctrl+S`), search for **Partial Page Scroll**, and rebind `partialPageScroll.pageUp` / `partialPageScroll.pageDown` like any other command.

## Requirements

None.

## Installation

Not yet published on the VS Code Marketplace. To build and run it from source:

```bash
git clone https://github.com/katalog/vscode-partial-page-scroll.git
cd vscode-partial-page-scroll
npm install
npm run compile
```

Then open the folder in VS Code and press `F5` to launch an Extension Development Host with the extension active, or package it yourself with [`vsce`](https://github.com/microsoft/vscode-vsce) and install the resulting `.vsix` via **Extensions: Install from VSIX...**.

## Release Notes

### 1.0.1

Cursor now recenters vertically after each Page Up/Page Down instead of landing at the edge of the viewport.

### 1.0.0

Initial release: configurable percentage-based Page Up/Page Down scrolling.

## License

See [LICENSE](LICENSE).
