import Image from "next/image";

import { DashedLine } from "../dashed-line";

import { cn } from "@/lib/utils";

const topItems = [
  {
    title: "Super customizable widgets.",
    description:
      "Customize the widgets to your liking and to your brand identity.",
    nodes: [
      <div key="widget" className="flex items-center justify-center p-8">
        <div className="relative">
          <div className="w-48 h-28 bg-card border border-border rounded-lg shadow-sm flex items-center justify-center">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
              <div className="w-24 h-3 bg-muted rounded"></div>
              <div className="w-6 h-6 bg-muted rounded"></div>
            </div>
          </div>

          {/* Customization controls floating around */}
          <div
            className="absolute -top-4 -left-4 w-8 h-8 bg-primary/20 border-2 border-primary rounded-full flex items-center justify-center animate-wobble"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="w-3 h-3 bg-primary rounded-full"></div>
          </div>

          <div
            className="absolute -top-4 -right-4 w-8 h-8 bg-secondary/20 border-2 border-secondary rounded-full flex items-center justify-center animate-wobble"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
          </div>

          <div
            className="absolute -bottom-4 -left-4 w-8 h-8 bg-accent/20 border-2 border-accent rounded-full flex items-center justify-center animate-wobble"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="w-3 h-3 bg-accent rounded-full"></div>
          </div>

          <div
            className="absolute -bottom-4 -right-4 w-8 h-8 bg-muted/20 border-2 border-muted rounded-full flex items-center justify-center animate-wobble"
            style={{ animationDelay: "0.7s" }}
          >
            <div className="w-3 h-3 bg-muted rounded-full"></div>
          </div>

          {/* Connection lines */}
          <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-primary/50 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>,
    ],
    className:
      "flex-1 [&>.title-container]:mb-5 md:[&>.title-container]:mb-8 md:[&>.title-container]:translate-x-2 xl:[&>.title-container]:translate-x-4 [&>.title-container]:translate-x-0",
    fade: [],
  },
  {
    title: "Extensive integrations.",
    description:
      "Integrate with your favorite tools and services. No more exporting, downloading and uploading.",
    nodes: [
      <div
        key="slack"
        className="w-12 h-12 bg-card rounded-xl border border-border flex items-center justify-center p-2"
      >
        <Image
          src="/images/slack.png"
          alt="Slack"
          width={32}
          height={32}
          className="object-contain"
        />
      </div>,
      <div
        key="discord"
        className="w-12 h-12 bg-card rounded-xl border border-border flex items-center justify-center p-2"
      >
        <Image
          src="/images/discord.png"
          alt="Discord"
          width={32}
          height={32}
          className="object-contain"
        />
      </div>,
      <div
        key="email"
        className="w-12 h-12 bg-card rounded-xl border border-border flex items-center justify-center p-2"
      >
        <Image
          src="/images/email.png"
          alt="Email"
          width={32}
          height={32}
          className="object-contain"
        />
      </div>,
      <div
        key="http"
        className="w-12 h-12 bg-card rounded-xl border border-border flex items-center justify-center p-2"
      >
        <Image
          src="/images/http.png"
          alt="HTTP"
          width={32}
          height={32}
          className="object-contain"
        />
      </div>,
      <div
        key="slack2"
        className="w-12 h-12 bg-card rounded-xl border border-border flex items-center justify-center p-2"
      >
        <Image
          src="/images/slack.png"
          alt="Slack"
          width={32}
          height={32}
          className="object-contain"
        />
      </div>,
      <div
        key="discord2"
        className="w-12 h-12 bg-card rounded-xl border border-border flex items-center justify-center p-2"
      >
        <Image
          src="/images/discord.png"
          alt="Discord"
          width={32}
          height={32}
          className="object-contain"
        />
      </div>,
      <div
        key="email2"
        className="w-12 h-12 bg-card rounded-xl border border-border flex items-center justify-center p-2"
      >
        <Image
          src="/images/email.png"
          alt="Email"
          width={32}
          height={32}
          className="object-contain"
        />
      </div>,
    ],
    className:
      "flex-1 [&>.title-container]:mb-5 md:[&>.title-container]:mb-8 md:[&>.title-container]:translate-x-2 xl:[&>.title-container]:translate-x-4 [&>.title-container]:translate-x-0",
    fade: [],
  },
];

