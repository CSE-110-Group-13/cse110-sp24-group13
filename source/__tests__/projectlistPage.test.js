import puppeteer from 'puppeteer';
import { URL } from '../__global__.js';
import { mockObjects, initializeLocalStorage } from "./__mocks__/index.js";

describe('Tests for projectlist page', () => {
  let browser;
  let page;

  // Before all tests
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true }); // Set to true if you don't want to see the browser UI
    page = await browser.newPage();
    await page.goto(URL + '/projectlist/projectlist.html');

    // Mock window and localStorage object, as well as the alert function
    mockObjects();

    // Clear local storage
    window.localStorage.clear();

    // Initialize local storage
    initializeLocalStorage();
  });

  it('Pre-tests', async () => {
    const main = await page.$('main');
    const mainChildren = await main.$$(':scope > *');
    expect(mainChildren.length).toBe(1);
  });

  it('Add a project', async () => {
    const addNewWebComponent = await page.$('add-new-btn');
    const shadowRoot = await addNewWebComponent.getProperty('shadowRoot');
    const addNewButton = await shadowRoot.$('.add-new-container');
    await addNewButton.click();
    const addNewButtonClassNameProperty = await addNewButton.getProperty('className');
    const addNewButtonClassName = await addNewButtonClassNameProperty.jsonValue();
    expect(addNewButtonClassName).toBe('add-new-container hidden');

    const addNoteProjectButton = await shadowRoot.$('.action-container');
    const addNoteProjectButtonClassNameProperty = await addNoteProjectButton.getProperty('className');
    const addNoteProjectButtonClassName = await addNoteProjectButtonClassNameProperty.jsonValue();
    expect(addNoteProjectButtonClassName).toBe('action-container');

    // Click add project
    const childButtons = await addNoteProjectButton.$$(':scope > *');

    await Promise.all([
      page.waitForNavigation(), // Wait for the navigation to complete
      childButtons[2].click(),  // Click the first child button
    ]);

    expect(await page.url()).toBe(URL + '/project/edit-project.html');
  });

  it('Return back to project list', async () => {
    const verticalNavBar = await page.$('vertical-navbar');
    const shadowRoot = await verticalNavBar.getProperty('shadowRoot');
    const projectListNavButton = await shadowRoot.$('#anchorToProjectList');

    await Promise.all([
      page.waitForNavigation(), // Wait for the navigation to complete
      projectListNavButton.click(),  // Click the first child button
    ]);

    expect(await page.url()).toBe(URL + '/projectlist/projectlist.html');
  });

  it('Project created successfully', async () => {
    const main = await page.$('main');
    const mainChildren = await main.$$(':scope > *');
    expect(mainChildren.length).toBe(1);

    const classOfProject = await mainChildren[0].getProperty('className')
    const className = await classOfProject.jsonValue();
    expect(className).toBe('project');
  });

  // After all tests
  afterAll(async () => {
    window.localStorage.clear();
    await browser.close();
  });

  it('Test title is displayed correctly', async () => {
    const title = await page.title();
    expect(title).toBe('Commit');
  });
});