import {
  getProjectTableFromStorage,
  saveProjectTableToStorage,
  getProjectFromTable,
  saveProjectToTable,
  deleteProjectFromTable,
  createNewProjectObject,
  modifyProjectTitle,
  modifyProjectDescription,
  appendTaskToProjectTaskList,
  removeTaskFromProjectTaskList,
  modifyProjectDeadline,
  modifyProjectPriority,
  modifyProjectDateCreated,
  appendCompletedTaskToProject,
  removeCompletedTaskFromProject
} from "../backend/ProjectTable.js"

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
  appendProjectToNoteProjectList, 
  removeProjectFromNoteProjectList, 
  modifyNoteFavorited, 
  appendTagToNoteTags, 
  removeTagFromNoteTags
} from "../backend/NoteTable.js"

window.addEventListener("DOMContentLoaded", init);

function init() {
  const projectTable = getProjectTableFromStorage();
  const noteTable = getNoteTableFromStorage();
  if (Object.keys(projectTable).length < 6) {
    createNewProjectObject("Project1", "Description1", ['task1', 'task2', 'task3'], "2024-05-30", "Priority1");
    createNewProjectObject("Project2", "Description2", ['task1', 'task2', 'task3'], "2024-05-30", "Priority2");
    createNewProjectObject("Project3", "Description3", ['task1', 'task2', 'task3'], "2024-05-30", "Priority3");
    createNewProjectObject("Project3", "Description3", ['task1', 'task2', 'task3'], "2024-05-30", "Priority3");
    createNewProjectObject("Project3", "Description3", ['task1', 'task2', 'task3'], "2024-05-30", "Priority3");
    createNewProjectObject("Project3", "Description3", ['task1', 'task2', 'task3'], "2024-05-30", "Priority3");
  }

  if (Object.keys(noteTable).length < 5) {
    createNewNoteObject("this is text1", "2024-05-29", "2024-05-30", "this is title1", ["project1", "project2"], true, ["tag1", "tag2", "tag3"]);
    createNewNoteObject("this is text2", "2024-05-29", "2024-05-30", "this is title2", ["project1", "project2"], false, ["tag1", "tag2", "tag3"]);
    createNewNoteObject("this is text3", "2024-05-29", "2024-05-30", "this is title3", ["project1", "project2"], true, ["tag1", "tag2", "tag3"]);
    createNewNoteObject("this is text4", "2024-05-29", "2024-05-30", "this is title4", ["project1", "project2"], false, ["tag1", "tag2", "tag3"]);
    createNewNoteObject("this is text5", "2024-05-29", "2024-05-30", "this is title5", ["project1", "project2"], true, ["tag1", "tag2", "tag3"]);
  }
}