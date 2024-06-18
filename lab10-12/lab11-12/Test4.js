const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const LogManager = require('./LogManager');
const BrowserManager = require('./BrowserManager');
const PentagonProductPage = require('./PentagonProductPage');

(async function belitaShopTest() {
    const logManager = new LogManager('./test4.log');
    logManager.initialize();

    let browserManager;
    let pentagonProductPage;

    try {
        browserManager = new BrowserManager();
        const driver = await browserManager.getDriver('chrome');
        pentagonProductPage = new PentagonProductPage(driver);

        await pentagonProductPage.open('https://belita-shop.by');
        await pentagonProductPage.waitForPageIsLoaded()
        await pentagonProductPage.addToFavorites()
        let isAdded = await pentagonProductPage.checkFavoritesNum();
        console.log(isAdded?"Passed":"Error");

    } catch (error) {
        logManager.error(error);
    } finally {
        if (browserManager) {
            await browserManager.quit();
        }
    }
})();
