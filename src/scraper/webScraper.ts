import { Browser, Page } from "playwright-core";

const URL_DAO_TAO_VNUA = "https://daotao.vnua.edu.vn/";
/////////////////////////////////////////////////////////////////////////////////////
const USER_NAME_INPUT = "input[name='username']";
const PASSWORD_INPUT = "input[name='password']";
const LOGIN_BUTTON = "button:has-text('Đăng nhập')";
const USER_NAME_LOGGED =
  "/html/body/app-root[1]/div/div/div/div[1]/div/div/div[2]/app-right/app-login/div/div[2]/div[1]/table/tr[2]/td[2]/span";
/////////////////////////////////////////////////////////////////////////////////////
const TIMEOUT = 10000;

export async function loginWeb(
  browser: Browser,
  studentCode: string,
  password: string
): Promise<{ page: Page }> {
  let page;

  try {
    page = await browser.newPage();
    await page.goto(URL_DAO_TAO_VNUA, {
      waitUntil: "networkidle",
      timeout: TIMEOUT,
    });

    await page.waitForSelector(
      `${USER_NAME_INPUT}, ${PASSWORD_INPUT}, ${LOGIN_BUTTON}`,
      {
        timeout: TIMEOUT,
      }
    );

    await page.fill(USER_NAME_INPUT, studentCode);
    await page.fill(PASSWORD_INPUT, password);
    await page.click(LOGIN_BUTTON);

    await page.waitForSelector(`xpath=${USER_NAME_LOGGED}`, {
      timeout: TIMEOUT,
    });
    return { page };
  } catch {
    throw new Error("Không thể đăng nhập vào trang đào tạo");
  }
}
