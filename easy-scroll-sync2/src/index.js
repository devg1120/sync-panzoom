let scrollElements = {};
let firstX  = null,
    scrollX = null,
    firstY  = null,
    scrollY = null;

const reset = () => {
   for (let group in scrollElements) {
      // remove all the old event listeners
      scrollElements[group].forEach((x) => {
        x.element.removeEventListener("scroll", () => {});
      });
      // empty scrollElements
      scrollElements[group] = [];
   }
};

const createScrollListeners = () => {
  // remove window / document event listeners
  window.removeEventListener("load", createScrollListeners);
  document.removeEventListener("DOMContentLoaded", createScrollListeners);

  reset();

  const dataScrollElementNodes = document.querySelectorAll("[data-scrollsync]");
      console.log(dataScrollElementNodes[0].hasAttribute("scroll_sync_group"))
  const dataScrollElements = Array.from(dataScrollElementNodes);

  if (dataScrollElements.length === 0) {
    console.warn(
      "EasyScrollSync: No scroll elements found. You may have to call easyScrollSync() after view initialised to manually find the scrollable elements."
    );
  } else {
    dataScrollElements.forEach((element, index) => {
      
      //console.log(element.hasAttribute("scroll_sync_group"))
      let group = "none";
      if (element.hasAttribute("scroll_sync_group")) {
          group = element.getAttribute("scroll_sync_group");
      } else {
	      return;
      }
      //scrollElements.push({
      //scrollElements["test"].push({
      if ( !scrollElements[group] ) {
          scrollElements[group] = [];
      }
      let index_ = scrollElements[group].length;
      scrollElements[group].push({
        element: element,
        id: index_,
        scrolling: false,
      });
      //element.addEventListener("scroll", () => {
      element.addEventListener("scroll", () => {
        //syncScroll(scrollElements[index], index);
        syncScroll(group, scrollElements[group][index_], index_);
      });

      /// dragscroll
      //// https://github.com/MohammadAliHeidary/DragScroll/blob/master/dragscroll.js
      element.addEventListener('mousemove', e => {
        if (e.which === 1) {
            if (firstX === null) {
                //* Set initial values ---
                firstX = e.layerX;
                scrollX = element.scrollLeft;
                firstY = e.layerY;
                scrollY = element.scrollTop;
            }
            element.scrollTo({
                // * Calculate and adjust the scroll value ---
                top: scrollY + (firstY - e.layerY),
                left: scrollX + (firstX - e.layerX),
                behavior: "auto"
            });
        }
        else {
            //* Reset the initial values ---
            firstX = null;
            scrollX = null;
            firstY = null;
            scrollY = null;
        }
      });

	    
////

    });
  }
};

const syncScroll = (group, element, index) => {
  // remove current element from scrollingElements
  //const elements = scrollElements.filter((x) => x.id !== element.id);
  const elements = scrollElements[group].filter((x) => x.id !== element.id);

  // create list of other elements scroll status
  const elementsScrolling = elements.map((x) => x.scrolling);

  // check to see if any other elements are currently scrolling
  if (!elementsScrolling.includes(true)) {
    // set element scroll to be true
    scrollElements[group][index].scrolling = true;

    // store top and left positions
    const top = element.element.scrollTop;
    const left = element.element.scrollLeft;

    // update the top and left position for each element
    elements.forEach((x) => {
      x.element.scrollTop = top;
      x.element.scrollLeft = left;
    });
  }

  // set all other scrollElements 'scrolling' to false
  scrollElements[group]
    .filter((x) => x.id !== element.id)
    .forEach((element) => {
      element.scrolling = false;
    });
};

const listenForSpaNavigation = () => {
  // This function is for SPA or applications that use javascript to navigate
  // on page navigation if will reset and check for any scroll sync elements
  const pushState = history.pushState;
  history.pushState = function () {
    pushState.apply(history, arguments);
    createScrollListeners();
  };
};

const scrollSync = () => {
  // Wait for document load to be complete
  if (document.readyState === "complete") {
    window.setTimeout(createScrollListeners);
  } else {
    document.addEventListener("DOMContentLoaded", createScrollListeners);
    window.addEventListener("load", createScrollListeners);
  }
};

scrollSync();
listenForSpaNavigation();

export const easyScrollSync = () => {
  createScrollListeners();
};
