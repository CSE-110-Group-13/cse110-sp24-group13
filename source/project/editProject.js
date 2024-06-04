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
  modifyProjectDateCreated,
} from "../backend/ProjectTable.js";

import {
  getTaskFromTable,
  deleteTaskFromTable,
  createNewTaskObject,
  modifyTaskName,
  modifyTaskCompleted,
} from "../backend/TaskTable.js";

import {
  getNoteTableFromStorage,
  getNoteFromTable,
  modifyLinkedProject,
  modifyNoteLastEdited,
} from "../backend/NoteTable.js";

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
  // localStorage.setItem("ProjectTable", JSON.stringify({}));
  // localStorage.setItem("IDContainer", JSON.stringify([]));
  // localStorage.setItem("TaskTable", JSON.stringify([]));
  PROJECT_ID = window.location.hash.substring(1);
  if (PROJECT_ID) {
    populateProject();
  }
  populateOptionsLinkNotes()
  document
    .querySelectorAll("#linkNotes")
    .addEventListener("change", addLinkedNotes);
  document
    .querySelector("#priority")
    .addEventListener("change", updatePriority);
  document
    .querySelectorAll("input[type='checkbox']")
    .forEach(function (checkbox) {
      checkbox.addEventListener("change", updateProgress);
    });
  document
    .querySelector("#addTaskButton")
    .addEventListener("click", addNewTask);
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

function updatePriority() {
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
function updateProgress() {
  const project = getProjectFromTable(PROJECT_ID);
  console.log("In progress");
  let progressBar = document.getElementById("progressBar").value;
  //   let progressLabel = document.getElementById("progressLabel").innerText;

  progressBar = calculateTaskCompletion(PROJECT_ID) * 100;
  //   document.getElementById("progressBar").max = project.taskList.length;
  //   progressLabel = Math.floor(progress / project.taskList.length) + "%";
}

function addNewTask() {
  const taskName = document.querySelector("#addTaskInput").value;
  console.log(taskName);

  if (!taskName) {
    alert("Task must have a description");
    return;
  }

  const newTask = createNewTaskObject();

  appendTaskToProjectTaskList(PROJECT_ID, newTask.taskID);
  console.log(newTask.taskID, newTask.name, taskName);

  modifyTaskName(newTask.taskID, taskName);

  console.log(getTaskFromTable(newTask.taskID), newTask.name);

  const taskList = document.querySelector(".taskList");
  const project = getProjectFromTable(PROJECT_ID);

  // Re-render task list with new item added
  createTaskListItem(taskList, project.taskList);

  // Clear the input field after adding the task
  document.querySelector("#addTaskInput").value = "";
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

    if (task.completed) {
      inputCheckbox.checked = true;
    }

    updateTaskCompletionStatusEventListener(inputCheckbox, task.projectID);
    taskListElement.appendChild(inputCheckbox);
    taskListElement.appendChild(label);
    taskListElement.append(document.createElement("br"));
  });
}

function updateTaskCompletionStatusEventListener(
  singleInputCheckbox,
  projectID
) {
  singleInputCheckbox.addEventListener("change", () => {
    const progressBar = document.querySelector("progress");
    const taskID = singleInputCheckbox.id;
    const task = getTaskFromTable(taskID);

    let newDate = new Date().toISOString().split("T")[0];

    if (singleInputCheckbox.checked && !task.completed) {
      modifyTaskCompleted(taskID, true);
      appendCompletedTaskToProject(projectID, taskID);
    } else if (!singleInputCheckbox.checked && task.completed) {
      modifyTaskCompleted(taskID, false);
      removeCompletedTaskFromProject(projectID, taskID);
    }

    modifyLastWorkedOn(projectID, newDate);
    progressBar.value = calculateTaskCompletion(projectID);
  });
}

function calculateTaskCompletion(projectID) {
  const selectedProject = getProjectFromTable(projectID);
  const taskList = selectedProject.taskList;

  if (taskList.length === 0) {
    return 0;
  }

  const numberCompleted = taskList.reduce((count, taskID) => {
    const task = getTaskFromTable(taskID);
    return count + (task.completed ? 1 : 0);
  }, 0);

  return (numberCompleted / taskList.length) * 100; // Return the percentage of completion
}

/**
 * Saves the current state of the project to the local storage.
 * Retrieves the project title, markdown content, and date from the DOM.
 * Modifies the project in the backend using the project ID.
 */
function saveProject() {
  console.log("Save Clicked");
  if (!PROJECT_ID) {
    const newProject = createNewProjectObject();
    PROJECT_ID = newProject.projectID;
    modifyProjectDateCreated(
      PROJECT_ID,
      new Date().toISOString().split("T")[0]
    );
    populateProject();
  }
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

function addLinkedNotes() {

}

function populateOptionsLinkNotes(){
    const allNotes = getNoteTableFromStorage();
    const selectElement = document.querySelector("#linkNotes");
  
    allNotes.forEach((noteID) => {
      const note = getNoteFromTable(noteID);
  
      const option = document.createElement("option");
      option.value = taskID;
      option.innerText = note.title;
      
      selectElement.appendChild(option);
    });
}

function populateLinkedNotes(linkedNotes, elementLinkedNotes) {

  const linkIcon = "put svg link here";
  const collapseIcon = "put svg link here";
  const checkbox = "put svg link here";

  linkedNotes.forEach((noteID)=>{
    const note = getNoteFromTable(noteID);

    const noteHeader = createElement("div").classList.add('linkedNote')
    const title = document.createElement("h3").textContent;
    title = note.title;

    // Create the right side of the header which includes tags and last modified date
    const rightSide = createElement("ul");
    const lastModified = createElement("p").textContent;
    lastModified = "Last modified: " + note.lastEdited;
    rightSide.appendChild(lastModified);

    (note.tags).forEach((tagName)=>{
      const tag = createElement("li").textContent;
      tag = tagName;
      rightSide.appendChild(tag);
    });

    // Add the parts of the header to the linked notes container
    noteHeader.appendChild(title);
    noteHeader.appendChild(linkIcon);
    noteHeader.appendChild(rightSide);
    noteHeader.appendChild(collapseIcon);

    // Create container for the completed tasks
    const completedContainer = createElement("div").classList.add('completedTasks');
    const completedTasks = getProjectFromTable(PROJECT_ID).tasksCompleted;

    const completedTitle = createElement("i").textContent;
    completedTitle = "Completed Tasks";
    completedContainer.appendChild(completedTitle);
    completedContainer.appendChild(document.createElement("br"));

    completedTasks.forEach((taskID)=>{
      const task = getTaskFromTable(taskID);
      const taskName = createElement("p").textContent;
      taskName = task.name;

      const taskSpan = createElement("span").classList.add('taskSpan');
      taskSpan.appendChild(checkbox);
      taskSpan.appendChild(taskName);
    });

    
    elementLinkedNotes.appendChild(noteHeader);
    elementLinkedNotes.appendChild(completedContainer);
    elementLinkedNotes.appendChild(document.createElement("hr"));
  });

}

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

  const linkedNotes = document.querySelector(".linkedNotes");
  populateLinkedNotes(project.linkedNotes, linkedNotes);
}
