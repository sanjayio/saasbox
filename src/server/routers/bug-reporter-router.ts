import { z } from "zod";
import { router } from "../__internals/router";
import { privateProcedure } from "../procedures";
import { bugReport, organization } from "@/drizzle/schema";
import { eq, desc, and, asc, sql, ilike } from "drizzle-orm";

export const bugReporterRouter = router({
  getBugReportsByOrganizationId: privateProcedure
    .input(z.object({
      organizationId: z.string(),
      page: z.number().int().min(1).default(1).optional(),
      pageSize: z.number().int().min(1).max(100).default(10).optional(),
      search: z.string().optional(),
      sort: z.enum(["newest", "oldest", "description-asc", "description-desc"]).default("newest").optional(),
    }))
    .query(async ({ c, ctx, input }) => {
      const { organizationId, page = 1, pageSize = 10, search, sort = "newest" } = input;
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

      // Build where conditions
      const whereConditions = [eq(bugReport.organizationId, organizationId)];
      if (search) {
        whereConditions.push(ilike(bugReport.description, `%${search}%`));
      }

      // Get total count for pagination
      const totalCountResult = await ctx.db
        .select({ count: sql<number>`count(*)` })
        .from(bugReport)
        .where(and(...whereConditions));
      
      const totalCount = Number(totalCountResult[0]?.count || 0);

      // Build order by clause
      let orderBy;
      switch (sort) {
        case "newest":
          orderBy = desc(bugReport.createdAt);
          break;
        case "oldest":
          orderBy = asc(bugReport.createdAt);
          break;
        case "description-asc":
          orderBy = asc(bugReport.description);
          break;
        case "description-desc":
          orderBy = desc(bugReport.description);
          break;
        default:
          orderBy = desc(bugReport.createdAt);
      }

      // Calculate offset
      const offset = (page - 1) * pageSize;

      // Get paginated results
      const bugReports = await ctx.db
        .select()
        .from(bugReport)
        .where(and(...whereConditions))
        .orderBy(orderBy)
        .limit(pageSize)
        .offset(offset);
      
      return c.json({ 
        bugReports: bugReports,
        pagination: {
          page,
          pageSize,
          totalCount,
          totalPages: Math.ceil(totalCount / pageSize),
        },
      });
    }),
  
  deleteBugReport: privateProcedure
    .input(z.object({
      id: z.string(),
      organizationId: z.string(),
    }))
    .mutation(async ({ c, ctx, input }) => {
      const { id, organizationId } = input;
      const { user } = ctx;
      
      if (!user) {
        throw new Error("Unauthorized");
      }

      const bugReportRecord = await ctx.db
        .select()
        .from(bugReport)
        .where(eq(bugReport.id, id))
        .limit(1);

      if (bugReportRecord.length === 0) {
        throw new Error("Bug report not found");
      }

      await ctx.db.delete(bugReport).where(and(eq(bugReport.id, bugReportRecord[0].id), eq(bugReport.organizationId, organizationId)));

      return c.json({ message: "Bug report deleted successfully" });
    }),
});
