const {By, until, Key} = require('selenium-webdriver');
const Page = require('./Page');

class PentagonProductPage extends Page {
    constructor(driver) {
        super(driver);
        this.driver = driver;
        this.addToFavoritesButton = By.xpath('//*[@id="formpr"]/div[1]/div[2]/div[2]/div/div/input[3]');
        this.favoritesNumContainer = By.xpath('/html/body/div[4]/div[1]/div[2]/div[5]/div[2]/div/a/span');

        this.buyByClickButton = By.xpath("/html/body/div[5]/div[2]/div[5]/form/div[1]/div[2]/div[2]/div/div/input[2]")
        this.nameField = By.xpath('//*[@id="f_name"]')
        this.phoneField = By.xpath('//*[@id="phone"]')
        this.sendFormButton = By.xpath("//*[@id=\"loginForm\"]/div[2]/input")
    }

    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async open() {
        await this.driver.manage().window().maximize();
        await this.driver.get('https://pentagon.by/auto/cyma-ak101-cm040c.html');
    }

    async waitForPageIsLoaded() {
        await this.driver.wait(until.elementLocated(this.addToFavoritesButton), 10000);
    }

    async addToFavorites() {
        await this.driver.switchTo().defaultContent();
        await this.driver.findElement(this.addToFavoritesButton).click();
    }

    async openBuyByClickButton() {
        await this.driver.findElement(this.buyByClickButton).click();
    }

    async setName(name) {
        this.delay(3000);
       await this.driver.findElement(this.nameField).sendKeys(name);
    }

    async setPhone(phone) {
        await this.driver.findElement(this.phoneField).sendKeys(phone);
    }

    async sendForm(){
        await this.driver.findElement(this.sendFormButton).click()
    }

    async checkFavoritesNum() {
        await this.delay(4000);
        const span = await this.driver.findElement(this.favoritesNumContainer);
        const num =await span.getText();
        return  num[1]> 0;
    }

    async checkIsBuySuccess (){
        const url = await this.driver.getCurrentUrl();
        return url.includes('https://pentagon.by/component/jshopping/quickcheckout/checkout');
}



    async quit(){
        await this.driver.quit();
    }

}

module.exports =PentagonProductPage;
