const { Builder, By, Capabilities, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const constants = require("./constants");
const resemble = require("resemblejs");

const testData = ["test1@test1.com", "12345678"];
const firstName = "Jfdsjdfh";

async function compareImages(imagePath1, imagePath2) {
  return new Promise((resolve, reject) => {
    resemble(imagePath1)
      .compareTo(imagePath2)
      .onComplete((data) => resolve(data))
      .ignoreLess()
      .onComplete((data) => resolve(data));
  });
}

describe("Login", () => {
  let driver;

  before(async () => {
    const chromeOptions = new chrome.Options().windowSize({
      width: 1920,
      height: 1080,
    });
    const caps = new Capabilities();

    driver = new Builder()
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .build();
  });

  it("should log in successfully", async () => {
    return new Promise(async (resolve, reject) => {
      try {
        await driver.get(`${constants.app_link}`);
        await driver.wait(async () => {
          return driver
            .executeScript("return document.readyState")
            .then(function (readyState) {
              return readyState === "complete";
            });
        });
        const emailInput = await driver.findElement(By.id("email"));
        const passwordInput = await driver.findElement(By.id("password"));

        await emailInput.sendKeys(testData[0]);
        await passwordInput.sendKeys(testData[1]);

        const submitbtn = await driver.findElement(
          By.xpath('//button[@type = "submit"]')
        );

        await driver.actions().click(submitbtn).perform();

        await driver.wait(until.urlIs(`${constants.app_link}/projects`), 10000);
        await driver.sleep(1000);

        const projectClick = await driver.findElement(By.className(`flex-spaceBetween-center`));
        await projectClick.click();
        
        const desiredDiv = await driver.findElement(By.className(`sliderbox flex`));
        await desiredDiv.click();

        const buttonLocator = By.css('[class*="script_block__action"]');
        const optionButton = await driver.wait(until.elementLocated(buttonLocator),10000);
        await optionButton.click();

        const liElements = await driver.findElements(By.css('ul[aria-labelledby="long-button"] li'));
        for (const liElement of liElements) {
          const text = await liElement.getText();
          if (text === 'Delete') {
            await liElement.click();
            break; 
          }
        }
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  });
  after(async () => {
    // await driver.quit();
  });
});
