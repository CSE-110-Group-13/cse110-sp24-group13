import puppeteer from 'puppeteer';
import { URL } from '../__global__.js';
import { mockObjects, initializeLocalStorage } from "./__mocks__/index.js";

describe('Tests for notes', () => {
  let browser;
  let page;

  // Before all tests
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true }); // Set to true if you don't want to see the browser UI
    page = await browser.newPage();
    await page.goto(URL + '/homepage/index.html');
    
    // Mock window and localStorage object, as well as the alert function
    mockObjects();
    
    // Clear local storage
    window.localStorage.clear();

    // Initialize local storage
    initializeLocalStorage();
  });

  // After all tests
  afterAll(async () => {
    window.localStorage.clear();
    await browser.close();
  });

  it('Test add new note then cancel', async () => {
    await page.goto(URL + '/note/edit-note.html');
    const cancelButton = await page.$('#cButton');
    
    // Wait for the page to load after clicking the cancel button
    await Promise.all([
      page.waitForNavigation(),
      await cancelButton.click(),
    ]);
    
    // Check if the page is back to the homepage
    const link = await page.url();  
    expect(link).toBe(URL + '/homepage/index.html');
  });
      
  it('Test add new note', async () => {
    await page.goto(URL + '/note/edit-note.html');
    const saveButton = await page.$('#sButton');
    
    // Wait for the page to load after clicking the save button
    await Promise.all([
      page.waitForNavigation(),
      await saveButton.click()
    ]);
    
    // Get the note ID from the URL
    const link = await page.url();
    const noteID = link.split('#')[1];
    
    // Check local storage
    const notes = await page.evaluate(() => {
      return JSON.parse(window.localStorage.getItem('NoteTable'));
    });
    expect(notes[noteID]).toBeDefined();
  });

  it('Test view note', async () => {
    const notes = await page.evaluate(() => {
      return JSON.parse(window.localStorage.getItem('NoteTable'));
    });
    const [noteID, note] = Object.entries(notes)[0];

    // Visit the note page
    await page.goto(URL + '/note/view-note.html#' + noteID);

    // Check if the note is displayed correctly
    const noteTitle = await page.$eval('h1', e => e.innerText);
    expect(noteTitle).toBe("Sample Note"); // note title is hardcoded to "Sample Note" every time the title is Default Title
  });
});