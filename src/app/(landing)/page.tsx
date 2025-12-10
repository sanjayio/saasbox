import { Background } from "@/components/landing/background";
import { FAQ } from "@/components/landing/blocks/faq";
import { Features } from "@/components/landing/blocks/features";
import { Hero } from "@/components/landing/blocks/hero";
import { Logos } from "@/components/landing/blocks/logos";
import { Pricing } from "@/components/landing/blocks/pricing";
import { ResourceAllocation } from "@/components/landing/blocks/resource-allocation";
import * as Sentry from "@sentry/nextjs";

export default function Page() {
  Sentry.logger.info("User triggered test log", { log_source: "sentry_test" });

  return (
    <>
      <Background className="via-muted to-muted/80">
        <Hero />
        <Logos />
        <Features />
        <ResourceAllocation />
      </Background>
      {/* <Testimonials /> */}
      <Background variant="bottom">
        <Pricing />
        <FAQ />
      </Background>
    </>
  );
}
