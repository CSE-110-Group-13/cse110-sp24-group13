// editProject.js

//TODO - Linked notes section needs to be implemented (may be done with webcomponent)
//TODO - Add functionality to Link Notes  and Priority dropdown
//TODO - Populate Tasks container

//TODO - Possibly add a popup for when save is successful

import {
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
    modifyProjectPriority,
    appendCompletedTaskToProject,
    removeCompletedTaskFromProject
} from '../backend/ProjectTable.js';

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
        const newProject = createNewProjectObject();
        PROJECT_ID = newProject.projectID;
    } else {
        populateProject();
    }
    attachSaveButtonListener();
    attachCancelButtonListener();
}

/**
 * Attaches an event listener to the save button.
 */
function attachSaveButtonListener() {
    document.querySelector('save-button button').addEventListener('click', saveProject);
    
}

function attachCancelButtonListener() {
    document.querySelector('cancel-button button').addEventListener('click', cancelEdit);
}

// Function to handle checkbox change events
function updateProgress(event) {
    let progressBar = document.getElementById('progressBar').value;
    let progressLabel = document.getElementById('progressLabel').innerText;
    if (event.target.checked) {
        console.log(`Task ${event.target.id} checked`);
        progress++;
    } else {
        console.log(`Task ${event.target.id} unchecked`);
        progress--;
    }

    progressBar = progress;
    document.getElementById('progressBar').max = getTaskListLength(PROJECT_ID);
    progressLabel = progress/getTaskListLength(PROJECT_ID)+"%";
    
    
}

// Get all checkboxes


// Add event listeners to each checkbox
taskUpdate.forEach(checkbox => {
    checkbox.addEventListener('change', updateProgress);
});

// Function to get the length of the task list of a specific project
function getTaskListLength(projectID) {
    const projectObject = getProjectFromTable(projectID);
    if (projectObject) {
      return projectObject.taskList.length;
    } else {
      console.error(`Project with ID ${projectID} not found.`);
      return null;
    }
  }

/**
 * Saves the current state of the project to the local storage.
 * Retrieves the project title, markdown content, and date from the DOM.
 * Modifies the project in the backend using the project ID.
 */
function saveProject() {
    console.log("Save Clicked");
    const projectTitle = document.querySelector('#projectTitle').value;
    const projectDescription = document.querySelector('#projectDesc').value;
    console.log(projectDescription);
    const projectDeadline = document.querySelector('#deadline').value;
    console.log(projectDeadline);
    // Modify the project
    modifyProjectTitle(PROJECT_ID, projectTitle);
    modifyProjectDescription(PROJECT_ID, projectDescription);
    modifyProjectDeadline(PROJECT_ID, projectDeadline);
    alert("Save succesful (Replace this with a custom one later)");

    window.location.href = './edit-project.html#' + PROJECT_ID;
}

function cancelEdit() {
    if(!PROJECT_ID){
        window.location.href = "../projectlist/projectlist.html";
    }
    else{
        window.location.href = './view-project.html#' + PROJECT_ID;
    }
    
}

function addTask(){
    
}

function populateTask(){
    
}


function populateLinkedNotes(){
    
}

/**
 * Populates the project with existing data from the backend.
 * Retrieves the project data using the project ID.
 * Sets the project title, deadline, and date in the DOM.
 */
function populateProject() {
    const project = getProjectFromTable(PROJECT_ID);
    console.log(project.title)
    document.querySelector('#projectTitle').value = project.title;
    document.querySelector('#deadline').value = project.deadline;
    document.querySelector('#projectDesc').innerText = project.description;
}

