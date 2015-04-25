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

function expandPreview(preview) {
  if (!preview.classList.contains('active'))
    scrollToElement(preview);
  preview.classList.toggle('active');
  preview.querySelector('.body').style.top =
    preview.querySelector('.heading').offsetHeight + 'px';
}

function rigPreviews() {
  var headings = document.querySelectorAll('.preview .heading');
  for (var i = 0; i < headings.length; i++) {
    headings[i].onclick = function(event) { expandPreview(event.target.parentNode); };
  }
}

rigPreviews();
