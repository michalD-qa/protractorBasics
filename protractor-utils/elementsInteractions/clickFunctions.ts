import { ElementArrayFinder, ElementFinder } from 'protractor';

import { switchIFrame, switchToDefaultContent } from '../helpers';
import { Logger } from '../logger';
import { waitForElementToBeClickable } from './waitFunctions';

export async function clickElement(el: ElementFinder) {
  Logger.logToConsole('Clicking element: ' + el.locator());
  await waitForElementToBeClickable(el);
  await el.click();
  Logger.logToConsole('Element clicked');
}

export async function clickElementInIFrame(
  el: ElementFinder,
  iFrame: ElementFinder
) {
  Logger.logToConsole(
    `Clicking element: ${el.locator()} in iframe: ${iFrame.locator()}`
  );
  await switchIFrame(iFrame);
  await clickElement(el);
  await switchToDefaultContent();
}

export async function clickFirstElement(elArray: ElementArrayFinder) {
  const el = elArray.first();
  Logger.logToConsole(
    'Clicking first element from list of: ' +
    (await elArray.count()) +
    'elements'
  );
  await waitForElementToBeClickable(el, false);
  await el.click();
  Logger.logToConsole('Element clicked');
}
