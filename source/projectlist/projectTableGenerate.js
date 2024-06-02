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

import {
  getTaskTableFromStorage,
  saveTaskTableToStorage,
  getTaskFromTable,
  saveTaskToTable,
  deleteTaskFromTable,
  createNewTaskObject,
  modifyTaskName,
  modifyTaskCompleted
} from "../backend/TaskTable.js"

window.addEventListener("DOMContentLoaded", init);

function init() {
  const projectTable = getProjectTableFromStorage();
  const noteTable = getNoteTableFromStorage();
  const taskTable = getTaskTableFromStorage();

  if (Object.keys(noteTable).length < 1) {
    createNewNoteObject("this is text1", "2024-05-28", "2024-05-29", "this is title1", ["project1", "project2"], true, ["tag1", "tag2", "tag3"]);
    // createNewNoteObject("this is text2", "2024-05-29", "2024-05-30", "this is title2", ["project1", "project2"], false, ["tag1", "tag2", "tag3"]);
    // createNewNoteObject("this is text3", "2024-05-29", "2024-05-30", "this is title3", ["project1", "project2"], true, ["tag1", "tag2", "tag3"]);
    // createNewNoteObject("this is text4", "2024-05-29", "2024-05-30", "this is title4", ["project1", "project2"], false, ["tag1", "tag2", "tag3"]);
    // createNewNoteObject("this is text5", "2024-05-29", "2024-05-31", "this is title5", ["project1", "project2"], true, ["tag1", "tag2", "tag3"]);
  }
  if (Object.keys(taskTable).length < 2) {
    createNewTaskObject("do stuff", true);
    createNewTaskObject("do stuff2", false);
  }

  if (Object.keys(projectTable).length < 1) {
    let newTaskTable = getTaskTableFromStorage();
    let aTask = Object.values(newTaskTable)[0];
    let aTask2 = Object.values(newTaskTable)[1];
    createNewProjectObject("Project1", "Description1", [`${aTask.taskID}`, `${aTask2.taskID}`], "2024-05-30", "low");
    // createNewProjectObject("Project2", "Description2", ['task1', 'task2', 'task3'], "2024-05-30", "Priority2");
    // createNewProjectObject("Project3", "Description3", ['task1', 'task2', 'task3'], "2024-05-30", "Priority3");
    // createNewProjectObject("Project3", "Description3", ['task1', 'task2', 'task3'], "2024-05-30", "Priority3");
    // createNewProjectObject("Project3", "Description3", ['task1', 'task2', 'task3'], "2024-05-30", "Priority3");
    // createNewProjectObject("Project3", "Description3", ['task1', 'task2', 'task3'], "2024-05-30", "Priority3");
  }
}