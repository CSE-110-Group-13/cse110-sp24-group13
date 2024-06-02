// Note: remember to turn on live server before running the test

describe('Tests for home page', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500/source/homepage/index.html');
  });

  it('Sample test', async () => {
    await expect(page.title()).resolves.toMatch('Home');
  });
});