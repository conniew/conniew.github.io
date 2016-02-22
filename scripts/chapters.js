// In-page chapter viewer.
// Must be preceded by:
//   <div class="chapters">
//     <div class="chapter">
//       ...
//     </div>
//     .
//     .
//     .
//     <div class="chapter">
//       ...
//     </div>
//   </div>

// [private] Get all chapters
function _getChapters(chaptersContainer) {
  return chaptersContainer.previousElementSibling.querySelectorAll('.chapter');
}

// [private] Get the current chapter number
function _getChapterNo(chaptersContainer) {
  var chaptersInput = chaptersContainer.querySelector('.chapters-input');

  return +chaptersInput.value - 1;
}

// [private] Update the disabled states of the next/prev page buttons
function _updatePageButtons(chaptersContainer) {
  var nextButton = chaptersContainer.querySelector('.next-page');
  var prevButton = chaptersContainer.querySelector('.prev-page');

  var currChapter = _getChapterNo(chaptersContainer);

  prevButton.disabled = (currChapter == 0);
  nextButton.disabled = (currChapter >= _getChapters(chaptersContainer).length - 1);
}

// Handle keyboard shortcuts for chapters view
function handleChaptersKeypress(title, event) {
  var chaptersContainer = document.querySelector('#chapters-' + title);

  var nextButton = chaptersContainer.querySelector('.next-page');
  var prevButton = chaptersContainer.querySelector('.prev-page');

  if (event.keyCode == 37 && !prevButton.disabled) { // LEFT ARROW
    setChapter(title, 'prev');
  }
  else if (event.keyCode == 39 && !nextButton.disabled) { // RIGHT ARROW
    setChapter(title, 'next');
  }
}

// Set the current chapter to the given chapter
function setChapter(title, chapterNo) {
  var chaptersContainer = document.querySelector('#chapters-' + title);
  var chapters = _getChapters(chaptersContainer);
  var currChapter = _getChapterNo(chaptersContainer);

  if      (chapterNo == 'prev') chapterNo = currChapter - 1;
  else if (chapterNo == 'next') chapterNo = currChapter + 1;

  else if (!chapterNo || chapterNo < 0)  chapterNo = 0;
  else if (chapterNo >= chapters.length) chapterNo = chapters.length - 1;

  var chaptersInput = chaptersContainer.querySelector('.chapters-input');
  var chaptersContent = chaptersContainer.querySelector('.chapters-content');

  chaptersInput.value = chapterNo + 1;
  chaptersContent.innerHTML = chapters[chapterNo].innerHTML;

  _updatePageButtons(chaptersContainer);
}

// Initialize the chapters view
function initChapters(title) {
  var chaptersContainer = document.querySelector('#chapters-' + title);

  chaptersContainer.querySelector('.chapters-total').innerHTML =
      _getChapters(chaptersContainer).length;

  chaptersContainer.parentNode.style.overflowY = 'hidden';

  setChapter(title, 0);
}
