(function () {
  var root = document.documentElement;
  var toggle = document.querySelector("[data-theme-toggle]");
  var storageKey = "vivian-theme";

  function systemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
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
    savedTheme = window.localStorage.getItem(storageKey);
  } catch (error) {
    savedTheme = null;
  }
  setTheme(savedTheme || systemTheme());

  if (toggle) {
    toggle.addEventListener("click", function () {
      var nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      setTheme(nextTheme);
      try {
        window.localStorage.setItem(storageKey, nextTheme);
      } catch (error) {
        /* Theme still works when storage is unavailable. */
      }
    });
  }
})();