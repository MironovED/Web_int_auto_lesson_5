module.exports = {
  clickElement: async function (page, selector) {
    await page.waitForSelector(selector);
    await page.click(selector);
  },
  getTextContent: async function (page, selector) {
    await page.waitForSelector(selector);
    return await page.$eval(selector, (link) => link.textContent);
  },
};
