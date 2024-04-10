import { describe, expect, test } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { render } from "../../../test-utils/test-utils";
import RecipeDetail from "../components/RecipeDetails";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Recipes from "../components/Recipes";
import Dashboard from "../../dashboard/components/Dashboard";

describe("RecipeDetails", () => {
  test("renders recipe details", async () => {
    render(
      <MemoryRouter initialEntries={["/recipes/:id"]}>
        <RecipeDetail />
      </MemoryRouter>,
    );
    const desc = await waitFor(() =>
      screen.getByRole("heading", { name: /description/i }),
    );
    const ing = screen.getByRole("heading", {
      name: /ingredients/i,
    });
    const instruction = screen.getByText(
      /seal the edges and deep-fry until golden brown\./i,
    );
    expect(desc).toBeInTheDocument();
    expect(ing).toBeInTheDocument();
    expect(instruction).toBeInTheDocument();
  });
  test("renders back to recipe page", async () => {
    const { rerender } = render(
      <MemoryRouter initialEntries={["/recipes/:id"]}>
        <RecipeDetail />
      </MemoryRouter>,
    );
    const desc = await waitFor(() =>
      screen.getByRole("heading", { name: /description/i }),
    );
    expect(desc).toBeInTheDocument();
    const recipe = screen.getByRole("link", {
      name: /recipes \//i,
    });
    await userEvent.click(recipe);
    rerender(null);
    render(
      <MemoryRouter initialEntries={["/recipes"]}>
        <Recipes />
      </MemoryRouter>,
    );
    const create = await waitFor(() =>
      screen.getByRole("link", { name: /create recipe/i }),
    );
    expect(create).toBeInTheDocument();
  });
  test("renders back to dashboard", async () => {
    const { rerender } = render(
      <MemoryRouter initialEntries={["/recipes/:id"]}>
        <RecipeDetail />
      </MemoryRouter>,
    );
    const desc = await waitFor(() =>
      screen.getByRole("heading", { name: /description/i }),
    );
    expect(desc).toBeInTheDocument();
    const dashboard = screen.getByRole("link", {
      name: /dashboard/i,
    });
    await userEvent.click(dashboard);
    rerender(null);
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Dashboard />
      </MemoryRouter>,
    );
    const exercise = await waitFor(() =>
      screen.getByRole("heading", {
        name: /exercise corner/i,
      }),
    );
    expect(exercise).toBeInTheDocument();
  });
});
