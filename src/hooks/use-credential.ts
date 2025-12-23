import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { client } from "@/lib/client";
import { toast } from "sonner";

export const useCreateCredential = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      key,
      secret,
      organizationId,
    }: {
      name: string;
      key: string;
      secret: string;
      organizationId: string;
    }) => {
      const res = await client.credentials.createCredential.$post({
        name,
        key,
        secret,
        organizationId,
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-credentials-by-organization-id"] });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Error creating credential"
      );
    },
  });
};

export const useDeleteCredential = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ credentialId }: { credentialId: string }) => {
      const res = await client.credentials.deleteCredential.$post({ credentialId });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-credentials-by-organization-id"] });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Error deleting credential"
      );
    },
  });
};

export const useGetCredentialsByOrganizationId = (organizationId: string) => {
  return useQuery({
    queryKey: ["get-credentials-by-organization-id"],
    queryFn: async () => {
      const res = await client.credentials.getCredentialsByOrganizationId.$get({ organizationId });
      return await res.json();
    },
  });
};
