import { browser, ElementFinder, ExpectedConditions } from 'protractor';
import { switchIFrame, switchToDefaultContent } from '../helpers';
import { Logger } from '../logger';
import { waitForVisibility } from './waitFunctions';

export async function sendKeys(el: ElementFinder, textToSend: string) {
  Logger.logToConsole(`Sending keys:${textToSend} to element: ${el.locator()}`);
  await waitForVisibility(el);
  await el.sendKeys(textToSend);
  Logger.logToConsole('Text sent');
}

export async function sendKeysInIFrame(
  el: ElementFinder,
  textToSend: string,
  iFrame: ElementFinder
) {
  Logger.logToConsole(
    `Sending keys:${textToSend} to element: ${el.locator()} in iframe: ${iFrame.locator()}`
  );
  await switchIFrame(iFrame);
  await sendKeys(el, textToSend);
  await switchToDefaultContent();
}

export async function sendKeysToActiveElement(text: string) {
  Logger.logToConsole(`Sending keys:${text} into active element`);
  await browser
    .switchTo()
    .activeElement()
    .sendKeys(text);
}

export async function sendKeysToBrowser(keys: string) {
  await browser
    .actions()
    .sendKeys(keys)
    .perform();
}
