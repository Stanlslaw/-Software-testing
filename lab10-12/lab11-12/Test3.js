const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const LogManager = require('./LogManager');
const BrowserManager = require('./BrowserManager');
const PentagonShoppingPage = require('./PentagonShoppingPage');

(async function pentagonShopTest() {
    const logManager = new LogManager('./test3.log');
    logManager.initialize();

    let browserManager;
    let pentagonShoppingPage;

    try {
        browserManager = new BrowserManager();
        const driver = await browserManager.getDriver('chrome');
        pentagonShoppingPage = new PentagonShoppingPage(driver);

        await pentagonShoppingPage.open();
        await pentagonShoppingPage.waitForPageIsLoaded()
        await pentagonShoppingPage.openForm()
        await pentagonShoppingPage.writeNameToForm("()#!")
        await pentagonShoppingPage.writeEmailToForm("#&!&#(!(#")
        await pentagonShoppingPage.sendForm()
        let isAlertShown  = await pentagonShoppingPage.checkIsErrorAlertShown()



        console.log(isAlertShown?"Passed":"Error");

    } catch (error) {
        logManager.error(error);
    } finally {
        if (browserManager) {
            await browserManager.quit();
        }
    }
})();
