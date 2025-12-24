import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CreateCredentialButton } from "@/components/saasbox/credentials/create-credential-button";
import { CredentialComponent } from "@/components/saasbox/credentials/credential-component";

export default async function OrganizationsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session == null) return redirect("/auth/sign-in");

  return (
    <div className="max-w-2xl mb-4 p-2 flex flex-col space-y-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Credentials</h1>
        <p className="text-muted-foreground mt-2">
          Here are your credentials for the organization. You can use these
          credentials to authenticate your widgets.
        </p>
      </div>
      <div className="flex flex-col items-start justify-start mb-8 gap-4 max-w-2xl">
        <CreateCredentialButton />
      </div>
      <CredentialComponent />
    </div>
  );
}
