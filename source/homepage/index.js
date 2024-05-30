import { 
  getNoteFromTable,modifyNoteFavorited,
} from "../backend/NoteTable.js";


window.addEventListener("DOMContentLoaded", init);


//Function to create a Note Element;
function createNoteElement(noteObject){
  //Wrapper container for a note Element. That will incude a note Contianer and a button.
  const noteContainerMain = document.createElement("span");
  noteContainerMain.className = "note-wrapper";

  //Note Container that is an anchor to another page. 
  const noteContainer = document.createElement("a");
  noteContainer.href = "../library/library.html";
  noteContainer.className = "note";

  //append note container to wrapper container. 
  noteContainerMain.appendChild(noteContainer);

  // Create a header
  const headerElement = document.createElement('header');
  noteContainer.appendChild(headerElement);

  // Create a container for the content (text, date, and lastEdited)
  const contentContainer = document.createElement('div');
  contentContainer.classList.add('content-container');
  noteContainer.appendChild(contentContainer);

  // Create a date container
  const dateContainer = document.createElement('div');
  dateContainer.classList.add('dates');
  contentContainer.appendChild(dateContainer);

  // Title of note
  const titleElement = document.createElement('h2');
  titleElement.textContent = noteObject.title;
  headerElement.appendChild(titleElement);

  // Call the function getFormattedDate()
  const date = getFormattedDate(noteObject.date);
  const lastEdited = getFormattedDate(noteObject.lastEdited);

  // Date Started of note
  const dateElement = document.createElement('p');
  dateElement.textContent = `Started ${date}`;
  dateContainer.appendChild(dateElement);

  // Last Edited of note
  const lastEditedElement = document.createElement('p');
  lastEditedElement.textContent = `Worked on: ${lastEdited}`;
  dateContainer.appendChild(lastEditedElement);

  // Text of note
  const textElement = document.createElement('p');
  textElement.id = 'note-text';
  textElement.textContent = noteObject.text;
  contentContainer.appendChild(textElement);

  // Create a tags-project container
  const tagsProjectContainer = document.createElement('div');
  tagsProjectContainer.classList.add('tags-project');
  headerElement.appendChild(tagsProjectContainer);

  // Add each tag separately
  noteObject.tags.forEach(tag => {
    const tagElement = document.createElement('span');
    tagElement.textContent = tag;
    tagsProjectContainer.appendChild(tagElement);
  });
  
  // Add line separating the tags and projects
  if(noteObject.projectList.length != 0) {
    const verticalLine = document.createElement('div');
    verticalLine.id = 'vertical-line';
    tagsProjectContainer.appendChild(verticalLine);
  }
  
  // Add each project separately
  noteObject.projectList.forEach(project => {
    const projectElement = document.createElement('span');
    projectElement.textContent = project;
    tagsProjectContainer.appendChild(projectElement);
  });


  //Favorite button of the note. 
  let favorited = noteObject.favorited;


  const button = document.createElement("button");
  button.dataset.noteID = noteObject.noteID;
  button.dataset.favorited = noteObject.favorited;
  if( favorited == true){
   button.innerText = "Favorited";
  }

  else{
    button.innerText = "Note Favorited";
  }

  button.className = "favorite-button";
  button.onclick = () => toggleFavorite(button);

      
  
  //Append favorite button to the wrapper container. 
  noteContainerMain.appendChild(button);

  return noteContainerMain;

}

const recentContainer = document.createElement("div");
const recents = document.getElementById("recents");
recents.appendChild(recentContainer);
recentContainer.id = "recentsContainer";

const favoriteContainer = document.createElement("div");
const favorite = document.getElementById("favorites");
favorite.appendChild(favoriteContainer);
favoriteContainer.id = "favoritesContainer";

