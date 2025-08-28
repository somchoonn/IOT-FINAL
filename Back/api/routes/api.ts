import { Hono } from "hono";
import { cors } from "hono/cors";
import booksRouter from "./books";

const api = new Hono();

api.use("*", cors({
  origin: "https://front-inky-three.vercel.app",
  allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type"],
  maxAge: 86400,
}));





// health check
api.get("/", (c) => c.json({ message: "Hello World" }));
api.route("/books", booksRouter);

export default api;
