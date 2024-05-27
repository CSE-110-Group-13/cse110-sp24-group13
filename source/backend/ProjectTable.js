// ProjectTable.js

/**
 * The ProjectData in localStorage is in the format:
 * {
 *    "projectID" : projectObject
 * }
 */

/**
 * Each project object in the table is in the format:
 * {
 *    "projectID" : "",
 *    "title" : "",
 *    "description" : "",
 *    "taskList" : [],
 *    "deadline" : "", 
 *    "priority" : ""
 *    "dateCreated" : "",
 *    "tasksCompleted" : [],
 * }
 */

// Import the functions from generateID.js
import { generateID, getIDContainerFromStorage, saveIDContainerToStorage } from "./generateID.js";

/**
 * Get the project table from local storage, if there is none, return an empty object
 * @returns {Object} the ProjectTable object in localStorage
 */
function getProjectTableFromStorage() {
  const projectTable = window.localStorage.getItem("ProjectTable");
  if (projectTable === undefined) {
    alert("Project table does not exist to get from storage");
    return undefined;
  }
  else {
    return JSON.parse(projectTable);
  }
}

/**
 * Takes in a project table, and save it in local storage
 * @param {Object} a ProjectTable object
 */
function saveProjectTableToStorage(projectTable) {
  window.localStorage.setItem('ProjectTable', JSON.stringify(projectTable));
}

/**
 * Takes in an ID, return the project object that maps to that ID
 * @param {String} projectID - the ID of the project to look up to in the table 
 * @returns {Object} the project object that map to the ID
 */
function getProjectFromTable(projectID) {
  const projectTable = getProjectTableFromStorage();
  if (projectID in projectTable) {
    return projectTable[projectID];
  }
  else {
    alert(`ProjectID: ${projectID} does not exist to get in the table`);
    return undefined;
  }
}

/**
 * Takes in an ID and a project object, save the project object in the table and update the local storage
 * @param {String} projectID - the ID of the project to save
 * @param {Object} projectObject - the project object to save
 */
function saveProjectToTable(projectID, projectObject) {
  const projectTable = getProjectTableFromStorage();
  if (projectID in projectTable) {
    projectTable[projectID] = projectObject;
    saveProjectTableToStorage(projectTable);
  }
  else {
    alert(`ProjectID: ${projectID} does not exist to save in the table`)
  }
}

/**
 * Delete the project object that maps to the given ID from the table, as well as the ID in the IDContainer, and update the local storage
 * @param {String} projectID - the ID of the project to delete
 */
function deleteProjectFromTable(projectID) {
  const projectTable = getNoteTableFromStorage();

  if (projectID in projectTable) {
    // Delete the projectID from the projectTable
    delete projectTable[projectID];
    saveNoteTableToStorage(projectTable);
  
    // Filter and remove the projectID from the IDContainer
    const IDToRemove = projectID.split("-")[1];
    const IDContainer = getIDContainerFromStorage();
    const newIDContainer = IDContainer.filter(ID => ID !== IDToRemove);
    saveIDContainerToStorage(newIDContainer);
  }
  else {
    alert(`ProjectID: ${projectID} does not exist to delete in the table`);
  }
}

/**
 * Create a new project object with the given parameters, save it in the table and update the local storage
 * @param {String} title - the title of the project
 * @param {String} description - the description of the project
 * @param {Array<String>} taskList - the list of task IDs that are in the project
 * @param {String} deadline - the deadline of the project
 * @param {String} priority - the priority of the project
 * @param {String} dateCreated - the date the project was created
 * @param {Array<String>} tasksCompleted - the list of task IDs that are completed in the project
 * @returns {Object} the project object that was created
 */
function createNewProjectObject(title="", description="", taskList=[], deadline="", priority="", dateCreated="", tasksCompleted=[]) {
  const newProjectObject = {
    "projectID" : `project-${generateID()}`,
    "title" : title,
    "description" : description,
    "taskList" : taskList,
    "deadline" : deadline,
    "priority" : priority,
    "dateCreated" : dateCreated,
    "tasksCompleted" : tasksCompleted
  }

  const projectTable = getProjectTableFromStorage();
  projectTable[newProjectObject.projectID] = newProjectObject;
  saveProjectTableToStorage(projectTable);
  return newProjectObject;
}

