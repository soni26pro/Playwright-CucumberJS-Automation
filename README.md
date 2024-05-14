# Choosing Between Cucumber and Playwright Test for Your Project

## Background
The playwright-cucumber project originated when Playwright solely served as a browser automation library. It integrated cucumber-js as its test runner alongside Playwright for automation. However, with the introduction of Playwright Test, which offers similar functionalities, a decision point arises regarding the choice of test runner.

## Decision Making
- **Functionality Overlap**: Playwright Test now provides features akin to cucumber-js, such as parallel run and diverse configurations.
- **Different Configurations**: Utilizing Playwright Test may necessitate distinct configurations compared to cucumber-js.

## Considerations
- **BDD Style vs. "Normal" Tests**: Evaluate whether your project benefits more from BDD-style tests offered by cucumber or "normal" tests facilitated by Playwright Test.
- **Migration Effort**: Assess the effort required to migrate existing tests from cucumber to Playwright Test if needed.

## Steps to Decide
1. **Evaluate Testing Needs**: Determine the testing requirements of your project.
2. **Compare Features**: Assess the features and configurations provided by cucumber and Playwright Test.
3. **Assess Migration Effort**: Consider the effort required to migrate existing tests if opting for Playwright Test.
4. **Community Support**: Take into account the community support and documentation available for both options.
5. **Make a Decision**: Based on the evaluation, decide whether to continue using cucumber or switch to Playwright Test.

## Next Steps
- **Documentation Update**: Update project documentation to reflect the chosen test runner.
- **Configuration Setup**: Configure the selected test runner as per project requirements.
- **Training and Communication**: Ensure team members are informed about the decision and provide any necessary training on the chosen test runner.

## Conclusion
Choosing between cucumber and Playwright Test involves assessing the functionality overlap, testing needs, and migration effort. Make an informed decision based on these factors to effectively manage your project's testing strategy.

# What's Inside

## Typescript Setup
- Enables writing steps with eslint/typescript and prettier for better code quality and consistency.

## Launching Playwright Browser
- Ensures the Playwright browser is launched before running all tests for seamless execution.

## Context and Page Management
- Launches a new context and page for each scenario to maintain isolation and prevent test interference.

## Video Recording Option
- Provides the ability to record test execution with video recording options for analysis and debugging purposes.

## Report Generation
- Generates a comprehensive report with the last good image attached for detailed analysis of test results.

## Allure Reports
- Utilizes Allure reports for clear and visually appealing test reporting, enhancing readability and analysis.

## Utility Functions
- Includes utility functions to assist in writing steps, streamlining test development and maintenance.

## VSCode Configuration
- Configures VSCode to facilitate debugging of a single feature or scenario, allowing for efficient debugging when located on the feature file.

## Installation

### Prerequisites

- Node 14 or newer: `node -v`

```bash
npm install
npx playwright install
npx playwright install-deps --dry-run
```

## To run your tests

# Ubuntu / macOS (Headless Mode)

```bash
ENV=production npx cucumber-js
```

# Windows (Headless Mode)

```bash
$env:ENV = "production"; npx cucumber-js
```

# Ubuntu / macOS (GUI Mode)

```bash
ENV=production HEADLESS=false npx cucumber-js
```

# Windows (GUI Mode)

```bash
$env:ENV = "production"; $env:HEADLESS = "false";npx cucumber-js
```

### Environment variables

| Variable     |                                                     |
| ------------ | --------------------------------------------------- |
| ENV          | base URL is sourced from the '/config/env.{}' file. |
| HEADLESS     | "false" to open the browser. Default: `false`.      |
| --parallel=3 | Appends this tag to execute tests in parallel.      |

### Local reports

If you want to see the reports after running tests, open the newly generated `report/{ENV}.html` file.

If your test has failed, you should also see a screenshot attached to the failed scenario and also video recording
(For demo purpose I am capturing screenshots and video in either of cases)

### Playwright

`./hooks/world.ts` - to configure the device, browser, headless mode or other playwright runner option.

### VSCode

Download **Cucumber (Gherkin) Full Support** extension and configure paths.

## Guidelines

- See [Gherkin Reference](https://cucumber.io/docs/gherkin/reference/) on
  how and when to use `Given`, `When`, `Then` and other special keywords for the feature files.
- See these [tips for POM classes](https://angiejones.tech/page-object-model/) or [this summary](pages/pom.md) with typescript examples.

## Official documentation

- Cucumber: https://cucumber.io/
- Playwright: https://playwright.dev/docs/intro
