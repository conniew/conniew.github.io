function setControls() {
  // TODO: update this based on page, probably requires page# metadata
  document.querySelector('.control.prev').disabled = true;
  document.querySelector('.control.next').disabled = true;
}

function updateControls() {
  var expandControl = document.querySelector('.control.expand');
  var collapseControl = document.querySelector('.control.collapse');
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

function toggleTheme() {
  if (document.body.classList.contains('dark')) {
    document.body.classList.remove('dark');
    document.querySelector('.control.theme').title = 'Dark Theme';
    document.cookie = 'theme=light; path=/';
  }
  else {
    document.body.classList.add('dark');
    document.querySelector('.control.theme').title = 'Light Theme';
    document.cookie = 'theme=dark; path=/';
  }
}

function setTheme() {
  var themeToggleBtn = document.querySelector('.control.theme');

  if (document.cookie.indexOf('theme=dark') >= 0) {
    document.body.classList.add('dark');
    if (themeToggleBtn) themeToggleBtn.title = 'Light Theme';
  }
  else {
    document.cookie = 'theme=light; path=/';
    if (document.cookie.indexOf('theme') < 0) { // cookies are disabled
      if (document.querySelector('.control.theme'))
      if (themeToggleBtn) {
        themeToggleBtn.disabled = true;
        themeToggleBtn.title = "Enable cookies to change theme"
      }
    }
  }
}

function loadImages(container) {
  var deferredImgs = container.getElementsByTagName('img');
  for (var i = 0; i < deferredImgs.length; i++) {
    var original = deferredImgs[i];
    var src = original.getAttribute('data-src');

    if (src) {
      var actual = document.createElement('img');

      actual.onload = function() {
        if (original.classList.contains('small'))
          actual.width *= 0.3;
        else
          actual.width *= 0.5;

        original.parent.replaceChild(actual, original);
      }

      actual.src = src;
    }
  }
}

function smoothScroll(container, y1, y2, t) {
  if (t > 20) return;
  container.scrollTop = y1 + t*(y2 - y1)/20;
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
  if (!preview.classList.contains('active') && scroll) {
    scrollToElement(preview);
    loadImages(preview);
  }
  preview.classList.toggle('active');
  preview.querySelector('.body').style.top =
    preview.querySelector('.heading').offsetHeight + 'px';
  updateControls();
}

function rigPreviews() {
  var previews = document.querySelectorAll('.preview');

  for (var i = 0; i < previews.length; i++) {
    // Preview: Allow ENTER on focus to expand/collapse, ESC to collapse
    previews[i].onkeydown = function(event) {
      if (event.keyCode == 13) // ENTER was pressed
        togglePreview(event.target, true);
      else if (event.target.classList.contains('active') && event.keyCode == 27) // ESC was pressed
        togglePreview(event.target);
    };

    // Heading: Allow click in heading to expand/collapse
    previews[i].firstElementChild.onclick =
      function(event) { togglePreview(event.target.parentNode, true); };

    // Content: Allow scrolling within content
    previews[i].querySelector('.content').onkeydown = function(event) {
      if (event.keyCode == 38 || event.keyCode == 40) // UP or DOWN was pressed
        event.stopPropagation();
    };
  }
}

function highlightNextPreview(reverse) {
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

function handleKeyboardShortcut(event) {
  if (event.keyCode == 38) {  // UP
    event.preventDefault();  // Prevent scrolling of the page
    highlightNextPreview(true);
  }
  else if (event.keyCode == 40) {  // DOWN
    event.preventDefault();  // Prevent scrolling of the page
    highlightNextPreview();
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

var words = [
  'aftermath',
  'arcane',
  'awl',
  'blight',
  'blubber',
  'cacophany',
  'capricious',
  'caterwaul',
  'contagion',
  'corona',
  'croon',
  'cypress',
  'deuteron',
  'devolve',
  'dichotomy',
  'echelon',
  'embroidery',
  'enigma',
  'encroach',
  'engorged',
  'eucalyptus',
  'euphoria',
  'extricate',
  'fallout',
  'formulaic',
  'friction',
  'gall',
  'ganglion',
  'gaudy',
  'haploid',
  'inter',
  'interim',
  'irk',
  'kayak',
  'kumquat',
  'kvetch',
  'lyse',
  'memo',
  'monogram',
  'nuance',
  'onomatopoeia',
  'orchestrate',
  'pantomime',
  'penchant',
  'permanence',
  'phenotype',
  'porcine',
  'preen',
  'progeny',
  'pyre',
  'quandary',
  'quaver',
  'quay',
  'rheumatism',
  'schism',
  'seizure',
  'sentinel',
  'spatula',
  'susurrus',
  'syndrome',
  'synecdoche',
  'synonym',
  'syzygy',
  'torrid',
  'utopia',
  'vie',
  'witticism',
  'wry'
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
  setTheme();
  rigPreviews();
  setControls();
  updateControls();

  document.body.onkeydown = function(event) { handleKeyboardShortcut(event); };
}

function loadOverviewPage() {
  setTheme();
  updateWord();
}
