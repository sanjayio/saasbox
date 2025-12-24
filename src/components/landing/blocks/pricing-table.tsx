"use client";

import { useState } from "react";

import { Check, ChevronsUpDown, X } from "lucide-react";

import { Button } from "@/components/landing/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/landing/ui/collapsible";
import { pricingPlans } from "@/lib/constants";

interface FeatureSection {
  category: string;
  features: {
    name: string;
    free: true | false | null | string;
    pro: true | false | null | string;
  }[];
}

const comparisonFeatures: FeatureSection[] = [
  {
    category: "Usage",
    features: [
      {
        name: "Organizations",
        free: "1",
        pro: "Unlimited",
      },
      {
        name: "Agents",
        free: true,
        pro: "1",
      },
      {
        name: "Minutes",
        free: true,
        pro: "250",
      },
      {
        name: "Custom Workflows",
        free: true,
        pro: "1",
      },
      {
        name: "Extra Minutes",
        free: true,
        pro: "~$0.18 per minute",
      },
      {
        name: "Usage Analytics",
        free: true,
        pro: true,
      },
    ],
  },
  {
    category: "Features",
    features: [
      {
        name: "Custom Voices",
        free: true,
        pro: "10",
      },
      {
        name: "Phone and Web Agents",
        free: true,
        pro: true,
      },
      {
        name: "Free Phone Number",
        free: true,
        pro: "Full Price",
      },
      {
        name: "Conversation History",
        free: true,
        pro: "7 days",
      },
      {
        name: "Demand based Scaling",
        free: true,
        pro: false,
      },
      {
        name: "Advanced Analytics",
        free: true,
        pro: false,
      },
      {
        name: "Voice Clones",
        free: true,
        pro: false,
      },
    ],
  },
  {
    category: "Support",
    features: [
      {
        name: "Email Support",
        free: true,
        pro: true,
      },
      {
        name: "Slack Support",
        free: true,
        pro: false,
      },
      {
        name: "Phone Support",
        free: true,
        pro: false,
      },
      {
        name: "Avg. Response Time",
        free: true,
        pro: "2 days",
      },
      {
        name: "Dedicated Account Manager",
        free: true,
        pro: false,
      },
      {
        name: "Concierge Onboarding",
        free: true,
        pro: false,
      },
    ],
  },
];

const renderFeatureValue = (value: true | false | null | string) => {
  if (value === true) {
    return <Check className="size-5" />;
  }
  if (value === false) {
    return <X className="size-5" />;
  }
  if (value === null) {
    return null;
  }
  // String value
  return (
    <div className="flex items-center gap-2">
      <Check className="size-4" />
      <span className="text-muted-foreground">{value}</span>
    </div>
  );
};

export const PricingTable = () => {
  const [selectedPlan, setSelectedPlan] = useState(1); // Default to Startup plan

  return (
    <section className="pb-28 lg:py-32">
      <div className="container">
        <PlanHeaders
          selectedPlan={selectedPlan}
          onPlanChange={setSelectedPlan}
        />
        <FeatureSections selectedPlan={selectedPlan} />
      </div>
    </section>
  );
};

const PlanHeaders = ({
  selectedPlan,
  onPlanChange,
}: {
  selectedPlan: number;
  onPlanChange: (index: number) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
      {/* Mobile View */}
      <div className="md:hidden">
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="">
          <div className="flex items-center justify-between border-b py-4">
            <CollapsibleTrigger className="flex items-center gap-2">
              <h3 className="text-2xl font-semibold">
                {pricingPlans[selectedPlan].name}
              </h3>
              <ChevronsUpDown
                className={`size-5 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </CollapsibleTrigger>
            <Button
              variant={pricingPlans[selectedPlan].button.variant}
              className="w-fit"
            >
              {pricingPlans[selectedPlan].button.text}
            </Button>
          </div>
          <CollapsibleContent className="flex flex-col space-y-2 p-2">
            {pricingPlans.map(
              (plan: (typeof pricingPlans)[number], index: number) =>
                index !== selectedPlan && (
                  <Button
                    size="lg"
                    variant="secondary"
                    key={index}
                    onClick={() => {
                      onPlanChange(index);
                      setIsOpen(false);
                    }}
                  >
                    {plan.name}
                  </Button>
                )
            )}
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Desktop View */}
      <div className="grid grid-cols-3 gap-4 max-md:hidden">
        <div className="col-span-1 max-md:hidden"></div>

        {pricingPlans.map(
          (plan: (typeof pricingPlans)[number], index: number) => (
            <div key={index} className="">
              <h3 className="mb-3 text-2xl font-semibold">{plan.name}</h3>
              <Button variant={plan.button.variant} className="">
                {plan.button.text}
              </Button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const FeatureSections = ({ selectedPlan }: { selectedPlan: number }) => (
  <>
    {comparisonFeatures.map((section, sectionIndex) => (
      <div key={sectionIndex} className="">
        <div className="border-primary/40 border-b py-4">
          <h3 className="text-lg font-semibold">{section.category}</h3>
        </div>
        {section.features.map((feature, featureIndex) => (
          <div
            key={featureIndex}
            className="text-foreground grid grid-cols-3 font-medium max-md:border-b"
          >
            <span className="col-span-1 inline-flex items-center py-4">
              {feature.name}
            </span>
            {/* Mobile View - Only Selected Plan */}
            <div className="col-span-2 md:hidden">
              <div className="flex items-center gap-1 py-4 md:border-b">
                {renderFeatureValue([feature.free, feature.pro][selectedPlan])}
              </div>
            </div>
            {/* Desktop View - All Plans */}
            <div className="hidden md:col-span-2 md:grid md:grid-cols-2 md:gap-4">
              {[feature.free, feature.pro].map((value, i) => (
                <div key={i} className="flex items-center gap-1 border-b py-4">
                  {renderFeatureValue(value)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    ))}
  </>
);
