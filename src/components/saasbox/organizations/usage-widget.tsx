"use client";

// import { useGetUsageByOrganizationId } from "@/hooks/use-agent";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { authClient } from "@/lib/auth/auth-client";
import { plans } from "@/lib/constants";
import { useGetSubscriptionByOrganizationId } from "@/hooks/use-subscription";

const UsageWidget = () => {
  const { data: activeOrganization, isPending: isActiveOrganizationLoading } =
    authClient.useActiveOrganization();
  const { data: subscriptions, isPending: isSubscriptionsLoading } =
    useGetSubscriptionByOrganizationId(activeOrganization?.id ?? "");
  const limits = subscriptions?.subscriptions[0]?.plan
    ? plans.find((plan) => plan.name === subscriptions?.subscriptions[0]?.plan)
        ?.limits
    : plans.find((plan) => plan.name === "Free")?.limits;
  // const { data: usage, isPending: isUsageLoading } =
  //   useGetUsageByOrganizationId(activeOrganization?.id ?? "");

  // if (isUsageLoading || isActiveOrganizationLoading || !usage) {
  if (isActiveOrganizationLoading || isSubscriptionsLoading) {
    return (
      <div className="bg-foreground/10 mt-1.5 rounded-md border">
        <div className="space-y-3 p-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Websites</h4>
            <div className="text-muted-foreground flex items-center text-sm">
              <span className="mx-1">Unavailable</span>
            </div>
          </div>
          <Progress value={0} />
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Console Logs</h4>
            <div className="text-muted-foreground flex items-center text-sm">
              <span className="mx-1">Unavailable</span>
            </div>
          </div>
          <Progress value={0} />
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Network Requests</h4>
            <div className="text-muted-foreground flex items-center text-sm">
              <span className="mx-1">Unavailable</span>
            </div>
          </div>
          <Progress value={0} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-foreground/10 mt-1.5 rounded-md border">
      <div className="space-y-3 p-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">Websites</h4>
          <div className="text-muted-foreground flex items-center text-sm">
            <span className="mx-1">
              {subscriptions?.subscriptions &&
              subscriptions.subscriptions.length > 0
                ? "Unlimited"
                : "1"}{" "}
              / {limits?.websites === -1 ? "Unlimited" : limits?.websites}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">Console Logs</h4>
          <div className="text-muted-foreground flex items-center text-sm">
            <span className="mx-1">{limits?.console_logs}</span>/ report
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">Network Requests</h4>
          <div className="text-muted-foreground flex items-center text-sm">
            <span className="mx-1">{limits?.network_requests}</span>/ report
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageWidget;
