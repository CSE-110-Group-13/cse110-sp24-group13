import puppeteer from 'puppeteer';
import { URL } from '../__global__.js';
import { mockObjects, initializeLocalStorage } from "./__mocks__/index.js";

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

  // Test navbar
  it('Navigate to Home page', async () => {
    const verticalNavBar = await page.$('vertical-navbar');
    const shadowRoot = await verticalNavBar.getProperty('shadowRoot');
    const innerShadowRoot = await shadowRoot.asElement();

    await navigateAndCheckUrl(innerShadowRoot, '#anchorToHome', `${URL}/homepage/index.html`);
  });

  it('Navigate to Favorites page', async () => {
    const verticalNavBar = await page.$('vertical-navbar');
    const shadowRoot = await verticalNavBar.getProperty('shadowRoot');
    const innerShadowRoot = await shadowRoot.asElement();

    await navigateAndCheckUrl(innerShadowRoot, '#anchorToFavorites', `${URL}/favorites/favorites.html`);
  });

  it('Navigate to Library page', async () => {
    const verticalNavBar = await page.$('vertical-navbar');
    const shadowRoot = await verticalNavBar.getProperty('shadowRoot');
    const innerShadowRoot = await shadowRoot.asElement();

    await navigateAndCheckUrl(innerShadowRoot, '#anchorToLibrary', `${URL}/library/library.html`);
  });

  it('Navigate to Calendar page', async () => {
    const verticalNavBar = await page.$('vertical-navbar');
    const shadowRoot = await verticalNavBar.getProperty('shadowRoot');
    const innerShadowRoot = await shadowRoot.asElement();

    await navigateAndCheckUrl(innerShadowRoot, '#anchorToCalendar', `${URL}/calendar/calendar.html`);
  });

  it('Navigate to Projects page', async () => {
    const verticalNavBar = await page.$('vertical-navbar');
    const shadowRoot = await verticalNavBar.getProperty('shadowRoot');
    const innerShadowRoot = await shadowRoot.asElement();

    await navigateAndCheckUrl(innerShadowRoot, '#anchorToProjectList', `${URL}/projectlist/projectlist.html`);
  });

  // Return back to Home page
  it('Navigate back to Home page', async () => {
    const verticalNavBar = await page.$('vertical-navbar');
    const shadowRoot = await verticalNavBar.getProperty('shadowRoot');
    const innerShadowRoot = await shadowRoot.asElement();

    await navigateAndCheckUrl(innerShadowRoot, '#anchorToHome', `${URL}/homepage/index.html`);
  }); 

});