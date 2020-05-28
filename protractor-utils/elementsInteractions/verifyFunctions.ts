import {
  $,
  browser,
  by,
  element,
  ElementArrayFinder,
  ElementFinder,
  ExpectedConditions
} from "protractor";

import { highlightElement, switchIFrame, switchToDefaultContent } from "../helpers";
import { Logger } from "../logger";
import { TIMEOUTS } from "../timeouts";
import { getTextFromElement } from "./getFunctions";
import {
  waitForTextInElementInIFrame,
  waitForVisibility
} from "./waitFunctions";
const EC = ExpectedConditions;

export async function urlContains(
  text: string,
  timeout: number = TIMEOUTS.SHORT
) {
  Logger.logToConsole("Waiting for url to contains: " + text);
  await browser.driver.wait(
    EC.urlContains(text),
    timeout,
    "URL does not contain text: " + text
  );
  Logger.logToConsole("URL contains text");
}

export async function urlOpenedInNewTabContainsText(
  text: string,
  timeout: number = TIMEOUTS.SHORT
) {
  const defWindow = await browser.getWindowHandle();
  const handles = await browser.getAllWindowHandles();
  await browser.switchTo().window(handles[1]);
  await urlContains(text, timeout);
  await browser.close();
  await browser.switchTo().window(defWindow);
}

export async function verifyNavigatedToProperCoExist(coExistData: {
  HEADER: string | RegExp;
  URL: any;
}) {
  await waitForVisibility(
    element(by.cssContainingText("dbp-heading .Heading", coExistData.HEADER))
  );
  await urlContains(coExistData.URL);
}

export async function verifyNavigatedToProperCoExistOBB(coExistData: {
  HEADER: string;
  URL: any;
}) {
  const iFrameContent = $("#legacyContent");
  const iFrameContentHeader = $(".inetpane .inetheader");
  await waitForTextInElementInIFrame(
    iFrameContentHeader,
    coExistData.HEADER,
    iFrameContent
  );
  await urlContains(coExistData.URL);
}

export async function atLeastOneElementExistWithSelector(
  elementsArray: ElementArrayFinder
): Promise<boolean> {
  Logger.logToConsole(
    "Verify that at least one element exists with selector: " +
      elementsArray.locator()
  );
  return (await elementsArray.count()) > 0;
}

export async function exactNumberOfElementsExistWithSelector(
  elementsArray: ElementArrayFinder,
  count: number
): Promise<boolean> {
  Logger.logToConsole(
    "Verify that specific number of elements exists with selector: " +
      elementsArray.locator()
  );
  return (await elementsArray.count()) === count;
}

export async function lessThanNumberOfElementsExistWithSelector(
  elementsArray: ElementArrayFinder,
  count: number
): Promise<boolean> {
  Logger.logToConsole(
    "Verify that more than a specific number of elements exists with selector: " +
      elementsArray.locator()
  );
  return (await elementsArray.count()) < count;
}

export async function isElementVisible(
  el: ElementFinder,
  timeout: number = TIMEOUTS.SHORT
): Promise<boolean> {
  Logger.logToConsole(`Verify if element is visible ${el.locator()}`);
  try {
    await waitForVisibility(el, timeout);
    return true;
  } catch (e) {
    Logger.logToConsole(e.message);
  }
  return false;
}

export async function isElementVisibleInIFrame(
  el: ElementFinder,
  iFrame: ElementFinder,
  timeout: number = TIMEOUTS.SHORT
): Promise<boolean> {
  Logger.logToConsole(
    `Verify if element is visible ${el.locator()} in IFrame ${iFrame.locator}`
  );
  await switchIFrame(iFrame);
  const isVisible = await isElementVisible(el, timeout);
  await switchToDefaultContent();
  return isVisible;
}

export async function verifyElementIsDisabled(el: ElementFinder) {
  Logger.logToConsole(`Waiting for element: ${el.locator()} to be disabled `);
  await highlightElement(el);
  if (!(await el.isEnabled())) {
    Logger.logToConsole("Element Is Disabled");
  } else {
    Logger.logToConsole("Element is enabled");
    throw new Error(
      `Element ${el.locator()} is enabled but should be disabled`
    );
  }
}

export async function verifyTextInElementIsNotEmpty(el: ElementFinder) {
  Logger.logToConsole(`Verify text on element: ${el.locator()} is not empty`);
  const elementText = await getTextFromElement(el);
  if (elementText.length > 0) {
    Logger.logToConsole("Text on element is not empty");
  } else {
    throw new Error(`Text on element: ${el.locator()} is empty`);
  }
}
