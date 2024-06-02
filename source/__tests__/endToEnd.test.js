// Note: remember to turn on live server before running the test

describe('End to end tests of the app', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500/source/homepage/index.html');
  });

  it('Sample test', async () => {
    await expect(1 + 1).toBe(2);
  });
});