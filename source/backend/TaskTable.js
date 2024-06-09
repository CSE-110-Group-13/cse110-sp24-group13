/**
 * The TaskTable in localStorage is in the format:
 * {
 *    "taskID" : taskObject
 * }
 */

/**
 * Each task object in the table is in the format:
 * {
 *    "taskID" : "",
 *    "name" : "",
 *    "completed" : ""
 * }
 */

// Import the functions from generateID.js
import { generateID, getIDContainerFromStorage, saveIDContainerToStorage } from "./generateID.js";

/**
 * Get the task table from local storage, if there is none, return an empty object
 * @returns {Object} the TaskTable object in localStorage
 */
function getTaskTableFromStorage() {
  const taskTable = window.localStorage.getItem("TaskTable");
  if (taskTable === undefined) {
    alert("Task table does not exist to get from storage");
    return undefined;
  }
  else {
    return JSON.parse(taskTable);
  }
}

/**
 * Takes in a task table, and save it in local storage
 * @param {Object} a TaskTable object
 */
function saveTaskTableToStorage(taskTable) {
  window.localStorage.setItem('TaskTable', JSON.stringify(taskTable));
}

/**
 * Takes in an ID, return the task object that maps to that ID
 * @param {String} taskID - the ID of the task to look up to in the table 
 * @returns {Object} the task object that map to the ID
 */
function getTaskFromTable(taskID) {
  const taskTable = getTaskTableFromStorage();
  if (taskID in taskTable) {
    return taskTable[taskID];
  }
  else {
    alert(`TaskID: ${taskID} does not exist in the table`);
    return undefined;
  }
}

/**
 * Takes in a task object, and save it in local storage
 * @param {String} taskID - the ID of the task to save in the table
 * @param {Object} taskObject - the task object to save in the table
 */
function saveTaskToTable(taskID, taskObject) {
  const taskTable = getTaskTableFromStorage();
  if (taskID in taskTable) {
    taskTable[taskID] = taskObject;
    saveTaskTableToStorage(taskTable);
  }
  else {
    alert(`TaskID: ${taskID} does not exist in the table`);
  }
}

/**
 * Delete the task object that maps to the given ID from the table, as well as the ID in the IDContainer, and update the local storage
 * @param {String} taskID - the ID of the task to delete
 */
function deleteTaskFromTable(taskID) {
  const taskTable = getTaskTableFromStorage();

  if (taskID in taskTable) {
    // Delete the taskID from the taskTable
    delete taskTable[taskID];
    saveTaskTableToStorage(taskTable);
  
    // Filter and remove the taskID from the IDContainer
    const IDToRemove = taskID.split("-")[1];
    const IDContainer = getIDContainerFromStorage();
    const newIDContainer = IDContainer.filter(ID => ID !== IDToRemove);
    saveIDContainerToStorage(newIDContainer);
  }
  else {
    alert(`TaskID: ${taskID} does not exist to delete in the table`);
  }
}

/**
 * Creates a new task object and returns it
 * @param {String} name name of task
 * @param {Boolean} completed status of task completion
 * @returns newTaskObject object for task
 */
function createNewTaskObject(name="", completed=false) {
  const newTaskObject = {
    "taskID" : `task-${generateID()}`,
    "name" : name,
    "completed" : completed
  }

  const taskTable = getTaskTableFromStorage();
  taskTable[newTaskObject.taskID] = newTaskObject;
  saveTaskTableToStorage(taskTable);
  return newTaskObject;
}

/**
 * Modify the name of a task object that maps to the given ID and update the local storage
 * @param {String} taskID - the ID of the task to modify
 * @param {String} newName - the new name of the task
 */
function modifyTaskName(taskID, newName) {
  const taskObject = getTaskFromTable(taskID);
  taskObject["name"] = newName;
  saveTaskToTable(taskID, taskObject);
}

/**
 * Modify the completed status of a task object that maps to the given ID and update the local storage
 * @param {String} taskID - the ID of the task to modify
 * @param {Boolean} newCompleted - the new completed status of the task
 */
function modifyTaskCompleted(taskID, newCompleted) {
  const taskObject = getTaskFromTable(taskID);
  taskObject["completed"] = newCompleted;
  saveTaskToTable(taskID, taskObject);
}

export {
  getTaskTableFromStorage,
  saveTaskTableToStorage,
  getTaskFromTable,
  saveTaskToTable,
  deleteTaskFromTable,
  createNewTaskObject,
  modifyTaskName,
  modifyTaskCompleted
}