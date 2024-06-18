const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
const LogManager = require('./LogManager');
const BrowserManager = require('./BrowserManager');
const PentagonShopPage = require('./PentagonShopPage');

(async function belitaShopTest() {
    const logManager = new LogManager('./test1.log');
    logManager.initialize();

    let browserManager;
    let pentagonShopPage;

    try {
        browserManager = new BrowserManager();
        const driver = await browserManager.getDriver('chrome');
        pentagonShopPage = new PentagonShopPage(driver);

        await pentagonShopPage.open();
        await pentagonShopPage.writeEmail("Hello")
        await pentagonShopPage.clickButton()
        const isShown = await pentagonShopPage.checkIsErrorAlertShown()
        pentagonShopPage.quit();

        console.log(isShown?"Passed":"Error");

    } catch (error) {
        logManager.error(error);
    } finally {
        if (browserManager) {
            await browserManager.quit();
        }
    }
})();
