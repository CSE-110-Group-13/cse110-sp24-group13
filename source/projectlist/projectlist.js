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
  removeCompletedTaskFromProject
} from "../backend/ProjectTable.js"

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
        <percentage-completed></percentage-completed>
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

    const title = projectContainer.querySelector('.title');
    title.textContent = value.title;

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
  for (const task of taskListArray) {
    const taskListItem = document.createElement('li');
    taskListElement.appendChild(taskListItem);

    const inputCheckbox = document.createElement('input');
    inputCheckbox.setAttribute('type', 'checkbox');
    inputCheckbox.id = task;
    
    const label = document.createElement('label');
    label.setAttribute('for', task);
    label.textContent = task;

    taskListItem.appendChild(inputCheckbox);
    taskListItem.appendChild(label);
  }
}

function init() {
  createProjects();
}