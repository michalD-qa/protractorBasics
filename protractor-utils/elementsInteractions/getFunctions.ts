import { ElementArrayFinder, ElementFinder } from "protractor";

import {
  highlightElement,
  switchIFrame,
  switchToDefaultContent
} from "../helpers";
import { Logger } from "../logger";
import { waitForVisibility } from "./waitFunctions";

export async function getNumberOfElements(elementsList: ElementArrayFinder) {
  await elementsList.each(async (el) => {
    if (el) {
      await highlightElement(el);
    } else {
      Logger.logToConsole("Element is undefined and can't be highlighted");
    }
  });
  return await elementsList.count();
}

export async function getTextFromElement(el: ElementFinder): Promise<string> {
  Logger.logToConsole("Getting text from element " + el.locator());
  await waitForVisibility(el);
  const elementText = await el.getText();
  Logger.logToConsole("Text is: " + elementText);
  return elementText;
}

export async function getTextFromElementInIFrame(
  el: ElementFinder,
  iFrame: ElementFinder
): Promise<string> {
  Logger.logToConsole(
    `Getting text from element: ${el.locator()} in iframe: ${iFrame.locator()}`
  );
  await switchIFrame(iFrame);
  const elementText = await getTextFromElement(el);
  await switchToDefaultContent();
  return elementText;
}
