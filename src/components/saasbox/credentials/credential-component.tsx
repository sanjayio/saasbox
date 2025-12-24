"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useDeleteCredential,
  useGetCredentialsByOrganizationId,
} from "@/hooks/use-credential";
import { authClient } from "@/lib/auth/auth-client";
import { Copy, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { CreateCredentialButton } from "./create-credential-button";

export function CredentialComponent() {
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const { data: credentials, isPending: isLoadingCredentials } =
    useGetCredentialsByOrganizationId(activeOrganization?.id || "");
  const { mutate: deleteCredential, isPending: isDeletingCredential } =
    useDeleteCredential();
  const [confirmingDeleteId, setConfirmingDeleteId] = useState<string | null>(
    null
  );

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  if (isLoadingCredentials || isDeletingCredential) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <Loader2 className="size-10 animate-spin" />
      </div>
    );
  }

  function handleDeleteCredential(credentialId: string) {
    if (confirmingDeleteId === credentialId) {
      // Second click - proceed with deletion
      deleteCredential(
        { credentialId },
        {
          onSuccess: () => {
            toast.success("Credential deleted successfully");
            setConfirmingDeleteId(null);
          },
        }
      );
    } else {
      // First click - show confirmation
      setConfirmingDeleteId(credentialId);
    }
  }

  if (credentials == null || credentials.credentials.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 max-w-2xl">
        <p className="text-muted-foreground">No credentials found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {credentials.credentials.map((credential) => (
        <Card key={credential.id} className="max-w-2xl">
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <CardTitle className="text-lg">{credential.name}</CardTitle>
              <Button
                type="button"
                variant="destructive"
                size={confirmingDeleteId === credential.id ? "sm" : "icon-sm"}
                onClick={() => handleDeleteCredential(credential.id)}
                className="shrink-0"
              >
                {confirmingDeleteId === credential.id ? (
                  "Sure?"
                ) : (
                  <Trash2 className="size-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Key
              </label>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  value={credential.key}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(credential.key, "Key")}
                  className="shrink-0"
                >
                  <Copy className="size-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Secret
              </label>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  value={credential.secret}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(credential.secret, "Secret")}
                  className="shrink-0"
                >
                  <Copy className="size-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
