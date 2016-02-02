// Update word of the moment.

// [private] List of favorite words
var _words = [
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

// [private] Get the next random word
function _getWord() {
  var index = Math.floor(Math.random() * _words.length);
  return _words[index];
}

// Update the word of the moment.
function updateWord() {
  var wordContainer = document.querySelector('#word a');
  if (wordContainer)
    wordContainer.innerHTML = _getWord();
}
