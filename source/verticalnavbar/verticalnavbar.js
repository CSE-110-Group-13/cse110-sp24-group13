class VerticalNavBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Create a shadow dom
    const shadow = this.attachShadow({ mode: "open" });

    // Attach element to shadow dom
    const navbarContainer = document.createElement("div");
    navbarContainer.id = "verticalNavBar";
    navbarContainer.textContent = "Testing";
    shadow.appendChild(navbarContainer);
  }
}

customElements.define('vertical-navbar', VerticalNavBar);