class AddNewBtn extends HTMLElement {
  /**
 * Creates an instance of AddNewBtn.
 *
 * @constructor
 */
constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  /**
 * The real constructor
 */
connectedCallback() {
    const styles = document.createElement('style');
    styles.innerHTML = `
      #buttonsContainer {
        display: flex;
        height: 10vh;
        width: 20vw;
        user-select: none;
        font-family: 'Varela Round', sans-serif;
      }

      .closed {
        display: none !important;
      }

      #addNewContainer {
        display: flex;
        width: 100%;
        justify-content: center;
        position: fixed; 
        top: 2%;
        right: -45%; 
      }

      #addNewButton {
        box-sizing: border-box;
        cursor: pointer;
        margin: 0;
        padding: 0.4vh 1vw;
        background: #F8F8F8;
        border: none;
        border-radius: 15px;
      }

      #addNewButton span {
        font-family: 'Varela Round', sans-serif;
        font-size: max(8px, 0.9vw);
      }


      #addNoteProjectContainer {
        display: flex;
        flex-direction: row;
        width: 100%;
        background: #F8F8F8;
        align-items: center;
        border-radius: 15px;
        padding-left: 0.3vw;
        position: fixed; 
        top: 2%;
        right: -85%; 
      }

      #addNoteProjectContainer div {
        width: 1.5em;
      }

      #addNoteProjectContainer nav {
        display: flex;
        flex-direction: row;
        gap: 1.5em;
        padding-right: 10px;
      }

      #addNoteProjectContainer a {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.3em;

      }

      a svg {
        width: 8vw;
        height: 7vh;
        max-width: 3em;
        max-height: 3em;
      }
      
      a {
        text-decoration: none;
        color: black;
      }

      #addNoteProjectContainer span {
        font-size: max(7.5px, min(0.85vw, 15px));
      }

      #addNoteProjectContainer button {
        box-sizing: border-box;
        cursor: pointer;
        padding: 0.5em;
        padding-left: 1em;
        margin: 0;
        background: none;
        border: none;
      }

      #addNoteProjectContainer button svg {
        width: 3vw;
        height: 5vh;
        max-width: 1.5em;
        max-height: 1.5em;
      }
    `

    // Attach element to shadow dom, create container for all buttons
    const buttonsContainer = document.createElement("div");
    buttonsContainer.id = "buttonsContainer";
    this.shadowRoot.appendChild(buttonsContainer);

    // Create container for addNew
    const addNewContainer = document.createElement("div");
    addNewContainer.id = "addNewContainer";
    buttonsContainer.appendChild(addNewContainer);
    // Create container for addNewNote and addNewProject
    const addNoteProjectContainer = document.createElement("div");
    addNoteProjectContainer.id = "addNoteProjectContainer";
    buttonsContainer.appendChild(addNoteProjectContainer);

    // Create closeButton when addNew is clicked
    const closeButton = document.createElement("button");
    closeButton.innerHTML = `<svg viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.5" d="M9.74865 6.98486L3.10803 0.344238C2.64905 -0.114746 1.90686 -0.114746 1.45276 0.344238L0.349241 1.44775C-0.109744 1.90674 -0.109744 2.64893 0.349241 3.10303L5.05139 7.81494L0.344358 12.522C-0.114627 12.981 -0.114627 13.7231 0.344358 14.1772L1.44787 15.2856C1.90686 15.7446 2.64905 15.7446 3.10315 15.2856L9.74377 8.64502C10.2076 8.18604 10.2076 7.44385 9.74865 6.98486Z" fill="black"/></svg>`;
    addNoteProjectContainer.appendChild(closeButton);
    // Create a spacing div
    const spacingDiv = document.createElement("div");
    addNoteProjectContainer.appendChild(spacingDiv);
    // Create navbar for closeButton, addNote, addProject
    const navbarAddNoteAddProject = document.createElement("nav");
    addNoteProjectContainer.appendChild(navbarAddNoteAddProject);
    // Create addNote and addProject anchors, append to addNoteProjectContainer
    const anchorToAddNote = document.createElement("a");
    const anchorToAddProject = document.createElement("a");
    // Add href property to anchors
    anchorToAddNote.href = "../note/edit-note.html";
    anchorToAddProject.href = "#";
    // Add image elements
    anchorToAddNote.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>';
    anchorToAddProject.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>';
    // Append addNote and addProject anchors to navbarAddNoteAddProject
    navbarAddNoteAddProject.appendChild(anchorToAddNote);
    navbarAddNoteAddProject.appendChild(anchorToAddProject);
    // Add text content to anchors
    const addNoteLabel = document.createElement('span');
    addNoteLabel.textContent = "Add Note";
    anchorToAddNote.appendChild(addNoteLabel);
    const addProjectLabel = document.createElement('span');
    addProjectLabel.textContent = "Add Project";
    anchorToAddProject.appendChild(addProjectLabel);

    // Create add new button
    const addNewButton = document.createElement('button');
    addNewButton.id = "addNewButton";
    addNewButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>';
    addNewButton.innerHTML += "<span>Add New</span>";
    // Append addNewButton to addNewContainer
    addNewContainer.appendChild(addNewButton);

    // Create default class for addNewContainer to be open and addNoteProjectContainer to be closed
    addNewContainer.classList.add("open");
    addNoteProjectContainer.classList.add("closed");

    // Add event listener to the addNewButton
    addNewButton.addEventListener('click', () => {
      addNewContainer.classList.toggle("open");
      addNewContainer.classList.toggle("closed");
      addNoteProjectContainer.classList.toggle("closed");
      addNoteProjectContainer.classList.toggle("open");
    })
    // add event listener to closeButton
    closeButton.addEventListener('click', () => {
      addNewContainer.classList.toggle("open");
      addNewContainer.classList.toggle("closed");
      addNoteProjectContainer.classList.toggle("closed");
      addNoteProjectContainer.classList.toggle("open");
    })

    this.shadowRoot.appendChild(styles);
    // this.shadowRoot.appendChild(addBtn);
  }

}

customElements.define('add-new-btn', AddNewBtn);