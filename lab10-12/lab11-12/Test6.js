const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const LogManager = require('./LogManager');
const BrowserManager = require('./BrowserManager');
const PentagonContactPage = require('./PentagonContactPage');

(async function belitaShopTest() {
    const logManager = new LogManager('./test6.log');
    logManager.initialize();

    let browserManager;
    let pentagonContactPage;

    try {
        browserManager = new BrowserManager();
        const driver = await browserManager.getDriver('chrome');
        pentagonContactPage = new PentagonContactPage(driver);

        await pentagonContactPage.open();
        await pentagonContactPage.waitForPageIsLoaded();
        await pentagonContactPage.setName("dw");
        await pentagonContactPage.setEmail("dwdw");
        await pentagonContactPage.setPhone("dwdwd");
        await pentagonContactPage.setMessage("dwdwd");
        await pentagonContactPage.sendForm();
        let isSuccess = await pentagonContactPage.checkIsSuccess()
        console.log(isSuccess?"Passed":"Error");



    } catch (error) {
        logManager.error(error);
    } finally {
        if (browserManager) {
            await browserManager.quit();
        }
    }
})();
