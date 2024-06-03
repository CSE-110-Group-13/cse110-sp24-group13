// editProject.js

//TODO - Linked notes section needs to be implemented (may be done with webcomponent)
//TODO - Add functionality to Link Notes  and Priority dropdown
//TODO - Populate Tasks container

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
    console.log("Save Clicked");
}

function attachCancelButtonListener() {
    document.querySelector('cancel-button button').addEventListener('click', cancelEdit);
}

// Function to handle checkbox change events
function updateProgress(event) {
    const progressBar = document.getElementById('progressBar').value;
    const progressLabel = document.getElementById('progressLabel').innerText;
    if (event.target.checked) {
        console.log(`Task ${event.target.id} checked`);
        progress++;
    } else {
        console.log(`Task ${event.target.id} unchecked`);
        progress--;
    }

    progressBar = progress;
    progressLabel = PROJECT_ID.taskList.length+"%";
    
    
}

// Get all checkboxes


// Add event listeners to each checkbox
taskUpdate.forEach(checkbox => {
    checkbox.addEventListener('change', updateProgress);
});

/**
 * Saves the current state of the project to the local storage.
 * Retrieves the project title, markdown content, and date from the DOM.
 * Modifies the project in the backend using the project ID.
 */
function saveProject() {
    const projectTitle = document.querySelector('.projectTitle h1').innerText;
    const projectDescription = document.querySelector('markdown-editor').wysimark.getMarkdown();
    const projectDeadline = document.querySelector('.date input').value;
    // Modify the project
    modifyProjectTitle(PROJECT_ID, projectTitle);
    modifyProjectDescription(PROJECT_ID, projectDescription);
    modifyProjectDeadline(PROJECT_ID, projectDeadline);

    window.location.href = './view-project.html#' + PROJECT_ID;
    
}

function cancelEdit() {
    if(!PROJECT_ID){
        window.location.href = "../projectlist/projectlist.html";
    }
    else{
        window.location.href = './view-project.html#' + PROJECT_ID;
    }
    
}
/**
 * Populates the project with existing data from the backend.
 * Retrieves the project data using the project ID.
 * Sets the project title, deadline, and date in the DOM.
 */
function populateProject() {
    const project = getProjectFromTable(PROJECT_ID);
    console.log(project.title)
    document.querySelector('#projectTitle h1').innerText = project.title;
    document.querySelector('#deadline').value = project.deadline;
    document.querySelector('#projectDesc').innerText = project.description;
}