"use client";

import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function WidgetsContent() {
  return (
    <div className="mb-4 p-2 flex flex-col space-y-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Bug Reporter</h1>
        <p className="text-muted-foreground mt-2">
          Learn how to install the Bug Reporter widget to your website.
        </p>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">
          Adding the Bug Reporter widget to your website
        </h2>
        <p className="text-muted-foreground my-4">
          Add the following code to your website inside the head tag:
        </p>
        <div className="relative">
          <pre className="bg-muted p-4 rounded-md overflow-x-scroll">
            <code className="text-sm">
{`<script src="https://unpkg.com/saasbox-bug-reporter@1.0.2/dist/bug-reporter.min.js"></script>

<script>
  BugReporter.init({
    apiEndpoint: 'https://saasbox.app/api/bug-reporter',
    saasBoxKey: 'YOUR_SAASBOX_KEY',
    saasBoxSecret: 'YOUR_SAASBOX_SECRET'
  });
</script>`}
            </code>
          </pre>
          <Button
            type="button"
            className="absolute top-2 right-2 px-2 py-1 text-xs rounded bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
            onClick={() => {
              navigator.clipboard.writeText(
`<script src="https://unpkg.com/saasbox-bug-reporter@1.0.2/dist/bug-reporter.min.js"></script>

<script>
  BugReporter.init({
    apiEndpoint: 'https://saasbox.app/api/bug-reporter',
    saasBoxKey: 'YOUR_SAASBOX_KEY',
    saasBoxSecret: 'YOUR_SAASBOX_SECRET'
  });
</script>`
              );
              toast.success("Copied to clipboard");
            }}
          >
            <Copy className="size-4" />
          </Button>
        </div>
      </div>
      <div className="mb-8"></div>
    </div>
  );
}
