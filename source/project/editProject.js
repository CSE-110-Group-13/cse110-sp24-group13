// editProject.js

// TODO - Linked notes section needs to be implemented (may be done with webcomponent)
// TODO - Add functionality to Link Notes and Priority dropdown
// TODO - Populate Tasks container
// TODO - Possibly add a popup for when save is successful

// Importing necessary functions from backend modules
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
  createNewNoteObject,
  modifyNoteTitle,
  modifyLinkedProject,
  modifyNoteLastEdited,
} from "../backend/NoteTable.js";

let PROJECT_ID;

/**
 * Initializes the edit project page by setting up event listeners,
 * retrieving project information, and populating the page with data.
 */
function init() {
  // Uncomment these if you want to initialize storage
  // localStorage.setItem("ProjectTable", JSON.stringify({}));
  // localStorage.setItem("IDContainer", JSON.stringify([]));
  // localStorage.setItem("TaskTable", JSON.stringify([]));
  // localStorage.setItem("NoteTable", JSON.stringify({}));
  // const placeholderNoteTable = createNewNoteObject();
  // modifyNoteTitle(placeholderNoteTable.noteID, "New Note to Add");

  PROJECT_ID = window.location.hash.substring(1);
  if (!PROJECT_ID) {
    const project = createNewProjectObject();
    PROJECT_ID = project.projectID;
  }
  populateProject();
  populateOptionsLinkNotes();

  appendTaskToProjectTaskList(PROJECT_ID, getTaskFromTable(createNewTaskObject()).taskID);

  attachSaveButtonListener();
  attachCancelButtonListener();

  document.querySelector("#linkNotes").addEventListener("change", addLinkedNotes);
  document.querySelector("#priority").addEventListener("change", updatePriority);
  document.querySelectorAll("input[type='checkbox']").forEach(function (checkbox) {
    checkbox.addEventListener("change", updateProgress);
  });
  document.querySelector("#addTaskButton").addEventListener("click", addNewTask);
}

/**
 * Attaches an event listener to the save button.
 */
function attachSaveButtonListener() {
  document.querySelector('save-button button').addEventListener('click', saveProject);
}

/**
 * Attaches an event listener to the cancel button.
 */
function attachCancelButtonListener() {
  document.querySelector('cancel-button button').addEventListener('click', cancelEdit);
}

/**
 * Updates the project's priority color based on the selected priority.
 */
function updatePriority() {
  const priority = document.querySelector("#priority").value;
  const lowPriority = "#0AB73B";
  const mediumPriority = "#FFD600";
  const highPriority = "#FF000F";
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
      console.warn("Unexpected priority value:", priority);
      return;
  }

  document.querySelector(".priorityDot").style.backgroundColor = color;
  modifyProjectPriority(PROJECT_ID, priority);
}

/**
 * Updates the project's progress bar based on the completion status of tasks.
 */
function updateProgress() {
  const project = getProjectFromTable(PROJECT_ID);
  console.log("In progress");
  let progressBar = document.getElementById("progressBar");

  progressBar.value = calculateTaskCompletion(PROJECT_ID);
}

/**
 * Adds a new task to the project.
 */
function addNewTask() {
  const taskName = document.querySelector("#addTaskInput").value;
  console.log(taskName);

  if (!taskName) {
    alert("Task must have a description");
    return;
  }

  const newTask = createNewTaskObject();
  if (!newTask) {
    alert("Failed to create a new task");
    return;
  }

  appendTaskToProjectTaskList(PROJECT_ID, newTask.taskID);
  console.log(newTask.taskID, newTask.name, taskName);

  modifyTaskName(newTask.taskID, taskName);

  console.log(getTaskFromTable(newTask.taskID), newTask.name);

  const taskList = document.querySelector(".taskList");
  const project = getProjectFromTable(PROJECT_ID);

  createTaskListItem(taskList, project.taskList);

  document.querySelector("#addTaskInput").value = "";
}

/**
 * Creates and appends task list items to the specified task list element.
 * @param {HTMLElement} taskListElement - The task list element to populate.
 * @param {Array} taskListArray - An array of task IDs.
 */
function createTaskListItem(taskListElement, taskListArray) {
  taskListElement.innerHTML = ""; // Clear the task list before rendering

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
    taskListElement.appendChild(document.createElement("br"));
  });
}

/**
 * Adds an event listener to a task checkbox to update its completion status.
 * @param {HTMLInputElement} singleInputCheckbox - The task checkbox element.
 * @param {string} projectID - The ID of the project containing the task.
 */
function updateTaskCompletionStatusEventListener(singleInputCheckbox, projectID) {
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

/**
 * Calculates the completion percentage of tasks in a project.
 * @param {string} projectID - The ID of the project.
 * @returns {number} - The completion percentage of tasks.
 */
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

  return (numberCompleted / taskList.length) * 100;
}

