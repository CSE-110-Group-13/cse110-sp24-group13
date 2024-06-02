// Note: remember to turn on live server before running the test

describe('Tests for markdown page', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500/source/markdown/markdown.html');
  });

  it('Sample test', async () => {
    await expect(page.title()).resolves.toMatch('Markdown');
  });
});