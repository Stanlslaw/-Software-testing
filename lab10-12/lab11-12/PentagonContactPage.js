const {By, until, Key} = require('selenium-webdriver');
const Page = require('./Page');

class PentagonContactPage extends Page {
    constructor(driver) {
        super(driver);
        this.driver = driver;

        this.nameField =By.xpath("//*[@id=\"FoxForm\"]/div[2]/input");
        this.phoneField =By.xpath("//*[@id=\"FoxForm\"]/div[3]/input")
        this.emailField =By.xpath("//*[@id=\"FoxForm\"]/div[4]/input");
        this.messageField =By.xpath("//*[@id=\"FoxForm\"]/div[5]/textarea");
        this.sendFormButton=By.xpath("//*[@id=\"FoxForm\"]/div[6]/button");
    }

    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async open() {
        await this.driver.manage().window().maximize();
        await this.driver.get('https://pentagon.by/contact.html');
    }

    async waitForPageIsLoaded() {
        await this.driver.wait(until.elementLocated(this.sendFormButton), 10000);
    }

    async setName(name) {
        this.delay(3000);
        await this.driver.findElement(this.nameField).sendKeys(name);
    }

    async setPhone(phone) {
        await this.driver.findElement(this.phoneField).sendKeys(phone);
    }

    async setEmail(email) {
        await this.driver.findElement(this.emailField).sendKeys(email);
    }

    async setMessage(message) {
        await this.driver.findElement(this.messageField).sendKeys(message);
    }

    async sendForm(){
        await this.driver.findElement(this.sendFormButton).click()
    }


    async checkIsSuccess (){
        const url = await this.driver.getCurrentUrl();
        return url.includes('https://pentagon.by/contact.html#cid_143');
    }



    async quit(){
        await this.driver.quit();
    }

}

module.exports =PentagonContactPage;
