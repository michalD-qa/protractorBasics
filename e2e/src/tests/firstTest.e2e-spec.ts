import { browser, $, $$, ElementFinder, element, by, ElementArrayFinder } from "protractor";
import { Driver } from 'selenium-webdriver/edge';

describe('First Test', async () => {
    fit('When type text and click button then text is displayed', async () => {
        //await browser.manage().timeouts().implicitlyWait(5000);
        await browser.get("https://www.seleniumeasy.com/test/basic-first-form-demo.html");


        let textToSend = "testing text";
        //Different selectors//
        //#user-message
        //.form-group #user-message
        //input#user-message
        await browser.findElement(by.css("input#user-message")).sendKeys("testing text");

        let button: ElementFinder = element(by.css("#get-input button"));
        await button.click();
        // await browser.findElement(by.css("#get-input button").click();


        let messageTextElement = element(by.css("#user-message #display"));
        let messageText = await messageTextElement.getText();
        await expect(messageText).toBe(textToSend);
    });

    it("When click allert message then allert appears and later dissapear", async () => {
        await browser.get("https://www.seleniumeasy.com/test/bootstrap-alert-messages-demo.html");
        let alertMessageButtons: ElementArrayFinder = element.all(by.css(".col-md-4 button"));
        // let alertMessageButtons: ElementArrayFinder = $$(".col-md-4 button"));
        // element(by.css())  <=======>   $
        //element.all(by.css())  <=======>   $$

    });

});
