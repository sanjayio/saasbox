import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/client";

export const useGetBugReportsByUserId = () => {
  return useQuery({
    queryKey: ["get-bug-reports-by-user-id"],
    queryFn: async () => {
      const res = await client.bugreporter.getBugReportsByUserId.$get({});
      return await res.json();
    },
  });
};
