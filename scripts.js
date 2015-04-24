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
  var endY = target.offsetTop - 2; // 2px offset for border-top

  smoothScroll(container, startY, endY, 0);
}

function expandPreview(title) {
  var preview = title.parentNode;
  if (!preview.classList.contains('active'))
    scrollToElement(preview);
  preview.classList.toggle('active');
}
