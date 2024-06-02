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
} from "../backend/NoteTable.js";

import {
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
} from "../backend/ProjectTable.js";

import {
  getTaskFromTable,
  saveTaskToTable,
  deleteTaskFromTable,
  createNewTaskObject,
  modifyTaskName,
  modifyTaskCompleted
} from "../backend/TaskTable.js";

import { generateID, getIDContainerFromStorage, saveIDContainerToStorage } from "../backend/generateID.js";

test('Sample Test', () => {
  expect(1).toBe(1);
});