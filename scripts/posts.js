// Init and update posts
// [requires: images.js]

// [private] Update the control disabled states
function _updateControls() {
  var expandControl = document.querySelector('.control.expand');
  var collapseControl = document.querySelector('.control.collapse');
  var prevControl = document.querySelector('.control.prev');
  var nextControl = document.querySelector('.control.next');

  expandControl.disabled = !document.querySelector('.post:not(.active)');
  collapseControl.disabled = !document.querySelector('.post.active');

  // TODO: update this based on page, probably requires page# metadata
  prevControl.disabled = true;
  nextControl.disabled = true;
}

// [private] Scroll incrementally
function _smoothScroll(container, y1, y2, t) {
  if (t > 20) return;
  container.scrollTop = y1 + t*(y2 - y1)/20;
  setTimeout(function() {
    _smoothScroll(container, y1, y2, ++t);
  }, 10);
}

// [private] Smooth scroll to a target
function _scrollToElement(target) {
  var container = target.parentNode;

  var startY = container.scrollTop;
  var endY = target.offsetTop;

  _smoothScroll(container, startY, endY, 0);
}

// [private]
function _togglePost(post, scroll) {
  if (!post.classList.contains('active'))
    expandPost(post, scroll);
  else
    collapsePost(post);
}

// Expand a post
function expandPost(post, scroll) {
  if (post.classList.contains('active')) return;

  if (scroll) _scrollToElement(post);

  post.classList.add('active');
  post.querySelector('.body').style.top =
    post.querySelector('.heading').offsetHeight + 'px';

  _updateControls();

  loadImages(post);
}

// Collapse a post
function collapsePost(post) {
  if (!post.classList.contains('active')) return;

  post.classList.remove('active');
  post.querySelector('.body').style.top =
    post.querySelector('.heading').offsetHeight + 'px';
  post.focus();
  _updateControls();
}

// Initialize post behavior
function initPosts() {
  _updateControls();

  var posts = document.querySelectorAll('.post');

  for (var i = 0; i < posts.length; i++) {
    // Post: Allow ENTER and SPACE on focus to expand, ESC to collapse
    posts[i].onkeydown = function(event) {
      if (event.keyCode == 13 || event.keyCode == 32) // ENTER or SPACE was pressed
        expandPost(this, true);
      else if (event.keyCode == 27) // ESC was pressed
        collapsePost(this);
    };

    // Heading: Allow click in heading to expand/collapse
    posts[i].firstElementChild.onclick =
      function(event) { _togglePost(event.target.parentNode, true); };

    // Content: Allow scrolling within content
    posts[i].querySelector('.content').onkeydown = function(event) {
      if (event.keyCode == 38 || event.keyCode == 40) // UP or DOWN was pressed
        event.stopPropagation();
    };
  }
}
