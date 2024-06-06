// Example for using functions in backend - delete at the end

// Import all functions from NoteTable.js
import { 
  getNoteTableFromStorage,
  saveNoteTableToStorage,
  getNoteFromTable, 
  saveNoteToTable, 
  deleteNoteFromTable, 
  createNewNoteObject, 
  modifyNoteText, 
  modifyNoteDate, 
  modifyNoteLastEdited, 
  modifyNoteTitle, 
  modifyLinkedProject,
  modifyNoteFavorited, 
  appendTagToNoteTags, 
  removeTagFromNoteTags
} from "../NoteTable.js";

window.addEventListener("DOMContentLoaded", init);

// Global variable to store the current note ID
var NOTE_ID = "";

/**
 * Initializes the application.
 * Sets up local storage and adds event listeners.
 */
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
  addModifyLinkedProjectEvent();
  addModifyFavoritedEvent();
  addTagsEvent();
  addRemoveTagsEvent();
  addDeleteNoteEvent();
}

/**
 * Adds an event listener to the "initialize note" button.
 * When clicked, the button clears local storage, creates a new note, and updates the UI.
 */
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

/**
 * Adds an event listener to the "modify note text" form.
 * When submitted, the form modifies the text of the current note and updates the UI.
 */
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

/**
 * Adds an event listener to the "modify note date" form.
 * When submitted, the form modifies the date of the current note and updates the UI.
 */
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

/**
 * Adds an event listener to the "modify note last edited" form.
 * When submitted, the form modifies the last edited date of the current note and updates the UI.
 */
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

/**
 * Adds an event listener to the "modify note title" form.
 * When submitted, the form modifies the title of the current note and updates the UI.
 */
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

// Modify linked project
function addModifyLinkedProjectEvent() {
  const projectListForm = document.getElementById("modifyLinkedProjectForm");
  projectListForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const projectID = projectListForm.querySelector("input").value;
    modifyLinkedProject(NOTE_ID, projectID);

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