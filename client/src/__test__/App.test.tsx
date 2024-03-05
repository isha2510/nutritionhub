import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import App from "../App";

describe("App", () => {
  test("renders hello world", () => {
    render(<App />);
    const text = screen.getByText(/hello world/i);
    //screen.logTestingPlaygroundURL();
    expect(text).toBeInTheDocument();
  });
});
