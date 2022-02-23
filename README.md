![Modern Cross Browser Testing in JavaScript using Playwright](images/cbt-playwright-banner.png)

# Modern Cross Browser Testing in JavaScript using Playwright

This repository contains the example code for the
[Modern Cross Browser Testing in JavaScript using Playwright](applitools.info/w4f) workshop
led by [Pandy Knight](https://twitter.com/AutomationPanda)
and hosted by [Applitools](https://applitools.com/).

Full instructions for the workshop are provided in [`WORKSHOP.md`](WORKSHOP.md).


## Abstract

Testing web apps in 2022 is hard. Not only are apps more complex than ever, but their pages must also be validated against an exploding number of combinations of browsers, devices, and versions – an industry average of 81,480 screens to 681,296 for the top 33%.

Testing tools are also changing. While browser automation tools like Selenium WebDriver and cross-browser testing architectures like Selenium Grid have been industry mainstays for years, new tools are emerging that offer faster, more reliable automation with richer features.

In this 1-hour workshop, “Automation Panda” Andy Knight will explain how to automate cross-browser tests in JavaScript using Playwright, a relatively new open-source, end-to-end test framework from Microsoft, and how to integrate them into CI/CD to provide feedback on quality across all browser/device combinations in seconds.

Highlights:

* The importance and evolution of cross-browser testing
* Critical requirements for a scalable cross-browser testing initiative and pros/cons of different approaches
* How to accelerate cross-browser and cross-device testing for integration into CI/CD using JavaScript with Playwright


## Outline

1. Traditional cross-browser testing
   1. Writing a typical login test
   2. Running the test locally
   3. Running the test against multiple browsers
   4. Scaling out cross-browser testing yourself
   5. Scaling out cross-browser testing as a service
2. Modern cross-browser testing
   1. Reconsidering what should be tested
   2. Introducing Applitools Ultrafast Grid
   3. Rewriting login as a visual test
   4. Running visual tests across multiple browsers
   5. Integrating modern cross-browser testing with CI/CD


## Prerequisites

To complete this workshop, you will need:

1. An Applitools account
   * Register [here](https://auth.applitools.com/users/register) for a free account
2. [Node.js](https://nodejs.org/en/)
   * This project was created with v16.13.1
3. [Visual Studio Code](https://code.visualstudio.com/docs/languages/javascript)
   * Add the [Playwright Test for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) extension


# OLD VERBIAGE NEEDING UPDATES BELOW

## Architecture

This project is a small JavaScript test automation project
containing [Playwright](https://playwright.dev/) test cases
for an [Applitools demo site](https://demo.applitools.com).
Each test case covers the same login behavior, but they do so in different ways:

1. `traditional.spec.js` covers login using traditional assertions on a local machine.
2. `visual.spec.js` covers login using Visual AI with [Applitools Eyes](https://applitools.com/products-eyes/)
   and [Ultrafast Grid](https://applitools.com/product-ultrafast-test-cloud/).


## Running tests

To launch tests,
run `npx cypress open` to launch the Cypress browser window (good for developing),
or run `npx cypress run` to execute tests purely from the command line (good for CI/CD).

Before running the visual test, 
you must set the `APPLITOOLS_API_KEY` OS environment variable to your Applitools API key
so that the test can connect to the Applitools cloud.

There are also two versions of the demo site under test:

1. The *original* version of the site
2. A *changed* version of the site with visual differences

To control which version to test, set the `DEMO_SITE`
[Cypress environment variable](https://docs.cypress.io/guides/guides/environment-variables)
to `original` or `changed`.

This project also provides a number of npm scripts to make launch commands simpler:

* `npm run cypress` - opens the Cypress browser window
* `npm run cypress:original` - opens the Cypress browser window to test the original site
* `npm run cypress:changed` - opens the Cypress browser window to test the changed site
* `npm test` - executes tests from the command line
* `npm run test:original` - executes tests against the original site
* `npm run test:changed` - executes tests against the changed site
* `npm run test:chrome` - executes tests using Google Chrome
* `npm run test:edge` - executes tests using Microsoft Edge
* `npm run test:firefox` - executes tests using Mozilla Firefox

These commands run both the traditional and visual tests.
To run one test, append `-- --spec "<path>"` to the command.
For example, `npm run test:changed -- --spec "cypress/integration/visual.spec.js"`
runs the visual test against the changed site purely from the command line.
