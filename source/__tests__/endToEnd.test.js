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

    await page.type('.noteTitle', 'Test Note Title');
    await page.type('.noteDetails', 'Test Note Details');
    await page.type('.css-cyr08h[role="textbox"]', 'Test Note Content');

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

    // Favorite a note in the library page
    const favoriteButton = await page.$('.note-wrapper .note .favorite-button');
    await favoriteButton.click();

    // Re-select the vertical navbar after navigation
    const verticalNavBarUpdated = await page.$('vertical-navbar');
    const shadowRootHandleNavBarUpdated = await verticalNavBarUpdated.getProperty('shadowRoot');
    const shadowRootNavBarUpdated = await shadowRootHandleNavBarUpdated.asElement();

    // Navigate to the Favorites page and check for the favorited note
    const favoritesNavButton = await shadowRootNavBarUpdated.$('#anchorToFavorites');
    
    await Promise.all([
      page.waitForNavigation(),
      favoritesNavButton.click(),
    ]);

    newUrl = await page.url();
    expect(newUrl).toBe(`${URL}/favorites/favorites.html`);

    const favoritedNotes = await page.$$eval('.note-wrapper .note h2 a', notes => notes.map(note => note.textContent.trim().split(' ').slice(0, 3).join(' ')));
    expect(favoritedNotes).toContain('Test');

  });

  
});