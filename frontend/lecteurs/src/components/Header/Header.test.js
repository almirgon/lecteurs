import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Teste Header", () => {
  test("renders header", () => {
    render(<Header/>)
    const button = screen.getByText("Login/Cadastro")
    expect(button).toBeInTheDocument();
  })
})