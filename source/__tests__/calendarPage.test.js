// Note: remember to turn on live server before running the test

import puppeteer from 'puppeteer';
import { URL } from '../__global__.js';

describe('Tests for calendar page', () => {
  let browser;
  let page;

  // Before all tests, launch a browser and open a new page
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true }); // Set to true if you don't want to see the browser UI
    page = await browser.newPage();
    await page.goto(URL + '/calendar/calendar.html');

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
    const title = await page.title();
    // expect(title).toBe('Calendar');
  });
});