import * as vscode from 'vscode';

const VALID_PERCENTAGES = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const DEFAULT_PERCENTAGE = 50;

function getScrollPercentage(): number {
    const config = vscode.workspace.getConfiguration('partialPageScroll');
    const percent = config.get<number>('scrollPercentage', DEFAULT_PERCENTAGE);
    if (VALID_PERCENTAGES.includes(percent)) {
        return percent;
    }
    // Fall back gracefully if someone hand-edits settings.json with an out-of-range value.
    return Math.min(100, Math.max(10, Math.round(percent / 10) * 10)) || DEFAULT_PERCENTAGE;
}

function getVisibleLineCount(editor: vscode.TextEditor): number {
    let count = 0;
    for (const range of editor.visibleRanges) {
        count += range.end.line - range.start.line + 1;
    }
    return count > 0 ? count : 1;
}

function scroll(to: 'up' | 'down'): void {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    const percent = getScrollPercentage();
    const visibleLines = getVisibleLineCount(editor);
    const delta = Math.max(1, Math.round((visibleLines * percent) / 100));

    const currentLine = editor.selection.active.line;
    const targetLine = to === 'down'
        ? Math.min(editor.document.lineCount - 1, currentLine + delta)
        : Math.max(0, currentLine - delta);

    const targetLineRange = editor.document.lineAt(targetLine).range;
    const targetColumn = Math.min(editor.selection.active.character, targetLineRange.end.character);
    const targetPosition = new vscode.Position(targetLine, targetColumn);

    editor.selection = new vscode.Selection(targetPosition, targetPosition);
    editor.revealRange(new vscode.Range(targetPosition, targetPosition), vscode.TextEditorRevealType.InCenter);
}

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('partialPageScroll.pageDown', () => scroll('down')),
        vscode.commands.registerCommand('partialPageScroll.pageUp', () => scroll('up'))
    );
}

export function deactivate() {}
