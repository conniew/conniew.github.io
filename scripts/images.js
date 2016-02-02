// Lazy-load images

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
