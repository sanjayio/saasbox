"use client";

import { useState, useEffect } from "react";
import {
  useQueryState,
  parseAsString,
  parseAsStringEnum,
  parseAsInteger,
} from "nuqs";
import { authClient } from "@/lib/auth/auth-client";
import {
  useGetBugReportsByOrganizationId,
  useDeleteBugReport,
} from "@/hooks/use-bug-reporter";
import { Copy, Loader2, Search, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { formatDatetimeToAus } from "@/lib/utils";

type SortOption = "newest" | "oldest" | "description-asc" | "description-desc";
const PAGE_SIZE = 5;

export default function BugReporterContent() {
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [confirmingDeleteId, setConfirmingDeleteId] = useState<string | null>(
    null
  );

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("")
  );
  const [sort, setSort] = useQueryState(
    "sort",
    parseAsStringEnum<SortOption>([
      "newest",
      "oldest",
      "description-asc",
      "description-desc",
    ]).withDefault("newest")
  );
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  // Ensure page is always a number
  const currentPage = page ?? 1;

  const organizationId = activeOrganization?.id || "";

  const { mutate: deleteBugReport, isPending: isDeletingBugReport } =
    useDeleteBugReport();

  // Debounce search input - update search query state after 500ms of no typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput || null);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput, setSearch]);

  // Initialize searchInput from URL on mount
  useEffect(() => {
    setSearchInput(search);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Reset to page 1 when search or sort changes
  useEffect(() => {
    if (currentPage !== 1) {
      setPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, sort]);

  const { data: bugReports, isPending: isLoadingBugReports } =
    useGetBugReportsByOrganizationId({
      organizationId,
      page: currentPage,
      pageSize: PAGE_SIZE,
      search: search || undefined,
      sort,
    });

  function handleDeleteBugReport(bugReportId: string) {
    if (confirmingDeleteId === bugReportId) {
      // Second click - proceed with deletion
      deleteBugReport(
        { id: bugReportId, organizationId },
        {
          onSuccess: () => {
            toast.success("Bug report deleted successfully");
            setConfirmingDeleteId(null);
          },
        }
      );
    } else {
      // First click - show confirmation
      setConfirmingDeleteId(bugReportId);
    }
  }

  if (isLoadingBugReports || isDeletingBugReport) {
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
    <div className="max-w-2xl mb-4 p-2 flex flex-col space-y-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Bug Reports</h1>
        <p className="text-muted-foreground mt-2">
          All reported bugs for the organization.
        </p>
      </div>
      <Dialog
        open={previewImage !== null}
        onOpenChange={(open) => !open && setPreviewImage(null)}
      >
        <DialogContent
          className="max-w-[95vw] max-h-[95vh] p-0"
          showCloseButton={true}
        >
          <DialogTitle className="sr-only">Bug Screenshot Preview</DialogTitle>
          {previewImage && (
            <Image
              src={`data:image/png;base64,${previewImage}`}
              alt="Bug Screenshot Preview"
              width={1200}
              height={1200}
              className="w-full h-auto max-h-[95vh] object-contain rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Search and Sort Controls */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search bug reports..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={sort}
          onValueChange={(value) => setSort(value as SortOption)}
        >
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="description-asc">Description (A-Z)</SelectItem>
            <SelectItem value="description-desc">Description (Z-A)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results count and pagination info */}
      {bugReports?.pagination && (
        <div className="mb-4 text-sm text-muted-foreground">
          Showing{" "}
          {bugReports.pagination.totalCount === 0
            ? 0
            : (currentPage - 1) * PAGE_SIZE + 1}{" "}
          to{" "}
          {Math.min(currentPage * PAGE_SIZE, bugReports.pagination.totalCount)}{" "}
          of {bugReports.pagination.totalCount} bug reports
        </div>
      )}

      {/* Empty states */}
      {!isLoadingBugReports &&
        bugReports?.bugReports &&
        bugReports.bugReports.length === 0 && (
          <div className="mb-4 text-center text-sm text-muted-foreground">
            {search
              ? "No bug reports match your search criteria."
              : "No bug reports found."}
          </div>
        )}

      {/* Bug Reports List */}
      {bugReports?.bugReports.map((bugReport) => (
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
                  className="rounded-md object-contain max-h-48 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setPreviewImage(bugReport.screenshot || null)}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center min-w-[120px] max-w-[180px] mr-4 bg-muted-foreground/10 rounded-md h-48 text-xs text-muted-foreground">
                No Screenshot
              </div>
            )}
            <div className="flex-1">
              <CardHeader>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle>{bugReport.description}</CardTitle>
                    <CardDescription>
                      <div>
                        {formatDatetimeToAus(new Date(bugReport.createdAt))}
                      </div>
                    </CardDescription>
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size={confirmingDeleteId === bugReport.id ? "sm" : "icon"}
                    onClick={() => handleDeleteBugReport(bugReport.id)}
                    className="shrink-0"
                  >
                    {confirmingDeleteId === bugReport.id ? (
                      "Sure?"
                    ) : (
                      <Trash2 className="size-4" />
                    )}
                  </Button>
                </div>
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
                        <TabsList
                          defaultValue="consoleLogs"
                          className="grid w-full grid-cols-3"
                        >
                          <TabsTrigger value="consoleLogs">
                            Console Logs
                          </TabsTrigger>
                          <TabsTrigger value="networkRequests">
                            Network Requests
                          </TabsTrigger>
                          <TabsTrigger value="systemInfo">
                            System Info
                          </TabsTrigger>
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
                                toast.success(
                                  "Console logs copied to clipboard"
                                );
                              }}
                            >
                              <Copy className="size-4" />
                            </Button>
                          </div>
                        </TabsContent>
                        <TabsContent value="networkRequests">
                          <div className="relative">
                            <pre className="bg-muted border rounded-md p-4 text-sm whitespace-pre-wrap overflow-x-auto">
                              {JSON.stringify(
                                bugReport.networkRequests,
                                null,
                                2
                              )}
                            </pre>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="absolute top-2 right-2"
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  JSON.stringify(
                                    bugReport.networkRequests,
                                    null,
                                    2
                                  )
                                );
                                toast.success(
                                  "Network requests copied to clipboard"
                                );
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
                                toast.success(
                                  "System info copied to clipboard"
                                );
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

      {/* Pagination Controls */}
      {bugReports?.pagination && bugReports.pagination.totalPages > 1 && (
        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) {
                      setPage(currentPage - 1);
                    }
                  }}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {(() => {
                const pages: (number | "ellipsis")[] = [];
                const totalPages = bugReports.pagination.totalPages;

                if (totalPages <= 7) {
                  // Show all pages if 7 or fewer
                  for (let i = 1; i <= totalPages; i++) {
                    pages.push(i);
                  }
                } else {
                  // Always show first page
                  pages.push(1);

                  if (currentPage <= 3) {
                    // Show pages 1-5, then ellipsis, then last
                    for (let i = 2; i <= 5; i++) {
                      pages.push(i);
                    }
                    pages.push("ellipsis");
                    pages.push(totalPages);
                  } else if (currentPage >= totalPages - 2) {
                    // Show first, ellipsis, then last 5 pages
                    pages.push("ellipsis");
                    for (let i = totalPages - 4; i <= totalPages; i++) {
                      pages.push(i);
                    }
                  } else {
                    // Show first, ellipsis, current-1, current, current+1, ellipsis, last
                    pages.push("ellipsis");
                    pages.push(currentPage - 1);
                    pages.push(currentPage);
                    pages.push(currentPage + 1);
                    pages.push("ellipsis");
                    pages.push(totalPages);
                  }
                }

                return pages.map((item, idx) => {
                  if (item === "ellipsis") {
                    return (
                      <PaginationItem key={`ellipsis-${idx}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }

                  return (
                    <PaginationItem key={item}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(item);
                        }}
                        isActive={item === currentPage}
                        className="cursor-pointer"
                      >
                        {item}
                      </PaginationLink>
                    </PaginationItem>
                  );
                });
              })()}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < bugReports.pagination.totalPages) {
                      setPage(currentPage + 1);
                    }
                  }}
                  className={
                    currentPage >= bugReports.pagination.totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
