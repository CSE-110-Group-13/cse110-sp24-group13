// editProject.js

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
  modifyLastWorkedOn,
  deleteProjectFromTable,
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

let PROJECT_ID;
let NEW_PROJECT = false;

/**
 * Initializes the edit project page by setting up event listeners,
 * retrieving project information, and populating the page with data.
 */
function init() {
  PROJECT_ID = window.location.hash.substring(1);
  if (!PROJECT_ID) {
    const project = createNewProjectObject();
    NEW_PROJECT = true;
    PROJECT_ID = project.projectID;
    let newDate = new Date().toISOString().split("T")[0];
    modifyProjectDateCreated(PROJECT_ID, newDate);
    modifyLastWorkedOn(PROJECT_ID, newDate);
    modifyProjectTitle(PROJECT_ID, "New Project!");
    modifyProjectPriority(PROJECT_ID, "low");
  }
  populateProject();
  populateOptionsLinkNotes();

  attachSaveButtonListener();
  attachCancelButtonListener();

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
function attachSaveButtonListener() {
  document
    .querySelector("save-button button")
    .addEventListener("click", saveProject);
}

/**
 * Attaches an event listener to the cancel button.
 */
function attachCancelButtonListener() {
  document
    .querySelector("cancel-button button")
    .addEventListener("click", cancelEdit);
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
      color = "#6d6d6d";
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

  modifyTaskName(newTask.taskID, taskName);

  const taskList = document.querySelector(".taskList");
  const project = getProjectFromTable(PROJECT_ID);

  createTaskListItem(taskList, project.taskList);

  document.querySelector("#addTaskInput").value = "";
  updateProgress();
}

/**
 * Creates and appends task list items to the specified task list element.
 * @param {HTMLElement} taskListElement - The task list element to populate.
 * @param {Array} taskListArray - An array of task IDs.
 */
function createTaskListItem(taskListElement, taskListArray) {
  taskListElement.innerHTML = ""; // Clear the task list before rendering

  const trashIconTemplate = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  trashIconTemplate.setAttribute("viewBox", "0 0 448 512");
  trashIconTemplate.setAttribute("class", "removeNote");
  trashIconTemplate.innerHTML = `<!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>`;

  taskListArray.forEach((taskID) => {
    const task = getTaskFromTable(taskID);
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("taskContainer");

    const inputCheckbox = document.createElement("input");
    inputCheckbox.setAttribute("type", "checkbox");
    inputCheckbox.id = taskID;

    const taskName = document.createElement("input");
    taskName.setAttribute("type", "text");
    taskName.id = taskID;
    taskName.value = task.name;

    const trashIcon = trashIconTemplate.cloneNode(true);
    trashIcon.id = taskID;

    if (task.completed) {
      inputCheckbox.checked = true;
    }

    // Event listener for the trash icon
    trashIcon.addEventListener("click", () => {
      removeTask(taskID); // Call the function with the task ID
    });

    // Event listener for the text input to wait for Enter key
    taskName.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        updateTaskName(taskID, event.target.value); // Call the function with the task ID and new value
      }
    });

    updateTaskCompletionStatusEventListener(inputCheckbox, PROJECT_ID);
    taskContainer.appendChild(inputCheckbox);
    taskContainer.appendChild(taskName);
    taskContainer.appendChild(trashIcon);
    taskListElement.appendChild(taskContainer);
  });
}

/**
 * Given taskID, remove it from a project
 * @param {String} taskID taskID of task to be removed
 */
function removeTask(taskID) {
  removeTaskFromProjectTaskList(PROJECT_ID, taskID);
  deleteTaskFromTable(taskID);

  const taskList = document.querySelector(".taskList");
  const project = getProjectFromTable(PROJECT_ID);

  createTaskListItem(taskList, project.taskList);
}

/**
 * Changes task name to new name given task ID
 * @param {String} taskID ID of task
 * @param {String} newName new name for task
 */
function updateTaskName(taskID, newName) {
  modifyTaskName(taskID, newName);

  const taskList = document.querySelector(".taskList");
  const project = getProjectFromTable(PROJECT_ID);

  createTaskListItem(taskList, project.taskList);
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

    const linkedNotesElement = document.querySelector(".linkedNotes");
    const project = getProjectFromTable(PROJECT_ID);
    updateProgress();
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

  if (selectedNote.value != "") {
    appendLinkedNoteToProject(PROJECT_ID, selectedNote.value);
    modifyLinkedProject(selectedNote.value, PROJECT_ID);
    selectedNote.value = "";
    selectedNote.ariaPlaceholder = "Linked Note(s)";
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

  const trashIcon = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  trashIcon.setAttribute("viewBox", "0 0 448 512");
  trashIcon.setAttribute("class", "removeNote");
  trashIcon.innerHTML = `<!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>`;

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

    trashIcon.setAttribute("id", note.noteID);

    notesLink.appendChild(linkIcon.cloneNode(true));

    // Add the parts of the header to the linked notes container
    noteHeader.appendChild(title);
    noteHeader.appendChild(notesLink);
    noteHeader.appendChild(rightSide);
    noteHeader.appendChild(trashIcon.cloneNode(true));

    // Append the note header and completed tasks to the linked notes element
    elementLinkedNotes.appendChild(noteHeader);
    elementLinkedNotes.appendChild(document.createElement("hr"));
  });

  // Add event listener to trash icons
  const trashIcons = elementLinkedNotes.querySelectorAll(".removeNote");
  trashIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      const noteID = icon.getAttribute("id");
      removeLinkedNote(noteID);
    });
  });
}

/**
 * Given noteID, remove it from the project
 * @param {String} noteID ID of note
 */
function removeLinkedNote(noteID) {
  removeLinkedNoteFromProject(PROJECT_ID, noteID);
  const linkedNotesElement = document.querySelector(".linkedNotes");
  const project = getProjectFromTable(PROJECT_ID);
  populateLinkedNotes(project.linkedNotes, linkedNotesElement);
  populateOptionsLinkNotes();
}

/**
 * Saves the project with the current state of inputs and tasks.
 */
function saveProject() {
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
  const projectDeadline = document.querySelector("#deadline").value;

  modifyProjectTitle(PROJECT_ID, projectTitle);
  modifyProjectDescription(PROJECT_ID, projectDescription);
  modifyProjectDeadline(PROJECT_ID, projectDeadline);
  setTimeout(() => {
    window.location.href = "./view-project.html#" + PROJECT_ID;
  }, 500);
}

/**
 * Cancels the edit and redirects to the appropriate page.
 */
function cancelEdit() {
  if (!PROJECT_ID) {
    window.location.href = "../projectlist/projectlist.html";
  } else {
    if (NEW_PROJECT) {
      deleteProjectFromTable(PROJECT_ID);
    }
    window.location.href = "../homepage/index.html";
    PROJECT_ID = "";
  }
}

/**
 * Populates the project details in the UI based on the project ID.
 */
function populateProject() {
  const project = getProjectFromTable(PROJECT_ID);
  if (!project) {
    return;
  }
  document.title = "Project | " + project.title;

  const titleElement = document.querySelector("#projectTitle");
  const descriptionElement = document.querySelector("#projectDesc");
  const deadlineElement = document.querySelector("#deadline");
  const priorityElement = document.querySelector("#priority");
  const taskListElement = document.querySelector(".taskList");
  const linkedNotesElement = document.querySelector(".linkedNotes");

  titleElement.value = project.title;
  descriptionElement.value = project.description;
  deadlineElement.value = project.deadline;
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

document.addEventListener("DOMContentLoaded", function () {
  init();
});
