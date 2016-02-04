// Init and update previews
// [requires: images.js]

// [private] Update the control disabled states
function _updateControls() {
  var expandControl = document.querySelector('.control.expand');
  var collapseControl = document.querySelector('.control.collapse');
  var prevControl = document.querySelector('.control.prev');
  var nextControl = document.querySelector('.control.next');

  expandControl.disabled = !document.querySelector('.preview:not(.active)');
  collapseControl.disabled = !document.querySelector('.preview.active');

  // TODO: update this based on page, probably requires page# metadata
  prevControl.disabled = true;
  nextControl.disabled = true;
}

// [private] Scroll incrementally
function _smoothScroll(container, y1, y2, t) {
  if (t > 20) return;
  container.scrollTop = y1 + t*(y2 - y1)/20;
  setTimeout(function() {
    _smoothScroll(container, y1, y2, ++t);
  }, 10);
}

// [private] Smooth scroll to a target
function _scrollToElement(target) {
  var container = target.parentNode;

  var startY = container.scrollTop;
  var endY = target.offsetTop;

  _smoothScroll(container, startY, endY, 0);
}

// [private]
function _togglePreview(preview, scroll) {
  if (!preview.classList.contains('active'))
    expandPreview(preview, scroll);
  else
    collapsePreview(preview);
}

// Expand a preview
function expandPreview(preview, scroll) {
  loadImages(preview);

  preview.classList.add('active');
  preview.querySelector('.body').style.top =
    preview.querySelector('.heading').offsetHeight + 'px';

  if (scroll) _scrollToElement(preview);
  _updateControls();
}

// Collapse a preview
function collapsePreview(preview) {
  preview.classList.remove('active');
  preview.querySelector('.body').style.top =
    preview.querySelector('.heading').offsetHeight + 'px';
  _updateControls();
}

// Initialize preview behavior
function initPreviews() {
  _updateControls();

  var previews = document.querySelectorAll('.preview');

  for (var i = 0; i < previews.length; i++) {
    // Preview: Allow ENTER on focus to expand/collapse, ESC to collapse
    previews[i].onkeydown = function(event) {
      if (event.keyCode == 13) // ENTER was pressed
        _togglePreview(event.target, true);
      else if (event.keyCode == 27) // ESC was pressed
        collapsePreview(event.target);
    };

    // Heading: Allow click in heading to expand/collapse
    previews[i].firstElementChild.onclick =
      function(event) { _togglePreview(event.target.parentNode, true); };

    // Content: Allow scrolling within content
    previews[i].querySelector('.content').onkeydown = function(event) {
      if (event.keyCode == 38 || event.keyCode == 40) // UP or DOWN was pressed
        event.stopPropagation();
    };
  }
}
