// Note: remember to turn on live server before running the test

import puppeteer from 'puppeteer';

describe('Tests for edit note page', () => {
  let browser;
  let page;

  // Before all tests, launch a browser and open a new page
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true }); // Set to true if you don't want to see the browser UI
    page = await browser.newPage();
    // await page.goto('http://127.0.0.1:5500/source/note/edit-note.html');
  });

  // After all tests, close the browser
  afterAll(async () => {
    await browser.close();
  });

  it('Sample test', async () => {
    // const title = await page.title();
    // expect(title).toMatch('');
  });
});

describe('Tests for view note page', () => {
  let browser;
  let page;

  // Before all tests, launch a browser and open a new page
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true }); // Set to true if you don't want to see the browser UI
    page = await browser.newPage();
    // await page.goto('http://127.0.0.1:5500/source/note/view-note.html');
  });

  // After all tests, close the browser
  afterAll(async () => {
    await browser.close();
  });

  it('Sample test', async () => {
    // const title = await page.title();
    // expect(title).toMatch('');
  });
});