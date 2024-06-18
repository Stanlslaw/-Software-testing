const { Builder, By, Key, until } = require('selenium-webdriver');

class PentagonShopPage {
    constructor(driver) {
        this.driver = driver;
        this.form=null;
        this.formContainer= By.xpath('//div[@class=\"acymailing_fulldiv\"]')
        this.emailInput = By.xpath('.//input[@name=\"user[email]\"]');
        this.sumbitButton = By.xpath(".//input[@name=\"Submit\"]");
    }

    async open() {
        await this.driver.manage().window().maximize();
        await this.driver.get('https://pentagon.by');
    }

    async waitForFormFind() {
        this.form = await this.driver.wait(until.elementLocated(this.formContainer), 10000);
    }

    async writeEmail(email) {
        const emailInput = await this.form.findElement(this.emailInput);
        await emailInput.sendKeys(email);
    }

    async clickButton(){
        const submitButton = this.driver.findElement(this.sumbitButton);
        await submitButton.click();
    }

    async checkIsErrorAlertShown(){
        await this.driver.wait((until.alertIsPresent()),1000);
        const alertText = await this.driver.switchTo().alert().getText()
        await this.driver.switchTo().alert().dismiss()
        return alertText === 'Please enter a valid e-mail address';
    }
}

(async function pentagonShopTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    const pentagonShopPage = new PentagonShopPage(driver);

    try {
        await pentagonShopPage.open();
        await pentagonShopPage.waitForFormFind()
        await pentagonShopPage.writeEmail("Hello")
        await pentagonShopPage.clickButton()
        const isShown = await pentagonShopPage.checkIsErrorAlertShown()

        console.log(isShown?"Passed":"Error");

    } finally {
        await driver.quit();
    }
})();
