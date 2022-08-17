const {
  Given,
  setDefaultTimeout,
  Before,
  After,
  When,
  Then,
} = require("@cucumber/cucumber");
const puppeteer = require("puppeteer");
const { expect } = require("chai");
const { clickElement, getTextContent } = require("../../lib/commands");

setDefaultTimeout(60000);

Before(async function () {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 300,
  });
  const page = await browser.newPage();
  this.page = page;
  this.browser = browser;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(string, {
    setTimeout: 60000,
  });
});

When("user is booking one ticket", async function () {
  await clickElement(this.page, "nav > .page-nav__day:nth-child(7)");
  await clickElement(
    this.page,
    "section:nth-child(2) > div:nth-child(2) > ul > li"
  );
  await clickElement(
    this.page,
    ".buying-scheme__wrapper > .buying-scheme__row:nth-child(10) > .buying-scheme__chair:nth-child(1)"
  );
  await clickElement(this.page, ".acceptin-button");
});

When("user is booking two tickets", async function () {
  await clickElement(this.page, "nav > .page-nav__day:nth-child(7)");
  await clickElement(
    this.page,
    "section:nth-child(2) > div:nth-child(2) > ul > li"
  );
  await clickElement(
    this.page,
    ".buying-scheme__wrapper > .buying-scheme__row:nth-child(9) > .buying-scheme__chair:nth-child(1)"
  );
  await clickElement(
    this.page,
    ".buying-scheme__wrapper > .buying-scheme__row:nth-child(9) > .buying-scheme__chair:nth-child(2)"
  );
  await clickElement(this.page, ".acceptin-button");
});

When("user is trying to book unavailable ticket", async function () {
  // await clickElement(this.page, "a.page-nav__day.page-nav__day_chosen");
  await clickElement(
    this.page,
    "section:nth-child(2) > div:nth-child(2) > ul > li > a"
  );
  await clickElement(
    this.page,
    "div:nth-child(6) > span.buying-scheme__chair.buying-scheme__chair_standart.buying-scheme__chair_taken"
  );
});

Then("user sees a booking confirmation for one ticket", async function () {
  let actual = await getTextContent(this.page, ".ticket p:nth-of-type(8)");
  expect(actual).contains("Приятного просмотра!");
});

Then("user sees a booking confirmation for two tickets", async function () {
  let actual = await getTextContent(
    this.page,
    ".ticket p:nth-of-type(2) .ticket__details"
  );
  expect(actual).contains("9/1, 9/2");
});

Then("user can not click the button", async function () {
  let isButtonDisabled = await this.page.$eval(
    ".acceptin-button",
    (element) => element.disabled
  );
  expect(isButtonDisabled).true;
});
