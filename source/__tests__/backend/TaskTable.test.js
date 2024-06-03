import {
  getTaskTableFromStorage,
  saveTaskTableToStorage,
  getTaskFromTable,
  saveTaskToTable,
  deleteTaskFromTable,
  createNewTaskObject,
  modifyTaskName,
  modifyTaskCompleted
} from "../../backend/TaskTable.js";

import { mockObjects, initializeLocalStorage } from "../__mocks__/index.js";

/**
 * Tests for task table functions
 */
describe('Tests for backend: Task', () => {
  beforeAll(async () => {
    // Mock window and localStorage object, as well as the alert function
    mockObjects();

    // Clear the local storage
    window.localStorage.clear();

    // Initialize the local storage with the tables and ID container
    initializeLocalStorage();
  });

  afterAll(async () => {
    window.localStorage.clear();
  });

  it('Test get the task table from storage', async () => {
    // Get the task table from storage
    const taskTable = getTaskTableFromStorage();

    // Check if the task table is empty
    expect(Object.keys(taskTable).length).toBe(0);
  });

  it('Test save the task table to storage', async () => {
    // Create a new task table object and save
    const newTaskTable = {};
    saveTaskTableToStorage(newTaskTable);

    // Fetch the task table and check
    const taskTable = getTaskTableFromStorage();
    expect(Object.keys(taskTable).length).toBe(0);
  });

  it('Test create a new task object', async () => {
    // Create a new task object
    const newTask = createNewTaskObject();
    
    // Fetch the task and check
    const task = getTaskFromTable(newTask.taskID);
    expect(task).toEqual(newTask);
  });

  it('Test save a task to the task table', async () => {
    // Create a new task object and modify the name
    let newTask = createNewTaskObject();
    newTask['name'] = 'New Task Name';
    saveTaskToTable(newTask.taskID, newTask);

    // Fetch the task table and check
    const task = getTaskFromTable(newTask.taskID);
    expect(task).toEqual(newTask);
  });

  it('Test modify the task name', async () => {
    // Create a new task object and modify the name
    let newTask = createNewTaskObject();
    newTask['name'] = 'New Task Name';
    saveTaskToTable(newTask.taskID, newTask);

    // Modify the task name
    modifyTaskName(newTask.taskID, 'Modified Task Name');

    // Fetch the task table and check
    const task = getTaskFromTable(newTask.taskID);
    expect(task['name']).toBe('Modified Task Name');
  });

  it('Test modify the task completed', async () => {
    // Create a new task object and modify the completed status
    let newTask = createNewTaskObject();
    newTask['completed'] = false;
    saveTaskToTable(newTask.taskID, newTask);

    // Modify the task completed status
    modifyTaskCompleted(newTask.taskID, true);

    // Fetch the task table and check
    const task = getTaskFromTable(newTask.taskID);
    expect(task['completed']).toBe(true);
  });

  it('Test delete a task from the task table', async () => {
    // Create a new task object and delete
    let taskTable = getTaskTableFromStorage();
    for (let key in taskTable) {
      deleteTaskFromTable(key);
    }

    // Fetch the task table and check
    const newTaskTable = getTaskTableFromStorage();
    expect(Object.keys(newTaskTable).length).toBe(0);
  });
});