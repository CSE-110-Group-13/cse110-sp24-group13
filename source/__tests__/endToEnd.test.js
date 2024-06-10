import puppeteer from 'puppeteer';
import { URL } from '../__global__.js';
import { mockObjects, initializeLocalStorage } from "./__mocks__/index.js";

jest.setTimeout(10000);

describe('End to end tests of the app', () => {
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

  const navigateAndCheckUrl = async (shadowRoot, selector, expectedUrl) => {
    const navButton = await shadowRoot.$(selector);
    await Promise.all([
      page.waitForNavigation(),
      navButton.click(),
    ]);
    const url = await page.url();
    expect(url).toBe(expectedUrl);
  };

  it('Navigate to Home page', async () => {
    const verticalNavBar = await page.$('vertical-navbar');
    const shadowRootHandle = await verticalNavBar.getProperty('shadowRoot');
    const shadowRoot = await shadowRootHandle.asElement();
    await navigateAndCheckUrl(shadowRoot, '#anchorToHome', `${URL}/homepage/index.html`);
  });

  it('Navigate to Favorites page', async () => {
    const verticalNavBar = await page.$('vertical-navbar');
    const shadowRootHandle = await verticalNavBar.getProperty('shadowRoot');
    const shadowRoot = await shadowRootHandle.asElement();
    await navigateAndCheckUrl(shadowRoot, '#anchorToFavorites', `${URL}/favorites/favorites.html`);
  });

  it('Navigate to Library page', async () => {
    const verticalNavBar = await page.$('vertical-navbar');
    const shadowRootHandle = await verticalNavBar.getProperty('shadowRoot');
    const shadowRoot = await shadowRootHandle.asElement();
    await navigateAndCheckUrl(shadowRoot, '#anchorToLibrary', `${URL}/library/library.html`);
  });

  it('Navigate to Calendar page', async () => {
    const verticalNavBar = await page.$('vertical-navbar');
    const shadowRootHandle = await verticalNavBar.getProperty('shadowRoot');
    const shadowRoot = await shadowRootHandle.asElement();
    await navigateAndCheckUrl(shadowRoot, '#anchorToCalendar', `${URL}/calendar/calendar.html`);
  });

  it('Navigate to Projects page', async () => {
    const verticalNavBar = await page.$('vertical-navbar');
    const shadowRootHandle = await verticalNavBar.getProperty('shadowRoot');
    const shadowRoot = await shadowRootHandle.asElement();
    await navigateAndCheckUrl(shadowRoot, '#anchorToProjectList', `${URL}/projectlist/projectlist.html`);
  });

  it('Navigate back to Home page', async () => {
    const verticalNavBar = await page.$('vertical-navbar');
    const shadowRootHandle = await verticalNavBar.getProperty('shadowRoot');
    const shadowRoot = await shadowRootHandle.asElement();
    await navigateAndCheckUrl(shadowRoot, '#anchorToHome', `${URL}/homepage/index.html`);
  });

  it('Make sure user interactions work', async () => {
    await page.waitForSelector('add-new-btn');
  
    const addNewWebComponent = await page.$('add-new-btn');
    const shadowRootHandle = await addNewWebComponent.getProperty('shadowRoot');
    const shadowRoot = await shadowRootHandle.asElement();
  
    if (!shadowRoot) {
      console.error('Failed to get the shadow root.');
      return;
    }
  
    const addNewButtonSelector = '.add-new-container';
    const addNewButton = await shadowRoot.$(addNewButtonSelector);
  
    if (!addNewButton) {
      console.error('Add New button not found.');
      return;
    }
  
    await addNewButton.click();
  
    const addNewButtonClassNameProperty = await addNewButton.getProperty('className');
    const addNewButtonClassName = await addNewButtonClassNameProperty.jsonValue();
    expect(addNewButtonClassName).toBe('add-new-container hidden');
  
    const actionContainer = await shadowRoot.$('.action-container');
    const actionContainerClassNameProperty = await actionContainer.getProperty('className');
    const actionContainerClassName = await actionContainerClassNameProperty.jsonValue();
    expect(actionContainerClassName).toBe('action-container');
  
    const childButtons = await actionContainer.$$(':scope > *');
    expect(childButtons.length).toBe(3);
  
    await Promise.all([
      page.waitForNavigation(), // Wait for the navigation to complete
      childButtons[1].click(),  // Click the Add Note button
    ]);
  
    const url = await page.url();
    expect(url).toMatch(new RegExp(`${URL}/note/edit-note.html#.*`));

    await Promise.all([
      page.waitForNavigation(),
      page.click('#sButton'),
    ]);
  
    let newUrl = await page.url();
    expect(newUrl).toMatch(new RegExp(`${URL}/note/view-note.html#.*`));

    await Promise.all([
      page.waitForNavigation(),
      page.click('#eButton'),
    ]);
  
    const editUrl = await page.url();
    expect(editUrl).toMatch(new RegExp(`${URL}/note/edit-note.html#.*`));
  
    await Promise.all([
      page.waitForNavigation(),
      page.click('#cButton'), 
    ]);
  
    const cancelUrl = await page.url();
    expect(cancelUrl).toBe(`${URL}/homepage/index.html`);
    
    const noteLink = await page.$('.note-wrapper .note h2 a');
    await Promise.all([
      page.waitForNavigation(),
      noteLink.click(),
    ]);

    newUrl = await page.url();
    expect(newUrl).toMatch(new RegExp(`${URL}/note/view-note.html#.*`));

    // const deleteButton = await page.$('#dButton');
    // await Promise.all([
    //   page.waitForNavigation(),
    //   deleteButton.click({ clickCount: 2 }),
    // ]);

    // newUrl = await page.url();
    // expect(newUrl).toBe(`${URL}/homepage/index.html`);

    // await page.waitForSelector('.note-wrapper .note h2 a', { hidden: true });
    // const noteExists = await page.$('.note-wrapper .note h2 a');
    // expect(noteExists).toBeNull();

    // const noteTable = await page.evaluate(() => JSON.parse(localStorage.getItem('NoteTable')));
    // console.log('NoteTable after deletion:', noteTable);

    // const noteCount = Object.keys(noteTable).length;
    // expect(noteCount).toBe(0);

    const verticalNavBar = await page.$('vertical-navbar');
    const shadowRootHandleNavBar = await verticalNavBar.getProperty('shadowRoot');
    const shadowRootNavBar = await shadowRootHandleNavBar.asElement();
    const libraryNavButton = await shadowRootNavBar.$('#anchorToLibrary');
    
    await Promise.all([
      page.waitForNavigation(),
      libraryNavButton.click(),
    ]);

    newUrl = await page.url(); 
    expect(newUrl).toBe(`${URL}/library/library.html`);

    const libraryNotesCount = await page.$$eval('.note-wrapper .note', notes => notes.length);
    expect(libraryNotesCount).toBe(1);

    
  });
  
});