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
    attachEditButtonListener();
    attachCancelButtonListener();
}

/**
 * Attaches an event listener to the save button.
 */
function attachEditButtonListener() {
    document.querySelector('edit-button button').addEventListener('click', editProject);
    
}

function attachCancelButtonListener() {
    document.querySelector('delete-button button').addEventListener('click', deleteNote);
}

// Function to handle checkbox change events
function updateProgress(event) {
    if (event.target.checked) {
        console.log(`Task ${event.target.id} checked`);
        progress++;
    } else {
        console.log(`Task ${event.target.id} unchecked`);
        progress--;
    }

    document.getElementById('progressBar').value = progress;
    console.log(getTaskListLength(PROJECT_ID))
    document.getElementById('progressBar').max = getTaskListLength(PROJECT_ID);
    document.getElementById('progressLabel').innerText = progress/getTaskListLength(PROJECT_ID)+"%";
    
    
}

// Add event listeners to each checkbox
taskUpdate.forEach(checkbox => {
    checkbox.addEventListener('change', updateProgress);
});

// Function to get the length of the task list of a specific project
function getTaskListLength(projectID) {
    const projectObject = getProjectFromTable(projectID);
    if (projectObject) {
        console.log(projectID)
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
function editProject() {
    console.log("Edit Clicked");
    window.location.href = './edit-project.html#' + PROJECT_ID;
    
}

function deleteNote() {
    console.log("delete note")
    deleteNoteFromTable(NOTE_ID);
    window.location.href = "../projectlist/projectlist.html";
}

function setDeadline(datetimeInput){
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
        return "Deadline passed!"
    }

    // Convert the difference to weeks, days, and hours
    const millisecondsInOneHour = 1000 * 60 * 60;
    const millisecondsInOneDay = millisecondsInOneHour * 24;
    const millisecondsInOneWeek = millisecondsInOneDay * 7;

    const weeks = Math.floor(differenceInMillis / millisecondsInOneWeek);
    const days = Math.floor((differenceInMillis % millisecondsInOneWeek) / millisecondsInOneDay);
    const hours = Math.floor((differenceInMillis % millisecondsInOneDay) / millisecondsInOneHour);

    // Format the result as a string
    let resultString = '';
    if (weeks > 0) {
        resultString += `${weeks} Week${weeks !== 1 ? 's' : ''}`;
    }
    if (days > 0) {
        resultString += `${resultString.length > 0 ? ', ' : ''}${days} Day${days !== 1 ? 's' : ''}`;
    }
    if (hours > 0) {
        resultString += `${resultString.length > 0 ? ', ' : ''}${hours} Hour${hours !== 1 ? 's' : ''}`;
    }

    resultString += ' till Deadline';

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
    console.log(project.title)
    document.querySelector('h1').innerText = project.title;
    document.querySelector('.projectDue p').innerText = setDeadline(project.deadline);
    document.querySelector('#projectDesc').innerText = project.description;
}