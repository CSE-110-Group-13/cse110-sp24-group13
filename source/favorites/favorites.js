import { 
    getNoteTableFromStorage, getNoteFromTable, modifyNoteFavorited 
  } from "../backend/NoteTable.js";
  
  window.addEventListener("DOMContentLoaded", init);
  
  function createNoteElement(noteObject) {
    const noteContainerMain = document.createElement("span");
    noteContainerMain.className = "note-wrapper";
  
    const noteContainer = document.createElement("a");
    noteContainer.href = "../library/library.html";
    noteContainer.className = "note";
    noteContainerMain.appendChild(noteContainer);
  
    const headerElement = document.createElement('header');
    noteContainer.appendChild(headerElement);
  
    const contentContainer = document.createElement('div');
    contentContainer.classList.add('content-container');
    noteContainer.appendChild(contentContainer);
  
    const dateContainer = document.createElement('div');
    dateContainer.classList.add('dates');
    contentContainer.appendChild(dateContainer);
  
    const titleElement = document.createElement('h2');
    titleElement.textContent = noteObject.title;
    headerElement.appendChild(titleElement);
  
    const date = getFormattedDate(noteObject.date);
    const lastEdited = getFormattedDate(noteObject.lastEdited);
  
    const dateElement = document.createElement('p');
    dateElement.textContent = `Started ${date}`;
    dateContainer.appendChild(dateElement);
  
    const lastEditedElement = document.createElement('p');
    lastEditedElement.textContent = `Worked on: ${lastEdited}`;
    dateContainer.appendChild(lastEditedElement);
  
    const textElement = document.createElement('p');
    textElement.id = 'note-text';
    textElement.textContent = noteObject.text;
    contentContainer.appendChild(textElement);
  
    const tagsProjectContainer = document.createElement('div');
    tagsProjectContainer.classList.add('tags-project');
    headerElement.appendChild(tagsProjectContainer);
  
    noteObject.tags.forEach(tag => {
      const tagElement = document.createElement('span');
      tagElement.textContent = tag;
      tagsProjectContainer.appendChild(tagElement);
    });
  
    if (noteObject.projectList.length != 0) {
      const verticalLine = document.createElement('div');
      verticalLine.id = 'vertical-line';
      tagsProjectContainer.appendChild(verticalLine);
    }
  
    noteObject.projectList.forEach(project => {
      const projectElement = document.createElement('span');
      projectElement.textContent = project;
      tagsProjectContainer.appendChild(projectElement);
    });
  
    const button = document.createElement("button");
    button.dataset.noteID = noteObject.noteID;
    button.className = "favorite-button";
    button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="24" height="24"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>`;
    button.onclick = () => toggleFavorite(button);
    noteContainerMain.appendChild(button);
  
    return noteContainerMain;
  }
  
  function init() {
    const favoriteContainer = document.createElement("div");
    const favorite = document.getElementById("favorites");
    favorite.appendChild(favoriteContainer);
    favoriteContainer.id = "favoritesContainer";

    // Test notes
    // const testNotes = [
    //     {
    //     noteID: 1,
    //     title: "Test Note 1",
    //     date: "2024-01-01",
    //     lastEdited: "2024-06-01",
    //     text: "This is a test note.",
    //     tags: ["tag1", "tag2"],
    //     projectList: ["Project A"],
    //     favorited: true
    //     },
    //     {
    //     noteID: 2,
    //     title: "Test Note 2",
    //     date: "2024-02-01",
    //     lastEdited: "2024-05-01",
    //     text: "Another test note.",
    //     tags: ["tag3"],
    //     projectList: [],
    //     favorited: true
    //     }
    // ];

    // testNotes.forEach(noteObject => {
    //     const noteElement = createNoteElement(noteObject);
    //     favoriteContainer.appendChild(noteElement);
    // });
  
    // const IDContainer = JSON.parse(window.localStorage.getItem("IDContainer"));
    // let loadedNotes = [];
    // for (let i = 0; i < IDContainer.length; i++) {
    //   loadedNotes.push(getNoteFromTable(IDContainer[i]));
    // }
    
    // loadedNotes.sort((a, b) => new Date(b.lastEdited) - new Date(a.lastEdited));
  
    // for (let i = 0; i < loadedNotes.length; i++) {
    //   let noteID = loadedNotes[i].noteID;
    //   let noteObject = getNoteFromTable(noteID);
    //   if (noteObject.favorited === true) {
    //     const noteElement = createNoteElement(noteObject);
    //     favoriteContainer.appendChild(noteElement);
    //   }
    // }

    const noteTable = getNoteTableFromStorage();
    // noteTable.sort((a, b) => new Date(b.lastEdited) - new Date(a.lastEdited));
    for (const[key, value] of Object.entries(noteTable)) {
      if (value.favorited === true) {
        const noteElement = createNoteElement(value);
        favoriteContainer.appendChild(noteElement);
      }
    }
  }
  
  function toggleFavorite(button) {
    const noteID = button.dataset.noteID;
    const note = getNoteFromTable(noteID);


  
    if (note) {
      const newFavoritedStatus = !note.favorited;
      modifyNoteFavorited(noteID, newFavoritedStatus);
      button.dataset.favorited = newFavoritedStatus;
      if (!newFavoritedStatus) {
        button.parentElement.remove();
      }
    }
  }
  
  function getFormattedDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    let suffix = "";
  
    if (day === 1 || day === 21 || day === 31) {
      suffix = "st";
    } else if (day === 2 || day === 22) {
      suffix = "nd";
    } else if (day === 3 || day === 23) {
      suffix = "rd";
    } else {
      suffix = "th";
    }
  
    const options = { month: 'long' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  
    return `${formattedDate} ${day}${suffix}`;
  }
  
  

  