import { z } from "zod";
import { router } from "../__internals/router";
import { privateProcedure } from "../procedures";
import { member, organization, subscription } from "@/drizzle/schema";
import { eq, desc, and } from "drizzle-orm";

export const subscriptionRouter = router({
  getSubscriptionByOrganizationId: privateProcedure
    .input(
      z.object({
        organizationId: z.string().min(1).max(100),
      })
    )
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

      // Verify user is a member of the organization
      const membership = await ctx.db
        .select()
        .from(member)
        .where(
          and(
            eq(member.organizationId, organizationId),
            eq(member.userId, user.id)
          )
        )
        .limit(1);

      if (membership.length === 0) {
        throw new Error("Forbidden");
      }

      const subscriptions = await ctx.db
        .select()
        .from(subscription)
        .where(
          and(
            eq(subscription.referenceId, organizationId),
            eq(subscription.status, "active")
          )
        )
        .orderBy(desc(subscription.periodEnd));

      return c.json({ subscriptions: subscriptions });
    }),
});
