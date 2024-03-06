/* eslint-disable @typescript-eslint/no-unused-vars */
import { screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { App } from "../App";
import { render } from "../utils/test-utils";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import data from "./mock-test-data.json";

export const handlers = [
  http.get("http://localhost:3001/api/recipe", () => {
    return HttpResponse.json({ recipes: data });
  }),
];

const server = setupServer(...handlers);

describe("App", () => {
  // Enable API mocking before tests.
  beforeAll(() => server.listen());

  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => server.resetHandlers());

  // Disable API mocking after the tests are done.
  afterAll(() => server.close());

  test("renders the dashboard", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );
    screen.logTestingPlaygroundURL();
    await waitFor(() => {
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        /Samosa/i,
      );
      expect(
        screen.getByText(/Indian snack that features a crispy/i),
      ).toBeInTheDocument();
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Welcome to NeutritionsHub Recipes",
      );
    });
  });
});
