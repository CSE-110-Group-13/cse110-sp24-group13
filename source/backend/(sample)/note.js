// Example for using functions in backend - delete at the end

// Import all functions from NoteTable.js
import { 
  getNoteFromTable, 
  saveNoteToTable, 
  deleteNoteFromTable, 
  createNewNoteObject, 
  modifyNoteText, 
  modifyNoteDate, 
  modifyNoteLastEdited, 
  modifyNoteTitle, 
  appendProjectToNoteProjectList, 
  removeProjectFromNoteProjectList, 
  modifyNoteFavorited, 
  appendTagToNoteTags, 
  removeTagFromNoteTags
} from "../NoteTable.js";

window.addEventListener("DOMContentLoaded", init);

// Global variable to store the current note ID
var NOTE_ID = "";

function init() {
  // Clear storage every time the page is loaded (don't do this in the actual project code!!!)
  localStorage.setItem("NoteTable", JSON.stringify({}));
  localStorage.setItem("IDContainer", JSON.stringify([]));

  // Add all event listeners
  addInitializeNoteEvent();
  addModifyNoteTextEvent();
  addModifyNoteDateEvent();
  addModifyLastEditedEvent();
  addModifyNoteTitleEvent();
  addProjectListEvent();
  addRemoveProjectListEvent();
  addModifyFavoritedEvent();
  addTagsEvent();
  addRemoveTagsEvent();
  addDeleteNoteEvent();
}

// Initialize new note
function addInitializeNoteEvent() {
  const initializeNoteButton = document.getElementById("initializeNoteButton");
  initializeNoteButton.addEventListener("click", () => {
    // Clear storage
    localStorage.setItem("NoteTable", JSON.stringify({}));
    localStorage.setItem("IDContainer", JSON.stringify([]));

    // Create a new note
    const newNote = createNewNoteObject();
    NOTE_ID = newNote.noteID;

    // Reflect on the UI
    const noteItem = document.querySelector("Note-Item")
    const paragraph = noteItem.querySelector("p");
    paragraph.textContent = JSON.stringify(getNoteFromTable(NOTE_ID));
  });
}

// Modify note text
function addModifyNoteTextEvent() {
  const textForm = document.getElementById("modifyNoteTextForm");
  textForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = textForm.querySelector("input").value;
    modifyNoteText(NOTE_ID, text);

    // "ReUpdate component again to reflect changes"
    const noteItem = document.querySelector("Note-Item")
    const paragraph = noteItem.querySelector("p");
    paragraph.textContent = JSON.stringify(getNoteFromTable(NOTE_ID));
  });
}

// Modify note date
function addModifyNoteDateEvent() {
  const dateForm = document.getElementById("modifyNoteDateForm");
  dateForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const date = dateForm.querySelector("input").value;
    modifyNoteDate(NOTE_ID, date);

    // "ReUpdate component again to reflect changes"
    const noteItem = document.querySelector("Note-Item")
    const paragraph = noteItem.querySelector("p");
    paragraph.textContent = JSON.stringify(getNoteFromTable(NOTE_ID));
  });
}

// Modify note last edited
function addModifyLastEditedEvent() {
  const lastEditedForm = document.getElementById("modifyNoteLastEditedForm");
  lastEditedForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const lastEdited = lastEditedForm.querySelector("input").value;
    modifyNoteLastEdited(NOTE_ID, lastEdited);

    // "ReUpdate component again to reflect changes"
    const noteItem = document.querySelector("Note-Item")
    const paragraph = noteItem.querySelector("p");
    paragraph.textContent = JSON.stringify(getNoteFromTable(NOTE_ID));
  });
}

// Modify note title
function addModifyNoteTitleEvent() {
  const titleForm = document.getElementById("modifyNoteTitleForm");
  titleForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = titleForm.querySelector("input").value;
    modifyNoteTitle(NOTE_ID, title);

    // "ReUpdate component again to reflect changes"
    const noteItem = document.querySelector("Note-Item")
    const paragraph = noteItem.querySelector("p");
    paragraph.textContent = JSON.stringify(getNoteFromTable(NOTE_ID));
  });
}

// Add to project list
function addProjectListEvent() {
  const addProjectListForm = document.getElementById("modifyProjectListForm");
  addProjectListForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const projectList = addProjectListForm.querySelector("input").value;
    appendProjectToNoteProjectList(NOTE_ID, projectList);

    // "ReUpdate component again to reflect changes"
    const noteItem = document.querySelector("Note-Item")
    const paragraph = noteItem.querySelector("p");
    paragraph.textContent = JSON.stringify(getNoteFromTable(NOTE_ID));
  });
}

// Remove from project list
function addRemoveProjectListEvent() {
  const removeProjectListForm = document.getElementById("removeProjectListForm");
  removeProjectListForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const projectList = removeProjectListForm.querySelector("input").value;
    removeProjectFromNoteProjectList(NOTE_ID, projectList);

    // "ReUpdate component again to reflect changes"
    const noteItem = document.querySelector("Note-Item")
    const paragraph = noteItem.querySelector("p");
    paragraph.textContent = JSON.stringify(getNoteFromTable(NOTE_ID));
  });
}

// Modify favorited 
function addModifyFavoritedEvent() {
  const favoritedForm = document.getElementById("modifyFavoritedForm");
  favoritedForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const favorited = favoritedForm.querySelector("input").checked;
    modifyNoteFavorited(NOTE_ID, favorited);

    // "ReUpdate component again to reflect changes"
    const noteItem = document.querySelector("Note-Item")
    const paragraph = noteItem.querySelector("p");
    paragraph.textContent = JSON.stringify(getNoteFromTable(NOTE_ID));
  });
}

// Add tags
function addTagsEvent() {
  const addTagsForm = document.getElementById("modifyTagsForm");
  addTagsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const tags = addTagsForm.querySelector("input").value;
    appendTagToNoteTags(NOTE_ID, tags);

    // "ReUpdate component again to reflect changes"
    const noteItem = document.querySelector("Note-Item")
    const paragraph = noteItem.querySelector("p");
    paragraph.textContent = JSON.stringify(getNoteFromTable(NOTE_ID));
  });
}

// Remove tags
function addRemoveTagsEvent() {
  const removeTagsForm = document.getElementById("removeTagsForm");
  removeTagsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const tags = removeTagsForm.querySelector("input").value;
    removeTagFromNoteTags(NOTE_ID, tags);

    // "ReUpdate component again to reflect changes"
    const noteItem = document.querySelector("Note-Item")
    const paragraph = noteItem.querySelector("p");
    paragraph.textContent = JSON.stringify(getNoteFromTable(NOTE_ID));
  });
}

// Delete note
function addDeleteNoteEvent() {
  const deleteNoteButton = document.getElementById("deleteNoteButton");
  deleteNoteButton.addEventListener("click", () => {
    deleteNoteFromTable(NOTE_ID);
  });
}