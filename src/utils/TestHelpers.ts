import puppeteer from 'puppeteer';
import { expect } from 'chai';

type EventType = 'click' | 'submit';

export const mockConsoleLog = (
  element: HTMLElement,
  event: EventType
): string => {
  // Mock the console.log method to capture the output
  let consoleOutput = '';
  const originalConsoleLog = console.log;

  console.log = (output: string) => {
    consoleOutput += output;
  };

  if (event === 'submit') {
    const submitEvent = new window.Event('submit');
    element.dispatchEvent(submitEvent);
  }

  if (event === 'click') {
    const clickEvent = new window.MouseEvent('click');
    element.dispatchEvent(clickEvent);
  }

  console.log = originalConsoleLog;
  return consoleOutput;
};

export const testLink = (
  startUrl: string,
  redirectUrl: string,
  element: HTMLElement
) => {
  describe('Navigation Test', () => {
    let browser;
    let page;

    before(async () => {
      // Launch a headless browser
      browser = await puppeteer.launch();
    });

    beforeEach(async () => {
      // Open a new page/tab before each test
      page = await browser.newPage();
      // Navigate to the desired URL
      await page.goto(startUrl);
    });

    afterEach(async () => {
      // Close the current page after each test
      await page.close();
    });

    after(async () => {
      // Close the browser after all tests are completed
      await browser.close();
    });

    // it('should navigate to another page', async () => {
    //   // Simulate a click on a link or perform navigation action

    // });

    // it('should navigate to another page', async (done) => {
    //   element.click();
    //   await page.waitForNavigation();
    //   const currentURL = page.url();
    //   expect(currentURL).to.equal(redirectUrl);
    //   done();
    // });

    it('should navigate to another page', (done) => {
      element.click();

      page
        .waitForNavigation()
        .then(() => {
          const currentURL = page.url();
          expect(currentURL).to.equal(redirectUrl);
          done();
        })
        .catch(done);
    });
  });
};

export const getAttachedEvents = async (element: HTMLElement) => {
  let page;
  const eventNames = await page.evaluate((element) => {
    const proto = Object.getPrototypeOf(element);
    const eventNames = Object.getOwnPropertyNames(proto).filter(
      (key) => key.startsWith('on') && typeof proto[key] === 'function'
    );
    return eventNames;
  }, element);

  return eventNames;
};
