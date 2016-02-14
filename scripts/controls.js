// Update control buttons
// [requires: posts.js]

// Expand all posts
function expandAll() {
  var collapsedPreviews = document.querySelectorAll('.post:not(.active)');
  for (var i = 0; i < collapsedPreviews.length; i++) {
    expandPreview(collapsedPreviews[i]);
  }
}

// Collapse all posts
function collapseAll() {
  var expandedPreviews = document.querySelectorAll('.post.active');
  for (var i = 0; i < expandedPreviews.length; i++) {
    collapsePreview(expandedPreviews[i]);
  }
}

// Change the theme
function toggleTheme() {
  if (document.body.classList.contains('dark')) {
    document.body.classList.remove('dark');
    document.querySelector('.control.theme').title = 'Dark Theme';
    document.cookie = 'theme=light; path=/';
  }
  else {
    document.body.classList.add('dark');
    document.querySelector('.control.theme').title = 'Light Theme';
    document.cookie = 'theme=dark; path=/';
  }
}
