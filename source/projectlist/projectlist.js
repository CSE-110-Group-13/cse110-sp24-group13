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
  modifyProjectDateCreated,
  appendCompletedTaskToProject,
  removeCompletedTaskFromProject,
  modifyProjectLastWorked
} from "../backend/ProjectTable.js"

import {
  getTaskTableFromStorage,
  saveTaskTableToStorage,
  getTaskFromTable,
  saveTaskToTable,
  deleteTaskFromTable,
  createNewTaskObject,
  modifyTaskName,
  modifyTaskCompleted
} from "../backend/TaskTable.js"


window.addEventListener("DOMContentLoaded", init);

const main = document.querySelector('main');

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
          <h1 class="title"></h1>
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

    const labelForProgressBar = document.createElement('label');
    labelForProgressBar.setAttribute('for', 'progressBar');
    const progressBar = document.createElement('progress');
    progressBar.classList.add('progressBar');
    progressBar.value = `${calculateTaskCompletion(value.projectID)}`;
    progressBar.max = '100';
    // progressBar.value = `${value.taskList.length}`;
    // progressBar.max = `${value.tasksCompleted.length}`
    labelForProgressBar.textContent = `${progressBar.value}% of tasks completed`;
    titlePercentCompletedContainer.appendChild(progressBar);
    titlePercentCompletedContainer.appendChild(labelForProgressBar);

    const startedDate = projectContainer.querySelector('.startedDate');
    startedDate.textContent = `Started: ${dateToString(value.dateCreated)}`;
    const lastWorked = projectContainer.querySelector('.lastWorked');
    lastWorked.textContent = `Last Worked on: ${dateToString(value.lastWorked)}`;
    const deadline = projectContainer.querySelector('.timeTillDeadline');
    deadline.textContent = `${timeTillDeadline(value.deadline)}`;

    const description = projectContainer.querySelector('.projectDescription');
    description.textContent = value.description;

    const taskList = projectContainer.querySelector('.taskList');
    createTaskListItem(taskList, value.taskList, value.projectID, progressBar)

    main.appendChild(projectContainer);
  }
}

// Change this to store task id in the checkbox in some way
function createTaskListItem(taskListElement, taskListArray, projectID, progressBar) {
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

    updateTaskCompletionStatusEventListener(inputCheckbox, projectID, progressBar);
    taskListItem.appendChild(inputCheckbox);
    taskListItem.appendChild(label);
  });
}

function updateTaskCompletionStatusEventListener(singleInputCheckbox, projectID, progressBar) {
  singleInputCheckbox.addEventListener('change', () => {
    const taskID = singleInputCheckbox.id;
    const task = getTaskFromTable(taskID);
    // unchecked to checked
    if (singleInputCheckbox.checked === true && task.completed === false) {
      modifyTaskCompleted(taskID, true);
      appendCompletedTaskToProject(projectID, taskID);
      progressBar.value = calculateTaskCompletion(projectID);
    }
    // checked to unchecked
    if (singleInputCheckbox.checked === false && task.completed === true) {
      modifyTaskCompleted(taskID, false);
      removeCompletedTaskFromProject(projectID, taskID);
      progressBar.value = calculateTaskCompletion(projectID);
    }
  });
}

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

function init() {
  createProjects();
}