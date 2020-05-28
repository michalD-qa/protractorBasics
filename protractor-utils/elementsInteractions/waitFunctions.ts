import { browser, ElementFinder, ExpectedConditions } from 'protractor';
import {
  highlightElement,
  switchIFrame,
  switchToDefaultContent
} from '../helpers';
import { Logger } from '../logger';
import { TIMEOUTS } from '../timeouts';

const EC = ExpectedConditions;
export async function waitForVisibility(
  el: ElementFinder,
  timeout: number = TIMEOUTS.DEFAULT,
  timeoutCallback?: () => Promise<void>
) {
  Logger.logToConsole('Waiting for element to be visible: ' + el.locator());
  await browser.driver
    .wait(
      EC.visibilityOf(el),
      timeout,
      'Element is not visible:' +
        el.locator() +
        ' within ' +
        timeout +
        ' milliseconds'
    )
    .then(async () => {
      Logger.logToConsole('Element is visible');
      await highlightElement(el);
    })
    .catch(async (error) => {
      Logger.logToConsole(
        'Element is not visible - invoke function from catch block'
      );
      if (timeoutCallback) {
        await timeoutCallback().then();
      } else {
        throw error;
      }
    });
}

export async function waitForVisibilityInIFrame(
  el: ElementFinder,
  iFrame: ElementFinder,
  timeout: number = TIMEOUTS.DEFAULT
) {
  Logger.logToConsole(
    `Waiting for element: ${el.locator()} to be visible in iframe: ${iFrame.locator()}`
  );
  await switchIFrame(iFrame);
  await waitForVisibility(el, timeout);
  await switchToDefaultContent();
}

export async function waitForVisibilityOfAnyElement(
  el1: ElementFinder,
  el2: ElementFinder,
  timeout: number = TIMEOUTS.DEFAULT
) {
  Logger.logToConsole(
    'Waiting for any element to be visible: ' +
      el1.locator() +
      ' or ' +
      el2.locator()
  );
  const visibilityOfEl1 = EC.visibilityOf(el1);
  const visibilityOfEl2 = EC.visibilityOf(el2);
  await browser.driver.wait(
    EC.or(visibilityOfEl1, visibilityOfEl2),
    timeout,
    'None of the elements are visible:' +
      el1.locator() +
      ' and ' +
      el2.locator() +
      ' within ' +
      timeout +
      ' seconds'
  );
  Logger.logToConsole('At least one element is visible');
}

export async function waitForInvisibility(
  el: ElementFinder,
  timeout: number = TIMEOUTS.DEFAULT,
  timeoutCallback?: () => Promise<void>
) {
  Logger.logToConsole('Waiting for element to NOT be visible: ' + el.locator());
  await browser.driver
    .wait(
      EC.invisibilityOf(el),
      timeout,
      'Element is visible:' + el.locator() + ' after ' + timeout + ' seconds'
    )
    .then(async () => {
      Logger.logToConsole('Element is not visible');
    })
    .catch(async (error) => {
      Logger.logToConsole(
        'Element is visible - invoke function from catch block'
      );
      if (timeoutCallback) {
        await timeoutCallback().then();
      } else {
        throw error;
      }
    });
}

export async function waitForInvisibilityInIFrame(
  el: ElementFinder,
  iFrame: ElementFinder,
  timeout: number = TIMEOUTS.DEFAULT,
  timeoutCallback?: () => Promise<void>
) {
  Logger.logToConsole(
    'Waiting for element to NOT be visible: ' +
      el.locator() +
      'in IFrame ' +
      iFrame.locator()
  );
  await switchIFrame(iFrame);
  await waitForInvisibility(el, timeout, timeoutCallback);
  await switchToDefaultContent();
}

export async function waitForElementToBeClickable(
  el: ElementFinder,
  logLocatorName: boolean = true,
  timeout: number = TIMEOUTS.DEFAULT
) {
  const messageToLogBeginning = logLocatorName
    ? 'Waiting for element to be clickable: ' + el.locator()
    : 'Waiting for element to be clickable: ';

  const messageToLogError = logLocatorName
    ? 'Element is not clickable:' +
      el.locator() +
      ' within ' +
      timeout +
      ' seconds'
    : 'Element is not clickable: within ' + timeout + ' seconds';

  Logger.logToConsole(messageToLogBeginning);

  await browser.driver.wait(
    EC.elementToBeClickable(el),
    timeout,
    messageToLogError
  );
  Logger.logToConsole('Element is clickable');
  await highlightElement(el);
}

export async function waitForTextInElement(
  el: ElementFinder,
  _text: string,
  timeout: number = TIMEOUTS.DEFAULT,
  timeoutCallback?: () => Promise<void>
) {
  Logger.logToConsole(
    'Waiting for text: "' + _text + '" in element: ' + el.locator()
  );
  await waitForVisibility(el);
  await browser.driver
    .wait(
      EC.textToBePresentInElement(el, _text),
      timeout,
      'Text: ' +
        _text +
        ' has not been met on element: ' +
        el.locator() +
        ' within ' +
        timeout +
        ' seconds. ' +
        '\n Current text is: "' +
        (await el.getText()) +
        '"'
    )
    .then(async () => {
      Logger.logToConsole('Text is visible on element');
      await highlightElement(el);
    })
    .catch(async (error) => {
      Logger.logToConsole(
        'Text is not visible - invoke function from catch block'
      );
      if (timeoutCallback) {
        await timeoutCallback().then();
      } else {
        throw error;
      }
    });
}

export async function waitForTextInElementInIFrame(
  el: ElementFinder,
  _text: string,
  iFrame: ElementFinder,
  timeout: number = TIMEOUTS.DEFAULT
) {
  Logger.logToConsole(
    `Waiting for text:${_text} in element: ${el.locator()} in iframe: ${iFrame.locator()}`
  );
  await switchIFrame(iFrame);
  await waitForTextInElement(el, _text, timeout);
  await switchToDefaultContent();
}
