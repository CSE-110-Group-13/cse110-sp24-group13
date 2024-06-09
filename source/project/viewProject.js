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
  modifyLastWorkedOn,
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
  PROJECT_ID = window.location.hash.substring(1);
  if (!PROJECT_ID) {
    alert("No project exists here");
    window.location.href = "../projectlist/projectlist.html";
  }
  populateProject();
  populateOptionsLinkNotes();

  attachEditButtonListener();
  attachDeleteButtonListener();

  document
    .querySelector("#linkNotes")
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
}

/**
 * Attaches an event listener to the save button.
 */
function attachEditButtonListener() {
  document
    .querySelector("edit-button button")
    .addEventListener("click", editProject);
}

function attachDeleteButtonListener() {
  document
    .querySelector("delete-button button")
    .addEventListener("click", deleteNote);
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

  document.querySelector(".progress label").textContent =
    Math.floor(progressBar.value) + "%";
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

  updateProgress();
  calculateTaskCompletion(PROJECT_ID);
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
      label.classList.add("checked");
      inputCheckbox.classList.add("checked");
    }
    console.log(task);

    updateTaskCompletionStatusEventListener(inputCheckbox, PROJECT_ID);
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
function updateTaskCompletionStatusEventListener(
  singleInputCheckbox,
  projectID
) {
  singleInputCheckbox.addEventListener("change", () => {
    const taskID = singleInputCheckbox.id;
    const task = getTaskFromTable(taskID);
    const label = document.querySelector(`label[for="${taskID}"]`);

    let newDate = new Date().toISOString().split("T")[0];

    if (singleInputCheckbox.checked && !task.completed) {
      modifyTaskCompleted(taskID, true);
      appendCompletedTaskToProject(projectID, taskID);
      label.classList.add("checked");
      singleInputCheckbox.classList.add("checked");
    } else if (!singleInputCheckbox.checked && task.completed) {
      modifyTaskCompleted(taskID, false);
      removeCompletedTaskFromProject(projectID, taskID);
      label.classList.remove("checked");
      singleInputCheckbox.classList.remove("checked");
    }

    modifyLastWorkedOn(projectID, newDate);
    updateProgress();

    const linkedNotesElement = document.querySelector(".linkedNotes");
    const project = getProjectFromTable(PROJECT_ID);
    populateLinkedNotes(project.linkedNotes, linkedNotesElement);
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
 * Adds a linked note to the project based on the selected value.
 */
function addLinkedNotes() {
  const selectedNote = document.querySelector("#linkNotes");
  console.log(selectedNote);

  if (selectedNote.value != "") {
    console.log("Adding linked note");
    appendLinkedNoteToProject(PROJECT_ID, selectedNote.value);
    modifyLinkedProject(selectedNote.value, PROJECT_ID);
    selectedNote.value = "";
    selectedNote.ariaPlaceholder = "Linked Note(s)";
    console.log(getProjectFromTable(PROJECT_ID).linkedNotes[0]);
  }
  const linkedNotesElement = document.querySelector(".linkedNotes");
  const project = getProjectFromTable(PROJECT_ID);
  populateLinkedNotes(project.linkedNotes, linkedNotesElement);
  populateOptionsLinkNotes();
}

/**
 * Populates the options for linking notes from the note table.
 */
function populateOptionsLinkNotes() {
  const noteTable = getNoteTableFromStorage();
  const linkedNotes = getProjectFromTable(PROJECT_ID).linkedNotes;
  const selectElement = document.querySelector("#linkNotes");
  selectElement.innerHTML = "";

  const placeHolder = document.createElement("option");
  placeHolder.value = "default";
  placeHolder.setAttribute("disabled", "disabled");
  placeHolder.setAttribute("selected", "selected");
  placeHolder.innerText = "Link Note(s)";

  selectElement.appendChild(placeHolder);

  for (const [key, value] of Object.entries(noteTable)) {
    if (value.linkedProject === "") {
      const option = document.createElement("option");
      option.value = value.noteID;
      option.innerText = value.title;
      selectElement.appendChild(option);
    }
  }
}

/**
 * Populates the linked notes section with notes linked to the project.
 * @param {Array} linkedNotes - An array of linked note IDs.
 * @param {HTMLElement} elementLinkedNotes - The DOM element where the linked notes should be added.
 */
function populateLinkedNotes(linkedNotes, elementLinkedNotes) {
  // Create SVG icons for linking and checkboxes
  elementLinkedNotes.innerHTML = "";
  const linkIcon = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  linkIcon.setAttribute("viewBox", "0 0 640 512");
  linkIcon.innerHTML = `<!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"/>`;

  // Iterate through each linked note
  linkedNotes.forEach((noteID) => {
    const note = getNoteFromTable(noteID);

    // Create the note header
    const noteHeader = document.createElement("div");
    noteHeader.classList.add("linkedNote");

    const title = document.createElement("h3");
    title.textContent = note.title;

    // Create the right side of the header which includes tags and last modified date
    const rightSide = document.createElement("ul");

    const lastModified = document.createElement("p");
    lastModified.textContent = "Last modified: " + note.lastEdited;
    rightSide.appendChild(lastModified);

    note.tags.forEach((tagName) => {
      const tag = document.createElement("li");
      tag.textContent = tagName;
      rightSide.appendChild(tag);
    });

    const notesLink = document.createElement("a");
    notesLink.setAttribute("href", "../note/view-note.html#" + note.noteID);

    notesLink.appendChild(linkIcon.cloneNode(true));

    // Add the parts of the header to the linked notes container
    noteHeader.appendChild(title);
    noteHeader.appendChild(notesLink);
    noteHeader.appendChild(rightSide);

    // Append the note header and completed tasks to the linked notes element
    elementLinkedNotes.appendChild(noteHeader);
    elementLinkedNotes.appendChild(document.createElement("hr"));
  });

}

/**
 * Saves the current state of the project to the local storage.
 * Retrieves the project title, markdown content, and date from the DOM.
 * Modifies the project in the backend using the project ID.
 */
function editProject() {
  console.log("Edit Clicked");
  window.location.href = "./edit-project.html#" + PROJECT_ID;
}

function deleteNote() {
  console.log("Delete clicked");
}

function setDeadline(datetimeInput) {
  // Get the value from the datetime-local input
  if (!datetimeInput) {
    console.log(datetimeInput);
    return "No deadline assigned";
  }
  // Parse the value to create a Date object
  const targetDate = new Date(datetimeInput);
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const differenceInMillis = targetDate - currentDate;

  if (differenceInMillis < 0) {
    return "Deadline passed!";
  }

  // Convert the difference to weeks, days, and hours
  const millisecondsInOneHour = 1000 * 60 * 60;
  const millisecondsInOneDay = millisecondsInOneHour * 24;
  const millisecondsInOneWeek = millisecondsInOneDay * 7;

  const weeks = Math.floor(differenceInMillis / millisecondsInOneWeek);
  const days = Math.floor(
    (differenceInMillis % millisecondsInOneWeek) / millisecondsInOneDay
  );
  const hours = Math.floor(
    (differenceInMillis % millisecondsInOneDay) / millisecondsInOneHour
  );

  // Format the result as a string
  let resultString = "";
  if (weeks > 0) {
    resultString += `${weeks} Week${weeks !== 1 ? "s" : ""}`;
  }
  if (days > 0) {
    resultString += `${resultString.length > 0 ? ", " : ""}${days} Day${
      days !== 1 ? "s" : ""
    }`;
  }
  if (hours > 0) {
    resultString += `${resultString.length > 0 ? ", " : ""}${hours} Hour${
      hours !== 1 ? "s" : ""
    }`;
  }

  resultString += " till Deadline";

  // Display the result
  return resultString;
}

/**
 * Populates the project with existing data from the backend.
 * Retrieves the project data using the project ID.
 * Sets the project title, deadline, and date in the DOM.
 */
function populateProject() {
  const project = getProjectFromTable(PROJECT_ID);

  document.title = "Commit | " + project.title;

  const titleElement = document.querySelector("h1");
  const descriptionElement = document.querySelector("#projectDesc");
  const deadlineElement = document.querySelector(".projectDue p");
  const priorityElement = document.querySelector("#priority");
  const taskListElement = document.querySelector(".taskList");
  const linkedNotesElement = document.querySelector(".linkedNotes");

  titleElement.textContent = project.title;
  descriptionElement.textContent = project.description;
  deadlineElement.textContent = setDeadline(project.deadline);
  priorityElement.value = project.priority;

  createTaskListItem(taskListElement, project.taskList);

  updateProgress();

  populateLinkedNotes(project.linkedNotes, linkedNotesElement);
  updatePriority();
}

document.getElementById("descDropdown").addEventListener("click", function () {
  const angleBracket = document.getElementById("descDropdown");
  const projectDesc = document.getElementById("projectDesc");
  const line = document.createElement("hr");

  if (projectDesc.style.display === "none") {
    projectDesc.style.display = "block";
    angleBracket.classList.remove("flip");
    // If you want to remove the line when showing the description
    if (
      angleBracket.previousElementSibling &&
      angleBracket.previousElementSibling.tagName === "HR"
    ) {
      angleBracket.previousElementSibling.remove();
    }
  } else {
    projectDesc.style.display = "none";
    angleBracket.classList.add("flip");
    // Insert the line above the angleBracket
    angleBracket.parentNode.insertBefore(line, angleBracket);
  }
});
