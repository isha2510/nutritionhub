import { MemoryRouter } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import Dashboard from "../components/Dashboard";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Doctor from "../../doctor/components/Doctor";

vi.mock("@auth0/auth0-react", () => ({
  useAuth0: vi.fn().mockReturnValue({
    isAuthenticated: true, // Mock the specific property needed
    getAccessTokenSilently: vi.fn(),
  }),
}));

describe("Dashboard", () => {
  test("renders the dashboard", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Dashboard />
      </MemoryRouter>,
    );
    const nutritionist = screen.getByRole("heading", {
      name: /Nutritionist Corner/i,
    });
    const recipes = screen.getByRole("heading", {
      name: /Recipes Corner/i,
    });
    expect(nutritionist).toBeInTheDocument();
    expect(recipes).toBeInTheDocument();
  });
  test("renders the recipes page", async () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Dashboard />
        <Doctor />
      </MemoryRouter>,
    );
    const nutrionLink = screen.getByRole("link", {
      name: /find a nutritionist/i,
    });
    await userEvent.click(nutrionLink);
    const text = screen.getByText(
      /connect with nutritionist and make your diet healthy\./i,
    );
    expect(text).toBeInTheDocument();
  });
});
