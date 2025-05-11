import { describe, expect, test } from "vitest";
import { validate } from "./validate";

describe("validate funkcija", () => {
  test("vraća grešku za nevalidan email", () => {
    const formData = { email: "test", lozinka: "tajna123" };
    const errors = validate(formData);
    expect(errors.email).toBe("Email nije validan.");
  });

  test("vraća grešku za kratku lozinku", () => {
    const formData = { email: "test@mail.com", lozinka: "123" };
    const errors = validate(formData);
    expect(errors.lozinka).toBe("Lozinka mora imati bar 6 karaktera.");
  });

  test("ne vraća greške kada su email i lozinka validni", () => {
    const formData = { email: "test@mail.com", lozinka: "tajna123" };
    const errors = validate(formData);
    expect(errors).toEqual({});
  });
});
