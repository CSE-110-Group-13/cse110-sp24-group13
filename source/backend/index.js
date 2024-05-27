// main.js

// Note: all the functions in import are the only functions that are exposed to the frontend, if you want to expose more functions, talk to the backend team
// import { 
//   getNoteFromTable, 
//   saveNoteToTable, 
//   deleteNoteFromTable, 
//   createNewNoteObject, 
//   modifyNoteText, 
//   modifyNoteDate, 
//   modifyNoteLastEdited, 
//   modifyNoteTitle, 
//   appendProjectToNoteProjectList, 
//   removeProjectFromNoteProjectList, 
//   modifyNoteFavorited, 
//   appendTagToNoteTags, 
//   removeTagFromNoteTags
// } from "./NoteTable.js";

// import {
//   getProjectFromTable,
//   saveProjectToTable,
//   deleteProjectFromTable,
//   createNewProjectObject,
//   modifyProjectTitle,
//   modifyProjectDescription,
//   appendTaskToProjectTaskList,
//   removeTaskFromProjectTaskList,
//   modifyProjectDeadline,
//   modifyProjectPriority,
//   modifyProjectDateCreated,
//   appendCompletedTaskToProject,
//   removeCompletedTaskFromProject
// } from "./ProjectTable.js";

// import {
//   getTaskFromTable,
//   saveTaskToTable,
//   deleteTaskFromTable,
//   createNewTaskObject,
//   modifyTaskName,
//   modifyTaskCompleted
// } from "./TaskTable.js";



// Initialize local storage
window.addEventListener("DOMContentLoaded", initializeLocalStorage);

function initializeLocalStorage() {
  // Create the tables in local storage if they do not exist
  const tables = ["NoteTable", "ProjectTable", "TaskTable"];
  tables.forEach(table => {
    if (window.localStorage.getItem(table) === null) {
      localStorage.setItem(table, JSON.stringify({}));
    }
  })

  // Create the ID container to check whether an ID is used
  if (window.localStorage.getItem("IDContainer") === null) {
    localStorage.setItem("IDContainer", JSON.stringify([]));
  }
}