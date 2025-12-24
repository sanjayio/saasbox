import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/client";
import { toast } from "sonner";

type GetBugReportsParams = {
  organizationId: string;
  page?: number;
  pageSize?: number;
  search?: string;
  sort?: "newest" | "oldest" | "description-asc" | "description-desc";
};

export const useGetBugReportsByOrganizationId = ({
  organizationId,
  page = 1,
  pageSize = 10,
  search,
  sort = "newest",
}: GetBugReportsParams) => {
  return useQuery({
    queryKey: ["get-bug-reports-by-organization-id", organizationId, page, pageSize, search, sort],
    queryFn: async () => {
      const res = await client.bugreporter.getBugReportsByOrganizationId.$get({
        organizationId,
        page,
        pageSize,
        sort,
        ...(search && { search }),
      });
      return await res.json();
    },
  });
};

export const useDeleteBugReport = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, organizationId }: { id: string; organizationId: string }) => {
      const res = await client.bugreporter.deleteBugReport.$post({ id, organizationId });
      return await res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["get-bug-reports-by-organization-id", variables.organizationId] });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Error deleting bug report"
      );
    },
  });
};