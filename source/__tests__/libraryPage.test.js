// Note: remember to turn on live server before running the test

describe('Tests for library page', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500/source/library/library.html');
  });

  it('Sample test', async () => {
    await expect(page.title()).resolves.toMatch('Library');
  });
});