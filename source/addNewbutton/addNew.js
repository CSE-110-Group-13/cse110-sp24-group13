class AddNewBtn extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Create a shadow dom
    const shadow = this.attachShadow({ mode: "open" });

    const styles = document.createElement('style');
    styles.innerHTML = `
      #addNewBtn {
        height: 10vh;
        width: 20%;
        background-color: #F8F8F8;
        position: fixed;
        top: 5%;
        left: 102%;
        justify-content: center;
        align-items: center;
        transition: transform 0.6s ease-in-out;
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
      }

      a {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-decoration: none;
        gap: 0.3em;
        font-family: 'Varela Round', sans-serif;
        padding: 7px;
        
      }

     nav {
      display: flex;
     }

      button {
        position: absolute;
        top: 4%;
        left: 90%;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        transition: ease;
        font-family: 'Varela Round', sans-serif;

      }


    `

    // Attach element to shadow dom
    const addNewBtnContainer = document.createElement("div");
    addNewBtnContainer.id = "addNewBtn";
    shadow.appendChild(addNewBtnContainer);

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
    addBtn.textContent = "Add New";
    addBtn.id = "add-button";
    addBtn.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>';

    // Add event listener to the add new button
    addBtn.addEventListener("click", () => {
      addNewBtnContainer.classList.toggle("open");
      
      if (addNewBtnContainer.classList.contains("open")) {
        addBtn.innerHTML = '';
        addBtn.textContent = '>';
        addBtn.style.left = '81.5%';
        addBtn.style.top = '8%';
      }
      else{
        addBtn.innerHTML = '';
        addBtn.textContent = 'Add New';
        addBtn.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>';
        addBtn.style.top = '4%';
        addBtn.style.left = '90%';
      }
    });

    // Append anchors and button to navbar
    navbar.appendChild(anchorToAddNewNote);
    navbar.appendChild(anchorToAddNewProject);

    
    addNewBtnContainer.appendChild(navbar);
    shadow.appendChild(addNewBtnContainer);
    shadow.appendChild(styles);
    shadow.appendChild(addBtn);

  }

}

customElements.define('add-new-btn', AddNewBtn);
