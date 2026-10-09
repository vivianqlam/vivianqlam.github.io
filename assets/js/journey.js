(function () {
  var journey = document.querySelector("[data-journey]");
  if (!journey) return;

  var chapters = Array.prototype.slice.call(journey.querySelectorAll("[data-journey-chapter]"));
  var controls = Array.prototype.slice.call(journey.querySelectorAll("[data-journey-stop]"));
  var stage = journey.querySelector("[data-journey-stage]");
  var zoomLayer = journey.querySelector("[data-journey-zoom]");
  var popup = journey.querySelector("[data-journey-popup]");
  var popupEmblem = journey.querySelector("[data-popup-emblem]");
  var popupPlace = journey.querySelector("[data-popup-place]");
  var popupTitle = journey.querySelector("[data-popup-title]");
  var popupSummary = journey.querySelector("[data-popup-summary]");
  var resetButton = journey.querySelector("[data-journey-reset]");
  var caption = journey.querySelector(".journey-map-caption");
  var zoomScale = 2.1;
  var selectedMapPoint = null;
  var lastActivatedControl = null;

  function updateMapZoom() {
    if (!selectedMapPoint || !stage || !zoomLayer) return;

    var offsetX = stage.clientWidth * (0.5 - selectedMapPoint.x * zoomScale);
    var offsetY = stage.clientHeight * (0.5 - selectedMapPoint.y * zoomScale);
    zoomLayer.style.transform = "translate3d(" + offsetX + "px, " + offsetY + "px, 0) scale(" + zoomScale + ")";
  }

  function resetMap(restoreFocus) {
    selectedMapPoint = null;
    journey.classList.remove("is-zoomed");
    if (zoomLayer) zoomLayer.style.transform = "";
    if (popup) popup.hidden = true;
    if (resetButton) resetButton.hidden = true;
    if (caption) caption.hidden = false;

    if (restoreFocus && lastActivatedControl) {
      lastActivatedControl.focus({ preventScroll: true });
    }
  }

  function selectChapter(index, zoomToStop, sourceControl) {
    var selected = chapters[index];
    if (!selected) return;

    chapters.forEach(function (chapter, chapterIndex) {
      var isSelected = chapterIndex === index;
      chapter.classList.toggle("is-selected", isSelected);
      if (isSelected) chapter.setAttribute("aria-current", "step");
      else chapter.removeAttribute("aria-current");
    });

    controls.forEach(function (control) {
      if (Number(control.getAttribute("data-journey-stop")) === index) {
        control.setAttribute("aria-current", "step");
      } else {
        control.removeAttribute("aria-current");
      }
    });

    var era = selected.querySelector(".journey-era");
    var heading = selected.querySelector("h3");
    var summary = selected.getAttribute("data-chapter-summary");
    var summaryParagraph = selected.querySelector("p");

    if (popupEmblem) popupEmblem.setAttribute("data-emblem", selected.getAttribute("data-chapter-emblem") || "");
    if (popupPlace) {
      popupPlace.textContent = selected.getAttribute("data-chapter-place") + (era ? " · " + era.textContent : "");
    }
    if (popupTitle) popupTitle.textContent = heading ? heading.textContent : "";
    if (popupSummary) popupSummary.textContent = summary || (summaryParagraph ? summaryParagraph.textContent : "");

    if (!zoomToStop) return;

    var selectedControl = sourceControl || controls.filter(function (control) {
      return Number(control.getAttribute("data-journey-stop")) === index;
    })[0];
    if (!selectedControl) return;

    var x = Number(selectedControl.getAttribute("data-map-x"));
    var y = Number(selectedControl.getAttribute("data-map-y"));
    if (!Number.isFinite(x) || !Number.isFinite(y)) return;

    selectedMapPoint = { x: x / 100, y: y / 100 };
    lastActivatedControl = selectedControl;
    journey.classList.add("is-zoomed");
    updateMapZoom();
    if (popup) {
      popup.hidden = false;
      popup.classList.remove("is-animating");
      popup.offsetWidth;
      popup.classList.add("is-animating");
    }
    if (resetButton) resetButton.hidden = false;
    if (caption) caption.hidden = true;
  }

  controls.forEach(function (control) {
    control.addEventListener("click", function () {
      var index = Number(control.getAttribute("data-journey-stop"));
      if (Number.isNaN(index)) return;
      selectChapter(index, true, control);
    });
  });

  if (resetButton) {
    resetButton.addEventListener("click", function () {
      resetMap(true);
    });
  }

  journey.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && popup && !popup.hidden) {
      resetMap(document.activeElement === resetButton);
    }
  });

  window.addEventListener("resize", updateMapZoom);

  journey.classList.add("has-journey-popup");
  selectChapter(0, false);
})();