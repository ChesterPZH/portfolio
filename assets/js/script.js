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
// Group filter buttons by their parent section
const filterSections = document.querySelectorAll(".projects");
filterSections.forEach(function(section) {
  const sectionFilterBtns = section.querySelectorAll("[data-filter-btn]");
  const sectionSelectValue = section.querySelector("[data-selecct-value]");
  let lastClickedBtn = sectionFilterBtns[0];

  for (let i = 0; i < sectionFilterBtns.length; i++) {
    sectionFilterBtns[i].addEventListener("click", function () {

      let selectedValue = this.dataset.filterValue 
        ? this.dataset.filterValue.toLowerCase() 
        : this.innerText.toLowerCase();
      if (sectionSelectValue) {
        sectionSelectValue.innerText = this.innerText;
      }
      filterFunc(selectedValue, section);

      lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;

    });
  }
});



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

const navigateToPage = function (pageName) {
  // Normalize page name (trim and lowercase)
  pageName = pageName.trim().toLowerCase();
  let matchedNav = false;
  let matchedPage = false;

  // First, remove active from all pages
  for (let i = 0; i < pages.length; i++) {
    pages[i].classList.remove("active");
  }

  // Then, add active to matching page(s)
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].dataset.page === pageName) {
      pages[i].classList.add("active");
      matchedPage = true;
    }
  }

  // Update navigation links
  for (let i = 0; i < navigationLinks.length; i++) {
    const linkText = navigationLinks[i].textContent.trim().toLowerCase();
    if (linkText === pageName) {
      navigationLinks[i].classList.add("active");
      matchedNav = true;
    } else {
      navigationLinks[i].classList.remove("active");
    }
  }

  // If no matching page found, ensure all pages are inactive
  if (!matchedPage) {
    for (let i = 0; i < pages.length; i++) {
      pages[i].classList.remove("active");
    }
  }

  window.scrollTo(0, 0);
};

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function (event) {
    event.preventDefault();
    const pageName = this.textContent.trim().toLowerCase();
    // Clear URL hash to prevent navigation issues
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    navigateToPage(pageName);
  });
}

const detailLinks = document.querySelectorAll("[data-detail-target]");

for (let i = 0; i < detailLinks.length; i++) {
  detailLinks[i].addEventListener("click", function (event) {
    event.preventDefault();
    const targetPage = this.dataset.detailTarget;
    if (targetPage) {
      navigateToPage(targetPage);
    }
  });
}