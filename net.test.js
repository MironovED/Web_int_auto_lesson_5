const { clickElement, getTextContent } = require("./lib/commands");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://qamid.tmweb.ru/client/index.php");
});

afterEach(() => {
  page.close();
});

describe("Testing of the ticket booking service", () => {
  test("Book one movie ticket", async () => {
    await clickElement(page, "nav > .page-nav__day:nth-child(7)");
    await clickElement(
      page,
      "section:nth-child(2) > div:nth-child(2) > ul > li"
    );
    await clickElement(
      page,
      ".buying-scheme__wrapper > .buying-scheme__row:nth-child(10) > .buying-scheme__chair:nth-child(1)"
    );
    await clickElement(page, ".acceptin-button");
    let actual = await getTextContent(page, ".ticket p:nth-of-type(8)");
    expect(actual).toBe("Приятного просмотра!");
  });

  test("Book two movie tickets", async () => {
    await clickElement(page, "nav > .page-nav__day:nth-child(7)");
    await clickElement(
      page,
      "section:nth-child(2) > div:nth-child(2) > ul > li"
    );
    await clickElement(
      page,
      ".buying-scheme__wrapper > .buying-scheme__row:nth-child(9) > .buying-scheme__chair:nth-child(1)"
    );
    await clickElement(
      page,
      ".buying-scheme__wrapper > .buying-scheme__row:nth-child(9) > .buying-scheme__chair:nth-child(2)"
    );
    await clickElement(page, ".acceptin-button");
    let actual = await getTextContent(
      page,
      ".ticket p:nth-of-type(2) .ticket__details"
    );
    expect(actual).toBe("9/1, 9/2");
  });

  test("Should not book unavailable ticket", async () => {
    await clickElement(page, "a.page-nav__day.page-nav__day_chosen");
    await clickElement(
      page,
      "section:nth-child(2) > div:nth-child(2) > ul > li > a"
    );
    await clickElement(
      page,
      "div:nth-child(6) > span.buying-scheme__chair.buying-scheme__chair_standart.buying-scheme__chair_taken"
    );
    let isButtonDisabled = await page.$eval(
      ".acceptin-button",
      (element) => element.disabled
    );
    expect(isButtonDisabled).toBe(true);
  });
});
