import {
  getProjectTableFromStorage,
  getProjectFromTable,
  appendCompletedTaskToProject,
  removeCompletedTaskFromProject,
  modifyLastWorkedOn
} from "../backend/ProjectTable.js"

import {
  getTaskFromTable,
  modifyTaskCompleted
} from "../backend/TaskTable.js"

window.addEventListener("DOMContentLoaded", init);

// Element that contains the project list
const main = document.querySelector('main');

/**
 * Loops through Project Table from localStorage and renders the project list
 */
function createProjects() {
  const projectTable = getProjectTableFromStorage();
  for (const [key, value] of Object.entries(projectTable)) {
    const projectContainer = document.createElement('div');
    projectContainer.id = value.projectID;
    projectContainer.classList.add('project');

    projectContainer.innerHTML = `
      <div class="titlePercentCompletedContainer">
        <div class="containerForPriorityIconTitle">
          <div class="priority-icon"></div>
          <a class="title"></a>
        </div>
      </div>
      <div class="deadlineContainer">
        <div class="containerForStartedDateLastWorked"> 
          <p class="startedDate"></p>
          <p class="lastWorked"></p>
        </div>
        <p class="timeTillDeadline"></p>
      </div>
      <div class="descriptionContainer">
        <h2>Description</h2>
        <p class="projectDescription"></p>
      </div>
      <div class="taskListContainer">
        <h2>Tasks</h2>
        <ul class="taskList"></ul>
      </div>
    `;
    const titlePercentCompletedContainer = projectContainer.querySelector('.titlePercentCompletedContainer');

    const priorityIcon = projectContainer.querySelector('.priority-icon');
    priorityIcon.classList.add(`${value.priority}`);

    const title = projectContainer.querySelector('.title');
    title.textContent = value.title;
    title.href = "../project/view-project.html" + "#" + value.projectID;

    const labelForProgressBar = document.createElement('label');
    labelForProgressBar.setAttribute('for', 'progressBar');
    const progressBar = document.createElement('progress');
    progressBar.classList.add('progressBar');
    progressBar.value = `${calculateTaskCompletion(value.projectID)}`;
    progressBar.max = '100';
    labelForProgressBar.textContent = `${progressBar.value}% of tasks completed`;
    titlePercentCompletedContainer.appendChild(progressBar);
    titlePercentCompletedContainer.appendChild(labelForProgressBar);

    const startedDate = projectContainer.querySelector('.startedDate');
    startedDate.textContent = `Started: ${dateToString(value.dateCreated)}`;
    const lastWorked = projectContainer.querySelector('.lastWorked');
    lastWorked.textContent = `Last Worked on: ${dateToString(value.lastWorkedOn)}`;
    const deadline = projectContainer.querySelector('.timeTillDeadline');
    deadline.textContent = `${timeTillDeadline(value.deadline)}`;

    const description = projectContainer.querySelector('.projectDescription');
    description.textContent = value.description;

    const taskList = projectContainer.querySelector('.taskList');
    createTaskListItem(taskList, value.taskList, value.projectID, progressBar, lastWorked);

    main.appendChild(projectContainer);
  }
}

/**
 * Generates the task list for a project
 *
 * @param {Object} taskListElement - li element for task list
 * @param {Array<String>} taskListArray - task list array for one project
 * @param {String} projectID - id of a project
 * @param {Object} progressBar - progress element for progress bar
 */
function createTaskListItem(taskListElement, taskListArray, projectID, progressBar, lastWorked) {
  taskListArray.forEach(taskID => {
    const task = getTaskFromTable(taskID);
    const taskListItem = document.createElement('li');
    taskListElement.appendChild(taskListItem);

    const inputCheckbox = document.createElement('input');
    inputCheckbox.setAttribute('type', 'checkbox');
    inputCheckbox.id = taskID;
    
    const label = document.createElement('label');
    label.setAttribute('for', taskID);
    label.textContent = task.name;

    if (task.completed === true) {
      inputCheckbox.checked = true;
    }

    updateTaskCompletionStatusEventListener(inputCheckbox, projectID, progressBar, lastWorked);
    taskListItem.appendChild(inputCheckbox);
    taskListItem.appendChild(label);
  });
}

/**
 * Adds event listener to checkbox task li elements, modifies in localStorage
 *
 * @param {Object} singleInputCheckbox - input element for task
 * @param {String} projectID - id for task's respective project
 * @param {Object} progressBar - progress element for progress bar
 */
