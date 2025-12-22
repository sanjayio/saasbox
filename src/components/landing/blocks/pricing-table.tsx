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
    starter: true | false | null | string;
    growth: true | false | null | string;
    scale: true | false | null | string;
  }[];
}

const comparisonFeatures: FeatureSection[] = [
  {
    category: "Usage",
    features: [
      {
        name: "Organizations",
        free: true,
        starter: "1",
        growth: "10",
        scale: "100",
      },
      {
        name: "Agents",
        free: true,
        starter: "1",
        growth: "5",
        scale: "10",
      },
      {
        name: "Minutes",
        free: true,
        starter: "250",
        growth: "1000",
        scale: "3000",
      },
      {
        name: "Custom Workflows",
        free: true,
        starter: "1",
        growth: "5",
        scale: "10",
      },
      {
        name: "Extra Minutes",
        free: true,
        starter: "~$0.18 per minute",
        growth: "~$0.15 per minute",
        scale: "~$0.12 per minute",
      },
      {
        name: "Usage Analytics",
        free: true,
        starter: true,
        growth: true,
        scale: true,
      },
    ],
  },
  {
    category: "Features",
    features: [
      {
        name: "Custom Voices",
        free: true,
        starter: "10",
        growth: "30",
        scale: "50",
      },
      {
        name: "Phone and Web Agents",
        free: true,
        starter: true,
        growth: true,
        scale: true,
      },
      {
        name: "Free Phone Number",
        free: true,
        starter: "Full Price",
        growth: "Discounted",
        scale: "Free",
      },
      {
        name: "Conversation History",
        free: true,
        starter: "7 days",
        growth: "30 days",
        scale: "90 days",
      },
      {
        name: "Demand based Scaling",
        free: true,
        starter: false,
        growth: "x3",
        scale: "x5",
      },
      {
        name: "Advanced Analytics",
        free: true,
        starter: false,
        growth: false,
        scale: true,
      },
      {
        name: "Voice Clones",
        free: true,
        starter: false,
        growth: false,
        scale: false,
      },
    ],
  },
  {
    category: "Support",
    features: [
      {
        name: "Email Support",
        free: true,
        starter: true,
        growth: true,
        scale: true,
      },
      {
        name: "Slack Support",
        free: true,
        starter: false,
        growth: true,
        scale: true,
      },
      {
        name: "Phone Support",
        free: true,
        starter: false,
        growth: false,
        scale: true,
      },
      {
        name: "Avg. Response Time",
        free: true,
        starter: "2 days",
        growth: "1 day",
        scale: "12 hours",
      },
      {
        name: "Dedicated Account Manager",
        free: true,
        starter: false,
        growth: false,
        scale: false,
      },
      {
        name: "Concierge Onboarding",
        free: true,
        starter: false,
        growth: false,
        scale: false,
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
      <div className="grid grid-cols-5 gap-4 max-md:hidden">
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
            className="text-foreground grid grid-cols-2 font-medium max-md:border-b md:grid-cols-5"
          >
            <span className="inline-flex items-center py-4">
              {feature.name}
            </span>
            {/* Mobile View - Only Selected Plan */}
            <div className="md:hidden">
              <div className="flex items-center gap-1 py-4 md:border-b">
                {renderFeatureValue(
                  [
                    feature.free,
                    feature.starter,
                    feature.growth,
                    feature.scale,
                  ][selectedPlan]
                )}
              </div>
            </div>
            {/* Desktop View - All Plans */}
            <div className="hidden md:col-span-4 md:grid md:grid-cols-4 md:gap-4">
              {[
                feature.free,
                feature.starter,
                feature.growth,
                feature.scale,
              ].map((value, i) => (
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
