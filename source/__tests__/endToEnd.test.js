// Note: remember to turn on live server before running the test

import puppeteer from 'puppeteer';

describe('End to end tests of the app', () => {
  let browser;
  let page;

  // Before all tests, launch a browser and open a new page
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false }); // Set to true if you don't want to see the browser UI
    page = await browser.newPage();
    await page.goto('http://127.0.0.1:5500/source/homepage/index.html');
  });

  // After all tests, close the browser
  afterAll(async () => {
    await browser.close();
  });

  it('Sample test', async () => {
    expect(1 + 1).toBe(2);
  });
});