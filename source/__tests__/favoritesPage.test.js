// Note: remember to turn on live server before running the test

describe('Tests for favorites page', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500/source/favorites/favorites.html');
  });

  it('Sample test', async () => {
    await expect(page.title()).resolves.toMatch('Favorites');
  });
});