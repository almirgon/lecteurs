import { render, screen } from "@testing-library/react";
import Feed from "./Feed";

describe("Teste Feed", () => {
  test("renders title", () => {
    render(<Feed/>)
    const title = screen.getByText("Feed")
    expect(title).toBeInTheDocument();
  })
})