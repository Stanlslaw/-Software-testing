const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const LogManager = require('./LogManager');
const BrowserManager = require('./BrowserManager');
const PentagonProductPage = require('./PentagonProductPage');

(async function belitaShopTest() {
    const logManager = new LogManager('./test5.log');
    logManager.initialize();

    let browserManager;
    let pentagonProductPage;

    try {
        browserManager = new BrowserManager();
        const driver = await browserManager.getDriver('chrome');
        pentagonProductPage = new PentagonProductPage(driver);

        await pentagonProductPage.open();
        await pentagonProductPage.openBuyByClickButton()
        await pentagonProductPage.setName("dwdw")
        await pentagonProductPage.setPhone("33231fwdoinnf")
        await pentagonProductPage.sendForm()
        let isRedirectHappend = await pentagonProductPage.checkIsBuySuccess();
        console.log(isRedirectHappend?"Passed":"Error");

    } catch (error) {
        logManager.error(error);
    } finally {
        if (browserManager) {
            await browserManager.quit();
        }
    }
})();
