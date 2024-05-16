class VerticalNavbar extends HTMLElement {
  constructor() {
    super();

    // Create a shadow dom, access it with this.shadowRoot
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    // Link to Stylesheet
    const linkToStylesheet = document.createElement('link');
    linkToStylesheet.rel = 'stylesheet';
    linkToStylesheet.href = '../verticalnavbar/verticalnavbar.css';
    this.shadowRoot.appendChild(linkToStylesheet);

    // Attach element to shadow dom
    const navbarContainer = document.createElement("div");
    navbarContainer.id = "verticalNavbar";
    this.shadowRoot.appendChild(navbarContainer);

    // Create nav element to contain anchors to other pages
    const navbar = document.createElement("nav");
    navbarContainer.appendChild(navbar);
    const anchorToHome = document.createElement("a");
    const anchorToFavorites = document.createElement("a");
    const anchorToLibrary = document.createElement("a");
    const anchorToCalendar = document.createElement("a");
    const anchorToTaskList = document.createElement("a");

    // Add href property to anchors
    anchorToHome.href = "../homepage/index.html";
    anchorToFavorites.href = "../favorites/favorites.html";
    anchorToLibrary.href = "../library/library.html";
    anchorToCalendar.href = "../calendar/calendar.html";
    anchorToTaskList.href = "../tasklist/tasklist.html";

    // Add text content to anchors
    anchorToHome.textContent = "Home";
    anchorToFavorites.textContent = "Favorites";
    anchorToLibrary.textContent = "Library";
    anchorToCalendar.textContent = "Calendar";
    anchorToTaskList.textContent = "Task List";

    // Append anchors to navbar
    navbar.appendChild(anchorToHome);
    navbar.appendChild(anchorToFavorites);
    navbar.appendChild(anchorToLibrary);
    navbar.appendChild(anchorToCalendar);
    navbar.appendChild(anchorToTaskList);
  }
}

customElements.define('vertical-navbar', VerticalNavbar);