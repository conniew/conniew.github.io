// Update word of the moment.

// [private] List of favorite words
var _words = [
  'aftermath',
  'arcane',
  'awl',
  'axiom',
  'blight',
  'blubber',
  'blurt',
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
  'enshrine',
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
  'paradigm',
  'penchant',
  'permanence',
  'phenotype',
  'phlegm',
  'porcine',
  'preen',
  'progeny',
  'purge',
  'pyre',
  'quandary',
  'quaver',
  'quay',
  'rheumatism',
  'rhythm',
  'schism',
  'seizure',
  'sentinel',
  'sinister',
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
