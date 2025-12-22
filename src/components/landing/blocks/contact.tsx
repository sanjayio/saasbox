import Link from "next/link";

import { Facebook, Linkedin, Twitter } from "lucide-react";

import { ContactForm } from "@/components/landing/blocks/contact-form";

export default function Contact() {
  return (
    <>
      <section className="py-28 lg:py-32 lg:pt-44">
        <div className="container max-w-4xl">
          <h1 className="text-center text-2xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            Reach out to us
          </h1>
          <p className="text-muted-foreground mt-4 mb-12 text-center leading-snug font-medium lg:mx-auto">
            Do you have any questions? Reach out to us and we will get back to
            you as soon as possible.
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="col-span-1 flex justify-start gap-8 max-sm:flex-col lg:gap-12">
              <div className="mt-3">
                <div>
                  <p className="text-lg font-semibold">Email</p>
                  <Link
                    href="mailto:support@saasbox.app"
                    className="text-muted-foreground hover:text-foreground mb-4"
                  >
                    support@saasbox.app
                  </Link>
                </div>
                <div className="my-8">
                  <p className="text-lg font-semibold">Phone</p>
                  <Link
                    href="tel:+61452590455"
                    className="text-muted-foreground hover:text-foreground mb-4"
                  >
                    +61 452 590 455
                  </Link>
                </div>
                <div className="mt-3">
                  <p className="text-lg font-semibold">Socials</p>
                  <div className="mt-3 flex gap-6 lg:gap-10">
                    <Link
                      href="https://www.facebook.com/profile.php?id=61584605127931"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground mb-4"
                    >
                      <Facebook className="size-5" />
                    </Link>
                    <Link
                      href="https://x.com/saasbox"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Twitter className="size-5" />
                    </Link>
                    <Link
                      href="https://www.linkedin.com/company/saasbox"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Linkedin className="size-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <h2 className="mb-4 text-lg font-semibold">Inquiries</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
