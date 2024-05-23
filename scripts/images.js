// Overlays for lazy-loaded images

var imageOverlay = document.querySelector('#image-overlay');
var imageDisplay = document.querySelector('#image-display');
var imageContainer = imageOverlay.querySelector('#image-container');
var imageThumbnailContainer = imageOverlay.querySelector('#image-thumbnail-container');
var imageThumbnails = imageOverlay.querySelector('#image-thumbnails');

// [private] Get the current active thumbnail and make it inactive
function _clearActiveThumbnail() {
  var activeThumbnail = imageThumbnails.querySelector('.thumbnail.active');
  if (activeThumbnail) activeThumbnail.classList.remove('active');
  return activeThumbnail;
}

// [private] Update the disabled states of the next/prev thumbnail buttons
function _updateThumbnailButtons() {
  var nextButton = imageOverlay.querySelector('.next-page');
  var prevButton = imageOverlay.querySelector('.prev-page');

  var activeThumbnail = imageThumbnails.querySelector('.thumbnail.active');
  var prevSibling = activeThumbnail.previousElementSibling;
  var nextSibling = activeThumbnail.nextElementSibling;
  nextButton.disabled = !(nextSibling && nextSibling.classList.contains('thumbnail'));
  prevButton.disabled = !(prevSibling && prevSibling.classList.contains('thumbnail'));
}

// [private] Toggle to the given image in the overlay
function _viewImage(url, thumbnail) {
  if (thumbnail) {
    _clearActiveThumbnail();
    thumbnail.classList.add('active');
    _updateThumbnailButtons();
    thumbnail.focus();

    url = thumbnail.firstElementChild.getAttribute('src');
  }

  imageContainer.href = url;
  imageContainer.firstElementChild.src = url;
}

// Toggle to the next image in the post
function viewNextImage() {
  var currThumbnail = _clearActiveThumbnail();
  _viewImage('', currThumbnail.nextElementSibling);
}

// Toggle to the previous image in the post
function viewPreviousImage() {
  var currThumbnail = _clearActiveThumbnail();
  _viewImage('', currThumbnail.previousElementSibling);
}

// Open the image overlay with the right image
function openImageOverlay(urls, url) {
  imageOverlay.classList.add('active');

  // Populate the thumbnails
  urls = urls.split(' ').filter(Boolean);

  if (urls.length === 1) {
    imageThumbnailContainer.classList.add("hidden");
    imageDisplay.classList.add("full");
  } else {
    imageThumbnailContainer.classList.remove("hidden");
    imageDisplay.classList.remove("full");
  }

  for (var i = 0; i < urls.length; i++) {
    var button = document.createElement('button');
    button.onclick = function(event) {
      event.stopImmediatePropagation();
      event.stopPropagation();
      _viewImage('', this);
    };
    button.classList.add('thumbnail');
    var img = document.createElement('img');
    img.src = urls[i];

    button.appendChild(img);
    imageThumbnails.appendChild(button);

    if (urls[i] == url) button.classList.add('active');
  }

  _viewImage(url);
  _updateThumbnailButtons();

  imageOverlay.querySelector('#image-container').focus();
}

// Clear and close the image overlay
function closeImageOverlay() {
  var url = imageContainer.getAttribute('href');

  _viewImage('');

  var thumbnails = imageThumbnails.querySelectorAll('.thumbnail');
  for (var i = 0; i < thumbnails.length; i++) {
    imageThumbnails.removeChild(thumbnails[i]);
  }

  imageOverlay.classList.remove('active');

  document.querySelector('[src="' + url + '"]').parentNode.focus();
}

// Handle keyboard shortcuts for image overlay
function handleImageOverlayKeypress(event) {
  event.stopPropagation();

  var nextButton = imageOverlay.querySelector('.next-page');
  var prevButton = imageOverlay.querySelector('.prev-page');

  if (event.keyCode == 27) { // ESC
    closeImageOverlay();
  }
  else if (event.keyCode == 37 && !prevButton.disabled) { // LEFT ARROW
    viewPreviousImage();
  }
  else if (event.keyCode == 39 && !nextButton.disabled) { // RIGHT ARROW
    viewNextImage();
  }
  else if (event.keyCode == 9) { // TAB
    // Keep focus withing the overlay
    var firstFocusElement = imageOverlay.querySelector('.close');
    var lastFocusElement = imageOverlay.querySelector('.next-page');
    if (event.shiftKey && document.activeElement == firstFocusElement) {
      event.preventDefault();
      lastFocusElement.focus();
    }
    if (!event.shiftKey && document.activeElement == lastFocusElement) {
      event.preventDefault();
      firstFocusElement.focus();
    }
  }
}

// Load deferred images
function loadImages(container) {
  var deferredImgs = container.getElementsByTagName('img');
  for (var i = 0; i < deferredImgs.length; i++) {
    var src = deferredImgs[i].getAttribute('data-src');

    if (src) {
      var actual = document.createElement('img');

      actual.onload = (function(original) {
        return function() {
          this.width *= 0.5;

          original.parentNode.replaceChild(this, original);
        }
      })(deferredImgs[i]);

      actual.src = src;
    }
  }
}
