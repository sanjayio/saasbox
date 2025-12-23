import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, index, jsonb } from "drizzle-orm/pg-core";
import { organization, user } from "./auth-schema";

export const notification = pgTable(
  "notification",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    title: text("title").notNull(),
    message: text("message").notNull(),
    read: boolean("read").default(false).notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [index("notification_userId_idx").on(table.userId)]
);

export const credential = pgTable(
  "credential",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    name: text("name").notNull(),
    key: text("key").notNull(),
    secret: text("secret").notNull(),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [index("credential_id_idx").on(table.id)]
);

export const bugReport = pgTable(
  "bug_report",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    description: text("description").notNull(),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    credentialId: text("credential_id")
      .notNull()
      .references(() => credential.id, { onDelete: "cascade" }),
    consoleLogs: jsonb("consoleLogs").notNull(),
    networkRequests: jsonb("networkRequests").notNull(),
    systemInfo: jsonb("systemInfo").notNull(),
    screenshot: text("screenshot"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [index("bugReport_id_idx").on(table.id)]
);
