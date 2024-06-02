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
  modifyProjectPriority
} from "./ProjectTable.js"

window.addEventListener("DOMContentLoaded", init);

function init() {
  const projectTable = getProjectTableFromStorage();
  if (Object.keys(projectTable).length < 6) {
    createNewProjectObject("Project1", "Description1", ['task1', 'task2', 'task3'], "07/12/2024", "Priority1");
    createNewProjectObject("Project2", "Description2", ['task1', 'task2', 'task3'], "08/12/2024", "Priority2");
    createNewProjectObject("Project3", "Description3", ['task1', 'task2', 'task3'], "01/12/2025", "Priority3");
    createNewProjectObject("Project3", "Description3", ['task1', 'task2', 'task3'], "Deadline3", "Priority3");
    createNewProjectObject("Project3", "Description3", ['task1', 'task2', 'task3'], "Deadline3", "Priority3");
    createNewProjectObject("Project3", "Description3", ['task1', 'task2', 'task3'], "Deadline3", "Priority3");
  }
}