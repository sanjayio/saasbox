import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/client";

export const useGetSubscriptionByOrganizationId = (organizationId: string) => {
  return useQuery({
    queryKey: ["get-subscription-by-organization-id"],
    queryFn: async () => {
      const res =
        await client.subscriptions.getSubscriptionByOrganizationId.$get({
          organizationId,
        });
      return await res.json();
    },
  });
};
