import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: './tests',
  // testMatch: [
  //   "tests/compareExcel.test.ts",
  //   "lighthouse/unauth.test.ts",
  //   "lighthouse/auth.test.ts"
  //   "tests/registerUser.test.ts",
  //   "tests/loginUser.test.ts",
  //   "tests/addProductToCart.test.ts",
  //   "tests/flipkart.test.ts"
  // ],
  timeout: 1 * 600 * 10000,
  expect: {
    timeout: 500000,
  },
  fullyParallel: !true,
  retries: process.env.CI ? 1 : 2,
  workers: process.env.CI ? 1 : 2,
  reporter: process.env.CI
    ? [
        [
          "junit",
          {
            outputFile: "results.xml",
          },
        ],
      ]
    : [
        [
          "json",
          {
            outputFile: "report.json",
          },
        ],
        [
          "html",
          {
            open: "always",
          },
        ],
      ],
  use: {
    headless: process.env.CI ? true : false,
    baseURL: "https://bookcart.azurewebsites.net/",
    // actionTimeout: 2 * 60 * 1000,
    trace: process.env.CI ? "off" : "on",
    video: process.env.CI ? "off" : "on",
    screenshot: process.env.CI ? "off" : "on",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },

    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // }
  ],
};

export default config;
