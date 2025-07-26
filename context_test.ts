import { assertEquals } from "@std/assert"
import { Context } from "./context.ts"

Deno.test("Context", () => {
  const ctx = new Context({
    "k1": "v1",
    "k2": 123,
  })

  assertEquals(ctx.get("k1"), "v1")
  assertEquals(ctx.get("k2"), 123)
  assertEquals(ctx.get("k3"), null)

  ctx.set("k3", "v3")
  assertEquals(ctx.get("k3"), "v3")

  ctx.delete("k3")
  assertEquals(ctx.get("k3"), null)
})

Deno.test("Context passed to functions", () => {
  function checkContext(ctx: Context, key: string, value: unknown) {
    assertEquals(ctx.get(key), value)
  }

  function modifyContext(ctx: Context, key: string, value: unknown) {
    ctx.set(key, value)
  }

  const ctx = new Context({
    "k1": "v1",
  })

  checkContext(ctx, "k1", "v1")

  modifyContext(ctx, "k1", "v1-1")

  checkContext(ctx, "k1", "v1-1")
})