function updateTaskCompletionStatusEventListener(singleInputCheckbox, projectID, progressBar, lastWorked) {
  singleInputCheckbox.addEventListener('change', () => {
    const taskID = singleInputCheckbox.id;
    const task = getTaskFromTable(taskID);
    // unchecked to checked
    if (singleInputCheckbox.checked === true && task.completed === false) {
      let newDate = new Date();
      newDate = newDate.toISOString().split('T')[0];
      modifyTaskCompleted(taskID, true);
      appendCompletedTaskToProject(projectID, taskID);
      modifyLastWorkedOn(projectID, newDate);
      lastWorked.textContent = `Last Worked on: ${dateToString(newDate)}`;
      progressBar.value = calculateTaskCompletion(projectID);
    }
    // checked to unchecked
    if (singleInputCheckbox.checked === false && task.completed === true) {
      let newDate = new Date();
      newDate = newDate.toISOString().split('T')[0];
      modifyTaskCompleted(taskID, false);
      removeCompletedTaskFromProject(projectID, taskID);
      modifyLastWorkedOn(projectID, newDate);
      lastWorked.textContent = `Last Worked on: ${dateToString(newDate)}`;
      progressBar.value = calculateTaskCompletion(projectID);
    }
  });
}

/**
 * Returns the percent of tasks completed for a project
 *
 * @param {String} projectID - id of a project
 * @returns {Number} - % of tasks completed for a project as an integer
 */
function calculateTaskCompletion(projectID) {
  const selectedProject = getProjectFromTable(projectID);
  const taskList = selectedProject.taskList;
  if (taskList.length !== 0) {
    let numberCompleted = 0;
    let totalTasks = taskList.length;
    taskList.forEach(taskID => {
      const task = getTaskFromTable(taskID);
      if (task.completed === true) {numberCompleted++};
    });
    let percentCompleted = Math.trunc((numberCompleted / totalTasks) * 100);
    return percentCompleted;
  } else {
    return -1;
  }
}

/**
 * Given a date of the format YYYY-MM-DD, returns string for it
 *
 * @param {String} dateStr - date in YYYY-MM-DD format
 * @returns {String} - date in string format: Month DayXX
 */
function dateToString(dateStr) {
    const months = ["January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"];

    const [year, month, day] = dateStr.split("-");

    const monthName = months[parseInt(month, 10) - 1];

    const dayInt = parseInt(day, 10);
    const suffix = (dayInt === 1 || dayInt === 21 || dayInt === 31) ? "st" :
                   (dayInt === 2 || dayInt === 22) ? "nd" :
                   (dayInt === 3 || dayInt === 23) ? "rd" : "th";

    return `${monthName} ${dayInt}${suffix}`;
}

/**
 * Given deadline in YYYY-MM-DD format, returns string for time till deadline
 *
 * @param {String} deadline - date in YYYY-MM-DD format
 * @returns {String} - Time till deadline: X Week(s), X Day(s) till deadline
 */
function timeTillDeadline(deadline) {
  const currentDate = new Date();
  const deadlineDate = new Date(deadline);

  const differenceInTimeMilliseconds = deadlineDate - currentDate;
  if (differenceInTimeMilliseconds <= 0) {
    return "Deadline has already passed.";
  }

  const differenceInDays = Math.floor(differenceInTimeMilliseconds/ (1000 * 60 * 60 * 24));
  const weeksLeft = Math.floor(differenceInDays / 7);
  const daysLeft = differenceInDays % 7;

  if (weeksLeft > 1 && daysLeft > 1) {
    return `${weeksLeft} Weeks, ${daysLeft} Days till deadline: ${dateToString(deadline)}`;
  }
  else if (weeksLeft <= 1 && daysLeft > 1) {
    return `${weeksLeft} Week, ${daysLeft} Days till deadline: ${dateToString(deadline)}`;
  }
  else if (weeksLeft > 1 && daysLeft <= 1) {
    return `${weeksLeft} Weeks, ${daysLeft} Day till deadline: ${dateToString(deadline)}`;
  }
  else if (weeksLeft <= 1 && daysLeft <= 1) {
    return `${weeksLeft} Week, ${daysLeft} Day till deadline: ${dateToString(deadline)}`;
  }
}

/**
 * Does an initial rendering of project list on page load
 */
function init() {
  createProjects();
}