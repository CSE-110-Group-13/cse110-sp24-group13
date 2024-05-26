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
 *    "taskList" : "",
 *    "deadline" : "", 
 *    "priority" : ""
 * }
 */

// Import the generateID function from generateID.js
import { generateID } from "./generateID.js";

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

function saveProjectTableToStorage(projectTable) {
  window.localStorage.setItem('ProjectTable', JSON.stringify(projectTable));
}

function getProjectFromTable(projectID) {
  const projectTable = getProjectTableFromStorage();
  if (projectID in projectTable) {
    return projectTable[projectID];
  }
  else {
    alert(`ProjectID: ${projectID} does not exist to get from storage`);
    return undefined;
  }
}

function saveProjectToTable(projectID, projectObject) {
  const projectTable = getProjectTableFromStorage();
  if (projectID in projectTable) {
    projectTable[projectID] = projectObject;
    saveProjectTableToStorage(projectTable);
  }
  else {
    alert(`ProjectID: ${projectID} does not exist to save to storage`)
  }
}

function deleteProjectFromTable(projectID) {
  const projectTable = getProjectTableFromStorage();
  delete projectTable[projectID];
  saveProjectTableToStorage(projectTable);
}

function createNewProjectObject(title="", description="", taskList=[], deadline="", priority="") {
  const newProjectObject = {
    "projectID" : `project-${generateID()}`,
    "title" : title,
    "description" : description,
    "taskList" : taskList,
    "deadline" : deadline,
    "priority" : priority
  }

  const projectTable = getProjectTableFromStorage();
  projectTable[newProjectObject.projectID] = newProjectObject;
  saveProjectTableToStorage(projectTable);
  return newProjectObject;
}

function modifyProjectTitle(projectID, newTitle) {
  const projectObject = getProjectFromTable(projectID);
  projectObject["title"] = newTitle;
  saveProjectToTable(projectID, projectObject);
}

function modifyProjectDescription(projectID, newDescription) {
  const projectObject = getProjectFromTable(projectID);
  projectObject["description"] = newDescription;
  saveProjectToTable(projectID, projectObject);
}

function appendTaskToProjectTaskList(projectID, taskID) {
  const projectObject = getProjectFromTable(projectID);
  projectObject["taskList"].push(taskID)
  saveProjectToTable(projectID, projectObject);
}

function removeTaskFromProjectTaskList(projectID, taskID) {
  const projectObject = getProjectFromTable(projectID);
  projectObject["taskList"] = projectObject["taskList"].filter(task => task !== taskID);
  saveProjectToTable(projectID, projectObject);
}

function modifyProjectDeadline(projectID, newDeadline) {
  const projectObject = getProjectFromTable(projectID);
  projectObject["deadline"] = newDeadline;
  saveProjectToTable(projectID, projectObject);
}

function modifyProjectPriority(projectID, newPriority) {
  const projectObject = getProjectFromTable(projectID);
  projectObject["priority"] = newPriority;
  saveProjectToTable(projectID, projectObject);
}

export {
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
  modifyProjectPriority
}