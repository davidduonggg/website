# Testing Preferences

This repository should be tested at three levels:

- Unit tests using an appropriate unit test framework for the chosen stack.
- Integration tests covering interactions between components, routes, data flows, or services.
- End-to-end (E2E) tests using Playwright.

Expectations:

- New features should include unit tests where logic can be isolated.
- Cross-boundary behavior should include integration coverage.
- Critical user journeys should have Playwright E2E coverage.
- Test setup should support running these layers independently in CI.
