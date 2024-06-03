// Note: remember to turn on live server before running the test

import puppeteer from 'puppeteer';
import { URL } from '../__global__.js';

describe('End to end tests of the app', () => {
  let browser;
  let page;

  // Before all tests, launch a browser and open a new page
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false }); // Set to true if you don't want to see the browser UI
    page = await browser.newPage();
    await page.goto(URL + '/homepage/index.html');

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
    expect(1 + 1).toBe(2);
  });
});