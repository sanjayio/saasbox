import { StripePlan } from "@better-auth/stripe";

const STRIPE_STARTER_PRICE_ID = process.env.STRIPE_STARTER_PRICE_ID!;
const STRIPE_GROWTH_PRICE_ID = process.env.STRIPE_GROWTH_PRICE_ID!;
const STRIPE_SCALE_PRICE_ID = process.env.STRIPE_SCALE_PRICE_ID!;

export const STRIPE_PLANS = [
  {
    name: "starter",
    priceId: STRIPE_STARTER_PRICE_ID,
    limits: {
      projects: 10,
    },
  },
  {
    name: "growth",
    priceId: STRIPE_GROWTH_PRICE_ID,
    limits: {
      projects: 50,
    },
  },
  {
    name: "scale",
    priceId: STRIPE_SCALE_PRICE_ID,
    limits: {
      projects: 50,
    },
  },
] as const satisfies StripePlan[];

export const PLAN_TO_PRICE: Record<string, number> = {
  starter: 6.99,
  growth: 12.99,
  scale: 24.99,
};
