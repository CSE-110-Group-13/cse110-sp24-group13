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
  appendLinkedNoteToProject,
  removeLinkedNoteFromProject,
  modifyLastWorkedOn
} from "../../backend/ProjectTable.js";

import {
  createNewNoteObject
} from "../../backend/NoteTable.js";

import { mockObjects, initializeLocalStorage } from "../__mocks__/index.js";

/**
 * Tests for project table functions
 */
describe('Tests for backend: Project', () => {
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

  it('Test get the project table from storage', async () => {
    // Get the project table from storage
    const projectTable = getProjectTableFromStorage();

    // Check if the project table is empty
    expect(Object.keys(projectTable).length).toBe(0);
  });

  it('Test save the project table to storage', async () => {
    // Create a new project table object and save
    const newProjectTable = {};
    saveProjectTableToStorage(newProjectTable);

    // Fetch the project table and check
    const projectTable = getProjectTableFromStorage();
    expect(Object.keys(projectTable).length).toBe(0);
  });

  it('Test create a new project object', async () => {
    // Create a new project object
    const newProject = createNewProjectObject();
    
    // Fetch the project and check
    const project = getProjectFromTable(newProject.projectID);
    expect(project).toEqual(newProject);
  });

  it('Test save a project to the project table', async () => {
    // Create a new project object and modify the title
    let newProject = createNewProjectObject();
    newProject['title'] = 'New Project Title';
    saveProjectToTable(newProject.projectID, newProject);

    // Fetch the project table and check
    const project = getProjectFromTable(newProject.projectID);
    expect(project).toEqual(newProject);
  });

  it('Test delete a project from the project table', async () => {
    const projectTable = getProjectTableFromStorage();
    for (let key in projectTable) {
      deleteProjectFromTable(key);
    }

    const newProjectTable = getProjectTableFromStorage();
    expect(Object.keys(newProjectTable).length).toBe(0);
  });

  it('Test modify the project title', async () => {
    const project = createNewProjectObject();
    const newTitle = 'New Project Title';
    modifyProjectTitle(project.projectID, newTitle);

    const modifiedProject = getProjectFromTable(project.projectID);
    expect(modifiedProject.title).toBe(newTitle);
  });

  it('Test modify the project description', async () => {
    const project = createNewProjectObject();
    const newDescription = 'New Project Description';
    modifyProjectDescription(project.projectID, newDescription);

    const modifiedProject = getProjectFromTable(project.projectID);
    expect(modifiedProject.description).toBe(newDescription);
  });

  it('Test append a task to the project task list', async () => {
    const project = createNewProjectObject();
    const taskID = 'taskID';
    appendTaskToProjectTaskList(project.projectID, taskID);

    const modifiedProject = getProjectFromTable(project.projectID);
    expect(modifiedProject.taskList).toContain(taskID);
  });

  it('Test remove a task from the project task list', async () => {
    const project = createNewProjectObject();
    const taskID = 'taskID';
    appendTaskToProjectTaskList(project.projectID, taskID);
    removeTaskFromProjectTaskList(project.projectID, taskID);

    const modifiedProject = getProjectFromTable(project.projectID);
    expect(modifiedProject.taskList).not.toContain(taskID);
  });

  it('Test modify the project deadline', async () => {
    const project = createNewProjectObject();
    const newDeadline = 'New Project Deadline';
    modifyProjectDeadline(project.projectID, newDeadline);

    const modifiedProject = getProjectFromTable(project.projectID);
    expect(modifiedProject.deadline).toBe(newDeadline);
  });

  it('Test modify the project priority', async () => {
    const project = createNewProjectObject();
    const newPriority = 'New Project Priority';
    modifyProjectPriority(project.projectID, newPriority);

    const modifiedProject = getProjectFromTable(project.projectID);
    expect(modifiedProject.priority).toBe(newPriority);
  });

  it('Test modify the project date created', async () => {
    const project = createNewProjectObject();
    const newDateCreated = 'New Project Date Created';
    modifyProjectDateCreated(project.projectID, newDateCreated);

    const modifiedProject = getProjectFromTable(project.projectID);
    expect(modifiedProject.dateCreated).toBe(newDateCreated);
  });

  it('Test append a completed task to the project', async () => {
    const project = createNewProjectObject();
    const taskID = 'taskID';
    appendCompletedTaskToProject(project.projectID, taskID);

    const modifiedProject = getProjectFromTable(project.projectID);
    expect(modifiedProject.tasksCompleted).toContain(taskID);
  });

  it('Test remove a completed task from the project', async () => {
    const project = createNewProjectObject();
    const taskID = 'taskID';
    appendCompletedTaskToProject(project.projectID, taskID);
    removeCompletedTaskFromProject(project.projectID, taskID);

    const modifiedProject = getProjectFromTable(project.projectID);
    expect(modifiedProject.tasksCompleted).not.toContain(taskID);
  });

  it('Test append a linked note to the project', async () => {
    const note = createNewNoteObject();
    const noteID = note.noteID;

    const project = createNewProjectObject();
    appendLinkedNoteToProject(project.projectID, noteID);

    const modifiedProject = getProjectFromTable(project.projectID);
    expect(modifiedProject.linkedNotes).toContain(noteID);
  });

  it('Test remove a linked note from the project', async () => {
    const note = createNewNoteObject();
    const noteID = note.noteID;

    const project = createNewProjectObject();
    appendLinkedNoteToProject(project.projectID, noteID);
    removeLinkedNoteFromProject(project.projectID, noteID);

    const modifiedProject = getProjectFromTable(project.projectID);
    expect(modifiedProject.linkedNotes).not.toContain(noteID);
  });

  it('Test modify the last worked on date of a project', async () => {
    const project = createNewProjectObject();
    const newLastWorkedOn = 'New Project Last Worked On';
    modifyLastWorkedOn(project.projectID, newLastWorkedOn);

    const modifiedProject = getProjectFromTable(project.projectID);
    expect(modifiedProject.lastWorkedOn).toBe(newLastWorkedOn);
  });
});