const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const LogManager = require('./LogManager');
const BrowserManager = require('./BrowserManager');
const PentagonShopPage = require('./PentagonShopPage');

(async function pentagonShopTest() {
    const logManager = new LogManager('./test2.log');
    logManager.initialize();

    let browserManager;
    let pentagonShopPage;

    try {
        browserManager = new BrowserManager();
        const driver = await browserManager.getDriver('chrome');
        const pentagonShopPage = new PentagonShopPage(driver);

        await pentagonShopPage.open();
        await pentagonShopPage.waitForPageIsLoaded();
        await pentagonShopPage.openForm();
        await pentagonShopPage.sendEmptyForm();
        const isSuccess = await pentagonShopPage.checkIsSendingSuccess()
        await pentagonShopPage.quit();

        console.log(isSuccess?"Passed":"Error");

    } catch (error) {
        logManager.error(error);
    } finally {
        if (browserManager) {
            await browserManager.quit();
        }
    }
})();
