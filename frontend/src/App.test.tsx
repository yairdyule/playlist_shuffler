import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  test("renders Spotify authorization link", () => {
    render(<App />);
    const linkElement = screen.getByText(/authorize us with spotify/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders title", () => {
    render(<App />);
    const linkElement = screen.getByText(/playlist shuffling extravaganza/i);
    expect(linkElement).toBeInTheDocument();
  });
});
