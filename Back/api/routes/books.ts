import { Hono } from "hono";
import drizzle from "../db/drizzle.js";
import { books } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import dayjs from "dayjs";

const booksRouter = new Hono();

booksRouter.get("/", async (c) => {
  const allBooks = await drizzle.select().from(books);
  return c.json(allBooks);
});

booksRouter.get("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const result = await drizzle.query.books.findFirst({
    where: eq(books.id, id)
  });
  if (!result) {
    return c.json({ error: "Books not found" }, 404);
  }
  return c.json(result);
});

booksRouter.post(
  "/",
  zValidator(
    "json",
    z.object({
      title: z.string().min(1),
      author: z.string().min(1),
      category: z.string().min(1),
      details: z.string().min(1),
      synopsis: z.string().min(1),
    })
  ),
  async (c) => {
    const { title, author, category,details,synopsis } = c.req.valid("json");
    const result = await drizzle
      .insert(books)
      .values({
        title,
        author,
        category,
        details,
        synopsis
      })
      .returning();
    return c.json({ success: true, books: result[0] }, 201);
  }
);

booksRouter.patch(
  "/:id",
  zValidator(
    "json",
    z.object({
      title: z.string().min(1),
      author: z.string().min(1),
      category: z.string().min(1),
      details: z.string().min(1),
      synopsis: z.string().min(1),
    })
  ),
  async (c) => {
    const id = Number(c.req.param("id"));
    const data = c.req.valid("json");
    const updated = await drizzle.update(books).set(data).where(eq(books.id, id)).returning();
    if (updated.length === 0) {
      return c.json({ error: "Student not found" }, 404);
    }
    return c.json({ success: true, books: updated[0] });
  }
);

booksRouter.delete("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const deleted = await drizzle.delete(books).where(eq(books.id, id)).returning();
  if (deleted.length === 0) {
    return c.json({ error: "Student not found" }, 404);
  }
  return c.json({ success: true, students: deleted[0] });
});

export default booksRouter;