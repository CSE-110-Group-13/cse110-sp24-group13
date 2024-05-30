async function fetchSvg(url) {
  const response = await fetch(url);
  const text = await response.text();
  return text;
}

class AddNewBtn extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
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

      .svg-button {
        cursor: pointer;
        width: 3rem;
        height: 3rem;
        margin: 0 1rem;
      }

      .hidden {
        display: none;
        visibility: hidden;
      }

      .back-button {
        position: relative;
        top: 1rem; 
      }

      .action-container {
        background-color: grey;
        border-radius: 3rem; 
        padding: 2rem; 
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem; 
        width: 20rem;
      }

      .svg-button-container {
        cursor: pointer;
        width: 3rem;
        height: 3rem;
        margin: 0 1rem;
      }
    `;

    this.shadowRoot.appendChild(styles);

    const buttonsContainer = document.createElement("div");
    buttonsContainer.id = "buttonsContainer";
    this.shadowRoot.appendChild(buttonsContainer);

    // Correct paths to the SVG files
    const addNewSvg = await fetchSvg('../addNewButton/addNew.svg');
    const backSvg = await fetchSvg('../addNewButton/back.svg');
    const addNoteSvg = await fetchSvg('../addNewButton/addNote.svg');
    const addProjSvg = await fetchSvg('../addNewButton/addProj.svg');

    // Create SVG elements with fetched content
    const addNewButton = document.createElement("div");
    addNewButton.innerHTML = addNewSvg;
    addNewButton.classList.add("svg-button");
    addNewButton.onclick = () => {
      addNewButton.classList.add("hidden");
      actionContainer.classList.remove("hidden");
    };
    buttonsContainer.appendChild(addNewButton);

    const actionContainer = document.createElement("div");
    actionContainer.classList.add("action-container", "hidden");

    const backButton = document.createElement("div");
    backButton.innerHTML = backSvg;
    backButton.classList.add("svg-button", "back-button");
    backButton.onclick = () => {
      addNewButton.classList.remove("hidden");
      actionContainer.classList.add("hidden");
    };
    actionContainer.appendChild(backButton);

    const addNoteButton = document.createElement("div");
    addNoteButton.innerHTML = addNoteSvg;
    addNoteButton.classList.add("svg-button", "svg-button-container");
    addNoteButton.onclick = () => {
      window.location.href = "../note/edit-note.html";
    };
    actionContainer.appendChild(addNoteButton);

    const addProjectButton = document.createElement("div");
    addProjectButton.innerHTML = addProjSvg;
    addProjectButton.classList.add("svg-button", "svg-button-container");
    addProjectButton.onclick = () => {
      window.location.href = "#"; // Add the correct URL for adding a project
    };
    actionContainer.appendChild(addProjectButton);

    buttonsContainer.appendChild(actionContainer);
  }
}

customElements.define('add-new-btn', AddNewBtn);
