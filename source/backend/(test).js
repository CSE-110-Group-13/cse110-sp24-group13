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
}