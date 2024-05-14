const { helloWorld, sum } = require('../helper-functions.js');

test('Return Hello World!', () => {
  expect(helloWorld()).toBe("Hello World!");
});
