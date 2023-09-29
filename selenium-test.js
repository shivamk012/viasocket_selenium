const { Builder, By } = require('selenium-webdriver');

(async function runVisualRegressionTest() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('https://flow.viasocket.com/');

    // You can add more interactions and assertions here if needed.
    // For this example, we're just capturing a screenshot.

    await driver.takeScreenshot().then(function (data) {
      require('fs').writeFileSync('./abct.png', data, 'base64');
    });
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await driver.quit();
  } 
})();
