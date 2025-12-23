"use client";

import { authClient } from "@/lib/auth/auth-client";
import { useGetBugReportsByUserId } from "@/hooks/use-bug-reporter";
import { Copy, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function BugReporterContent() {
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const { data: bugReports, isPending: isLoadingBugReports } = useGetBugReportsByUserId(activeOrganization?.id || "");
  const [lightboxOpen, setLightboxOpen] = useState(false);

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
          <div className="flex flex-row items-center justify-start">
            {/* Left: Screenshot, if available */}
            {bugReport.screenshot ? (
              <div className="flex items-start justify-center min-w-[120px] max-w-[180px] mx-4">
                <Image
                  src={`data:image/png;base64,${bugReport.screenshot}`}
                  alt="Bug Screenshot"
                  width={180}
                  height={180}
                  className="rounded-md object-contain max-h-48 cursor-pointer"
                  onClick={() => setLightboxOpen(true)}
                />
                <Lightbox
                  open={lightboxOpen}
                  close={() => setLightboxOpen(false)}
                  slides={[
                    { src: `data:image/png;base64,${bugReport.screenshot}` },
                  ]}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center min-w-[120px] max-w-[180px] mr-4 bg-muted-foreground/10 rounded-md h-48 text-xs text-muted-foreground">
                No Screenshot
              </div>
            )}
            <div className="flex-1">
              <CardHeader>
                <CardTitle>{bugReport.description}</CardTitle>
                <CardDescription>
                  {bugReport.createdAt.toLocaleString()}
                </CardDescription>
              </CardHeader>
            </div>
          </div>
          <div className="w-full">
            <CardContent>
              <div className="space-y-2">
                <Accordion type="single" collapsible>
                  <AccordionItem value="moreDetails">
                    <AccordionTrigger>More Details</AccordionTrigger>
                    <AccordionContent>
                      <Tabs defaultValue="consoleLogs">
                        <TabsList defaultValue="consoleLogs" className="grid w-full grid-cols-3">
                          <TabsTrigger value="consoleLogs">Console Logs</TabsTrigger>
                          <TabsTrigger value="networkRequests">Network Requests</TabsTrigger>
                          <TabsTrigger value="systemInfo">System Info</TabsTrigger>
                        </TabsList>
                        <TabsContent value="consoleLogs">
                          <div className="relative">
                            <pre className="bg-muted border rounded-md p-4 text-sm whitespace-pre-wrap overflow-x-auto">
                              {JSON.stringify(bugReport.consoleLogs, null, 2)}
                            </pre>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="absolute top-2 right-2"
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  JSON.stringify(bugReport.consoleLogs, null, 2)
                                );
                                toast.success("Console logs copied to clipboard");
                              }}
                            >
                              <Copy className="size-4" />
                            </Button>
                          </div>
                        </TabsContent>
                        <TabsContent value="networkRequests">
                          <div className="relative">
                            <pre className="bg-muted border rounded-md p-4 text-sm whitespace-pre-wrap overflow-x-auto">
                              {JSON.stringify(bugReport.networkRequests, null, 2)}
                            </pre>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="absolute top-2 right-2"
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  JSON.stringify(bugReport.networkRequests, null, 2)
                                );
                                toast.success("Network requests copied to clipboard");
                              }}
                            >
                              <Copy className="size-4" />
                            </Button>
                          </div>
                        </TabsContent>
                        <TabsContent value="systemInfo">
                          <div className="relative">
                            <pre className="bg-muted border rounded-md p-4 text-sm whitespace-pre-wrap overflow-x-auto">
                              {JSON.stringify(bugReport.systemInfo, null, 2)}
                            </pre>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="absolute top-2 right-2"
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  JSON.stringify(bugReport.systemInfo, null, 2)
                                );
                                toast.success("System info copied to clipboard");
                              }}
                            >
                              <Copy className="size-4" />
                            </Button>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
}
