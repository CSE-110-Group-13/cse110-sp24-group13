class AddNewBtn extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const styles = document.createElement('style');
    styles.innerHTML = `
      #buttonsContainer {
        display: flex;
        position: fixed; 
        top: 2%;
        right: 2%;
        user-select: none;
        font-family: 'Varela Round', sans-serif;
      }

      svg {
        cursor: pointer;
        width: 3rem;
        height: 3rem;
        margin: 0 1rem;
      }

      .hidden {
        display: none;
      }
    `;

    this.shadowRoot.appendChild(styles);

    const buttonsContainer = document.createElement("div");
    buttonsContainer.id = "buttonsContainer";
    this.shadowRoot.appendChild(buttonsContainer);

    // Create SVG buttons
    const addNewButton = document.createElement("svg");
    addNewButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>';
    addNewButton.setAttribute("viewBox", "0 0 512 512");
    addNewButton.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    addNewButton.onclick = () => {
      addNewButton.classList.add("hidden");
      backButton.classList.remove("hidden");
      addNoteButton.classList.remove("hidden");
      addProjectButton.classList.remove("hidden");
    };
    buttonsContainer.appendChild(addNewButton);

    const backButton = document.createElement("svg");
    backButton.classList.add("hidden");
    backButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/>';
    backButton.setAttribute("viewBox", "0 0 320 512");
    backButton.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    backButton.onclick = () => {
      addNewButton.classList.remove("hidden");
      backButton.classList.add("hidden");
      addNoteButton.classList.add("hidden");
      addProjectButton.classList.add("hidden");
    };
    buttonsContainer.appendChild(backButton);

    const addNoteButton = document.createElement("svg");
    addNoteButton.classList.add("hidden");
    addNoteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>';
    addNoteButton.setAttribute("viewBox", "0 0 512 512");
    addNoteButton.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    addNoteButton.onclick = () => {
      window.location.href = "../note/edit-note.html";
    };
    buttonsContainer.appendChild(addNoteButton);

    const addProjectButton = document.createElement("svg");
    addProjectButton.classList.add("hidden");
    addProjectButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>';
    addProjectButton.setAttribute("viewBox", "0 0 512 512");
    addProjectButton.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    addProjectButton.onclick = () => {
      window.location.href = "#"; // Add the correct URL for adding a project
    };
    buttonsContainer.appendChild(addProjectButton);
  }
}

customElements.define('add-new-btn', AddNewBtn);
