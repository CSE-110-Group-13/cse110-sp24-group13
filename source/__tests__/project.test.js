import puppeteer from 'puppeteer';
import { URL } from '../global.js';
import { mockObjects, initializeLocalStorage } from "./__mocks__/index.js";

describe('Tests for projects', () => {
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

  it('Test add new project then cancel', async () => {
    await page.goto(URL + '/project/edit-project.html');
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

  it('Test add new project', async () => {
    await page.goto(URL + '/project/edit-project.html');
    const saveButton = await page.$('#sButton');
    
    // Wait for the page to load after clicking the save button
    await Promise.all([
      page.waitForNavigation(),
      await saveButton.click()
    ]);
    
    // Get the project ID from the URL
    const link = await page.url();
    const projectID = link.split('#')[1];
    
    // Check local storage
    const projects = await page.evaluate(() => {
      return JSON.parse(window.localStorage.getItem('ProjectTable'));
    });
    expect(projects[projectID]).toBeDefined();
  });

  it('Test view project', async () => {
    const projects = await page.evaluate(() => {
      return JSON.parse(window.localStorage.getItem('ProjectTable'));
    });
    const [projectID, project] = Object.entries(projects)[0];

    // Visit the project page
    await page.goto(URL + '/project/view-project.html#' + projectID);

    // Check if the project is displayed correctly
    const projectTitle = await page.$eval('h1', e => e.innerText);
    expect(projectTitle).toBe(project.title);
  });
});