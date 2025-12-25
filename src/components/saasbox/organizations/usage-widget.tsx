"use client";

// import { useGetUsageByOrganizationId } from "@/hooks/use-agent";
import { Progress } from "@/components/ui/progress";
import { authClient } from "@/lib/auth/auth-client";
import { plans } from "@/lib/constants";
import { useGetSubscriptionByOrganizationId } from "@/hooks/use-subscription";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

  const formatLimit = (limit: number | undefined): string => {
    if (limit === undefined) return "—";
    if (limit === -1) return "Unlimited";
    return String(limit);
  };

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
            <span className="mx-1">{formatLimit(limits?.websites)}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">Console Logs</h4>
          <div className="text-muted-foreground flex items-center text-sm">
            <span className="mx-1">
              {formatLimit(limits?.console_logs)} / report
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">Network Requests</h4>
          <div className="text-muted-foreground flex items-center text-sm">
            <span className="mx-1">
              {formatLimit(limits?.network_requests)} / report
            </span>
          </div>
        </div>
        {subscriptions?.subscriptions &&
          subscriptions.subscriptions.length === 0 && (
            <Button variant="default" className="w-full">
              <Link href="/organizations">Upgrade</Link>
            </Button>
          )}
      </div>
    </div>
  );
};

export default UsageWidget;
