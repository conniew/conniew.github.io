// Set global keyboard shortcuts
// [requires: controls.js]

// [private] Highlight (focus on) the next preview, with wrapping
function _highlightNextPreview(reverse) {
  var next = null;

  if (document.activeElement.classList.contains('preview')) {
    var curr = document.activeElement;

    if (!reverse) next = curr.nextElementSibling;
    else          next = curr.previousElementSibling;
  }

  if (!next) {
    var previewContainer = document.body.querySelector('#content');

    if (!reverse) next = previewContainer.firstElementChild;
    else          next = previewContainer.lastElementChild;
  }

  next.focus();
};

// [private] Process keyboard events
function _handleKeyboardShortcut(event) {
  // Ignore all if CTRL is modifying
  if (event.ctrlKey) return;

  if (event.keyCode == 38) {  // UP
    event.preventDefault();  // Prevent scrolling of the page
    _highlightNextPreview(true);
  }
  else if (event.keyCode == 40) {  // DOWN
    event.preventDefault();  // Prevent scrolling of the page
    _highlightNextPreview();
  }
  else if (event.keyCode == 188) {  // COMMA (left angle bracket)
    // TODO: Make this go to the previous page.
  }
  else if (event.keyCode == 190) {  // PERIOD (right angle bracket)
    // TODO: Make this go to the next page.
  }
  else if (event.keyCode == 173 || event.keyCode == 189) {  // DASH (minus)
    collapseAll();
  }
  else if (event.keyCode == 61 || event.keyCode == 187) {  // EQUALS (plus)
    expandAll();
  }
};

// Init global keyboard shortcuts
function initKeyboardShortcuts() {
  document.body.onkeydown = function(event) { _handleKeyboardShortcut(event); };
};
