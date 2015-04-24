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

function expandPreview(title) {
  var preview = title.parentNode;
  if (!preview.classList.contains('active'))
    scrollToElement(preview);
  preview.classList.toggle('active');
}

function rigPreviews() {
  var titles = document.querySelectorAll('.preview .title');
  for (var i = 0; i < titles.length; i++) {
    titles[i].onclick = function(event) { expandPreview(event.target); };
  }
}

rigPreviews();
