const {By, until, Key} = require('selenium-webdriver');
const Page = require('./Page');

class PentagonShopPage extends Page {
    constructor(driver) {
        super(driver);
        this.driver = driver;

        this.newsForm=null;
        this.newsFormContainer= By.xpath('//div[@class=\"acymailing_fulldiv\"]')
        this.newsEmailInput = By.xpath('.//input[@name=\"user[email]\"]');
        this.newsSumbitButton = By.xpath(".//input[@name=\"Submit\"]");

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
        await this.delay(2000);
        await this.driver.wait(until.elementLocated(this.sendButton),10000)
        await this.driver.findElement(this.sendButton).click()
    }

    async checkIsSendingSuccess(){
        await this.delay(3000);
        const messageElement = await this.driver.wait(until.elementLocated(this.finalMessage),10000)
        const message = this.driver.findElement(this.finalMessage).getText()
        return message === "Сообщение успешно отправлено";
    }

    async writeEmail(email) {
        this.newsForm = await this.driver.wait(until.elementLocated(this.newsFormContainer), 10000);
        const emailInput = await this.newsForm.findElement(this.newsEmailInput);
        await emailInput.sendKeys(email);
    }

    async clickButton(){
        const submitButton = this.driver.findElement(this.newsSumbitButton);
        await submitButton.click();
    }

    async checkIsErrorAlertShown(){
        await this.driver.wait((until.alertIsPresent()),1000);
        const alertText = await this.driver.switchTo().alert().getText()
        await this.driver.switchTo().alert().dismiss()
        return alertText === 'Please enter a valid e-mail address';
    }

    async quit(){
        await this.driver.quit();
    }

}

module.exports =PentagonShopPage;
