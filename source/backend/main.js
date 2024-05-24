// main.js

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

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
  // Initialize the tables in local storage if they do not exist
  const tables = ["NoteTable", "ProjectTable", "TaskTable"];
  tables.forEach(table => {
    if (window.localStorage.getItem(table) === null) {
      localStorage.setItem(table, JSON.stringify({}));
    }
  })

  // Initialize the ID container to check whether an ID is used
  if (window.localStorage.getItem("IDContainer") === null) {
    localStorage.setItem("IDContainer", JSON.stringify([]));
  }
}