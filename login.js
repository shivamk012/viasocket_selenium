const { Builder, By, Capabilities } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const constants = require("./constants");
const testData = ["ttany9292@gmail.com", "7024011003"];

describe("Login", () => {
  let driver;

  before(async () => {
    const chromeOptions = new chrome.Options().windowSize({ width: 1920, height: 1080 });
    const caps = new Capabilities();
    chromeOptions.set("goog:chromeOptions", caps);

    driver = new Builder()
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .build();
  });

  it("should log in successfully", async () => {
    await driver.get(constants.app_link);
    await driver.wait(async () => {
        return driver
        .executeScript("return document.readyState")
        .then(function (readyState) {
              return readyState === "complete";
        });
    });
        const emailInput = await driver.findElement(By.id('email'));
        const passwordInput = await driver.findElement(By.id('password'));

        await emailInput.sendKeys(testData[0]);
        await passwordInput.sendKeys(testData[1]);

        const submitBtn = await driver.findElement(
          By.xpath('//button[@type = "submit"]')
        );
        await submitBtn.click();
        await driver.sleep(5000);
  });

  after(async () => {
    await driver.quit();
  });
});