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
  if (document.cookie.indexOf('theme=dark') >= 0) {
    document.body.classList.add('dark');
    document.querySelector('.control.theme').title = 'Light Theme';
  }
  else {
    document.cookie = 'theme=light; path=/';
    if (document.cookie.indexOf('theme') < 0) { // cookies are disabled
      document.querySelector('.control.theme').disabled = true;
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
}

function loadOverviewPage() {
  setTheme();
  updateWord();
}
