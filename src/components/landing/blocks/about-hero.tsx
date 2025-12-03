import { DashedLine } from "@/components/landing/dashed-line";

const stats = [
  {
    value: "100+",
    label: "Agents Deployed",
  },
  {
    value: "99.9%",
    label: "Uptime",
  },
  {
    value: "<2s",
    label: "Response time",
  },
  {
    value: "24/7",
    label: "Availability",
  },
];

export function AboutHero() {
  return (
    <section className="">
      <div className="container flex max-w-5xl flex-col justify-between gap-8 md:gap-20 lg:flex-row lg:items-center lg:gap-24 xl:gap-24">
        <div className="flex-[1.5]">
          <h1 className="text-3xl font-light tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Transforming customer interactions with AI Voice Agents
          </h1>

          <p className="text-muted-foreground mt-5 text-2xl md:text-3xl lg:text-4xl">
            Intelligent automation that understands, responds, and delivers
            24/7.
          </p>

          <p className="text-muted-foreground mt-8 hidden max-w-lg space-y-6 text-lg text-balance md:block lg:mt-12">
            We&apos;re revolutionizing how businesses communicate with their
            customers through advanced AI Voice Agents that combine natural
            language understanding with seamless automation. Our mission is to
            eliminate wait times, reduce operational costs, and provide
            exceptional customer experiences around the clock.
            <br />
            <br />
            Our AI Voice Agents are designed to handle complex conversations,
            understand context, and automate workflows intelligently. Whether
            it&apos;s customer support, sales inquiries, or appointment
            scheduling, our agents work tirelessly to ensure every interaction
            is meaningful and productive. We&apos;re committed to making
            advanced AI accessible to businesses of all sizes, because
            exceptional customer service shouldn&apos;t be a luxury—it should be
            the standard.
          </p>
        </div>

        <div
          className={`relative flex flex-1 flex-col justify-center gap-3 pt-10 lg:pt-0 lg:pl-10`}
        >
          <DashedLine
            orientation="vertical"
            className="absolute top-0 left-0 max-lg:hidden"
          />
          <DashedLine
            orientation="horizontal"
            className="absolute top-0 lg:hidden"
          />
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <div className="font-display text-4xl tracking-wide md:text-5xl">
                {stat.value}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
