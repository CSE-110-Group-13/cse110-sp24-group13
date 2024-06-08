import puppeteer from 'puppeteer';
import { URL } from '../__global__.js';
import { mockObjects, initializeLocalStorage } from "./__mocks__/index.js";

describe('Tests for calendar page', () => {
  let browser;
  let page;

  // Before all tests
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true }); // Set to true if you don't want to see the browser UI
    page = await browser.newPage();
    await page.goto(URL + '/calendar/calendar.html');
    
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

  it('Test current day/month/year is displayed correctly', async () => {
    const currentDate = await getCurrentTimes();
    const { currentDay, currentMonth, currentYear } = currentDate;
    
    // Check month
    const monthSelectElement = await page.$("#month-select");
    const month = await page.evaluate(monthSelectElement => monthSelectElement.options[monthSelectElement.selectedIndex].value, monthSelectElement);
    expect(parseInt(month)).toBe(currentMonth);
    
    // Check year
    const yearInputElement = await page.$("#year-input");
    const year = await page.evaluate(yearInputElement => yearInputElement.value, yearInputElement);
    expect(parseInt(year)).toBe(currentYear);

    // Check date
    const formattedDate = await getFormattedDate(currentDate);
    const calendarDayElement = await page.$(`div[data-date="${formattedDate}"]`);
    const day = await page.evaluate(calendarDayElement => calendarDayElement.innerText, calendarDayElement);
    expect(parseInt(day)).toBe(currentDay);
  });
});

/**
 * Get the current day, month, and year
 * @returns {Object} An object containing the current day, month, and year
 */
function getCurrentTimes() {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  return { currentDay, currentMonth, currentYear };
}

/**
 * Get the formatted date
 * @param {Date} date The object containing the current day, month, and year to format
 * @returns {String} The formatted current day, month, and year
 */
function getFormattedDate(date) {
  const { currentDay, currentMonth, currentYear } = date
  return new Date(currentYear, currentMonth, currentDay).toISOString().split("T")[0]
}