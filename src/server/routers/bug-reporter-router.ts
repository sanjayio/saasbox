import { z } from "zod";
import { router } from "../__internals/router";
import { privateProcedure } from "../procedures";
import { bugReport, notification, organization } from "@/drizzle/schema";
import { eq, desc, and, inArray } from "drizzle-orm";

export const bugReporterRouter = router({
  getBugReportsByUserId: privateProcedure
    .input(z.object({
      organizationId: z.string(),
    }))
    .query(async ({ c, ctx, input }) => {
      const { organizationId } = input;
      const { user } = ctx;

      if (!user) {
        throw new Error("Unauthorized");
      }

      const org = await ctx.db
        .select()
        .from(organization)
        .where(eq(organization.id, organizationId))
        .limit(1);

      if (org.length === 0) {
        throw new Error("Organization not found");
      }

      const bugReports = await ctx.db
        .select()
        .from(bugReport)
        .where(eq(bugReport.organizationId, organizationId));
      
      return c.json({ bugReports: bugReports });
    }),
});
