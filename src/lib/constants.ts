export const plans = [
  {
    name: "Starter",
    limits: {
      agents: 1,
      minutes: 250,
      custom_workflows: 1,
    },
    monthlyPrice: "$199",
    yearlyPrice: "$1990",
    description: "For micro businesses and freelancers",
    features: [
      "1 Voice Agent",
      "250 minutes",
      "1 Custom Workflow",
      "Phone and Web Channels",
      "Simple Analytics",
      "Email Support",
    ],
    button: {
      text: "Book a demo",
      variant: "outline" as const,
    },
  },
  {
    name: "Growth",
    limits: {
      agents: 5,
      minutes: 1000,
      custom_workflows: 5,
    },
    monthlyPrice: "$399",
    yearlyPrice: "$3990",
    description: "For small and growing businesses",
    features: [
      "5 Voice Agents",
      "1000 minutes",
      "5 Custom Workflows",
      "Phone and Web Channels",
      "Advanced Analytics",
      "Email and Slack",
    ],
    button: {
      text: "Book a demo",
      variant: "outline" as const,
    },
  },
  {
    name: "Scale",
    limits: {
      agents: 10,
      minutes: 3000,
      custom_workflows: 10,
    },
    monthlyPrice: "$799",
    yearlyPrice: "$7990",
    description: "For scale-ups and medium-sized businesses",
    features: [
      "10 Voice Agents",
      "3000 minutes",
      "10 Custom Workflows",
      "Phone and Web Channels",
      "Advanced Analytics",
      "Email and Slack",
    ],
    button: {
      text: "Book a demo",
      variant: "outline" as const,
    },
  },
  {
    name: "Custom",
    limits: {
      agents: "Custom",
      minutes: "Custom",
      custom_workflows: "Custom",
    },
    monthlyPrice: "Let's talk",
    yearlyPrice: "Let's talk",
    description: "For enterprises and businesses with complex needs",
    features: [
      "Unlimited Voice Agents",
      "Unlimited Minutes",
      "Unlimited Custom Workflows",
      "Phone and Web Channels",
      "Advanced Analytics",
      "Concierge Onboarding",
      "Enterprise Support",
    ],
    button: {
      text: "Book a demo",
      variant: "outline" as const,
    },
  },
];

// Legacy exports for backward compatibility
export const planLimits = {
  FREE: plans[0].limits,
  STARTER: plans[1].limits,
  PRO: plans[2].limits,
  CUSTOM: plans[3].limits,
};

export const pricingPlans = plans
  .filter((plan) => plan.button)
  .map((plan) => ({
    name: plan.name,
    button: plan.button!,
  }));
