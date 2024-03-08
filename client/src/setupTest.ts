import "@testing-library/jest-dom";
import { afterAll, afterEach, beforeAll, expect } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import { server } from "./mocks/server";

expect.extend(matchers);

beforeAll(() => {
  // Establish API mocking before all tests.
  server.listen();
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
