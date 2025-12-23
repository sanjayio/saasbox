import { z } from "zod";
import { router } from "../__internals/router";
import { privateProcedure } from "../procedures";
import { bugReport, notification } from "@/drizzle/schema";
import { eq, desc, and, inArray } from "drizzle-orm";

export const bugReporterRouter = router({
  getBugReportsByUserId: privateProcedure
    .query(async ({ c, ctx }) => {
      const { user } = ctx;

      if (!user) {
        throw new Error("User not found");
      }

      const bugReports = await ctx.db
        .select()
        .from(bugReport)
        .where(eq(bugReport.userId, user.id));
      
      return c.json({ bugReports: bugReports });
    }),
});
