const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

class PentagonShopPage {
    constructor(driver) {
        this.driver = driver;
        this.callbackButton = By.xpath('/html/body/div[3]/div[2]/div/div[3]/div[3]/div/p[3]/a');
        this.sendButton = By.xpath('//*[@id="pwebcontact126_send"]');
        this.finalMessage = By.xpath('//*[@id="pwebcontact126_msg"]');
    }

    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async open() {
        await this.driver.manage().window().maximize();
        await this.driver.get('https://pentagon.by');
    }

    async waitForPageIsLoaded() {
        await this.driver.wait(until.elementLocated(this.callbackButton), 10000);
    }

    async openForm() {
        await this.driver.findElement(this.callbackButton).click()
    }

    async sendEmptyForm() {
        await this.delay(4000);
        await this.driver.wait(until.elementLocated(this.sendButton),10000)
        await this.driver.findElement(this.sendButton).click()
    }

    async checkIsSendingSuccess(){
        await this.delay(5000);
        const messageElement = await this.driver.wait(until.elementLocated(this.finalMessage),1000)
        const message = this.driver.findElement(this.finalMessage).getText()
        return message === "Сообщение успешно отправлено";
    }

}

(async function pentagonShopTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    const pentagonShopPage = new PentagonShopPage(driver);

    try {
        await pentagonShopPage.open();
        await pentagonShopPage.waitForPageIsLoaded();
        await pentagonShopPage.openForm();
        await pentagonShopPage.sendEmptyForm();
        const isSuccess = await pentagonShopPage.checkIsSendingSuccess()

        console.log(isSuccess?"Passed":"Error");

    } finally {
        await driver.quit();
    }
})();
