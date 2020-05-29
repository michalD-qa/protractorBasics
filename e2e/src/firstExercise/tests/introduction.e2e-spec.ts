import { browser, $, ElementFinder, element, by } from "protractor";

xdescribe('Introduction Test Suite', async () => {
    it('Asynchronous - test case', async () => {
        browser.get("https://www.seleniumeasy.com/test/");
        console.log("Checkpoint 1");
        browser.sleep(5000);
        console.log("Checkpoint 2");
        browser.sleep(5000);
        console.log("Checkpoint 3");
        // browser.getCurrentUrl().then(url => {
        //     console.log(url);
        // })
        console.log("URL" + browser.getCurrentUrl());
        console.log("Checkpoint 4");
    });

    it('Synchronous - test case', async () => {
        await browser.get("https://www.seleniumeasy.com/test/");
        console.log("Checkpoint 1");
        await browser.sleep(5000);
        console.log("Checkpoint 2");
        await browser.sleep(5000);
        console.log("Checkpoint 3");
        console.log("URL" + await browser.getCurrentUrl());
        console.log("Checkpoint 4");
    });
});
