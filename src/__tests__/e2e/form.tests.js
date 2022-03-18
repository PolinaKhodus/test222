import puppetteer from 'puppeteer';
const { fork } = require('child_process');

jest.setTimeout(30000);

describe('Card form validation', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`./src/__tests__/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', () => {
        reject();
      });
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });
    browser = await puppetteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('should return invalid status', async () => {
    await page.goto(baseUrl);

    const input = await page.$('.number-field');
    const submit = await page.$('.validate-btn');  

    await input.type('4561261212345464');
    await submit.click();

    const result = await page.evaluate(() => {
      const text = document.querySelector('.message-box').innerText;
      return text;      
    });

    expect(result).toBe('Card number is invalid!');    
  });

  test('should return valid status', async () => {
    await page.goto(baseUrl);

    const input = await page.$('.number-field');
    const submit = await page.$('.validate-btn');  

    await input.type('4561261212345467');
    await submit.click();

    const result = await page.evaluate(() => {
      const text = document.querySelector('.message-box').innerText;
      return text;      
    });
     
    expect(result).toBe('Card number is valid!');    
  });
});
