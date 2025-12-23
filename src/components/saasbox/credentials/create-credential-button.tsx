"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { authClient } from "@/lib/auth/auth-client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useCreateCredential } from "@/hooks/use-credential";

const createCredentialSchema = z.object({
  name: z.string().min(1)
});

type CreateCredentialForm = z.infer<typeof createCredentialSchema>;

export function CreateCredentialButton() {
  const [open, setOpen] = useState(false);
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const { mutate: createCredential, isPending: isCreatingCredential } = useCreateCredential();

  const form = useForm<CreateCredentialForm>({
    resolver: zodResolver(createCredentialSchema),
    defaultValues: {
      name: ""
    },
  });

  const { isSubmitting } = form.formState;

  async function handleCreateCredential(data: CreateCredentialForm) {
    try {
      createCredential({
        name: data.name.trim(),
        key: `sbx-key-${crypto.randomUUID().replace(/-/g, "")}`,
        secret: `sbx-secret-${crypto.randomUUID().replace(/-/g, "")}`,
        organizationId: activeOrganization?.id || "",
      });

      form.reset();
      setOpen(false);
    } catch {
      toast.error("Something went wrong while creating the credential");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Credential</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Credential</DialogTitle>
          <DialogDescription>
            Create a new credential to use in your widgets.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleCreateCredential)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Friendly Name for the Credential" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                <LoadingSwap isLoading={isSubmitting || isCreatingCredential}>Create</LoadingSwap>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
