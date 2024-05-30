class AddNewBtnOld extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const styles = document.createElement('style');
    styles.innerHTML = `
      #addNewBtn {
        height: 10vh;
        width: 20%;
        background-color: #F8F8F8;
        position: fixed;
        top: 5%;
        left: 100%; 
        justify-content: center;
        align-items: center;
        border-radius: 15px;
        transition: opacity 2s ease-in-out;
        transform: translateX(0%);
      }

      #addNewBtn.open {
        transform: translateX(-100%)
      }

      a svg {
        width: 2em;
        height: auto;
      }

      a span {
        color: #000;
        font-size: 1em;
        font-family: 'Varela Round';
        width: 5em;
        align-items: center;
        padding-left: 5px;
      }

      a {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-decoration: none;
        gap: 0.3em;
        font-family: 'Varela Round', sans-serif;
        padding: 7px;
        padding-left: 20px;
        
      }

     nav {
      display: flex;
     }

      button {
        position: absolute;
        top: 4%;
        left: 90%;
        display: flex;
        flex-direction: column;
        gap: 0.3em;
        align-items: center;
        justify-content: center;
        background: #F8F8F8;
        height: 10vh;
        width: 8%;
        border-radius: 20px;
        border: none;
        transition: opacity 2s ease-in-out;
        
      }

      button span {
        color: #000;
        font-size: 1em;
        font-family: 'Varela Round';
        width: 5em;
        align-items: center;

      }

      button svg {
        width: 3em;
        height: auto;
      }
    `

    // Attach element to shadow dom
    const addNewBtnContainer = document.createElement("div");
    addNewBtnContainer.id = "addNewBtn";
    this.shadowRoot.appendChild(addNewBtnContainer);

    // Cream nav element to contain anchors to other pages
    const navbar = document.createElement("nav");
    addNewBtnContainer.appendChild(navbar);
    const anchorToAddNewNote = document.createElement("a");
    const anchorToAddNewProject = document.createElement("a");

    // Add href property to anchors
    anchorToAddNewNote.href = "#";
    anchorToAddNewProject.href = "#";

    // Add image elements
    anchorToAddNewNote.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>';
    anchorToAddNewProject.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>';

    // Add text content to anchors
    const newNoteLabel = document.createElement('span');
    newNoteLabel.textContent = "Add Note";
    anchorToAddNewNote.appendChild(newNoteLabel);
    const newProjectLabel = document.createElement('span');
    newProjectLabel.textContent = "Add Project";
    anchorToAddNewProject.appendChild(newProjectLabel);

    // Create add new button
    const addBtn = document.createElement('button');
    addBtn.id = "add-button";
    addBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>';
    addBtn.innerHTML += "<span> Add New <\span>";

    // Add event listener to the add new button
    addBtn.addEventListener("click", () => {
      addNewBtnContainer.classList.toggle("open");
      
      if (addNewBtnContainer.classList.contains("open")) {
        addBtn.innerHTML = '';
        addBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/></svg>';
        addBtn.style.left = '77%';
        addBtn.style.top = '5%';
        addBtn.querySelector('svg').style.width = '1em';
        addBtn.style.background = 'none';
      }
      else{
        addBtn.innerHTML = '';
        addBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>';
        addBtn.innerHTML += "<span> Add New </span>";
        addBtn.style.top = '4%';
        addBtn.style.left = '90%';
        addBtn.style.background = '#F8F8F8';
        addBtn.style.height = '10vh';
        addBtn.style.width = '8%';
      }
    });

    // Append anchors and button to navbar
    navbar.appendChild(anchorToAddNewNote);
    navbar.appendChild(anchorToAddNewProject);
    
    addNewBtnContainer.appendChild(navbar);
    this.shadowRoot.appendChild(addNewBtnContainer);
    this.shadowRoot.appendChild(styles);
    this.shadowRoot.appendChild(addBtn);

  }

}

customElements.define('add-new-btn-old', AddNewBtnOld);