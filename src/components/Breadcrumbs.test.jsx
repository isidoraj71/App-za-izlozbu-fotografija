import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs.jsx";

test("Breadcrumbs prikazuje Početna link", () => {
  render(
    <MemoryRouter initialEntries={["/galerija/5"]}>
      <Breadcrumbs />
    </MemoryRouter>
  );

  const linkElement = screen.getByText(/Početna/i);
  expect(linkElement).toBeVisible();
});
