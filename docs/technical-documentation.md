
# Technical Documentation – Assignment 4

**Student:** Sara Almugbel  
**Student ID:** 202347670  
**Course:** SWE 363 – Web Engineering  
**Project:** Personal Portfolio Web Application

## 1. Project Overview

Assignment 4 represents the final development stage of my personal portfolio website.

The application builds upon the previous three assignments by preserving existing interactive functionality and introducing new features, professional design improvements, performance optimization, and public deployment.

The website consists of five main sections:

- About Me
- Technical Skills
- Project Ideas and Future Innovations
- GitHub Projects
- Contact

The application uses HTML, CSS, and vanilla JavaScript without requiring a frontend framework or backend server.

## 2. Technologies Used

### HTML5

Provides semantic website structure, navigation, project cards, skill cards, search controls, and contact form elements.

### CSS3

Controls the visual appearance, responsive layouts, animations, accessibility preferences, and theme colors.

CSS Grid and Flexbox are used to organize the interface.

### JavaScript (ES6+)

Implements event handling, DOM manipulation, project search, filtering, sorting, theme switching, form validation, API integration, and scrolling functionality.

### Fetch API

Retrieves external data asynchronously.

### GitHub REST API

Provides public repository information, including names, descriptions, programming languages, and repository links.

### localStorage

Stores the selected theme preference across page reloads.

### GitHub Pages

Hosts the completed portfolio as a publicly accessible static website.

## 3. Application Architecture

The application follows a simple client-side architecture.

```text
Visitor's Browser
       |
       v
   index.html
       |
       +------ css/styles.css
       |
       +------ js/script.js
                    |
                    +------ DOM Manipulation
                    +------ Event Handling
                    +------ localStorage
                    +------ Form Validation
                    +------ GitHub REST API
```

The three main application files have separate responsibilities:

| File | Responsibility |
|---|---|
| index.html | Website structure and content |
| css/styles.css | Styling, layout, and responsiveness |
| js/script.js | Interactive behavior and API integration |

JavaScript is loaded using the defer attribute, allowing the HTML document to be parsed before the script executes.

This ensures that the required DOM elements are available when event listeners are registered.

## 4. Interactive Features

### 4.1 Dark and Light Mode

The theme button allows visitors to switch between light and dark appearances.

JavaScript changes the dark class on the body element:

```javascript
document.body.classList.toggle("dark");
```

CSS variables define the colors associated with each theme.

The selected theme is saved using:

```javascript
localStorage.setItem("portfolio-theme", selectedTheme);
```

When the website loads, the saved preference is retrieved using localStorage.getItem().

The theme button also updates its text and aria-pressed attribute.

Storage operations are protected using try/catch blocks.

### 4.2 Technical Skills Section

Assignment 4 introduces a dedicated technical skills section.

Skills are organized into four categories:

- Front-End Development
- Programming
- Back-End and Databases
- Development Tools

CSS Grid organizes the skill cards, while Flexbox allows individual technology badges to wrap naturally.

The layout changes to one column on smaller screens.

### 4.3 Hero Navigation Buttons

The introduction section contains two navigation buttons:

- Explore My Projects
- Contact Me

These buttons use internal anchor links to navigate to the corresponding sections.

CSS provides consistent styling and hover effects.

### 4.4 Project Filtering

Project cards contain data-category attributes that identify their categories.

Available categories include:

- All
- Productivity
- Campus

The selected category is stored in the selectedCategory variable.

JavaScript compares each project's category with the selected filter.

Nonmatching cards are hidden using the hidden property.

### 4.5 Project Sorting

The sorting dropdown provides three options:

- Default Order
- Name (A–Z)
- Name (Z–A)

The original project order is preserved using:

```javascript
const originalProjects = [...projectCards];
```

The application creates a copy of the original array before sorting.

The sort() and localeCompare() methods are used to compare project names alphabetically.

Existing project cards are rearranged using appendChild() rather than recreated.

### 4.6 Live Project Search

Live project search is a new feature introduced in Assignment 4.

The search field is connected to an input event listener:

```javascript
projectSearch.addEventListener("input", updateProjects);
```

The search query is normalized using:

```javascript
const searchQuery = projectSearch.value.trim().toLowerCase();
```

The application converts each project's text to lowercase and checks whether it contains the search query:

```javascript
const projectText = card.textContent.toLowerCase();
const matchesSearch = projectText.includes(searchQuery);
```

This provides case-insensitive searching across project names and descriptions.

Results update immediately without requiring a separate search button.

### 4.7 Combined Search, Filtering, and Sorting

The updateProjects() function manages all three project operations.

The function performs the following steps:

