export const plans = [
  {
    name: "Free",
    limits: {
      websites: 1,
      console_logs: 3,
      network_requests: 3,
    },
    monthlyPrice: "Free forever",
    yearlyPrice: "Free forever",
    description: "For hobby users, to try out the platform",
    features: [
      "1 Website",
      "Fully Customizable Widget",
      "Dashboard reporting",
      "Browser, OS, Device Info Collection",
      "Cross browser support (Chrome, Firefox, Safari, Edge)",
      "Lightweight (260KB)",
      "Last 3 Console Logs",
      "Last 3 Network Requests",
      "Basic Analytics",
      "Email Support",
    ],
    button: {
      text: "Sign Up",
      variant: "outline" as const,
    },
  },
  {
    name: "Starter",
    limits: {
      websites: 3,
      console_logs: 10,
      network_requests: 10,
    },
    monthlyPrice: "$6.99",
    yearlyPrice: "$69.99",
    description: "For micro businesses and freelancers",
    features: [
      "3 Websites",
      "Fully Customizable Widget",
      "Email, Slack and Dashboard reporting",
      "Browser, OS, Device Info Collection",
      "Cross browser support (Chrome, Firefox, Safari, Edge)",
      "Lightweight (260KB)",
      "Last 10 Console Logs",
      "Last 10 Network Requests",
      "Basic Analytics",
      "Email and Slack Support",
    ],
    button: {
      text: "Sign Up",
      variant: "default" as const,
    },
  },
  {
    name: "Growth",
    limits: {
      websites: 5,
      console_logs: 20,
      network_requests: 20,
    },
    monthlyPrice: "$12.99",
    yearlyPrice: "$129.99",
    description: "For small and growing businesses",
    features: [
      "5 Websites",
      "Fully Customizable Widget",
      "Email, Slack and Dashboard reporting",
      "Browser, OS, Device Info Collection",
      "Cross browser support (Chrome, Firefox, Safari, Edge)",
      "Lightweight (260KB)",
      "Last 20 Console Logs",
      "Last 20 Network Requests",
      "Basic Analytics",
      "Email and Slack Support",
    ],
    button: {
      text: "Sign Up",
      variant: "outline" as const,
    },
  },
  {
    name: "Scale",
    limits: {
      websites: 10,
      console_logs: 50,
      network_requests: 50,
    },
    monthlyPrice: "$24.99",
    yearlyPrice: "$249.99",
    description: "For scale-ups and medium-sized businesses",
    features: [
      "10 Websites",
      "Fully Customizable Widget",
      "Email, Slack and Dashboard reporting",
      "Browser, OS, Device Info Collection",
      "Cross browser support (Chrome, Firefox, Safari, Edge)",
      "Lightweight (260KB)",
      "Last 50 Console Logs",
      "Last 50 Network Requests",
      "Advanced Analytics",
      "Email and Slack Support",
    ],
    button: {
      text: "Sign Up",
      variant: "outline" as const,
    },
  }
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
