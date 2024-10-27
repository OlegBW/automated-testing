import { Builder, By, Key, until } from 'selenium-webdriver';
import firefox from 'selenium-webdriver/firefox.js'

const url = "http://demo-store.seleniumacademy.com";

(async function demoStoreTest() {
    const firefoxOptions = new firefox.Options()
        .addArguments('--no-sandbox')
        .addArguments('--disable-gpu')
        .addArguments('--disable-dev-shm-usage')

    let driver = await new Builder()
        .forBrowser('firefox')
        .setFirefoxOptions(firefoxOptions)
        .build();

    try {
        await driver.get(url);

        let links = await driver.findElements(By.css('a'));
        for (let link of links) {
            try {
                let href = await link.getAttribute('href');
                console.log(`Opening page: ${href}`);
                await link.click();
                
                await driver.wait(until.urlIs(href), 5000);

                await driver.navigate().back();
                await driver.wait(until.elementLocated(By.css('a')), 5000);
                links = await driver.findElements(By.css('a'));

            } catch (err) {
                console.log(`Error during navigation: ${err}`);
            }
        }

        await driver.get(`${url}/customer/account/create/`);
        
        await driver.wait(until.elementLocated(By.id("firstname")), 5000);
        await driver.findElement(By.id("firstname")).sendKeys("Test");
        await driver.findElement(By.id("lastname")).sendKeys("User");
        await driver.findElement(By.id("email_address")).sendKeys("testuser@example.com");
        await driver.findElement(By.id("password")).sendKeys("Password123!");
        await driver.findElement(By.id("confirmation")).sendKeys("Password123!");

        await driver.findElement(By.css("button[title='Register']")).click();

        await driver.get(url);
        await driver.wait(until.elementLocated(By.id("search")), 5000);
        let searchBox = await driver.findElement(By.id("search"));
        await searchBox.sendKeys("Phone", Key.RETURN);

        await driver.wait(until.elementLocated(By.css(".products-grid li:first-child .product-name a")), 5000);
        let firstProduct = await driver.findElement(By.css(".products-grid li:first-child .product-name a"));
        await firstProduct.click();

    } catch (error) {
        console.error(`Error: ${error}`);
    } finally {
        await driver.quit();
    }
})();