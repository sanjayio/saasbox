import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/landing/ui/button";
import { cn } from "@/lib/utils";

const About = () => {
  return (
    <section className="container mt-10 flex max-w-5xl flex-col-reverse gap-8 md:mt-14 md:gap-14 lg:mt-20 lg:flex-row lg:items-end">
      {/* Images Left - Text Right */}
      <div className="flex flex-col gap-8 lg:gap-16 xl:gap-20">
        <ImageSection
          images={[
            { src: "placeholder.svg", alt: "Team collaboration" },
            { src: "placeholder.svg", alt: "Team workspace" },
          ]}
          className="xl:-translate-x-10"
        />

        <TextSection
          title="The team"
          paragraphs={[
            "Eckokit was founded by Sanjay Kumar in 2025, with a passion for AI, automation, and simplifying everyday business operations. Since day one, we&apos;ve focused on rebuilding what&apos;s possible for customer communication and support.",
            "We&apos;re proudly founder-owned, independent, and moving fast. We keep our team lean to remain agile and focused on delivering tangible value to our customers.",
            "Curious about the future we&apos;re building? Join us on our mission to make customer conversations smarter, simpler, and more effective.",
          ]}
          ctaButton={{
            href: "/careers",
            text: "View open roles",
          }}
        />
      </div>

      {/* Text Left - Images Right */}
      <div className="flex flex-col gap-8 lg:gap-16 xl:gap-20">
        <TextSection
          paragraphs={[
            "At Eckokit, we're driven to revolutionize how organizations engage and support their customers through AI Voice Agents and automation. Our mission is to empower you with always-on, intelligent voice-driven solutions that streamline conversations, reduce manual effort, and deliver exceptional experiences—effortlessly and at scale.",
            "We're customer-obsessed—taking the time to understand your unique business needs so we can build agents that fit seamlessly into your workflows. Our success is tied to yours: our automation is designed to let you focus on what matters most, while our AI Voice Agents ensure you never miss an opportunity to connect, assist, or delight.",
          ]}
        />
        <ImageSection
          images={[
            { src: "placeholder.svg", alt: "Modern workspace" },
            { src: "placeholder.svg", alt: "Team collaboration" },
          ]}
          className="hidden lg:flex xl:translate-x-10"
        />
      </div>
    </section>
  );
};

export default About;

interface ImageSectionProps {
  images: { src: string; alt: string }[];
  className?: string;
}

export function ImageSection({ images, className }: ImageSectionProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {images.map((image, index) => (
        <div
          key={index}
          className="relative aspect-[2/1.5] overflow-hidden rounded-2xl"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

interface TextSectionProps {
  title?: string;
  paragraphs: string[];
  ctaButton?: {
    href: string;
    text: string;
  };
}

export function TextSection({
  title,
  paragraphs,
  ctaButton,
}: TextSectionProps) {
  return (
    <section className="flex-1 space-y-4 text-lg md:space-y-6">
      {title && <h2 className="text-foreground text-4xl">{title}</h2>}
      <div className="text-muted-foreground max-w-xl space-y-6">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      {ctaButton && (
        <div className="mt-8">
          <Link href={ctaButton.href}>
            <Button size="lg">{ctaButton.text}</Button>
          </Link>
        </div>
      )}
    </section>
  );
}
