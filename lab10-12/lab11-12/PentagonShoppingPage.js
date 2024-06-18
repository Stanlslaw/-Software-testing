const {By, until, Key} = require('selenium-webdriver');
const Page = require('./Page');

class PentagonShoppingPage extends Page {
    constructor(driver) {
        super(driver);
        this.driver = driver;

        this.outOfStoreCard = By.xpath('//*[@id="selected"]/div[1]')
        this.notifyButton = By.xpath('//*[@id="selected"]/div[1]/div[3]/a')
        this.nameField = By.xpath('/html/body/div[2]/div/table/tbody/tr[2]/td/input')
        this.emailField = By.xpath('/html/body/div[2]/div/table/tbody/tr[3]/td/input')
        this.notifyFormSendButton = By.xpath('//*[@id="main"]/table/tbody/tr[4]/td/input')
    }

    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async open() {
        await this.driver.manage().window().maximize();
        await this.driver.get('https://pentagon.by/rasprodaza.htm');
    }

    async waitForPageIsLoaded() {
        await this.driver.wait(until.elementLocated(this.outOfStoreCard), 10000);
    }

    async openForm() {
        await this.driver.switchTo().defaultContent();
        const notifyButton = await this.driver.findElement(this.notifyButton);
        await this.driver.executeScript("arguments[0].click();", notifyButton);
    }

    async writeNameToForm(name) {
        await this.delay(4000);
        const iframeElement = await this.driver.findElement(By.css('iframe[src="/pist/inform_availability_product/showform.htm?tmpl=component&prod_id=5510"]'));
        await this.driver.switchTo().frame(iframeElement);
        await this.driver.wait(until.elementLocated(this.nameField),10000)
        let input = await this.driver.findElement(this.nameField);
        await input.sendKeys(name)
    }
    async writeEmailToForm(email) {
        await this.delay(2000);
        await this.driver.wait(until.elementLocated(this.emailField),10000)
        let input = await this.driver.findElement(this.emailField);
        await input.sendKeys(email)
    }

    async sendForm() {
        await this.delay(2000);
        await this.driver.wait(until.elementLocated(this.notifyFormSendButton),10000)
        await this.driver.findElement(this.notifyFormSendButton).click();
    }

    async checkIsErrorAlertShown(){
        await this.driver.wait((until.alertIsPresent()),1000);
        const alertText = await this.driver.switchTo().alert().getText()
        await this.driver.switchTo().alert().dismiss()
        return alertText === 'Пожалуйста, введите E-mail.';
    }

    async quit(){
        await this.driver.quit();
    }

}

module.exports =PentagonShoppingPage;