/**
 * Saves the project with the current state of inputs and tasks.
 */
function saveProject() {
  console.log("Save Clicked");
  if (!PROJECT_ID) {
    const newProject = createNewProjectObject();
    PROJECT_ID = newProject.projectID;
    modifyProjectDateCreated(PROJECT_ID, new Date().toISOString().split("T")[0]);
    populateProject();
  }
  const projectTitle = document.querySelector("#projectTitle").value;
  const projectDescription = document.querySelector("#projectDesc").value;
  console.log(projectDescription);
  const projectDeadline = document.querySelector("#deadline").value;
  console.log(projectDeadline);

  modifyProjectTitle(PROJECT_ID, projectTitle);
  modifyProjectDescription(PROJECT_ID, projectDescription);
  modifyProjectDeadline(PROJECT_ID, projectDeadline);
  alert("Save successful (Replace this with a custom one later)");

  window.location.href = "./edit-project.html#" + PROJECT_ID;
}

/**
 * Cancels the edit and redirects to the appropriate page.
 */
function cancelEdit() {
  if (!PROJECT_ID) {
    window.location.href = "../projectlist/projectlist.html";
  } else {
    window.location.href = "./view-project.html#" + PROJECT_ID;
  }
}

/**
 * Adds a linked note to the project based on the selected value.
 */
function addLinkedNotes() {
  const selectedNote = document.querySelector("#linkNotes");
  console.log(selectedNote);

  if (selectedNote.value != "") {
    console.log("Adding linked note");
    appendLinkedNoteToProject(PROJECT_ID, selectedNote.value);
    selectedNote.value = "";
  }
}

/**
 * Populates the options for linking notes from the note table.
 */
function populateOptionsLinkNotes() {
  const noteTable = getNoteTableFromStorage();
  const selectElement = document.querySelector("#linkNotes");

  for (const [key, value] of Object.entries(noteTable)) {
    const option = document.createElement("option");
    option.value = value.noteID;
    option.innerText = value.title;
    selectElement.appendChild(option);
  }
}

/**
 * Populates the linked notes section with notes linked to the project.
 * @param {Array} linkedNotes - An array of linked note IDs.
 * @param {HTMLElement} elementLinkedNotes - The DOM element where the linked notes should be added.
 */
function populateLinkedNotes(linkedNotes, elementLinkedNotes) {
  const linkIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  linkIcon.setAttribute("viewBox", "0 0 448 512");
  linkIcon.innerHTML = `<!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>`;

  const checkbox = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  checkbox.setAttribute("viewBox", "0 0 448 512");
  checkbox.innerHTML = `<!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-65-65c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L192 271l111-111c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>`;

  linkedNotes.forEach((noteID) => {
    const linkedNote = getNoteFromTable(noteID);
    const linkedNoteElement = document.createElement("li");

    const noteLink = document.createElement("a");
    noteLink.href = "../notes/edit-note.html#" + noteID;
    noteLink.textContent = linkedNote.title;

    const deleteButton = document.createElement("button");
    deleteButton.className = "deleteNote";
    deleteButton.setAttribute("aria-label", "Delete note");

    deleteButton.appendChild(checkbox);

    deleteButton.addEventListener("click", function () {
      console.log(noteID);
      removeLinkedNoteFromProject(PROJECT_ID, noteID);
      linkedNoteElement.remove();
    });

    linkedNoteElement.appendChild(linkIcon.cloneNode(true));
    linkedNoteElement.appendChild(noteLink);
    linkedNoteElement.appendChild(deleteButton);

    elementLinkedNotes.appendChild(linkedNoteElement);
  });
}

/**
 * Populates the project details in the UI based on the project ID.
 */
function populateProject() {
  const project = getProjectFromTable(PROJECT_ID);
  if (!project) {
    return;
  }

  const titleElement = document.querySelector("#projectTitle");
  const descriptionElement = document.querySelector("#projectDesc");
  const deadlineElement = document.querySelector("#deadline");
  const priorityElement = document.querySelector("#priority");
  const taskListElement = document.querySelector(".taskList");
  const linkedNotesElement = document.querySelector(".linkedNotes");
  const progressBar = document.querySelector("progress");

  titleElement.value = project.title;
  descriptionElement.value = project.description;
  deadlineElement.value = project.deadline;
  priorityElement.value = project.priority;

  createTaskListItem(taskListElement, project.taskList);

  updateProgress();

  populateLinkedNotes(project.linkedNotes, linkedNotesElement);
  updatePriority();
}

document.addEventListener("DOMContentLoaded", function () {
  init();
});
