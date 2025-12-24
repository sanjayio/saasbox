import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/landing/ui/accordion";
import { cn } from "@/lib/utils";

const categories = [
  {
    title: "Platform",
    questions: [
      {
        question: "How do I integrate the widgets into my website?",
        answer:
          "You can integrate the widgets into your website by using our guides. Check out our documentation for more information.",
      },
      {
        question: "What widgets are available?",
        answer:
          "We currently have the Bug Reporter widget available. We are working on adding more widgets in the future.",
      },
    ],
  },
  {
    title: "Support",
    questions: [
      {
        question: "How do I get support?",
        answer:
          "You can get support by contacting us via email or slack, depending on your plan. We are available 24/7 to help you with any questions you may have.",
      },
      {
        question: "Do you offer a free trial?",
        answer:
          "No, unfortunately we don't offer a free trial. But we have a generous free tier to get you started.",
      },
    ],
  },
  {
    title: "Your account",
    questions: [
      {
        question: "Can I cancel the subscription at any time?",
        answer:
          "Yes, you can cancel the subscription at any time, from your account settings.",
      },
      {
        question: "Does the subscription include access to all the widgets?",
        answer:
          "Yes, the subscription includes access to all the widgets. You can use the widgets on as many websites as you want.",
      },
      {
        question: "Can I change my plan at any time?",
        answer:
          "Yes, you can upgrade or downgrade your plan at any time, from your account settings.",
      },
      {
        question:
          "Can I delete my account at any time and get my data removed?",
        answer:
          "Yes, you can delete your account at any time and get your data removed from your account settings.",
      },
    ],
  },
];

export const FAQ = ({
  headerTag = "h2",
  className,
  className2,
}: {
  headerTag?: "h1" | "h2";
  className?: string;
  className2?: string;
}) => {
  return (
    <section className={cn("py-28 lg:py-32", className)}>
      <div className="container max-w-5xl">
        <div className={cn("mx-auto grid gap-16 lg:grid-cols-2", className2)}>
          <div className="space-y-4">
            {headerTag === "h1" ? (
              <h1 className="font-light text-2xl tracking-tight md:text-4xl lg:text-5xl">
                Got Questions?
              </h1>
            ) : (
              <h2 className="font-light text-2xl tracking-tight md:text-4xl lg:text-5xl">
                Got Questions?
              </h2>
            )}
            <p className="text-muted-foreground max-w-md leading-snug lg:mx-auto">
              If you can&apos;t find what you&apos;re looking for,{" "}
              <Link
                href="/book-a-demo"
                className="underline underline-offset-4"
              >
                get in touch
              </Link>
              .
            </p>
          </div>

          <div className="grid gap-6 text-start">
            {categories.map((category, categoryIndex) => (
              <div key={category.title} className="">
                <h3 className="text-muted-foreground border-b py-4">
                  {category.title}
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((item, i) => (
                    <AccordionItem key={i} value={`${categoryIndex}-${i}`}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
