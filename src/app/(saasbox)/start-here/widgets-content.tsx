"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { authClient } from "@/lib/auth/auth-client";
import { useGetCredentialsByOrganizationId } from "@/hooks/use-credential";
import { Loader2 } from "lucide-react";
import { useGetBugReportsByOrganizationId } from "@/hooks/use-bug-reporter";

export default function WidgetsContent() {
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const { data: credentials, isPending: isLoadingCredentials } =
    useGetCredentialsByOrganizationId(activeOrganization?.id || "");
  const { data: bugReports, isPending: isLoadingBugReports } =
    useGetBugReportsByOrganizationId({
      organizationId: activeOrganization?.id || "",
    });
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    accountCreated: true,
    organizationCreated: activeOrganization ? true : false,
    credentialCreated:
      credentials?.credentials?.length && credentials.credentials.length > 0
        ? true
        : false,
    firstBugReported:
      bugReports?.bugReports?.length && bugReports.bugReports.length > 0
        ? true
        : false,
  });

  const handleCheckedChange = (item: string, checked: boolean) => {
    setCheckedItems((prev) => ({ ...prev, [item]: checked }));
  };

  if (isLoadingCredentials || isLoadingBugReports) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <Loader2 className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="mb-4 p-2 flex flex-col space-y-4 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Start Here</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to the start of your journey with SaaSBox. Complete the steps
          below to get your first widget installed.
        </p>
      </div>
      <div className="mb-8">
        <div className="flex flex-col space-y-3">
          <Card>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="accountCreated"
                  checked={checkedItems.accountCreated}
                  onCheckedChange={(checked) =>
                    handleCheckedChange("accountCreated", checked === true)
                  }
                />
                <Label
                  htmlFor="accountCreated"
                  className="text-sm font-normal cursor-pointer"
                >
                  Account Created Successfully. Manage your account settings
                  <Link
                    href="/account-settings"
                    className="text-primary underline"
                  >
                    here
                  </Link>
                </Label>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="organizationCreated"
                  checked={checkedItems.organizationCreated}
                  onCheckedChange={(checked) =>
                    handleCheckedChange("organizationCreated", checked === true)
                  }
                />
                <Label
                  htmlFor="organizationCreated"
                  className="text-sm font-normal cursor-pointer"
                >
                  Organization Created Successfully. Manage your organization
                  settings
                  <Link
                    href="/organizations"
                    className="text-primary underline"
                  >
                    here
                  </Link>
                </Label>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="credentialCreated"
                  checked={checkedItems.credentialCreated}
                  onCheckedChange={(checked) =>
                    handleCheckedChange("credentialCreated", checked === true)
                  }
                />
                <Label
                  htmlFor="credentialCreated"
                  className="text-sm font-normal cursor-pointer"
                >
                  Credential Created Successfully. Manage your credentials
                  <Link
                    href="/developer/credentials"
                    className="text-primary underline"
                  >
                    here
                  </Link>
                  .
                </Label>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="firstBugReported"
                  checked={checkedItems.firstBugReported}
                  onCheckedChange={(checked) =>
                    handleCheckedChange("firstBugReported", checked === true)
                  }
                />
                <Label
                  htmlFor="firstBugReported"
                  className="text-sm font-normal cursor-pointer"
                >
                  Installed Bug Reporter WidgetSuccessfully. View the
                  documentation
                  <Link
                    href="/docs/bug-reporter-installation"
                    className="text-primary underline"
                  >
                    here
                  </Link>
                  .
                </Label>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="firstBugReported"
                  checked={checkedItems.firstBugReported}
                  onCheckedChange={(checked) =>
                    handleCheckedChange("firstBugReported", checked === true)
                  }
                />
                <Label
                  htmlFor="firstBugReported"
                  className="text-sm font-normal cursor-pointer"
                >
                  First Bug Reported Successfully. View your bug reports
                  <Link
                    href="/report/bug-reporter"
                    className="text-primary underline"
                  >
                    here
                  </Link>
                  .
                </Label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mb-8"></div>
    </div>
  );
}
