// Update control buttons
// [requires: posts.js]

// Expand all posts
function expandAll() {
  var collapsedPosts = document.querySelectorAll('.post:not(.active)');
  for (var i = 0; i < collapsedPosts.length; i++) {
    expandPost(collapsedPosts[i]);
  }
}

// Collapse all posts
function collapseAll() {
  var expandedPosts = document.querySelectorAll('.post.active');
  for (var i = 0; i < expandedPosts.length; i++) {
    collapsePost(expandedPosts[i]);
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
