var expandControl = document.querySelector('.control.expand');
var collapseControl = document.querySelector('.control.collapse');

function setControls() {
  document.querySelector('#controls').style.width =
      document.querySelector('#content').clientWidth + 'px';

  // TODO: update this based on page, probably requires page# metadata
  document.querySelector('.control.prev').disabled = true;
  document.querySelector('.control.next').disabled = true;
}

function updateControls() {
  expandControl.disabled = !document.querySelector('.preview:not(.active)');
  collapseControl.disabled = !document.querySelector('.preview.active');
}

function expandAll() {
  var collapsedPreviews = document.querySelectorAll('.preview:not(.active)');
  for (var i = 0; i < collapsedPreviews.length; i++) {
    togglePreview(collapsedPreviews[i], false);
  }
}

function collapseAll() {
  var expandedPreviews = document.querySelectorAll('.preview.active');
  for (var i = 0; i < expandedPreviews.length; i++) {
    togglePreview(expandedPreviews[i], false);
  }
}

function smoothScroll(container, y1, y2, t) {
  if (t > 30) return;
  container.scrollTop = y1 + t*(y2 - y1)/30;
  setTimeout(function() {
    smoothScroll(container, y1, y2, ++t);
  }, 10);
}

function scrollToElement(target) {
  var container = target.parentNode;

  var startY = container.scrollTop;
  var endY = target.offsetTop;

  smoothScroll(container, startY, endY, 0);
}

function togglePreview(preview, scroll) {
  if (!preview.classList.contains('active') && scroll)
    scrollToElement(preview);
  preview.classList.toggle('active');
  preview.querySelector('.body').style.top =
    preview.querySelector('.heading').offsetHeight + 'px';
  updateControls();
}

function rigPreviews() {
  var headings = document.querySelectorAll('.preview .heading');
  for (var i = 0; i < headings.length; i++) {
    headings[i].onclick = function(event) { togglePreview(event.target.parentNode, true); };
  }
}

var words = [
  'aftermath',
  'arcane',
  'cacophany',
  'capricious',
  'deuteron',
  'echelon',
  'enigma',
  'encroach',
  'extricate',
  'formulaic',
  'friction',
  'gall',
  'inter',
  'kayak',
  'memo',
  'monogram',
  'orchestrate',
  'pantomime',
  'penchant',
  'permanence',
  'porcine',
  'progeny',
  'sentinel',
  'spatula',
  'synonym',
  'syzygy'
];

function getWord() {
  var index = Math.floor(Math.random() * words.length);
  return words[index];
}

function updateWord() {
  var wordContainer = document.querySelector('#word a');
  if (wordContainer)
    wordContainer.innerHTML = getWord();
}

function loadCollectionPage() {
  rigPreviews();
  setControls();
  updateControls();
}

function loadOverviewPage() {
  updateWord();
}
