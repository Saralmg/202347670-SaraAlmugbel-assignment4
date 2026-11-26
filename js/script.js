
/* ======================================
   Sara Almugbel - Portfolio
   Assignment 4: Personal Web Application
   ====================================== */

"use strict";

// ======================================
// FEATURE 1: DARK / LIGHT MODE
// ======================================

const themeButton = document.getElementById("theme-toggle");

// Restore the visitor's saved theme
try {
  const savedTheme = localStorage.getItem("portfolio-theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }
} catch (error) {
  console.warn("Could not load saved theme:", error);
}

// Update the theme button
function updateThemeButton() {
  const isDark = document.body.classList.contains("dark");

  themeButton.textContent = isDark ? "Light Mode" : "Dark Mode";
  themeButton.setAttribute("aria-pressed", String(isDark));
}

updateThemeButton();

// Change theme and save the preference
themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  updateThemeButton();

  const selectedTheme = document.body.classList.contains("dark")
    ? "dark"
    : "light";

  try {
    localStorage.setItem("portfolio-theme", selectedTheme);
  } catch (error) {
    console.warn("Could not save theme preference:", error);
  }
});


// ======================================
// FEATURE 2: PROJECT FILTERING
// FEATURE 3: PROJECT SORTING
// FEATURE 6: LIVE PROJECT SEARCH
// ======================================

const projectsContainer = document.getElementById("project-list");

const projectCards = Array.from(
  projectsContainer.querySelectorAll(".project-card")
);

const filterButtons = document.querySelectorAll("#projects .filter");
const projectSort = document.getElementById("project-sort");
const projectStatus = document.getElementById("projects-status");
const projectSearch = document.getElementById("project-search");

// Preserve the original project order
const originalProjects = [...projectCards];

// Keep track of the selected category
let selectedCategory = "all";

// Apply filtering, sorting and searching together
function updateProjects() {
  const sortOption = projectSort.value;
  const searchQuery = projectSearch.value.trim().toLowerCase();

  // Create a copy so the original order is preserved
  const sortedProjects = [...originalProjects];

  // Sort projects alphabetically
  if (sortOption === "az") {
    sortedProjects.sort((a, b) => {
      const nameA = a.querySelector("h3").textContent.trim();
      const nameB = b.querySelector("h3").textContent.trim();

      return nameA.localeCompare(nameB);
    });
  } else if (sortOption === "za") {
    sortedProjects.sort((a, b) => {
      const nameA = a.querySelector("h3").textContent.trim();
      const nameB = b.querySelector("h3").textContent.trim();

      return nameB.localeCompare(nameA);
    });
  }

  // Reorder the cards inside the project container
  sortedProjects.forEach((card) => {
    projectsContainer.appendChild(card);
  });

  let visibleProjects = 0;

  // Apply category filtering and live search
  projectCards.forEach((card) => {

    const matchesCategory =
      selectedCategory === "all" ||
      card.dataset.category === selectedCategory;

    const projectText = card.textContent.toLowerCase();

    const matchesSearch = projectText.includes(searchQuery);

    const matches = matchesCategory && matchesSearch;

    card.hidden = !matches;

    if (matches) {
      visibleProjects++;
    }
  });

  // Update the accessible status message
  projectStatus.textContent =
    visibleProjects === 0
      ? "No projects found. Try another search or category."
      : `Showing ${visibleProjects} project(s).`;
}

// Handle category filter buttons
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.filter;

    filterButtons.forEach((filter) => {
      const isSelected = filter === button;

      filter.classList.toggle("active", isSelected);
      filter.setAttribute("aria-pressed", String(isSelected));
    });

    updateProjects();
  });
});

// Handle sorting dropdown
projectSort.addEventListener("change", updateProjects);

// Assignment 4: Update results as the visitor types
projectSearch.addEventListener("input", updateProjects);

// Display projects when the page first loads
updateProjects();


// ======================================
// FEATURE 4: ADVANCED CONTACT VALIDATION
// ======================================

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

function showFormMessage(message, type) {
  formMessage.className = type;
  formMessage.textContent = message;
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Check required fields
  if (!name || !email || !message) {
    showFormMessage(
      "Please fill in all fields before submitting.",
      "error"
    );
    return;
  }

  // Name must contain at least two characters
  if (name.length < 2) {
    showFormMessage(
      "Please enter a name with at least 2 characters.",
      "error"
    );
    return;
  }

  // Check email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    showFormMessage(
      "Please enter a valid email address.",
      "error"
    );
    return;
  }

  // Message must contain at least ten characters
  if (message.length < 10) {
    showFormMessage(
      "Your message must contain at least 10 characters.",
      "error"
    );
    return;
  }

  // Check maximum field lengths
  if (name.length > 80 || email.length > 254 || message.length > 2000) {
    showFormMessage(
      "One or more fields exceed the maximum allowed length.",
      "error"
    );
    return;
  }

  // Show confirmation
  showFormMessage(
    `Thank you, ${name}! Your message was validated successfully. ` +
    "This demonstration does not send emails.",
    "success"
  );

  contactForm.reset();
});


// ======================================
// FEATURE 5: GITHUB API INTEGRATION
// ======================================

const githubRepos = document.getElementById("github-repos");
const githubStatus = document.getElementById("github-status");

// Fetch public GitHub repositories
async function loadGitHubProjects() {
  githubStatus.textContent = "Loading GitHub projects...";

  try {
    const response = await fetch(
      "https://api.github.com/users/Saralmg/repos?sort=updated&per_page=6"
    );

    if (!response.ok) {
      throw new Error(`GitHub API returned status ${response.status}`);
    }

    const repositories = await response.json();

    // Create cards before inserting them into the page
    const fragment = document.createDocumentFragment();

    repositories.forEach((repo) => {
      const card = document.createElement("article");
      card.className = "project-card";

      const title = document.createElement("h3");
      title.textContent = repo.name;

      const description = document.createElement("p");
      description.textContent =
        repo.description || "No description available.";

      // Assignment 4: Display the repository language
      const language = document.createElement("span");
      language.className = "repo-language";
      language.textContent = repo.language || "Not specified";

      const link = document.createElement("a");
      link.href = repo.html_url;
      link.textContent = "View on GitHub";
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      card.append(title, description, language, link);
      fragment.appendChild(card);
    });

    // Insert all repository cards together
    githubRepos.replaceChildren(fragment);

    githubStatus.textContent =
      repositories.length > 0
        ? `Showing ${repositories.length} GitHub repositories.`
        : "No public repositories found.";

  } catch (error) {
    githubStatus.textContent =
      "Unable to load GitHub projects. Please try again later.";

    console.error("GitHub API error:", error);
  }
}

// Load repositories when the page opens
loadGitHubProjects();


// ======================================
// FEATURE 7: BACK TO TOP BUTTON
// ======================================

const backToTop = document.getElementById("back-to-top");

// Show the button after scrolling down
function updateBackToTop() {
  backToTop.hidden = window.scrollY < 300;
}

window.addEventListener("scroll", updateBackToTop, {
  passive: true
});

// Check the initial scroll position
updateBackToTop();

// Return to the top of the page
backToTop.addEventListener("click", () => {

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  window.scrollTo({
    top: 0,
    behavior: reducedMotion ? "instant" : "smooth"
  });
});
