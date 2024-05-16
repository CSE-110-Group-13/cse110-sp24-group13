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
    const anchorToSettings = document.createElement("a");
    anchorToSettings.id = "settingsAnchor";

    // Add href property to anchors
    anchorToHome.href = "../homepage/index.html";
    anchorToFavorites.href = "../favorites/favorites.html";
    anchorToLibrary.href = "../library/library.html";
    anchorToCalendar.href = "../calendar/calendar.html";
    anchorToTaskList.href = "../tasklist/tasklist.html";
    anchorToSettings.href = "../settings/settings.html";

    // Create image elements
    const homeImg = document.createElement('img');
    homeImg.src = '../verticalnavbar/icons/house-solid.svg';
    anchorToHome.appendChild(homeImg);
    const favoritesImg = document.createElement('img');
    favoritesImg.src = '../verticalnavbar/icons/star-solid.svg';
    anchorToFavorites.appendChild(favoritesImg);
    const libraryImg = document.createElement('img');
    libraryImg.src = '../verticalnavbar/icons/book-solid.svg';
    anchorToLibrary.appendChild(libraryImg);
    const calendarImg = document.createElement('img');
    calendarImg.src = '../verticalnavbar/icons/calendar-days-solid.svg';
    anchorToCalendar.appendChild(calendarImg);
    const taskListImg = document.createElement('img');
    taskListImg.src = '../verticalnavbar/icons/list-check-solid.svg';
    anchorToTaskList.appendChild(taskListImg);
    const settingsImg = document.createElement('img');
    settingsImg.src = '../verticalnavbar/icons/gear-solid.svg';
    anchorToSettings.appendChild(settingsImg);

    // Add text content to anchors
    const homeLabel = document.createElement('span');
    homeLabel.textContent = "Home"
    anchorToHome.appendChild(homeLabel);
    const favoritesLabel = document.createElement('span');
    favoritesLabel.textContent = "Favorites";
    anchorToFavorites.appendChild(favoritesLabel);
    const libraryLabel = document.createElement('span');
    libraryLabel.textContent = "Library";
    anchorToLibrary.appendChild(libraryLabel);
    const calendarLabel = document.createElement('span');
    calendarLabel.textContent = "Calendar";
    anchorToCalendar.appendChild(calendarLabel);
    const taskListLabel = document.createElement('span');
    taskListLabel.textContent = "Task List";
    anchorToTaskList.appendChild(taskListLabel);
    const settingsLabel = document.createElement('span');
    settingsLabel.textContent = "Settings";
    anchorToSettings.appendChild(settingsLabel);

    // Append anchors to navbar
    navbar.appendChild(anchorToHome);
    navbar.appendChild(anchorToFavorites);
    navbar.appendChild(anchorToLibrary);
    navbar.appendChild(anchorToCalendar);
    navbar.appendChild(anchorToTaskList);
    navbar.appendChild(anchorToSettings);
  }
}

customElements.define('vertical-navbar', VerticalNavbar);