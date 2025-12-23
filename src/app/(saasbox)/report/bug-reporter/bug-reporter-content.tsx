"use client";

import { authClient } from "@/lib/auth/auth-client";
import { useGetBugReportsByUserId } from "@/hooks/use-bug-reporter";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import Image from "next/image";

export default function BugReporterContent() {
  const { data: session } = authClient.useSession();
  const { data: bugReports, isPending: isLoadingBugReports } = useGetBugReportsByUserId();

  if (isLoadingBugReports) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <Loader2 className="size-10 animate-spin" />
      </div>
    );
  }

  if (!bugReports) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <p className="text-muted-foreground">No bug reports found</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl container my-4 px-4">
      {bugReports.bugReports.map((bugReport) => (
        <Card key={bugReport.id} className="mb-4">
          <div className="flex flex-row">
            {/* Left: Screenshot, if available */}
            {bugReport.screenshot ? (
              <div className="flex items-start justify-center min-w-[120px] max-w-[180px] mx-4">
                <Image
                  src={`data:image/png;base64,${bugReport.screenshot}`}
                  alt="Bug Screenshot"
                  width={120}
                  height={180}
                  className="rounded-md object-contain max-h-48"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center min-w-[120px] max-w-[180px] mr-4 bg-muted-foreground/10 rounded-md h-48 text-xs text-muted-foreground">
                No Screenshot
              </div>
            )}
            {/* Right: Card content */}
            <div className="flex-1">
              <CardHeader>
                <CardTitle>{bugReport.description}</CardTitle>
                <CardDescription>
                  {bugReport.createdAt.toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Accordion type="multiple">
                    <AccordionItem value="consoleLogs">
                      <AccordionTrigger>Console Logs</AccordionTrigger>
                      <AccordionContent>
                        <pre className="text-sm whitespace-pre-wrap">
                          {JSON.stringify(bugReport.consoleLogs, null, 2)}
                        </pre>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="networkRequests">
                      <AccordionTrigger>Network Requests</AccordionTrigger>
                      <AccordionContent>
                        <pre className="text-sm whitespace-pre-wrap">
                          {JSON.stringify(bugReport.networkRequests, null, 2)}
                        </pre>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="systemInfo">
                      <AccordionTrigger>System Info</AccordionTrigger>
                      <AccordionContent>
                        <pre className="text-sm whitespace-pre-wrap">
                          {JSON.stringify(bugReport.systemInfo, null, 2)}
                        </pre>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
