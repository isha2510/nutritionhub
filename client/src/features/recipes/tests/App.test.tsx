/* eslint-disable @typescript-eslint/no-unused-vars */
import { screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";
import { App } from "../../../App";
import { render } from "../../../test-utils/test-utils";

describe("App", () => {
  test("renders the dashboard", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );
    //screen.logTestingPlaygroundURL();
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
