import * as t from "drizzle-orm/pg-core";

// export const students = t.pgTable("students", {
//   id: t.bigserial({ mode: "number" }).primaryKey(),
//   firstname: t.varchar({length: 50,}),
//   lastname: t.varchar({length: 50,}),
//   number: t.varchar({length: 10,}),
//   birthday: t.timestamp().notNull(),
//   sex: t.varchar({length: 10})
// });

export const books = t.pgTable("books", {
  id: t.bigserial({ mode: "number" }).primaryKey(),
  title: t.varchar({length: 50,}),
  author: t.varchar({length: 50,}),
  category : t.varchar({length: 50,}),
  details : t.varchar({length: 50,}),
  synopsis : t.varchar({length: 500,})
});
export const orders = t.pgTable("orders", {
  id: t.bigserial({ mode: "number" }).primaryKey(),
  name: t.varchar({length: 50,}),
  price : t.varchar({length: 50,}),
  status : t.varchar({length: 50,})
});
