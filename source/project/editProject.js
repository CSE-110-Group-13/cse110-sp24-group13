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

  document.querySelector(".progress label").textContent = progressBar.value+"%";
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
    console.log(task)
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
    console.log(projectID);
    modifyLastWorkedOn(projectID, newDate);
    progressBar.value = calculateTaskCompletion(projectID);

    const linkedNotesElement = document.querySelector(".linkedNotes");
    const project = getProjectFromTable(PROJECT_ID);
    populateLinkedNotes(project.linkedNotes, linkedNotesElement)
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
    selectedNote.ariaPlaceholder = "Linked Note(s)";
    console.log(getProjectFromTable(PROJECT_ID).linkedNotes[0]);
  }
  const linkedNotesElement = document.querySelector(".linkedNotes");
  const project = getProjectFromTable(PROJECT_ID);
  populateLinkedNotes(project.linkedNotes, linkedNotesElement)
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
    // Create SVG icons for linking and checkboxes
    elementLinkedNotes.innerHTML = '';
    const linkIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    linkIcon.setAttribute("viewBox", "0 0 640 512");
    linkIcon.innerHTML = `<!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"/>`;
  
    const checkbox = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    checkbox.setAttribute("viewBox", "0 0 448 512");
    checkbox.innerHTML = `<!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>`;
  
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
  
      // Add the parts of the header to the linked notes container
      noteHeader.appendChild(title);
      noteHeader.appendChild(linkIcon.cloneNode(true));
      noteHeader.appendChild(rightSide);

      
  
      // Append the note header and completed tasks to the linked notes element
      elementLinkedNotes.appendChild(noteHeader);
      elementLinkedNotes.appendChild(document.createElement("hr"));
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