1. Reads the selected sorting option.
2. Reads and normalizes the search query.
3. Creates a copy of the original project array.
4. Sorts the project cards when required.
5. Rearranges existing cards in the project container.
6. Checks whether each card matches the selected category.
7. Checks whether each card matches the search query.
8. Displays only cards satisfying both conditions.
9. Updates the visible project count.

The combined condition is:

```javascript
const matches = matchesCategory && matchesSearch;
card.hidden = !matches;
```

Using one shared function prevents conflicts between the three features and reduces duplicated code.

### 4.8 Contact Form Validation

The contact form contains three input fields:

- Name
- Email
- Message

JavaScript listens for the submit event and prevents the default submission behavior using:

```javascript
event.preventDefault();
```

The validation requirements are:

| Field | Validation |
|---|---|
| Name | Required, 2–80 characters |
| Email | Required, basic email format, maximum 254 characters |
| Message | Required, 10–2000 characters |

The email format is checked using a regular expression:

```javascript
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```

The showFormMessage() function displays appropriate error or success messages.

After successful validation, the form fields are reset.

The contact form does not send information to a backend server.

### 4.9 Back-to-Top Button

The back-to-top button improves navigation on longer pages.

The application listens for scrolling events and checks the current scroll position:

```javascript
backToTop.hidden = window.scrollY < 300;
```

The button becomes visible after the visitor scrolls at least 300 pixels.

The scroll listener uses the passive option.

When clicked, the button calls window.scrollTo() to return to the top.

The application checks the visitor's reduced-motion preference before selecting the scrolling behavior.

## 5. External API Integration

### 5.1 API Selection

The GitHub REST API was selected because it provides publicly accessible information about software repositories.

It allows the website to display current project information without manually updating repository cards.

### 5.2 API Endpoint

The application sends an HTTP GET request to:

```text
https://api.github.com/users/Saralmg/repos?sort=updated&per_page=6
```

The endpoint requests up to six public repositories ordered by their latest updates.

No private API credentials are included in the source code.

### 5.3 Asynchronous Data Retrieval

The loadGitHubProjects() function uses async/await and fetch() to retrieve repository information.

The response is checked using response.ok before being processed.

The JSON response is converted into JavaScript objects using:

```javascript
const repositories = await response.json();
```

### 5.4 Dynamic Repository Rendering

For each repository, JavaScript creates:

- An article element
- A heading containing the repository name
- A paragraph containing the description
- A programming language badge
- A link to the repository

Assignment 4 introduces programming language information using:

```javascript
language.textContent = repo.language || "Not specified";
```

Repository names and descriptions are inserted using textContent rather than innerHTML.

External repository links use target="_blank" and rel="noopener noreferrer".

### 5.5 DocumentFragment Optimization

Assignment 4 improves repository rendering by using a DocumentFragment.

```javascript
const fragment = document.createDocumentFragment();
```

Repository cards are added to the fragment before being inserted into the website.

```javascript
githubRepos.replaceChildren(fragment);
```

This groups DOM insertion into a single operation instead of inserting each card separately into the visible document.

### 5.6 API Error Handling

The API request is protected using a try/catch block.

The website provides messages for:

- Loading repositories
- Successfully loaded repositories
- Empty repository results
- Network or API failures

Errors are also recorded using console.error().

## 6. State Management

The application manages persistent and temporary state.

### Persistent State

The selected light or dark theme is stored in localStorage.

This preference remains available after refreshing the website.

### Temporary State

Temporary state includes:

- Selected project category
- Selected sorting option
- Current search query
- Current contact form input
- Back-to-top button visibility

These values are maintained while the website is open but are not permanently stored.

## 7. Responsive Design

The website uses CSS Grid and Flexbox to support different screen sizes.

A media query at max-width: 700px adjusts the layout for smaller screens.

Responsive improvements include:

- Single-column project cards
- Single-column technical skill cards
- Wrapping navigation links
- Vertically arranged hero buttons
- Full-width search input
- Adjusted section spacing
- Repositioned back-to-top button
- Flexible contact form layout

Long GitHub repository names are handled using overflow-wrap to reduce horizontal overflow.

## 8. Accessibility

Accessibility features include:

- Semantic HTML elements
- Descriptive form labels
- Keyboard focus indicators
- Accessible button names
- aria-pressed attributes for theme and filter controls
- aria-live status messages
- Reduced-motion support
- Responsive layouts

The prefers-reduced-motion media query disables unnecessary animations and transitions when requested by the visitor.

## 9. Performance and Code Quality

The application uses several techniques to improve efficiency and maintainability.

### 9.1 Lightweight Architecture

The website uses vanilla JavaScript without additional frontend frameworks or libraries.

### 9.2 Deferred JavaScript

The defer attribute allows the HTML document to be parsed before JavaScript executes.

### 9.3 DOM Element Reuse

Project sorting rearranges existing DOM elements rather than generating replacement cards.

### 9.4 Shared Application Logic

