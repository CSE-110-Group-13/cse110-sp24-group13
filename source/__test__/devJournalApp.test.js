// Might need to create a different package.json file
// to set up a different environment for E2E testing
test('dummy test', () => expect(1).toBe(1));

// const puppeteer = require('puppeteer');
// const app = require('../server.js');

// describe('Basic user flow for Website', () => {
//   // First, launch and visit the website
//   beforeAll(async () => {
//     const server = app.listen(3000);
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto('http://localhost:3000/');
//   });

//   afterAll(async () => {
//     server.close();
//   });

//   // Some random test
//   it('Test', async () => {
//     const button = await page.$('button');
//     await button.click();
//     console.log(button);
//   });
// });