/**
 * Modify the title of a project object that maps to the given ID and update the local storage
 * @param {String} projectID - the ID of the project to modify
 * @param {String} newTitle - the new title of the project
 */
function modifyProjectTitle(projectID, newTitle) {
  const projectObject = getProjectFromTable(projectID);
  projectObject["title"] = newTitle;
  saveProjectToTable(projectID, projectObject);
}

/**
 * Modify the description of a project object that maps to the given ID and update the local storage
 * @param {String} projectID - the ID of the project to modify
 * @param {String} newDescription - the new description of the project
 */
function modifyProjectDescription(projectID, newDescription) {
  const projectObject = getProjectFromTable(projectID);
  projectObject["description"] = newDescription;
  saveProjectToTable(projectID, projectObject);
}

/**
 * Append a task ID to the task list of a project object that maps to the given ID and update the local storage
 * @param {String} projectID - the ID of the project to modify
 * @param {String} taskID - the ID of the task to append
 */
function appendTaskToProjectTaskList(projectID, taskID) {
  const projectObject = getProjectFromTable(projectID);
  projectObject["taskList"].push(taskID)
  saveProjectToTable(projectID, projectObject);
}

/**
 * Remove a task ID from the task list of a project object that maps to the given ID and update the local storage
 * @param {String} projectID - the ID of the project to modify
 * @param {String} taskID - the ID of the task to remove
 */
function removeTaskFromProjectTaskList(projectID, taskID) {
  const projectObject = getProjectFromTable(projectID);
  projectObject["taskList"] = projectObject["taskList"].filter(task => task !== taskID);
  saveProjectToTable(projectID, projectObject);
}

/**
 * Modify the deadline of a project object that maps to the given ID and update the local storage
 * @param {String} projectID - the ID of the project to modify
 * @param {String} newDeadline - the new deadline of the project
 */
function modifyProjectDeadline(projectID, newDeadline) {
  const projectObject = getProjectFromTable(projectID);
  projectObject["deadline"] = newDeadline;
  saveProjectToTable(projectID, projectObject);
}

/**
 * Modify the priority of a project object that maps to the given ID and update the local storage
 * @param {String} projectID - the ID of the project to modify
 * @param {String} newPriority - the new priority of the project
 */
function modifyProjectPriority(projectID, newPriority) {
  const projectObject = getProjectFromTable(projectID);
  projectObject["priority"] = newPriority;
  saveProjectToTable(projectID, projectObject);
}

/**
 * Modify the date the project was created of a project object that maps to the given ID and update the local storage
 * @param {String} projectID - the ID of the project to modify
 * @param {String} newDateCreated - the new date the project was created
 */
function modifyProjectDateCreated(projectID, newDateCreated) {
  const projectObject = getProjectFromTable(projectID);
  projectObject["dateCreated"] = newDateCreated;
  saveProjectToTable(projectID, projectObject);
}

/**
 * Append a task ID to the completed task list of a project object that maps to the given ID and update the local storage
 * @param {String} projectID - the ID of the project to modify
 * @param {String} taskID - the ID of the task to append
 */
function appendCompletedTaskToProject(projectID, taskID) {
  const projectObject = getProjectFromTable(projectID);
  projectObject["tasksCompleted"].push(taskID);
  saveProjectToTable(projectID, projectObject);
}

/**
 * Remove a task ID from the completed task list of a project object that maps to the given ID and update the local storage
 * @param {String} projectID - the ID of the project to modify
 * @param {String} taskID - the ID of the task to remove
 */
function removeCompletedTaskFromProject(projectID, taskID) {
  const projectObject = getProjectFromTable(projectID);
  projectObject["tasksCompleted"] = projectObject["tasksCompleted"].filter(task => task !== taskID);
  saveProjectToTable(projectID, projectObject);
}

export {
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
}