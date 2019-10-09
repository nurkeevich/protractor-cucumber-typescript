import {browser, by, element} from "protractor";
import {protractor} from "protractor/built/ptor";
import {expect} from "chai";

// Actions

async function click(selector: string) {
    try {
        await element(by.css(selector)).click();
    } catch (e) {
        throw new Error(`Could NOT CLICK on selector: ${selector}`);
    }
}

async function type(input: string, selector: string) {
    try {
        await element(by.css(selector)).clear();
        await element(by.css(selector)).sendKeys(input);
    } catch (error) {
        throw new Error(`Could NOT type TEXT in to selector: ${selector}`);
    }
}

async function pressEnter(key: string) {
    await browser
        .actions()
        .sendKeys(protractor.Key.ENTER)
        .perform();
}

async function openURL(URL: string) {
    await browser.get(URL);
}

async function resizeScreen(width: number, height: number) {
    try {
        await browser
            .driver
            .manage()
            .window()
            .setSize(width, height);
    } catch (error) {
        throw new Error(
            `Error: width "${width}" or height "${height}" is invalid`
        );
    }
}

async function moveToElement(selector: string) {
    try {
        await browser
            .actions()
            .mouseMove(element(by.css(selector)))
            .perform();
    } catch (error) {
        throw new Error(
            `Error: failed to scroll to element matching selector "${selector}"`
        );
    }
}

async function waitForSelector(selector: string) {
    const until = protractor.ExpectedConditions;
    const e = element(by.css(selector));
    const timeout = 5000;
    await browser.wait(
        until.presenceOf(e),
        timeout,
        `${selector} - selector took to long to appear`
    );
}

async function maximizeScreen() {
    await browser.manage().window().maximize();
}

// Checks

// async function checkElementEnabled(selector: string, not) {
//     const isElementDisabled = element(by.css(selector)).isEnabled();
//     const shouldElementBeDisabled = !!not;
//
//     expect(isElementDisabled).to.not.equal(undefined, `Error: element "${selector}" cannot be enabled or disabled`);
//     expect(isElementDisabled).to.equal(shouldElementBeDisabled, `Expected "${selector}" to be ${shouldElementBeDisabled ? 'disabled' : 'enabled'}`);
// }

async function checkIsSelected(selector: string, not = undefined) {
    const isSelected = await element(by.css(selector)).isSelected();
    const shouldBeSelected = !!not;

    expect(isSelected).to.not.equal(undefined, `element "${selector}" cannot be enabled or disabled`);
    expect(isSelected).to.equal(shouldBeSelected, `Expected "${selector}" to be ${shouldBeSelected ? 'Not Selected' : 'Selected'}`)
}

export {
    click,
    pressEnter,
    openURL,
    type,
    resizeScreen,
    moveToElement,
    waitForSelector,
    maximizeScreen,
    checkIsSelected
};