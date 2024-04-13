/* eslint-disable @typescript-eslint/no-unused-vars */
import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import { App } from "./App";
import { render } from "./test-utils/test-utils";

describe("App", () => {
  test("renders the Landing Page with Sign-In button", async () => {
    vi.mock("@auth0/auth0-react", () => ({
      useAuth0: vi.fn().mockReturnValue({
        isAuthenticated: false, // Mock the specific property needed
        getAccessTokenSilently: vi.fn(),
      }),
    }));
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("button", {
        name: /sign in/i,
      }),
    ).toBeInTheDocument();
  });
});
