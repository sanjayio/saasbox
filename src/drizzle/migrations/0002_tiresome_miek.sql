CREATE TABLE "bug_report" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"description" text NOT NULL,
	"user_id" text NOT NULL,
	"credential_id" text NOT NULL,
	"consoleLogs" jsonb NOT NULL,
	"networkRequests" jsonb NOT NULL,
	"systemInfo" jsonb NOT NULL,
	"screenshot" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "credential" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"key" text NOT NULL,
	"secret" text NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" DROP CONSTRAINT "account_provider_accountId_unique";--> statement-breakpoint
ALTER TABLE "member" DROP CONSTRAINT "member_org_user_unique";--> statement-breakpoint
ALTER TABLE "organization" DROP CONSTRAINT "organization_slug_unique";--> statement-breakpoint
ALTER TABLE "organization" DROP CONSTRAINT "organization_domain_unique";--> statement-breakpoint
DROP INDEX "passkey_user_credential_unique";--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "invitation" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "bug_report" ADD CONSTRAINT "bug_report_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bug_report" ADD CONSTRAINT "bug_report_credential_id_credential_id_fk" FOREIGN KEY ("credential_id") REFERENCES "public"."credential"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "credential" ADD CONSTRAINT "credential_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "bugReport_id_idx" ON "bug_report" USING btree ("id");--> statement-breakpoint
CREATE INDEX "credential_id_idx" ON "credential" USING btree ("id");--> statement-breakpoint
CREATE UNIQUE INDEX "member_organizationId_userId_uidx" ON "member" USING btree ("organization_id","user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "organization_slug_uidx" ON "organization" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "organization_domain_uidx" ON "organization" USING btree ("domain");--> statement-breakpoint
CREATE UNIQUE INDEX "passkey_credentialID_uidx" ON "passkey" USING btree ("credential_id");