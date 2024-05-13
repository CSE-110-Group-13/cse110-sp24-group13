const helloReturn = require('./calendar.js');

test('Return Hello', () => {
  expect(helloReturn()).toBe("hello");
});