function init(){
  
  //Appended those two as children of the recents module.

  //Get list of all notes from id container. 
  const IDContainer = JSON.parse(window.localStorage.getItem("IDContainer"));
  //Define an array to store all the notes from id container. 
  let loadedNotes = [];
  // Upload notes to array
  for(let i = 0; i < IDContainer.length; i++){
    loadedNotes.push(getNoteFromTable(IDContainer[i]));
  }
     // Sort notes based off last edited. WORK IN PROGRESS NOT FULLY FUNCTIONAL. 
  loadedNotes.sort((a,b) => new Date(b.lastEdited) - new Date(a.lastEdited));

  //Testing Values for console. 
  /*
    const notesTable = {
    "ABC": {
        "noteID": "ABC",
        "text": "buy eggs",
        "date": "2024-5-21",
        "lastEdited": "2025-5-23",
        "title": "to do at grocery store",
        "projectList": [],
        "favorited": false,
        "tags": ["bb", "cc"]
    },
    "21kfasde": {
        "noteID": "21kfasde",
        "text": "mow lawn",
        "date": "2024-5-22",
        "lastEdited": "2026-5-22",
        "title": "chores",
        "projectList": ["Ash"],
        "favorited": false,
        "tags": ["a"]
    },
    "XYZ": {
        "noteID": "XYZ",
        "text": "buy eggs",
        "date": "2024-5-21",
        "lastEdited": "2025-5-23",
        "title": "to do at grocery store",
        "projectList": [],
        "favorited": false,
        "tags": []
    }
};

// Store the combined notesTable in local storage
localStorage.setItem('NoteTable', JSON.stringify(notesTable));

// Define the ID array correctly
const ID = ["ABC", "21kfasde", "XYZ"];

// Store the ID array in local storage
localStorage.setItem('IDContainer', JSON.stringify(ID));
*/

  


  //For all the loadedNOtes upload them unto homepage 
  for(let i = 0; i < loadedNotes.length; i++){
    let noteID = loadedNotes[i].noteID;

    
    // Check if the noteID already exists in recentContainer

    // If the noteID doesn't exist, create and append the note element
 
        const noteObject = getNoteFromTable(noteID);
        const noteElement = createNoteElement(noteObject);
        recentContainer.appendChild(noteElement);
    
  }

  for(let i = 0; i < loadedNotes.length; i++){
    let noteID = loadedNotes[i].noteID;
    
    // Check if the noteID already exists in favoritesContainer
  
    
    
    // If the noteID doesn't exist and it is favorited, create and append the note element
   
        let noteObject = getNoteFromTable(noteID);
        if (noteObject.favorited === true) {
            const noteElement = createNoteElement(noteObject);
            favoritesContainer.appendChild(noteElement);
        
    }
  }

}

function reset() {
  const recentsContainer = document.getElementById('recentsContainer');
  while (recentsContainer.firstChild) {
    recentsContainer.removeChild(recentsContainer.firstChild);
  }

  const favoriteContainer = document.getElementById('favoritesContainer');
  while (favoriteContainer.firstChild) {
    favoriteContainer.removeChild(favoriteContainer.firstChild);
  }
  
}




//Function to change favorite button from highlighted to note highlighted. 
function toggleFavorite(button){

  const noteID = button.dataset.noteID;
  const note = getNoteFromTable(noteID);

  if(note){
    const newFavoritedStatus = !note.favorited;

    modifyNoteFavorited(noteID, newFavoritedStatus);
    if (newFavoritedStatus) {
      button.innerText = 'Favorited';
      button.dataset.favorited = newFavoritedStatus;
    } else {
      button.innerText = 'Not Favorited';
      button.dataset.favorited = newFavoritedStatus;
      button.style.backgroundColor = ''; // Revert to default or another style
    }
  }
  reset();
  init();
}

/**
  * Takes in a date string and converts it to the format Month Day with the corresponding suffix
  * @param {string}  dateString string in the format YYYY-MM-DD
  * @return {string} a string in the correct format
  */
function getFormattedDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  let suffix = "";

  // Determine the suffix based on the day
  if (day === 1 || day === 21 || day === 31) {
    suffix = "st";
  }
  else if (day === 2 || day === 22) {
    suffix = "nd";
  }
  else if (day === 3 || day === 23) {
    suffix = "rd";
  }
  else {
    suffix = "th";
  }

  // Format the string
  const options = { month: 'long' };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

  return `${formattedDate} ${day}${suffix}`;
}



const expandIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24">
  <path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/>
</svg>`;

const collapseIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24">
  <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
</svg>`;

let isRecentsCollapsed = false;
let isFavoritesCollapsed = false;

function toggleCollapse(event, type) {
  event.preventDefault();

  if (type === 'recents') {
    const recentsContainer = document.getElementById('recents');
    recentsContainer.classList.toggle('collapsed');
    isRecentsCollapsed = !isRecentsCollapsed;
    const collapseButton = document.getElementById('collapseButton1');
    collapseButton.innerHTML = isRecentsCollapsed ? collapseIcon : expandIcon;
  } else if (type === 'favorites') {
    const favoritesContainer = document.getElementById('favorites');
    favoritesContainer.classList.toggle('collapsed');
    isFavoritesCollapsed = !isFavoritesCollapsed;
    const collapseButton = document.getElementById('collapseButton2');
    collapseButton.innerHTML = isFavoritesCollapsed ? collapseIcon : expandIcon;
  }
}

const recentsCollapseButton = document.getElementById('collapseButton1');
recentsCollapseButton.addEventListener('click', (event) => toggleCollapse(event, 'recents'));

recentsCollapseButton.innerHTML = expandIcon;


