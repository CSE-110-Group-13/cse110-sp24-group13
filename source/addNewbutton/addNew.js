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
        position: fixed;
        top: 2%;
        right: 3%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        user-select: none;
        font-family: 'Varela Round', sans-serif;
      }
      
      .svg-button {
        cursor: pointer;
        width: 3rem;
        height: 3rem;
        margin: 0 0.5rem;
      }
      
      .hidden {
        visibility: hidden;
        position: absolute;
      }
      
      .back-button {
        position: relative;
        top: 1rem;
      }
      
      .action-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5%;
        background-color: #f5f5f5;
        border-radius: 15%; 
        padding-top: 3%;
        padding-bottom: 9%;
        padding-left: 5%;
        padding-right: 25%;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      .add-new-container {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f5f5f5;
        border-radius: 30%; 
        padding-top: 10%;
        padding-bottom: 28%;
        padding-left: 10%;
        padding-right: 32%;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      
      .action-container .back-button + .add-note-button {
        margin-left: 5%; 
      }

      .back-button {
        margin-top: 5%;
      }
      
      .svg-label {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: black;
      }
    
    `;

    this.shadowRoot.appendChild(styles);

    const buttonsContainer = document.createElement("div");
    buttonsContainer.id = "buttonsContainer";
    this.shadowRoot.appendChild(buttonsContainer);

    const addNewSvg = await fetchSvg('../addNewButton/addNew.svg');
    const backSvg = await fetchSvg('../addNewButton/back.svg');
    const addNoteSvg = await fetchSvg('../addNewButton/addNote.svg');
    const addProjSvg = await fetchSvg('../addNewButton/addProj.svg');

    // Add New Container
    const addNewContainer = document.createElement("div");
    addNewContainer.classList.add("add-new-container");
    const addNewButton = document.createElement("div");
    addNewButton.innerHTML = addNewSvg;
    addNewButton.classList.add("svg-button");
    addNewButton.onclick = () => {
      addNewContainer.classList.add("hidden");
      actionContainer.classList.remove("hidden");
    };
    addNewContainer.appendChild(addNewButton);

    // Action Container
    const actionContainer = document.createElement("div");
    actionContainer.classList.add("action-container", "hidden");

    const backButton = document.createElement("div");
    backButton.innerHTML = backSvg;
    backButton.classList.add("svg-button", "back-button");
    backButton.onclick = () => {
      addNewContainer.classList.remove("hidden");
      actionContainer.classList.add("hidden");
    };
    actionContainer.appendChild(backButton);

    const addNoteButton = document.createElement("div");
    addNoteButton.innerHTML = addNoteSvg;
    addNoteButton.classList.add("svg-button");
    addNoteButton.onclick = () => {
      window.location.href = "../note/edit-note.html";
    };
    actionContainer.appendChild(addNoteButton);

    const addProjectButton = document.createElement("div");
    addProjectButton.innerHTML = addProjSvg;
    addProjectButton.classList.add("svg-button");
    addProjectButton.onclick = () => {
      window.location.href = "#"; 
    };
    actionContainer.appendChild(addProjectButton);

    // Append containers to the buttonsContainer
    buttonsContainer.appendChild(addNewContainer);
    buttonsContainer.appendChild(actionContainer);
  }
}

customElements.define('add-new-btn', AddNewBtn);
