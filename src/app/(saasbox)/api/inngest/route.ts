import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import {
  createBugReport,
  triggerCleanup,
  triggerCleanupCron,
} from "@/inngest/functions";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [createBugReport, triggerCleanup, triggerCleanupCron],
});
