import { browser, $, ElementFinder, element, by } from "protractor";

describe('My first test', async () => {
    it('test case', async () => {
        browser.get("https://www.seleniumeasy.com/test/");
        // console.log(browser.getCurrentUrl());
        console.log("Punkt 1");
        browser.sleep(10000);
        console.log("Punkt 2");
        browser.sleep(10000);
        console.log("Punkt 3");
        browser.getCurrentUrl().then(url => {
            console.log(url);
        })
        console.log("Punkt 4");


    });
    // console.log("Write me this:")
    // console.log(giveMeSomething());
    // console.log("DONE");
});

async function giveMeSomething() {
    return "aaaa";
}
