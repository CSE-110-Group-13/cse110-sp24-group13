// editProject.js

//TODO - Linked notes section needs to be implemented (may be done with webcomponent)
//TODO - Add functionality to Link Notes  and Priority dropdown
//TODO - Populate Tasks container

//TODO - Possibly add a popup for when save is successful

import {
  getProjectFromTable,
  createNewProjectObject,
  modifyProjectTitle,
  modifyProjectDescription,
  appendTaskToProjectTaskList,
  removeTaskFromProjectTaskList,
  modifyProjectDeadline,
  modifyProjectPriority,
  appendCompletedTaskToProject,
  removeCompletedTaskFromProject,
  appendLinkedNoteToProject,
  removeLinkedNoteFromProject,
} from "../backend/ProjectTable.js";

import {
  getTaskTableFromStorage,
  saveTaskTableToStorage,
  getTaskFromTable,
  saveTaskToTable,
  deleteTaskFromTable,
  createNewTaskObject,
  modifyTaskName,
  modifyTaskCompleted,
} from "../backend/TaskTable.js";

let PROJECT_ID = "";
let progress = 0;
const taskUpdate = document.querySelectorAll('input[type="checkbox"]');

window.addEventListener("DOMContentLoaded", init);

/**
 * Initializes the project editing process.
 * If a project ID is not set, creates a new project object.
 * If a project ID is set, populates the project with existing data.
 * Attaches an event listener to the save button.
 */
function init() {
  localStorage.setItem("ProjectTable", JSON.stringify({}));
  localStorage.setItem("IDContainer", JSON.stringify([]));
  localStorage.setItem("TaskTable", JSON.stringify([]));
  PROJECT_ID = window.location.hash.substring(1);
  if (!PROJECT_ID) {
    const newProject = createNewProjectObject();
    PROJECT_ID = newProject.projectID;
  } else {
    populateProject();
  }
  document.querySelector("#priority").addEventListener("change", updatePriority);
  document.querySelectorAll("checkbox").addEventListener("change",updateProgress);
  document.querySelector("#addTaskButton").addEventListener("click", addTask);
  attachSaveButtonListener();
  attachCancelButtonListener();
}

/**
 * Attaches an event listener to the save button.
 */
function attachSaveButtonListener() {
  document
    .querySelector("save-button button")
    .addEventListener("click", saveProject);
}

function attachCancelButtonListener() {
  document
    .querySelector("cancel-button button")
    .addEventListener("click", cancelEdit);
}


function updatePriority(){
    const priority = document.querySelector("#priority").value;
    let lowPriority = "#0AB73B";
    let mediumPriority = "#FFD600";
    let highPriority = "#FF000F";
    let color = "";

    switch (priority) {
        case "high":
            color = highPriority;
            break;
        case "medium":
            color = mediumPriority;
            break;
        case "low":
            color = lowPriority;
            break;
        default:
            // Handle cases where priority doesn't match any expected values
            console.warn("Unexpected priority value:", priority);
            return;
    }

    document.querySelector(".priorityDot").style.backgroundColor = color;
    modifyProjectPriority(PROJECT_ID, priority);
}

// Function to handle checkbox change events
function updateProgress(event) {
  const project = getProjectFromTable(PROJECT_ID);
  let progressBar = document.getElementById("progressBar").value;
  let progressLabel = document.getElementById("progressLabel").innerText;

  progressBar = calculateTaskCompletion(PROJECT_ID);
  document.getElementById("progressBar").max = project.taskList.length;
  progressLabel = Math.floor(progress / project.taskList.length) + "%";
}

function createTaskListItem(taskListElement, taskListArray) {
  taskListArray.forEach((taskID) => {
    const task = getTaskFromTable(taskID);

    const inputCheckbox = document.createElement("input");
    inputCheckbox.setAttribute("type", "checkbox");
    inputCheckbox.id = taskID;

    const label = document.createElement("label");
    label.setAttribute("for", taskID);
    label.textContent = task.name;
    console.log(task.name);

    if (task.completed === true) {
      inputCheckbox.checked = true;
    }

    updateTaskCompletionStatusEventListener(inputCheckbox, projectID);
    taskListElement.appendChild(inputCheckbox);
    taskListElement.appendChild(label);
    taskListElement.append(document.createElement("br"));
  });
}

