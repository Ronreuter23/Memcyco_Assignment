const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
require("chromedriver");

async function waitForElementLocated(driver, bySelector) {
    return (
        await driver.wait(until.elementLocated(bySelector), 10000)
    );
}


async function testCase(fileName, email, password) {
        let driver = await new Builder().forBrowser("chrome").build();
        // opens giphy.com
        await driver.get("https://giphy.com/");
        // clicks the log-in button
        await waitForElementLocated(driver, By.className("Username-sc-xgchsp")).then(el => {
            el.click()
        });
        // enters the users email
        await waitForElementLocated(driver, By.name("email")).then(el => {
            el.sendKeys(email)
        });
        // enters the users password
        await waitForElementLocated(driver, By.name("password")).then(el => {
            el.sendKeys(password)
        });
        // clicks log-in
        await waitForElementLocated(driver, By.className("Button-sc-nzk41b form-components__CTAButton-sc-98e1s3-3 CTAButton-sc-wdxxi lgtcLe dyxhDv ibZCuy")).then(el => {
            el.click()
        });
        // clicks the upload button
        await waitForElementLocated(driver, By.className("Button-sc-nzk41b Link-sc-2wjwyj dgZHlo hDqmTk")).then(el => {
            el.click()
        });
        // uploads file given in fileName
        await waitForElementLocated(driver, By.xpath( "//input[@type='file']")).then(el => {
                el.sendKeys(fileName)
        });
        // clicks the 'continue to upload' button
        await waitForElementLocated(driver, By.className("GradientBlock-sc-mtbfu0 GradientButton-sc-o939k5 enZVFv edtalM")).then(el => {
            el.click()
        });
        // clicks the 'Upload to Giphy' button
        await waitForElementLocated(driver, By.className("GradientBlock-sc-mtbfu0 GradientButton-sc-o939k5 enZVFv edtalM Button-sc-o4kshr djHNTu")).then(el => {
            el.click()
        });
        // make sure the right page is loaded before taking a screenshot
        await driver.wait(until.urlContains("gifs"), 10000);

        // takes a screenshot and saves it as "selenium_screenshot.jpeg"
        driver.takeScreenshot().then(
            function(image) {
                require('fs').writeFileSync("selenium_screenshot.jpeg", image, 'base64');
            });

        await driver.quit();
        
}

testCase("C:\\myGIF.mp4", "ronreuter23@gmail.com", "password");