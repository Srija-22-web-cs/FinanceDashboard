import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the financial dashboard heading", () => {
  render(<App />);
  const headingElement = screen.getByText(/financial overview/i);
  expect(headingElement).toBeInTheDocument();
});
