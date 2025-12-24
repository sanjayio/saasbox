export const plans = [
  {
    name: "Free",
    limits: {
      websites: 1,
      console_logs: 3,
      network_requests: 3,
    },
    monthlyPrice: "Free forever",
    description: "For hobby users, to try out the platform",
    features: [
      "1 Website",
      "Email Integration",
      "Last 3 Console Logs",
      "Last 3 Network Requests",
      "1 Day Data Retention",
      "Basic Analytics",
      "Email Support",
    ],
    button: {
      text: "Sign Up",
      variant: "outline" as const,
    },
  },
  {
    name: "Pro",
    limits: {
      websites: -1,
      console_logs: -1,
      network_requests: -1,
    },
    monthlyPrice: "$3.99",
    description: "For power users and businesses",
    features: [
      "Unlimited Websites",
      "Email, Slack and Discord Integration",
      "Unlimited Console Logs",
      "Unlimited Network Requests",
      "30 Days Data Retention",
      "Advanced Analytics",
      "Email and Slack Priority Support",
    ],
    button: {
      text: "Sign Up",
      variant: "default" as const,
    },
  },
];

// Legacy exports for backward compatibility
export const planLimits = {
  FREE: plans[0].limits,
  PRO: plans[1].limits,
};

export const pricingPlans = plans
  .filter((plan) => plan.button)
  .map((plan) => ({
    name: plan.name,
    button: plan.button!,
  }));
