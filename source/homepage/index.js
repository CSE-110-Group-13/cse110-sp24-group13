import { 
  getNoteFromTable,modifyNoteFavorited,
} from "./NoteTable.js";


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

  //Tittle of note
  const titleElement = document.createElement('p');
  titleElement.textContent ="title: " + noteObject.title;
  noteContainer.appendChild(titleElement);

  //Text of note
  const textElement = document.createElement('p');
  textElement.textContent =" Text: " + noteObject.text;
  noteContainer.appendChild(textElement);

  //Date Started of note
  const date = document.createElement('p');
  date.textContent = "Started:" + noteObject.date;
  noteContainer.appendChild(date);

  //Last Edited of note
  const lastEditeds = document.createElement('p');
  lastEditeds.textContent = "Last Edited: " + noteObject.lastEdited;
  noteContainer.appendChild(lastEditeds);

  //List of projects for the note. 
  if(noteObject.projectList.length != 0){
    const projectList = document.createElement("p");
    projectList.className = "projects";
    projectList.textContent = noteObject.projectList[0];
    for(let k  =1; k < noteObject.projectList.length; k++){
      const projectListsContinued = document.createElement("p");
      projectListsContinued.className = "projects";
      projectListsContinued.textContent = noteObject.projectList[k];
      projectList.appendChild(projectListsContinued);
    }
    noteContainer.appendChild(projectList);
  }

  //List of tags for the note. 
  if(noteObject.tags.length != 0){
    const tagList = document.createElement("h2");
    tagList.className = "tags";
    tagList.textContent = noteObject.tags[0];
    for( let j = 1; j< noteObject.tags.length; j++){
      const tagsListContinued = document.createElement("h2");
      tagsListContinued.className = "tags";
      tagsListContinued.textContent = noteObject.tags[j];
      tagList.appendChild(tagsListContinued)
    }
    noteContainer.appendChild(tagList);
  }

  //Favorite button of the note. 
  let favorited = noteObject.favorited;


  const button = document.createElement("button");
  button.dataset.noteID = noteObject.noteID;
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


function init(){
  
  //Appended those two as children of the recents module.
  const recentContainer = document.getElementById("recents");
  const favoritesContainer = document.getElementById("favorites");

  //Get list of all notes from id container. 
  const IDContainer = JSON.parse(window.localStorage.getItem("IDContainer"));

  //Define an array to store all the notes from id container. 
  let loadedNotes = [];

  
  // Upload notes to array
  for(let i = 0; i < IDContainer.length; i++){
    loadedNotes.push(getNoteFromTable(IDContainer[i]));
  }
  
  console.log(getNoteFromTable("ABC"));  // Sort notes based off last edited. WORK IN PROGRESS NOT FULLY FUNCTIONAL. 
  loadedNotes.sort((a,b) => new Date(b.lastEdited) - new Date(a.lastEdited));


  //dummy test values.
  const testNote1 = {
    "noteID" : "ABC",
    "text" : "buy eggs",
    "date" : "2024-5-21",
    "lastEdited" : "2025-5-23",
    "title" : "to do at grocery store",
    "projectList" : [],
    "favorited" : false,
    "tags" : []
  };

  const testNote2 = {
      "noteID" : "21kfasde",
      "text" : "mow lawn",
      "date" : "2024-5-22",
      "lastEdited" : "2026-5-22",
      "title" : "chores",
      "projectList" : ["Ash"],
      "favorited" : false,
      "tags" : []
  };

  const testNote3 = {
    "noteID" : "ABC",
    "text" : "buy eggs",
    "date" : "2024-5-21",
    "lastEdited" : "2025-5-23",
    "title" : "to do at grocery store",
    "projectList" : [],
    "favorited" : false,
    "tags" : []
  };

  //loadedNotes.push(testNote1,testNote2,testNote3);



  //For all the loadedNOtes upload them unto homepage 
  for(let i = 0; i < loadedNotes.length; i++){
    //the noteObject will be assigned to a note object from the array of all notes; 
    let noteObject = getNoteFromTable(loadedNotes[i].noteID);
    const noteElement = createNoteElement(noteObject);
    recentContainer.appendChild(noteElement);
  }

  for(let i = 0; i < loadedNotes.length; i++){
    //the noteObject will be assigned to a note object from the array of all notes; 
    let noteObject = getNoteFromTable(loadedNotes[i].noteID);
    const noteElement = createNoteElement(noteObject);
    favoritesContainer.appendChild(noteElement);
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
    } else {
      button.innerText = 'Not Favorited';
      button.style.backgroundColor = ''; // Revert to default or another style
    }
  }
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


