import { Builder, By, until } from 'selenium-webdriver';
import firefox from 'selenium-webdriver/firefox.js'
import { create, all } from 'mathjs';

const math = create(all);
const url = "http://suninjuly.github.io/math.html";

function calc(x) {
    return math.log(math.abs(12 * math.sin(x))).toString();
}

(async function testMathPage() {
    const firefoxOptions = new firefox.Options()
        .addArguments('--no-sandbox')
        .addArguments('--disable-gpu')
        .addArguments('--disable-dev-shm-usage')

    let driver = await new Builder()
        .forBrowser('firefox')
        .setFirefoxOptions(firefoxOptions)
        .build();

    try {
        console.log("Navigating to the page...");
        await driver.get(url);

        console.log("Waiting for the input value element to load...");
        await driver.wait(until.elementLocated(By.id("input_value")), 10000);

        console.log("Getting the value of x...");
        let xElement = await driver.findElement(By.id("input_value"));
        let x = await xElement.getText();
        console.log(`Value of x: ${x}`);
        
        let result = calc(Number(x));
        console.log(`Calculated result: ${result}`);

        console.log("Entering answer...");
        let answerInput = await driver.findElement(By.id("answer"));
        await answerInput.sendKeys(result);

        console.log("Clicking checkbox...");
        let checkbox = await driver.findElement(By.id("robotCheckbox"));
        await checkbox.click();

        console.log("Clicking radiobutton...");
        let radiobutton = await driver.findElement(By.id("robotsRule"));
        await radiobutton.click();

        console.log("Clicking submit button...");
        let submitButton = await driver.findElement(By.css("button.btn"));
        await submitButton.click();

        console.log("Submission complete.");
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        console.log("Sleeping for 10 seconds before quitting...");
        await driver.sleep(10000);
        await driver.quit();
    }
})();