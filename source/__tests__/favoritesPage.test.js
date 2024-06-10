import puppeteer from 'puppeteer';
import { URL } from '../global.js';
import { mockObjects, initializeLocalStorage } from "./__mocks__/index.js";

describe('Tests for favorites page', () => {
  let browser;
  let page;

  // Before all tests
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true }); // Set to true if you don't want to see the browser UI
    page = await browser.newPage();
    await page.goto(URL + '/favorites/favorites.html');

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

  it('Notes properly display on homepage', async () => {
    await page.evaluate(() => {
      const notes = [
        {
          noteID: 'note-1',
          text: 'This is a test note 1.',
          date: '2024-06-10',
          lastEdited: '2024-06-10',
          title: 'Test Note 1',
          linkedProject: '',
          favorited: true,
          tags: []
        },
        {
          noteID: 'note-2',
          text: 'This is a test note 2.',
          date: '2024-06-10',
          lastEdited: '2024-06-10',
          title: 'Test Note 2',
          linkedProject: '',
          favorited: true,
          tags: []
        }
      ];

      const noteTable = notes.reduce((acc, note) => {
        acc[note.noteID] = note;
        return acc;
      }, {});

      window.localStorage.setItem('NoteTable', JSON.stringify(noteTable));
    });

    await page.reload();

    const noteTitles = await page.$$eval('.note h2 a', elements => elements.map(el => el.textContent));
    const noteTexts = await page.$$eval('.note #note-text', elements => elements.map(el => el.textContent));

    expect(noteTitles).toContain('Test Note 1');
    expect(noteTitles).toContain('Test Note 2');
    expect(noteTexts).toContain('This is a test note 1.');
    expect(noteTexts).toContain('This is a test note 2.');

    const noteCount = await page.$$eval('.note', elements => elements.length);
    expect(noteCount).toBe(2);
  });

  it('Favorite button works', async () => {
    await page.evaluate(() => {
      const note = {
        noteID: 'note-1',
        text: 'This is a test note.',
        date: '2024-06-10',
        lastEdited: '2024-06-10',
        title: 'Test Note',
        linkedProject: '',
        favorited: true,
        tags: []
      };

      const noteTable = {};
      noteTable[note.noteID] = note;
      window.localStorage.setItem('NoteTable', JSON.stringify(noteTable));
    });

    await page.reload();

    const noteTitle = await page.$eval('.note h2 a', el => el.textContent);
    const noteText = await page.$eval('.note #note-text', el => el.textContent);
    expect(noteTitle).toBe('Test Note');
    expect(noteText).toBe('This is a test note.');

    await page.click('.note .favorite-button');

    const isFavorited = await page.evaluate(() => {
      const noteTable = JSON.parse(window.localStorage.getItem('NoteTable'));
      return noteTable['note-1'].favorited;
    });
    expect(isFavorited).toBe(false);

    await page.reload();

    const favorites = await page.$$eval('.favorite-note', notes => notes.map(note => note.textContent));
    expect(favorites).not.toContain('This is a test note.');
  });
});