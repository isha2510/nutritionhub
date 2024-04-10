import { MemoryRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { render } from "../../../test-utils/test-utils";
import AddRecipe from "../components/AddRecipe";
import userEvent from "@testing-library/user-event";

describe("Add Recipe", () => {
  test("renders add recipe page", async () => {
    render(
      <MemoryRouter initialEntries={["/add-recipe"]}>
        <AddRecipe />
      </MemoryRouter>,
    );
    const titleInput = screen.getByRole("textbox", {
      name: /title/i,
    });
    const description = screen.getByRole("textbox", {
      name: /description/i,
    });
    const imageUrl = screen.getByRole("textbox", {
      name: /image/i,
    });
    const ingredients = screen.getByRole("textbox", {
      name: /ingredients/i,
    });
    const instructions = screen.getByRole("textbox", {
      name: /instructions/i,
    });
    await userEvent.click(titleInput);
    await userEvent.keyboard("amti");
    await userEvent.click(description);
    await userEvent.keyboard("It is a spicy,tangy maharashtrian gravy");
    await userEvent.click(imageUrl);
    await userEvent.keyboard("https://amti.com/63-750x500.jpg");
    await userEvent.click(ingredients);
    await userEvent.keyboard("1 onion, 5 Cloves of Garlic");
    await userEvent.click(instructions);
    await userEvent.keyboard(
      "We will create a paste i.e called vatan inmarathi by dry roasting onion,coriander and garlic.",
    );
    const submit = screen.getByRole("button", {
      name: /submit recipe/i,
    });
    await userEvent.click(submit);
    const title = await waitFor(() =>
      screen.getByRole("heading", {
        name: /submitted for review/i,
      }),
    );
    expect(title).toBeInTheDocument();
    // screen.logTestingPlaygroundURL();
  });
});
