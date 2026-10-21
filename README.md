# How to Test a Tauri App End-to-End



[![TestDriver running this test (sped up)](media/speedrun.gif)](https://console.testdriver.ai/replay/6ad90d3398c885f318dcfc94?share=tjtvOTdcHaH5lpuMHT9B9w)

*Sped up: idle time removed. Click to watch the full replay with step-by-step logs.*

This repo is the complete, runnable example from the TestDriver tutorial **[How to Test a Tauri App End-to-End (No WebDriver Needed)](https://testdriver.ai/blog/test-tauri-app)**. The post walks through every line.

## What the test does

Launch Yaak, create a new HTTP request, send GET https://httpbin.org/get, assert a 200 response body is shown.

It runs on a fresh cloud machine, installs the app the way a user would, and drives it from screenshots with plain-language steps. No selectors, test IDs or changes to the app.

## Run it

You need Node.js 20+ and a TestDriver API key (free to start at [console.testdriver.ai](https://console.testdriver.ai)).

```bash
git clone https://github.com/testdriverai/example-tauri-app.git
cd example-tauri-app
npm install
cp .env.example .env   # then paste your key into .env
npx vitest run
```

The run prints a link to its replay, so you can watch what happened.

## Run it in CI

[`.github/workflows/testdriver.yml`](.github/workflows/testdriver.yml) runs the test on every push and pull request using [`testdriverai/action`](https://github.com/testdriverai/action). Set up OIDC for your team, or add your key as a repository secret named `TD_API_KEY`. See [CI/CD](https://docs.testdriver.ai/ci-cd).

## Files

- [`tests/tauri-app.test.mjs`](tests/tauri-app.test.mjs): the test
- [`vitest.config.js`](vitest.config.js): Vitest with the TestDriver reporter
- [`.github/workflows/testdriver.yml`](.github/workflows/testdriver.yml): CI

## Learn more

- Tutorial: https://testdriver.ai/blog/test-tauri-app
- Docs: https://docs.testdriver.ai/quickstart
- More examples: https://docs.testdriver.ai
