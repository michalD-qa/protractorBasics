import { browser, by, element, ElementFinder } from 'protractor';
import { clickElement } from './elementsInteractions/clickFunctions';
import {
  waitForInvisibility,
  waitForVisibility
} from './elementsInteractions/waitFunctions';
import { Logger } from './logger';
import { TIMEOUTS } from './timeouts';

// const notification = element(by.css('#toast-container .toast'));
const notification = element(by.css('.toast-message'));

export async function highlightElement(el: ElementFinder) {
  await browser.driver.executeScript(
    'arguments[0].style.outline=arguments[1];',
    el.getWebElement(),
    '2px solid green'
  );
}

export async function getCurrentDate_DD_MM_hh_mm(): Promise<string> {
  const date = new Date();
  return (
    date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short'
    }) +
    ' ' +
    date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      hour12: false,
      minute: '2-digit'
    })
  );
}

export function verifyTwoNumbersAreEquals(
  number1: number,
  number2: number,
  nameOfTheObjectsBeingCompared = 'numbers'
) {
  Logger.logToConsole(
    'Verification that ' +
      nameOfTheObjectsBeingCompared +
      ' are equals: ' +
      number1 +
      ' and: ' +
      number2
  );
  if (number1 === number2) {
    Logger.logToConsole(nameOfTheObjectsBeingCompared + ' are equal');
  } else {
    throw new Error(
      nameOfTheObjectsBeingCompared +
        ' are not equal. Number1: ' +
        number1 +
        ' Number2: ' +
        number2
    );
  }
}

export async function switchIFrame(iFrame: ElementFinder) {
  await waitForVisibility(iFrame);
  await browser.switchTo().frame(iFrame.getWebElement());
}

export async function switchToDefaultContent() {
  await browser.switchTo().defaultContent();
}

export async function closeNotificationIfExist() {
  await waitForInvisibility(
    notification,
    TIMEOUTS.MEDIUM,
    // @ts-ignore
    this.closeNotification.bind(this)
  );
}

export async function closeNotification() {
  await clickElement(notification);
  await waitForInvisibility(notification);
}

export function generateRandomDecimalNumberForTransfer() {
  const num = (Math.floor(Math.random() * (1000 - 100) + 100) / 100).toString();
  return num.replace('.', ',');
}

export async function moveMouseToElement(el: ElementFinder) {
  await browser
    .actions()
    .mouseMove(el)
    .perform();
}
