ALTER TABLE "agent" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "agent" CASCADE;--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "domain" text NOT NULL;--> statement-breakpoint
ALTER TABLE "organization" ADD CONSTRAINT "organization_domain_unique" UNIQUE("domain");