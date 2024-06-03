import { 
  getNoteFromTable, 
  saveNoteToTable, 
  deleteNoteFromTable, 
  createNewNoteObject, 
  modifyNoteText, 
  modifyNoteDate, 
  modifyNoteLastEdited, 
  modifyNoteTitle, 
  appendProjectToNoteProjectList, 
  removeProjectFromNoteProjectList, 
  modifyNoteFavorited, 
  appendTagToNoteTags, 
  removeTagFromNoteTags
} from "../backend/NoteTable.js";

import {
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
} from "../backend/ProjectTable.js";

import {
  getTaskFromTable,
  saveTaskToTable,
  deleteTaskFromTable,
  createNewTaskObject,
  modifyTaskName,
  modifyTaskCompleted
} from "../backend/TaskTable.js";

import { generateID, getIDContainerFromStorage, saveIDContainerToStorage } from "../backend/generateID.js";

import puppeteer from 'puppeteer';
import { URL } from '../__global__.js';

describe('Tests for backend', () => {
  let browser;
  let page;

  // Before all tests, launch a browser and open a new page
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true }); // Set to true if you don't want to see the browser UI
    page = await browser.newPage();
    await page.goto(URL); // Doesn't matter because we are just focusing on localStorage
    
    await page.evaluate(() => {
      window.localStorage.clear();
    });
  });

  // After all tests, close the browser and clear local storage
  afterAll(async () => {
    await page.evaluate(() => {
      window.localStorage.clear();
    });
    await browser.close();
  });

  it('Sample test', async () => {
    await expect(1).toBe(1);
  });
});