The updateProjects() function manages searching, filtering, and sorting.

### 9.5 Asynchronous API Requests

The website retrieves GitHub data asynchronously without blocking the main page while waiting for the response.

### 9.6 Limited API Results

The per_page=6 parameter limits the amount of repository data retrieved.

### 9.7 Grouped DOM Insertion

DocumentFragment groups repository card insertion into one operation.

### 9.8 Organized Source Code

The JavaScript file contains labeled feature sections and explanatory comments.

CSS variables maintain consistent theme colors.

## 10. Testing and Verification

### 10.1 Functional Testing

The following tests were manually performed during Assignment 4 development.

| Test | Expected Result | Result |
|---|---|---|
| Technical skills | Skill cards display correctly | Passed |
| Explore Projects button | Navigate to Projects | Passed |
| Contact button | Navigate to Contact | Passed |
| Search Smart | Display Smart Study Planner | Passed |
| Search Campus | Display Campus Connect | Passed |
| Search xyz | Display no-results message | Passed |
| Clear search | Restore both project cards | Passed |
| Filtering and sorting | Operate together | Passed |
| GitHub language badges | Display repository languages | Passed |
| Theme persistence | Retain theme after refresh | Passed |
| Back-to-top button | Return to top of page | Passed |
| Contact validation | Display validation feedback | Passed |

### 10.2 Browser Compatibility

The website was manually tested in:

- Safari
- Google Chrome

The tested interactive features operated successfully.

### 10.3 Responsive Testing

The browser window was resized to evaluate the layout on smaller screens.

The navigation, project cards, technical skills section, and contact form adjusted to the available width.

### 10.4 Performance Testing

Google PageSpeed Insights was used on November 26, 2026, to evaluate the deployed website.

| Evaluation Category | Mobile | Desktop |
|---|---:|---:|
| Performance | 100 | 100 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

The results demonstrate strong performance under the reported laboratory testing conditions.

These scores may vary depending on network conditions, browser settings, and future website changes.

Real-user performance data was not available in the mobile report.

## 11. Deployment

The completed application was deployed using GitHub Pages.

### Repository

https://github.com/Saralmg/202347670-SaraAlmugbel-assignment4

### Live Website

https://saralmg.github.io/202347670-SaraAlmugbel-assignment4/

### Deployment Configuration

- Deployment source: Deploy from a branch
- Branch: main
- Folder: / (root)

GitHub Pages serves the static HTML, CSS, and JavaScript files directly.

No separate backend server is required.

The deployed website was opened and its functionality was manually verified.

## 12. Innovation

The main innovative feature introduced in Assignment 4 is the combined project discovery system.

Visitors can simultaneously:

- Search project names and descriptions
- Filter projects by category
- Sort projects alphabetically

The application updates the displayed projects dynamically without refreshing the page.

Additional improvements include technical skill cards, repository language badges, hero navigation buttons, and back-to-top navigation.

These features improve usability while preserving the original portfolio design.

## 13. User Guide

### Accessing the Website

Open the live website URL using a modern web browser.

### Changing the Theme

Click the theme button in the navigation bar.

The selected appearance is automatically saved.

### Exploring Technical Skills

Navigate to the Skills section to view categorized technologies.

### Searching Projects

Enter a keyword in the search field.

Matching project cards appear automatically.

### Filtering and Sorting

Select a project category and choose a sorting option.

Search, filtering, and sorting can be used together.

### Viewing GitHub Repositories

Navigate to the GitHub section and select View on GitHub to open a repository.

### Using the Contact Form

Enter a name, email address, and message.

Click Check Message to validate the information.

The form does not transmit messages.

### Returning to the Top

Click the floating arrow that appears after scrolling down.

## 14. Limitations

- The application does not include a backend server.
- The contact form does not send real emails.
- GitHub API availability depends on internet connectivity.
- API requests may be affected by rate limits.
- Search and sorting preferences are not permanently stored.
- The manually defined project cards represent project ideas.
- Testing was limited to the reported browsers and responsive checks.
- API failure scenarios and all possible input edge cases were not exhaustively tested.

## 15. Future Improvements

Potential future improvements include:

- Connecting the contact form to a backend service
- Adding completed software projects
- Introducing additional project categories
- Adding advanced project sorting options
- Providing a downloadable resume
- Expanding the portfolio with professional experience
- Implementing additional automated tests

## 16. Conclusion

Assignment 4 brings together the concepts learned throughout the Web Engineering course into a complete, responsive, interactive, and publicly deployed personal portfolio.

The project demonstrates semantic HTML, CSS styling, responsive design, JavaScript programming, DOM manipulation, state management, external API integration, input validation, error handling, accessibility, performance optimization, and deployment.

The final website provides a foundation that can be expanded as my academic and professional experience develops.
