import { MemoryRouter } from "react-router-dom";
import { render } from "../../../test-utils/test-utils";
import { describe, expect, test, vi } from "vitest";
import Recipes from "../components/Recipes";
import { screen, waitFor } from "@testing-library/react";
import Dashboard from "../../dashboard/components/Dashboard";
import userEvent from "@testing-library/user-event";
import RecipeDetail from "../components/RecipeDetails";
import AddRecipe from "../components/AddRecipe";

vi.mock("@auth0/auth0-react", () => ({
  useAuth0: vi.fn().mockReturnValue({
    isAuthenticated: true, // Mock the specific property needed
    getAccessTokenSilently: vi.fn(),
  }),
}));
describe("Recipes", () => {
  test("renders recipes", async () => {
    render(
      <MemoryRouter initialEntries={["/recipes"]}>
        <Recipes />
      </MemoryRouter>,
    );
    const createrecipeLink = await waitFor(() =>
      screen.getByRole("link", { name: /create recipe/i }),
    );
    expect(createrecipeLink).toBeInTheDocument();
    expect(
      screen.getByText(/Indian snack that features a crispy/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /samosa/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /dashboard \//i }),
    ).toBeInTheDocument();
  });
  test("renders back to dashboard", async () => {
    const { rerender } = render(
      <MemoryRouter initialEntries={["/recipes"]}>
        <Recipes />
      </MemoryRouter>,
    );
    await waitFor(() => screen.getByRole("link", { name: /create recipe/i }));
    const dashboard = screen.getByRole("link", { name: /dashboard \//i });
    await userEvent.click(dashboard);
    rerender(null);
    render(
      <MemoryRouter initialEntries={["/dasboard"]}>
        <Dashboard />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("heading", {
        name: /exercise corner/i,
      }),
    ).toBeInTheDocument();
  });
  test("renders recipe details", async () => {
    const { rerender } = render(
      <MemoryRouter initialEntries={["/recipes"]}>
        <Recipes />
      </MemoryRouter>,
    );
    await waitFor(() => screen.getByRole("link", { name: /create recipe/i }));
    const recipe = screen.getByRole("heading", { name: /samosa/i });
    await userEvent.click(recipe);
    rerender(null);
    render(
      <MemoryRouter initialEntries={["/recipes/:id"]}>
        <RecipeDetail />
      </MemoryRouter>,
    );
    const desc = await waitFor(() =>
      screen.getByRole("heading", { name: /description/i }),
    );
    expect(desc).toBeInTheDocument();
  });
  test("renders create recipe page", async () => {
    const { rerender } = render(
      <MemoryRouter initialEntries={["/recipes"]}>
        <Recipes />
      </MemoryRouter>,
    );
    await waitFor(() => screen.getByRole("link", { name: /create recipe/i }));
    const addRecipe = screen.getByRole("link", { name: /Create Recipe/i });
    await userEvent.click(addRecipe);
    rerender(null);
    render(
      <MemoryRouter initialEntries={["/add-recipe"]}>
        <AddRecipe />
      </MemoryRouter>,
    );
    const desc = await waitFor(() =>
      screen.getByRole("heading", { name: /Add The Recipe/i }),
    );
    expect(desc).toBeInTheDocument();
  });
});