function updateTaskCompletionStatusEventListener(singleInputCheckbox, projectID) {
    singleInputCheckbox.addEventListener('change', () => {
    const progressBar = document.querySelector('progress');
      const taskID = singleInputCheckbox.id;
      const task = getTaskFromTable(taskID);
      // unchecked to checked
      if (singleInputCheckbox.checked === true && task.completed === false) {
        let newDate = new Date();
        newDate = newDate.toISOString().split('T')[0];
        modifyTaskCompleted(taskID, true);
        appendCompletedTaskToProject(projectID, taskID);
        modifyLastWorkedOn(projectID, newDate);
        progressBar.value = calculateTaskCompletion(projectID);
      }
      // checked to unchecked
      if (singleInputCheckbox.checked === false && task.completed === true) {
        let newDate = new Date();
        newDate = newDate.toISOString().split('T')[0];
        modifyTaskCompleted(taskID, false);
        removeCompletedTaskFromProject(projectID, taskID);
        modifyLastWorkedOn(projectID, newDate);
        progressBar.value = calculateTaskCompletion(projectID);
      }
    });
  }

function calculateTaskCompletion(projectID) {
  const selectedProject = getProjectFromTable(projectID);
  const taskList = selectedProject.taskList;
  if (taskList.length !== 0) {
    let numberCompleted = 0;
    taskList.forEach((taskID) => {
      const task = getTaskFromTable(taskID);
      if (task.completed === true) {
        numberCompleted++;
      }
    });
    return numberCompleted;
  } else {
    return -1;
  }
}

/**
 * Saves the current state of the project to the local storage.
 * Retrieves the project title, markdown content, and date from the DOM.
 * Modifies the project in the backend using the project ID.
 */
function saveProject() {
  console.log("Save Clicked");
  const projectTitle = document.querySelector("#projectTitle").value;
  const projectDescription = document.querySelector("#projectDesc").value;
  console.log(projectDescription);
  const projectDeadline = document.querySelector("#deadline").value;
  console.log(projectDeadline);
  // Modify the project
  modifyProjectTitle(PROJECT_ID, projectTitle);
  modifyProjectDescription(PROJECT_ID, projectDescription);
  modifyProjectDeadline(PROJECT_ID, projectDeadline);
  alert("Save succesful (Replace this with a custom one later)");

  window.location.href = "./edit-project.html#" + PROJECT_ID;
}

function cancelEdit() {
  if (!PROJECT_ID) {
    window.location.href = "../projectlist/projectlist.html";
  } else {
    window.location.href = "./view-project.html#" + PROJECT_ID;
  }
}

function addTask() {
  const taskName = document.querySelector("#addTaskInput").value;
  console.log(taskName);
  if (!taskName) {
    alert("Task must have a description");
    return;
  }

  const newTask = createNewTaskObject(taskName, false);

  console.log(newTask.taskID);

  appendTaskToProjectTaskList(PROJECT_ID, newTask.taskID);
  console.log(newTask.taskID, newTask.name, taskName);

 
  const taskList = document.querySelector(".taskList");
  const project = getProjectFromTable(PROJECT_ID);
  // Re-render task list with new item added
  createTaskListItem(taskList, project.taskList);

  return;
}

function populateLinkedNotes() {}

/**
 * Populates the project with existing data from the backend.
 * Retrieves the project data using the project ID.
 * Sets the project title, deadline, and date in the DOM.
 */
function populateProject() {
  const project = getProjectFromTable(PROJECT_ID);
  document.title = "PROJECT | " + project.title;
  console.log(document.title);

  console.log(project.title);
  updatePriority();
  document.querySelector("#projectTitle").value = project.title;
  document.querySelector("#deadline").value = project.deadline;
  document.querySelector("#projectDesc").innerText = project.description;

  const taskList = document.querySelector(".taskList");
  createTaskListItem(taskList, project.taskList);
}
