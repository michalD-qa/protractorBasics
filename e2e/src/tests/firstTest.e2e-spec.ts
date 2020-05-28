import { browser, $, $$, ElementFinder, element, by, ElementArrayFinder, ExpectedConditions } from "protractor";

describe('First Test', async () => {
    it('When type text and click button then text is displayed', async () => {
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

    fit("When click allert message then allert appears and later dissapear", async () => {
        await browser.get("https://www.seleniumeasy.com/test/bootstrap-alert-messages-demo.html");
        let alertMessageButtons: ElementArrayFinder = element.all(by.css(".col-md-4 button"));
        // let alertMessageButtons: ElementArrayFinder = $$(".col-md-4 button"));
        // element(by.css())  <=======>   $
        //element.all(by.css())  <=======>   $$
        await alertMessageButtons.get(0).click();


        //verify allert is visible
        let allert: ElementFinder = $('.alert-autocloseable-success');
        // await browser.sleep(3000);


        expect(await allert.isDisplayed()).toBe(true);

        //let ec = ExpectedConditions;
        // await browser.wait(ec.visibilityOf(allert), 10000, "Element is not visible, elementLocator: " + allert.locator());
        // await browser.wait(ec.invisibilityOf(allert), 10000, "Element is visible");



    });

});
