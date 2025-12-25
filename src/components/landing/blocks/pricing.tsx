"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/landing/ui/button";
import { Card, CardContent } from "@/components/landing/ui/card";
import { plans } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const Pricing = ({ className }: { className?: string }) => {
  return (
    <section className={cn("py-28 lg:py-32", className)}>
      <div className="container max-w-5xl">
        <div className="space-y-4 text-center">
          <h2 className="font-light text-2xl tracking-tight md:text-4xl lg:text-5xl">
            Pricing
          </h2>
          <p className="text-muted-foreground mx-auto max-w-xl leading-snug text-balance">
            Use Mainline for free with your whole team. Upgrade to enable
            unlimited issues, enhanced security controls, and additional
            features.
          </p>
        </div>

        <div className="mt-8 grid items-start gap-5 text-start md:mt-12 md:grid-cols-2 lg:mt-20">
          {plans.map((plan: (typeof plans)[number]) => (
            <Card
              key={plan.name}
              className={`${
                plan.name === "Pro"
                  ? "outline-primary origin-top outline-4"
                  : ""
              }`}
            >
              <CardContent className="flex flex-col gap-7 px-6 py-5">
                <div className="space-y-2">
                  <h3 className="text-foreground font-regular text-3xl">
                    {plan.name}
                  </h3>
                  <div className="space-y-1">
                    <span className="text-muted-foreground text-sm">
                      {plan.description}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {plan.name === "Free" ? (
                      <div className="text-lg font-medium">Free forever</div>
                    ) : (
                      <div className="text-lg font-medium">
                        {plan.monthlyPrice} / month
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  {plan.features.map((feature: string) => (
                    <div
                      key={feature}
                      className="text-muted-foreground flex items-center gap-1.5"
                    >
                      <Check className="size-5 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-fit" variant={plan.button.variant} asChild>
                  <Link href="/auth/sign-up">{plan.button.text}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
