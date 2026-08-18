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

async function scroll(to: 'up' | 'down'): Promise<void> {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    const percent = getScrollPercentage();
    const visibleLines = getVisibleLineCount(editor);
    const value = Math.max(1, Math.round((visibleLines * percent) / 100));

    await vscode.commands.executeCommand('editorScroll', {
        to,
        by: 'line',
        value,
        revealCursor: true,
    });
}

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('partialPageScroll.pageDown', () => scroll('down')),
        vscode.commands.registerCommand('partialPageScroll.pageUp', () => scroll('up'))
    );
}

export function deactivate() {}
