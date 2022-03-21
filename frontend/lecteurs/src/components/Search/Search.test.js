import { render, screen } from "@testing-library/react";
import Search from "./Search";

describe("Teste Search", () => {
  test("renders search placeholder", () => {
    render(<Search/>)
    const placeholder = screen.getByPlaceholderText("Pesquisar Reviews")
    expect(placeholder).toBeInTheDocument();
  })
})