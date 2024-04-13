import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Header from "../pages/Header";
import { MemoryRouter } from "react-router-dom";

vi.mock("@auth0/auth0-react", () => ({
  useAuth0: vi.fn().mockReturnValue({
    isAuthenticated: true, // Mock the specific property needed
    getAccessTokenSilently: vi.fn(),
  }),
}));
describe("Header", () => {
  test("renders header page", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const home = screen.getByRole("link", {
      name: /home/i,
    });
    const about = screen.getByRole("link", {
      name: /about/i,
    });
    const profile = screen.getByRole("link", {
      name: /about/i,
    });
    const button = screen.getByRole("button", {
      name: /sign out/i,
    });
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(profile).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
