// Previews for lazy-loaded images

// Open an image preview (overlay on page)
function openImagePreview(url) {
  var preview = document.querySelector('#image-preview');
  preview.classList.add('active');

  var link = preview.firstElementChild;
  link.href = url;

  var image = link.firstElementChild;
  image.src = url;

  link.focus();
}

// Close an image preview
function closeImagePreview() {
  var preview = document.querySelector('#image-preview');

  var link = preview.firstElementChild;
  var url = link.getAttribute('href');
  link.href = '';

  var image = link.firstElementChild;
  image.src = '';

  preview.classList.remove('active');

  document.querySelector('[src="' + url + '"]').parentNode.focus();
}

// Handle keyboard shortcuts for image preview
function handleImagePreviewKeypress(event) {
  event.stopPropagation();

  if (event.keyCode == 27) // ESC
    closeImagePreview();
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
