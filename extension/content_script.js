chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === "getSelectedText") {
    const selectedText = getSelectedEditableText();
    sendResponse({ selectedText });
    return true;
  }

  if (request.action === "replaceSelectedText") {
    replaceSelectedEditableText(request.replacement);
  }
});

function getSelectedEditableText() {
  const activeElement = document.activeElement;
  if (!activeElement) return '';

  // Check if element is input or textarea
  if (activeElement.tagName === "TEXTAREA" || 
     (activeElement.tagName === "INPUT" && activeElement.type === "text")) {
    return activeElement.value.substring(activeElement.selectionStart, activeElement.selectionEnd);
  }

  // Check for contentEditable
  if (activeElement.isContentEditable) {
    const selection = window.getSelection();
    return selection && selection.toString();
  }

  // If not editable, return empty
  return '';
}

function replaceSelectedEditableText(replacement) {
  const activeElement = document.activeElement;
  if (!activeElement) return;

  // Handle input/textarea
  if (activeElement.tagName === "TEXTAREA" || 
     (activeElement.tagName === "INPUT" && activeElement.type === "text")) {
    const start = activeElement.selectionStart;
    const end = activeElement.selectionEnd;
    activeElement.setRangeText(replacement);
    // Move caret to the end of the inserted text
    activeElement.selectionStart = activeElement.selectionEnd = start + replacement.length;
    return;
  }

  // Handle contentEditable elements
  if (activeElement.isContentEditable) {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(replacement));

    // Remove selection to avoid confusion
    selection.removeAllRanges();
    return;
  }
}

