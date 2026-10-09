(function () {
  var root = document.documentElement;
  var toggle = document.querySelector("[data-theme-toggle]");
  var storageKey = "vivian-theme";
  var colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
  var userHasChosenTheme = false;

  function systemTheme() {
    return colorScheme.matches ? "dark" : "light";
  }

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (toggle) {
      var isDark = theme === "dark";
      toggle.setAttribute("aria-pressed", String(isDark));
      toggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    }
  }

  var savedTheme = null;
  try {
    var storedTheme = window.localStorage.getItem(storageKey);
    if (storedTheme === "dark" || storedTheme === "light") {
      savedTheme = storedTheme;
      userHasChosenTheme = true;
    }
  } catch (error) {
    savedTheme = null;
  }
  setTheme(savedTheme || systemTheme());

  function updateFromSystemPreference() {
    if (!userHasChosenTheme) setTheme(systemTheme());
  }

  if (typeof colorScheme.addEventListener === "function") {
    colorScheme.addEventListener("change", updateFromSystemPreference);
  } else if (typeof colorScheme.addListener === "function") {
    colorScheme.addListener(updateFromSystemPreference);
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      userHasChosenTheme = true;
      setTheme(nextTheme);
      try {
        window.localStorage.setItem(storageKey, nextTheme);
      } catch (error) {
        /* Theme still works when storage is unavailable. */
      }
    });
  }
})();