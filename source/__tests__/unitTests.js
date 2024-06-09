import {dateToString} from '../projectlist/projectlist.js';

function unparseMarkdown(text) {
  const regex = /[^a-zA-Z0-9.,?!]+/g;
  const newText = text.replace(regex, ' ');
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
// test('Correctly formatted date th', () => {
//   expect(getFormattedDate("2024-06-09")).toBe("June 9th");
// });

// test('Correctly formatted date st', () => {
//   expect(getFormattedDate("2024-05-21")).toBe("May 21st");
// });

// test('Correctly formatted date rd', () => {
//   expect(getFormattedDate("2024-05-23")).toBe("May 23rd");
// });

// test('Correctly formatted date nd', () => {
//   expect(dateToString("2024-12-22")).toBe("December 22nd");
// });