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
        <priority-icon></priority-icon>
        <h1 class="title"></h1>
      </div>
      <div class="deadlineConatiner">
        <p class="startedDate"></p>
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

    const priorityIcon = projectContainer.querySelector('priority-icon');
    priorityIcon.classList.add(`${value.priority}`);

    const title = projectContainer.querySelector('.title');
    title.textContent = value.title;

    const labelForProgressBar = document.createElement('label');
    labelForProgressBar.setAttribute('for', 'progressBar');
    const progressBar = document.createElement('progress');
    progressBar.id = 'progressBar';
    progressBar.value = `${calculateTaskCompletion(value.projectID)}`;
    progressBar.max = '100';
    titlePercentCompletedContainer.appendChild(labelForProgressBar);
    titlePercentCompletedContainer.appendChild(progressBar);


    const startedDate = projectContainer.querySelector('.startedDate');
    startedDate.textContent = `Deadline: ${value.deadline}`;

    const description = projectContainer.querySelector('.projectDescription');
    description.textContent = value.description;

    const taskList = projectContainer.querySelector('.taskList');
    createTaskListItem(taskList, value.taskList)

    main.appendChild(projectContainer);
  }
}

// Change this to store task id in the checkbox in some way
function createTaskListItem(taskListElement, taskListArray) {
  taskListArray.forEach(taskID => {
    const task = getTaskFromTable(taskID);
    const taskListItem = document.createElement('li');
    taskListElement.appendChild(taskListItem);

    const inputCheckbox = document.createElement('input');
    inputCheckbox.setAttribute('type', 'checkbox');
    inputCheckbox.id = task;
    
    const label = document.createElement('label');
    label.setAttribute('for', task);
    label.textContent = task.name;

    taskListItem.appendChild(inputCheckbox);
    taskListItem.appendChild(label);
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

function init() {
  createProjects();
}