import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { urlsTable } from "./url.model.js";

export const urlClicksTable = pgTable("url_clicks", {
  id: uuid("id").defaultRandom().primaryKey(),

  urlId: uuid("url_id")
    .notNull()
    .references(() => urlsTable.id, { onDelete: "cascade" }),

  country: text("country").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});