const bottomItems = [
  {
    title: "Super light weight.",
    description: "SaaSBox is super lightweight, weighing in at less than 80KB.",
    nodes: [
      <div
        key="lightweight"
        className="flex items-center justify-center p-8 bg-muted/50 rounded-0 md:rounded-tl-xl border border-border"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-primary-foreground font-bold text-2xl">
              80
            </span>
          </div>
          <div className="text-sm text-muted-foreground font-medium">KB</div>
          <div className="text-xs text-muted-foreground/70 mt-2">
            Ultra lightweight
          </div>
        </div>
      </div>,
    ],
    className:
      "[&>.title-container]:mb-5 md:[&>.title-container]:mb-8 xl:[&>.node-container]:translate-x-6 [&>.node-container]:translate-x-2",
    fade: ["bottom"],
  },
  {
    title: "Capture network requests, console logs, and more.",
    description: "With a single click.",
    nodes: [
      <div
        key="capture"
        className="p-6 bg-muted/50 rounded-0 md:rounded-tl-xl border border-border"
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500/80 rounded-full"></div>
            <div className="text-xs font-mono bg-card text-green-500 px-2 py-1 rounded border">
              GET /api/data
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500/80 rounded-full"></div>
            <div className="text-xs font-mono bg-card text-yellow-500 px-2 py-1 rounded border">
              POST /api/submit
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500/80 rounded-full"></div>
            <div className="text-xs font-mono bg-card text-red-500 px-2 py-1 rounded border">
              Error: 404
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-border">
            <div className="text-xs text-muted-foreground">
              Console: 3 logs captured
            </div>
          </div>
        </div>
      </div>,
    ],
    className:
      "[&>.title-container]:mb-5 md:[&>.title-container]:mb-8 xl:[&>.node-container]:translate-x-6 [&>.node-container]:translate-x-2",
    fade: ["bottom"],
  },
  {
    title: "Sydney based support team.",
    description:
      "We are based in Sydney, Australia and we are here to help you.",
    nodes: [
      <div
        key="support"
        className="p-6 bg-muted/50 rounded-0 md:rounded-t-xl border border-border"
      >
        <div className="text-center">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-primary-foreground font-bold text-lg">
              AU
            </span>
          </div>
          <div className="text-sm font-medium text-foreground">
            Sydney Support
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            24/7 Available
          </div>
          <div className="flex justify-center gap-1 mt-3">
            <div className="w-2 h-2 bg-green-500/80 rounded-full"></div>
            <div className="w-2 h-2 bg-green-500/80 rounded-full"></div>
            <div className="w-2 h-2 bg-green-500/80 rounded-full"></div>
          </div>
        </div>
      </div>,
    ],
    className:
      "[&>.title-container]:mb-5 md:[&>.title-container]:mb-8 xl:[&>.node-container]:translate-x-6 [&>.node-container]:translate-x-2",
    fade: ["bottom"],
  },
];

export const ResourceAllocation = () => {
  return (
    <section id="how-it-works" className="overflow-hidden pb-28 lg:pb-32">
      <div className="">
        <h2 className="container font-light text-center text-3xl tracking-tight text-balance md:text-4xl lg:text-5xl">
          SaaSBox can transform your business in days, not weeks.
        </h2>
        <div className="mt-8 md:mt-12 lg:mt-20">
          <DashedLine
            orientation="horizontal"
            className="container scale-x-105"
          />

          {/* Top Features Grid - 2 items */}
          <div className="relative container flex max-md:flex-col">
            {topItems.map((item, i) => (
              <Item key={i} item={item} isLast={i === topItems.length - 1} />
            ))}
          </div>
          <DashedLine
            orientation="horizontal"
            className="container max-w-7xl scale-x-110"
          />

          {/* Bottom Features Grid - 3 items */}
          <div className="relative container grid max-w-7xl md:grid-cols-3">
            {bottomItems.map((item, i) => (
              <Item
                key={i}
                item={item}
                isLast={i === bottomItems.length - 1}
                className="md:pb-0"
              />
            ))}
          </div>
        </div>
        <DashedLine
          orientation="horizontal"
          className="container max-w-7xl scale-x-110"
        />
      </div>
    </section>
  );
};

interface ItemProps {
  item: (typeof topItems)[number] | (typeof bottomItems)[number];
  isLast?: boolean;
  className?: string;
}

const Item = ({ item, isLast, className }: ItemProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col justify-between px-0 py-6 md:px-6 md:py-8",
        className,
        item.className
      )}
    >
      <div className="title-container">
        <h3 className="inline font-semibold">{item.title} </h3>
        <span className="text-muted-foreground"> {item.description}</span>
      </div>
      {item.nodes && item.nodes.length > 4 ? (
        <div className="relative overflow-hidden">
          <div className="flex flex-col gap-5">
            {/* First row - right aligned */}
            <div className="flex translate-x-4 justify-end gap-5">
              {item.nodes.slice(0, 4).map((node, j) => (
                <div
                  key={j}
                  className="bg-background grid aspect-square size-16 place-items-center rounded-2xl p-2 lg:size-20"
                >
                  {node}
                  <div className="from-muted/80 absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l to-transparent" />
                </div>
              ))}
            </div>
            {/* Second row - left aligned */}
            <div className="flex -translate-x-4 gap-5">
              {item.nodes.slice(4).map((node, j) => (
                <div
                  key={j}
                  className="bg-background grid aspect-square size-16 place-items-center rounded-2xl lg:size-20"
                >
                  {node}
                  <div className="from-muted absolute inset-y-0 bottom-0 left-0 z-10 w-14 bg-linear-to-r to-transparent" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="node-container grid grid-cols-1 gap-4">
          {item.nodes?.map((node, j) => (
            <div key={j}>{node}</div>
          ))}
        </div>
      )}

      {!isLast && (
        <>
          <DashedLine
            orientation="vertical"
            className="absolute top-0 right-0 max-md:hidden"
          />
          <DashedLine
            orientation="horizontal"
            className="absolute inset-x-0 bottom-0 md:hidden"
          />
        </>
      )}
    </div>
  );
};
