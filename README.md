
# Personal Portfolio Website – Assignment 4

**Student:** Sara Almugbel  
**Student ID:** 202347670  
**University:** King Fahd University of Petroleum & Minerals (KFUPM)  
**Course:** SWE 363 – Web Engineering

## Project Description

This project is the final version of my personal portfolio website developed throughout Assignments 1, 2, 3, and 4.

Assignment 4 focuses on delivering a complete, professional, responsive, and publicly accessible personal web application that demonstrates the technical skills acquired throughout the Web Engineering course.

The website introduces me as a Software Engineering student, showcases my technical skills and project ideas, retrieves public GitHub repositories, and provides interactive features that improve the user experience.

## Live Website

The portfolio is publicly deployed using GitHub Pages.

[Visit My Portfolio](https://saralmg.github.io/202347670-SaraAlmugbel-assignment4/)

## Technologies Used

- HTML5 – Semantic website structure
- CSS3 – Styling, responsive layouts, and animations
- JavaScript (ES6+) – Interactive functionality and DOM manipulation
- Fetch API – Asynchronous external data retrieval
- GitHub REST API – Displaying public repositories
- localStorage – Saving theme preferences
- Git and GitHub – Version control
- GitHub Pages – Website deployment
- Google PageSpeed Insights – Performance testing
- ChatGPT – AI-assisted development and documentation

## Website Features

### 1. Professional Introduction

The homepage introduces my academic background, interests, and professional goals.

Navigation buttons allow visitors to access the Projects and Contact sections directly.

### 2. Technical Skills Section

The website presents my technical skills in four categories:

- Front-End Development
- Programming
- Back-End and Databases
- Development Tools

Skills are displayed using responsive cards and technology badges.

### 3. Dark and Light Mode

Visitors can switch between dark and light themes.

The selected theme is stored using localStorage and restored after refreshing the website.

### 4. Dynamic Project Filtering

Visitors can filter project ideas using three categories:

- All
- Productivity
- Campus

A status message displays the number of matching projects.

### 5. Project Sorting

Visitors can arrange project ideas using three sorting options:

- Default Order
- Name (A–Z)
- Name (Z–A)

JavaScript uses sort() and localeCompare() to arrange projects alphabetically.

### 6. Live Project Search

Assignment 4 introduces a live search feature that allows visitors to search project names and descriptions.

Search results update immediately as the visitor types.

The search feature works together with category filtering and alphabetical sorting through a shared JavaScript function.

If no matching projects are found, the website displays a helpful message.

### 7. GitHub API Integration

The website retrieves public repositories from my GitHub account using the GitHub REST API.

API endpoint:

https://api.github.com/users/Saralmg/repos?sort=updated&per_page=6

Each repository card displays:

- Repository name
- Repository description
- Primary programming language
- Link to the GitHub repository

The website handles API failures and displays appropriate loading, empty-result, and error messages.

### 8. Advanced Contact Form Validation

The contact form accepts a name, email address, and message.

Validation rules include:

- All fields must be completed.
- Names must contain at least two characters.
- Email addresses must follow a valid basic format.
- Messages must contain at least ten characters.
- Input values must not exceed maximum field lengths.

The website displays helpful error messages and a confirmation message when validation succeeds.

The form is a client-side demonstration and does not send real emails.

### 9. Back-to-Top Button

A floating navigation button appears when the visitor scrolls down the page.

Clicking the button returns the visitor to the top of the website.

The feature respects reduced-motion accessibility preferences.

### 10. Responsive Design and Accessibility

The website uses CSS Grid, Flexbox, and media queries to support different screen sizes.

Accessibility improvements include:

- Semantic HTML elements
- Accessible form labels
- Keyboard focus indicators
- ARIA status messages
- Accessible button descriptions
- Reduced-motion support
- Responsive navigation and project layouts

## Project Structure

```text
202347670-SaraAlmugbel-assignment4/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
├── README.md
└── .gitignore
```

Presentation materials will be added before final submission.

## How to Run the Website Locally

1. Clone the repository:

```bash
git clone https://github.com/Saralmg/202347670-SaraAlmugbel-assignment4.git
```

2. Open the project folder in Visual Studio Code.

3. Locate the index.html file.

4. Open index.html in Safari, Google Chrome, or another modern browser.

5. Explore the website and test its interactive features.

No additional packages, frameworks, or installations are required.

An internet connection is required to retrieve GitHub repositories.

## User Guide

| Feature | Instructions |
|---|---|
| Navigation | Click a navigation link to visit a section. |
| Theme | Click the Dark Mode or Light Mode button. |
| Technical Skills | Browse the categorized skill cards. |
| Search | Enter a project name or description keyword. |
| Filtering | Select All, Productivity, or Campus. |
| Sorting | Select an option from the sorting dropdown. |
| GitHub Projects | Click View on GitHub to open a repository. |
| Contact Form | Enter your information and click Check Message. |
| Back to Top | Click the floating arrow after scrolling down. |

## Testing

The following functionality was manually tested:

- Dark and light mode switching
- Theme persistence after refreshing
- Live project search
- Search with no matching results
- Project filtering
- Alphabetical sorting
- Combined project search, filtering, and sorting
- Technical skills display
- Hero navigation buttons
- GitHub repository display
- Repository programming language badges
- Contact form validation
- Back-to-top navigation
- Responsive layouts

The website was tested using Safari and Google Chrome.

## Performance Evaluation

Google PageSpeed Insights was used to evaluate the deployed website on November 26, 2026.

| Category | Mobile | Desktop |
|---|---:|---:|
| Performance | 100 | 100 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

These results represent the reported laboratory test scores at the time of testing. Scores may vary under different testing conditions.

## Performance and Code Quality

The website uses several techniques to improve efficiency:

- Vanilla JavaScript without unnecessary frontend libraries
- Deferred JavaScript loading
- Reuse of existing project card elements
- Shared logic for searching, filtering, and sorting
- Asynchronous GitHub API requests
- Limited API results
- DocumentFragment for grouped DOM insertion
- CSS variables for consistent theme management
- Organized and commented source code

## Deployment

The website is hosted using GitHub Pages.

Deployment configuration:

- Source: Deploy from a branch
- Branch: main
- Folder: / (root)

The website can be updated by pushing changes to the main branch.

## AI Assistance

ChatGPT was used during Assignment 4 to assist with:

- Understanding assignment requirements
- Planning new portfolio features
- Generating HTML, CSS, and JavaScript improvements
- Implementing live project search
- Creating the technical skills section
- Improving navigation and accessibility
- Improving GitHub repository rendering
- Providing deployment and testing guidance
- Preparing project documentation

AI assistance included substantial code generation and documentation drafting. The suggested code was integrated into the existing portfolio and manually tested.

Detailed AI usage information is available in:

[AI Usage Report](docs/ai-usage-report.md)

## Technical Documentation

Detailed explanations of the application architecture, interactive features, API integration, testing, and deployment are available in:

[Technical Documentation](docs/technical-documentation.md)

## Current Limitations

- The contact form does not send real messages.
- The portfolio does not use a backend server.
- GitHub repository retrieval depends on internet connectivity and API availability.
- Search, filtering, and sorting preferences are not saved after refreshing.
- The manually defined project ideas represent proposed applications rather than completed products.

## Future Improvements

Potential improvements include:

- Adding more completed software projects
- Connecting the contact form to a backend service
- Adding additional project categories
- Introducing more advanced sorting options
- Adding a downloadable professional resume
- Expanding the portfolio as my technical experience develops

## Author

Sara Almugbel  
Software Engineering Student – KFUPM
