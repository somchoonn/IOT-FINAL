// import { Hono } from "hono";
// import booksRouter from "./books.js";
// import { bearerAuth } from "hono/bearer-auth";
// import { env } from "hono/adapter";

// const apiRouter = new Hono();

// apiRouter.get("/", (c) => {
//   return c.json({ message: "Hello 66070247" });
// });

// apiRouter.use(
//   "*",
//   bearerAuth({
//     verifyToken: async (token, c) => {
//       const { API_SECRET } = env<{ API_SECRET: string }>(c);
//       return token === API_SECRET;
//     },
//   })
// );

// apiRouter.route("/books", booksRouter);

// export default apiRouter;

// apiRouter.ts

import { Hono } from "hono";
import { cors } from "hono/cors";
import booksRouter from "./books";

// เปิด CORS ให้ทุกเส้นทาง (dev ง่ายสุด)
const apiRouter = new Hono();
apiRouter.use("/*", cors({
  origin: "*", // dev ให้ * ไปก่อน
  allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  maxAge: 86400,
}));

apiRouter.get("/", (c) => c.json({ message: "Hello 66070247" }));
apiRouter.route("/books", booksRouter);

export default apiRouter;
