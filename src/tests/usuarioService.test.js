import { getAllUsuarios } from "../src/services/usuarioService.js";

test("Debe retornar un array de usuarios", async () => {
  const usuarios = await getAllUsuarios();
  expect(Array.isArray(usuarios)).toBe(true);
});
