import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/client";

export const useGetBugReportsByUserId = (organizationId: string) => {
  return useQuery({
    queryKey: ["get-bug-reports-by-user-id"],
    queryFn: async () => {
      const res = await client.bugreporter.getBugReportsByUserId.$get({ organizationId });
      return await res.json();
    },
  });
};
