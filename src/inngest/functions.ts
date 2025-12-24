import { inngest } from "./client";
import { db } from "@/drizzle/db";
import { credential, bugReport, subscription } from "@/drizzle/schema";
import { and, desc, eq, lt } from "drizzle-orm";

export const triggerCleanup = inngest.createFunction(
  { id: "trigger-cleanup" },
  { event: "bug-reporter/cleanup.triggered" },
  async ({ event, step }) => {
    const { saasBoxKey, saasBoxSecret } = event.data as {
      saasBoxKey: string;
      saasBoxSecret: string;
    };

    // Validate required fields
    if (!saasBoxKey || !saasBoxSecret) {
      throw new Error("Missing required cleanup fields");
    }

    const credentials = await step.run("lookup-credentials", async () => {
      return db
        .select({
          id: credential.id,
          organizationId: credential.organizationId,
        })
        .from(credential)
        .where(
          and(
            eq(credential.key, saasBoxKey),
            eq(credential.secret, saasBoxSecret)
          )
        )
        .limit(1);
    });

    if (!credentials || credentials.length === 0) {
      throw new Error("Invalid SaaSBox credentials 1");
    }

    const credentialRecord = credentials[0];
    if (!credentialRecord) {
      throw new Error("Invalid SaaSBox credentials 2");
    }

    const { id: credentialId, organizationId } = credentialRecord;

    const orgSubscriptions = await step.run("lookup-subscription", async () => {
      return db
        .select({
          plan: subscription.plan,
        })
        .from(subscription)
        .where(
          and(
            eq(subscription.referenceId, organizationId),
            eq(subscription.status, "active")
          )
        )
        .orderBy(desc(subscription.periodEnd))
        .limit(1);
    });

    let reports: unknown;

    if (!orgSubscriptions || orgSubscriptions.length === 0) {
      reports = await step.run("cleanup-bug-reports", async () => {
        return db.delete(bugReport).where(
          and(
            eq(bugReport.credentialId, credentialId),
            eq(bugReport.organizationId, organizationId),
            lt(
              bugReport.createdAt,
              new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
            )
          )
        );
      });
    } else {
      reports = await step.run("cleanup-bug-reports", async () => {
        return db.delete(bugReport).where(
          and(
            eq(bugReport.credentialId, credentialId),
            eq(bugReport.organizationId, organizationId),
            lt(
              bugReport.createdAt,
              new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
            )
          )
        );
      });
    }

    return {
      success: true,
      message: "Cleanup triggered successfully",
      reports_cleaned: reports,
      timestamp: new Date().toISOString(),
    };
  }
);

export const createBugReport = inngest.createFunction(
  { id: "create-bug-report" },
  { event: "bug-reporter/bug.reported" },
  async ({ event, step }) => {
    const {
      description,
      saasBoxKey,
      saasBoxSecret,
      consoleLogs,
      networkRequests,
      systemInfo,
      screenshotBase64,
    } = event.data as {
      description: string;
      saasBoxKey: string;
      saasBoxSecret: string;
      consoleLogs?: string | null;
      networkRequests?: string | null;
      systemInfo?: string | null;
      screenshotBase64?: string | null;
    };

    // Parse JSON fields
    let parsedConsoleLogs: unknown[];
    let parsedNetworkRequests: unknown[];
    let parsedSystemInfo: Record<string, unknown>;

    try {
      parsedConsoleLogs = consoleLogs ? JSON.parse(consoleLogs) : [];
    } catch (error) {
      console.error("Failed to parse consoleLogs:", error);
      parsedConsoleLogs = [];
    }

    try {
      parsedNetworkRequests = networkRequests
        ? JSON.parse(networkRequests)
        : [];
    } catch (error) {
      console.error("Failed to parse networkRequests:", error);
      parsedNetworkRequests = [];
    }

    try {
      parsedSystemInfo = systemInfo ? JSON.parse(systemInfo) : {};
    } catch (error) {
      console.error("Failed to parse systemInfo:", error);
      parsedSystemInfo = {};
    }

    // Validate required fields
    if (!description || !saasBoxKey || !saasBoxSecret) {
      throw new Error("Missing required bug report fields");
    }

    const credentials = await step.run("lookup-credentials", async () => {
      return db
        .select({
          id: credential.id,
          organizationId: credential.organizationId,
        })
        .from(credential)
        .where(
          and(
            eq(credential.key, saasBoxKey),
            eq(credential.secret, saasBoxSecret)
          )
        )
        .limit(1);
    });

    if (!credentials || credentials.length === 0) {
      throw new Error("Invalid SaaSBox credentials 1");
    }

    const credentialRecord = credentials[0];
    if (!credentialRecord) {
      throw new Error("Invalid SaaSBox credentials 2");
    }

    const { id: credentialId, organizationId } = credentialRecord;

    const orgSubscriptions = await step.run("lookup-subscription", async () => {
      return db
        .select({
          plan: subscription.plan,
        })
        .from(subscription)
        .where(
          and(
            eq(subscription.referenceId, organizationId),
            eq(subscription.status, "active")
          )
        )
        .orderBy(desc(subscription.periodEnd))
        .limit(1);
    });

    if (!orgSubscriptions || orgSubscriptions.length === 0) {
      parsedConsoleLogs = parsedConsoleLogs.slice(0, 3);
      parsedNetworkRequests = parsedNetworkRequests.slice(0, 3);
    }

    const insertedReports = await step.run("insert-bug-report", async () => {
      return db
        .insert(bugReport)
        .values({
          description,
          organizationId,
          credentialId,
          consoleLogs: parsedConsoleLogs,
          networkRequests: parsedNetworkRequests,
          systemInfo: parsedSystemInfo,
          screenshot: screenshotBase64 ?? null,
          createdAt: new Date(),
        })
        .returning();
    });

    const insertedId = insertedReports[0]?.id;

    return {
      success: true,
      message: "Bug report received successfully",
      id: insertedId,
      timestamp: new Date().toISOString(),
    };
  }
);
