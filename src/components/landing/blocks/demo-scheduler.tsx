import CalIFrame from "../cal";

export default function DemoScheduler() {
  return (
    <section className="py-28 lg:py-32 lg:pt-44">
      <div className="container max-w-4xl">
        <h1 className="text-center text-2xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
          Book a demo
        </h1>
        <p className="text-muted-foreground mt-4 mb-12 text-center leading-snug font-medium md:mb-24 lg:mx-auto">
          We are here to help you on your agentic transformation. Book a demo
          today to see how we can help you.
        </p>

        <CalIFrame />
      </div>
    </section>
  );
}
