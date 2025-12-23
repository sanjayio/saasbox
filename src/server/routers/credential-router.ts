import { z } from "zod";
import { router } from "../__internals/router";
import { privateProcedure } from "../procedures";
import { credential, notification, organization } from "@/drizzle/schema";
import { eq, desc, and, inArray } from "drizzle-orm";

export const credentialRouter = router({
  createCredential: privateProcedure
    .input(
      z.object({
        name: z.string().min(1).max(100),
        key: z.string().min(1).max(100),
        secret: z.string().min(1).max(100),
        organizationId: z.string().min(1).max(100),
      })
    )
    .mutation(async ({ c, ctx, input }) => {
      const { name, key, secret, organizationId } = input;
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

      const newCredential = await ctx.db
        .insert(credential)
        .values({
          name,
          key,
          secret,
          organizationId,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      return c.json({ credential: newCredential[0] });
    }),
  
  deleteCredential: privateProcedure.input(z.object({
    credentialId: z.string().min(1).max(100),
  })).mutation(async ({ c, ctx, input }) => {
    const { credentialId } = input;
    const { user } = ctx;
    
    if (!user) {
      throw new Error("Unauthorized");
    }

    const credentialRecord = await ctx.db
      .select()
      .from(credential)
      .where(eq(credential.id, credentialId))
      .limit(1);

    if (credentialRecord.length === 0) {
      throw new Error("Credential not found");
    }

    await ctx.db.delete(credential).where(eq(credential.id, credentialRecord[0].id));

    return c.json({ message: "Credential deleted successfully" });
  }),

  getCredentialsByOrganizationId: privateProcedure.input(z.object({
    organizationId: z.string().min(1).max(100),
  })).query(async ({ c, ctx, input }) => {
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

    const credentials = await ctx.db
      .select()
      .from(credential)
      .where(
        and(eq(credential.organizationId, organizationId))
      )
      .orderBy(desc(credential.createdAt));

    return c.json({ credentials: credentials });
  }),
});
