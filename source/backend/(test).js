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
} from "./NoteTable.js";

window.addEventListener("DOMContentLoaded", init);
var NOTE_ID = "";

function init() {
  // Clear storage
  localStorage.setItem("NoteTable", JSON.stringify({}));
  localStorage.setItem("IDContainer", JSON.stringify([]));

  // Initialize new note
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

  // Modify note text
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

  // Modify note date
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

  // Modify note last edited
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

  // Modify note title
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

  // Add to project list
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

  // Remove from project list
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

  // Modify favorited 
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

  // Add tags
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

  // Remove tags
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