'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items (guard if testimonials DOM exists)
if (testimonialsItem && testimonialsItem.length > 0 && modalContainer && modalCloseBtn && overlay && modalImg && modalTitle && modalText) {
  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
      testimonialsModalFunc();
    });
  }
  // add click event to modal close button
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}



// custom select variables
const selects = document.querySelectorAll("[data-select]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// add event listener to each select button
selects.forEach(function(select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
  
  // find the corresponding select box and items
  const filterSelectBox = select.closest(".filter-select-box");
  const section = select.closest(".projects");
  const selectItems = filterSelectBox.querySelectorAll("[data-select-item]");
  const selectValue = filterSelectBox.querySelector("[data-selecct-value]");
  
  // add event in all select items for this select box
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {

      let selectedValue = this.dataset.filterValue 
        ? this.dataset.filterValue.toLowerCase() 
        : this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue, section);

    });
  }
});

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue, section) {
  // Get filter items only from the specified section, or all if no section specified
  const itemsToFilter = section 
    ? section.querySelectorAll("[data-filter-item]")
    : filterItems;

  for (let i = 0; i < itemsToFilter.length; i++) {

    const categories = itemsToFilter[i].dataset.category
      ? itemsToFilter[i].dataset.category.toLowerCase().split(/[\s,]+/)
      : [];

    if (selectedValue === "all") {
      itemsToFilter[i].classList.add("active");
    } else if (categories.includes(selectedValue)) {
      itemsToFilter[i].classList.add("active");
    } else {
      itemsToFilter[i].classList.remove("active");
    }

  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {
    
    // Find the section this button belongs to
    const section = this.closest(".projects");
    let selectedValue = this.dataset.filterValue 
      ? this.dataset.filterValue.toLowerCase() 
      : this.innerText.toLowerCase();
    
    // Deactivate previously clicked button in THIS section, if tracked, or handle global logic
    // Since there are multiple filter groups, we need to deactivate siblings
    const siblingButtons = this.parentElement.parentElement.querySelectorAll("[data-filter-btn]");
    siblingButtons.forEach(btn => btn.classList.remove("active"));
    
    this.classList.add("active");
    filterFunc(selectedValue, section);

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Helper to activate a specific page by data-page value
const navigateToPage = function(targetPage) {
  let pageFound = false;

  for (let j = 0; j < pages.length; j++) {
    if (targetPage === pages[j].getAttribute("data-page")) {
      pages[j].classList.add("active");
      window.scrollTo(0, 0);
      pageFound = true;
    } else {
      pages[j].classList.remove("active");
    }
  }

  // Update navbar state if the target page corresponds to a nav link
  if (pageFound) {
    for (let k = 0; k < navigationLinks.length; k++) {
      const navAttr = navigationLinks[k].getAttribute("data-nav-link");
      const navTarget = navAttr ? navAttr.trim().toLowerCase() : "";
      
      if (navTarget === targetPage || (navTarget === 'research' && targetPage.startsWith('research-'))) {
         // Optional: keep 'Research' tab active if inside a research detail page? 
         // For now, let's just highlight exact matches or keep it simple.
         if (navTarget === targetPage) {
            navigationLinks[k].classList.add("active");
         } else {
            navigationLinks[k].classList.remove("active");
         }
      } else {
        navigationLinks[k].classList.remove("active");
      }
    }
  }
}

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    // Use getAttribute for better compatibility and stability
    // Trim whitespace to avoid matching errors
    const attrValue = this.getAttribute("data-nav-link");
    const targetPage = attrValue ? attrValue.trim().toLowerCase() : this.innerHTML.trim().toLowerCase();

    navigateToPage(targetPage);
  });
}

// Detail Page Navigation Logic
// Listen for clicks on elements with data-detail-target attribute
document.addEventListener("click", function(e) {
  // Find closest element with data-detail-target attribute (handles clicks on children like images/icons)
  const trigger = e.target.closest("[data-detail-target]");
  if (trigger) {
    e.preventDefault(); // Prevent default anchor jump behavior
    const targetPage = trigger.getAttribute("data-detail-target");
    navigateToPage(targetPage);
  }
});

/**
 * Gaze Effect Logic
 * Tracks mouse movement and updates CSS variables for the blur overlay
 */
document.addEventListener("mousemove", (e) => {
  const gazeOverlay = document.getElementById("gaze-overlay");
  if (gazeOverlay) {
    const x = e.clientX;
    const y = e.clientY;
    gazeOverlay.style.setProperty("--x", `${x}px`);
    gazeOverlay.style.setProperty("--y", `${y}px`);
  }
});
