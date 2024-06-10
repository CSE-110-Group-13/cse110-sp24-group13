import puppeteer from 'puppeteer';
import { URL } from '../global.js';
import { mockObjects, initializeLocalStorage } from "./__mocks__/index.js";

describe('Tests for library page', () => {
  let browser;
  let page;

  // Before all tests
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true }); // Set to true if you don't want to see the browser UI
    page = await browser.newPage();
    await page.goto(URL + '/library/library.html');

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

  it('Test title is displayed correctly', async () => {
    const title = await page.title();
    expect(title).toBe('Commit');
  });
});