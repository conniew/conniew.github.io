// Set the theme on load

// Set light/dark theme
function setTheme() {
  var themeToggleBtn = document.querySelector('.control.theme');

  if (document.cookie.indexOf('theme=dark') >= 0) {
    document.body.classList.add('dark');
    if (themeToggleBtn) themeToggleBtn.title = 'Light Theme';
  }
  else {
    document.cookie = 'theme=light; path=/';
    if (document.cookie.indexOf('theme') < 0) { // cookies are disabled
      if (document.querySelector('.control.theme'))
      if (themeToggleBtn) {
        themeToggleBtn.disabled = true;
        themeToggleBtn.title = "Enable cookies to change theme"
      }
    }
  }
}
