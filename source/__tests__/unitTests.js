/**
 * @jest-environment jsdom
 */

// Unit Tests for functions that have a return and aren't reliant on the DOM 
// aside from the backend tests under __tests__/backend
import {dateToString} from '../projectlist/projectList.js';

// Home/Favorites/Library single functions
function getFormattedDate(dateString) {
  //catches exception where a date is left blank.
  if (dateString == "") {
    return "";
  }

  const months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  const [year, month, day] = dateString.split("-");

  const monthName = months[parseInt(month, 10) - 1];

  const dayInt = parseInt(day, 10);
  const suffix = (dayInt === 1 || dayInt === 21 || dayInt === 31) ? "st" :
        (dayInt === 2 || dayInt === 22) ? "nd" :
        (dayInt === 3 || dayInt === 23) ? "rd" : "th";

  return `${monthName} ${dayInt}${suffix}`;
}

function unparseMarkdown(text) {
  const regex = /[^a-zA-Z0-9.,?!]+/g;
  const newText = text.replace(regex, ' ').trim();
  return newText
}

// Project List
test('Correctly formatted date th', () => {
  expect(dateToString("2024-06-09")).toBe("June 9th");
});

test('Correctly formatted date st', () => {
  expect(dateToString("2024-05-21")).toBe("May 21st");
});

test('Correctly formatted date rd', () => {
  expect(dateToString("2024-05-23")).toBe("May 23rd");
});

test('Correctly formatted date nd', () => {
  expect(dateToString("2024-12-22")).toBe("December 22nd");
});

// homepage, favorites, library
test('Correctly formatted date th', () => {
  expect(getFormattedDate("2024-06-09")).toBe("June 9th");
});

test('Correctly formatted date st', () => {
  expect(getFormattedDate("2024-05-21")).toBe("May 21st");
});

test('Correctly formatted date rd', () => {
  expect(getFormattedDate("2024-05-23")).toBe("May 23rd");
});

test('Correctly formatted date empty', () => {
  expect(getFormattedDate("")).toBe("");
});

test('Correctly formatted date nd', () => {
  expect(dateToString("2024-12-22")).toBe("December 22nd");
});

test('Correctly unparse markdown', () => {
  expect(unparseMarkdown("###")).toBe("");
});

test('Correctly unparse markdown 2', () => {
  expect(unparseMarkdown("##Hello ###Friend")).toBe("Hello Friend");
});

test('Correctly unparse markdown 3', () => {
  expect(unparseMarkdown("")).toBe("");
});

test('Correctly unparse markdown 4', () => {
  expect(unparseMarkdown(" ")).toBe("");
});

test('Correctly unparse markdown 5', () => {
  expect(unparseMarkdown("~~Hello~~")).toBe("Hello");
});

test('Correctly unparse markdown 6', () => {
  expect(unparseMarkdown("~~Hello~~12345")).toBe("Hello 12345");
});

test('Correctly unparse markdown 7', () => {
  expect(unparseMarkdown("? ! . , Hello")).toBe("? ! . , Hello");
});