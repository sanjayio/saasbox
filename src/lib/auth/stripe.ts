import { StripePlan } from "@better-auth/stripe";

const STRIPE_PRO_PRICE_ID = process.env.STRIPE_PRO_PRICE_ID!;

export const STRIPE_PLANS = [
  {
    name: "pro",
    priceId: STRIPE_PRO_PRICE_ID,
    limits: {
      websites: -1,
      console_logs: -1,
      network_requests: -1,
    },
  },
] as const satisfies StripePlan[];

export const PLAN_TO_PRICE: Record<string, number> = {
  pro: 3.99,
};
