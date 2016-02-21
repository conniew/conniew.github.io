// Book page archetype

var leftPageNo;
var rightPageNo;
var maxPageNo;

var leftPageImg = document.querySelector('#page-left img');
var rightPageImg = document.querySelector('#page-right img');

var transitionPageImg = document.querySelector('#page-transition img');

var bookPath;

// [private] Get the page from the URL
function _getUrlPage() {
  var params = window.location.search.substring(1).split('&');
  for (var i = 0; i < params.length; i++) {
    var keyValue = params[i].split("=");
    if (keyValue[0] == 'page') return +keyValue[1];
  }
  return 0;
}

// [private] Set the page parameter in the URL (causes reload)
function _updateUrlPage() {
  var oldParams = window.location.search
  var params = oldParams.substring(1).split('&');
  for (var i = 0; i < params.length; i++) {
    var keyValue = params[i].split("=");
    if (keyValue[0] == 'page') {
      window.location.search = oldParams.replace(
          (i ? '&' : '?') + params[i],
          (i ? '&' : '?') + 'page=' + ((leftPageNo < 0) ? 0 : leftPageNo));
      return;
    }
  }
  window.location.search = oldParams.concat(
      (oldParams ? '' : '?') +
      (params[0] ? '&' : '') +
      'page=' +
      ((leftPageNo < 0) ? 0 : leftPageNo));
}

// [private] Get the slider page
function _getSliderPage() {
  return +document.querySelector('#book-slider').value;
}

// [private] Set the slider to the page number
function _updateSliderPage() {
  document.querySelector('#book-slider').value = leftPageNo;
}

// [private] Update the disabled states of the next/prev page buttons
function _updatePageButtons() {
  var nextButton = document.querySelector('.next-page');
  var prevButton = document.querySelector('.prev-page');

  prevButton.disabled = (leftPageNo == -1);
  nextButton.disabled = (rightPageNo >= maxPageNo);
}

// [private] Handle keyboard shortcuts for book archetype
function _handleBookKeypress(event) {
  var nextButton = document.querySelector('.next-page');
  var prevButton = document.querySelector('.prev-page');

  if (event.keyCode == 37 && !prevButton.disabled) { // LEFT ARROW
    turnPageLeft();
  }
  else if (event.keyCode == 39 && !nextButton.disabled) { // RIGHT ARROW
    turnPageRight();
  }
}

// [private] Set the book to the given page
function _setPage(page) {
  if (!page || page < 0 || page > maxPageNo) {
    leftPageNo = -1;
    rightPageNo = 0;
  }
  else {
    if (page % 2 == 0) {
      leftPageNo = page - 1;
      rightPageNo = page;
    }
    else {
      leftPageNo = page;
      rightPageNo = page + 1;
    }
  }

  leftPageImg.src = (leftPageNo > 0) ?
      bookPath + leftPageNo + '.png' : '../deferred.png';
  rightPageImg.src = (rightPageNo <= maxPageNo) ?
      bookPath + rightPageNo + '.png' : '../deferred.png';

  _updatePageButtons();
  _updateSliderPage();
}

// Turn the page to the right
function turnPageRight() {
  leftPageNo += 2;
  rightPageNo += 2;
  _updateUrlPage(); /* Causes init, and therefore _setPage() */
}

// Turn the page to the left
function turnPageLeft() {
  leftPageNo -= 2;
  rightPageNo -= 2;
  _updateUrlPage(); /* Causes init, and therefore _setPage() */
}

// Turn page to the slider page
function turnPageSlider() {
  leftPageNo = _getSliderPage();
  rightPageNo = leftPageNo + 1;
  _updateUrlPage(); /* Causes init, and therefore _setPage() */
}

// View the page while sliding
function viewPageSlider() {
  _setPage(_getSliderPage());
}

// Initialize a book with the specified pages
function initBook(path, file, pages) {
  maxPageNo = +pages;
  bookPath = '../' + path + '/' + file + '-';

  _setPage(_getUrlPage());

  document.body.onkeydown = function(event) { _handleBookKeypress(event); }
}
