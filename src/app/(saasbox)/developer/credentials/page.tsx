import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CreateCredentialButton } from "@/components/saasbox/credentials/create-credential-button";
import { CredentialComponent } from "@/components/saasbox/credentials/credential-component";

export default async function OrganizationsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session == null) return redirect("/auth/sign-in");

  return (
    <div className="container mx-auto my-6 px-4">
      <div className="flex flex-col items-end justify-end mb-8 gap-4 max-w-2xl">
        <CreateCredentialButton />
      </div>

      <CredentialComponent />
    </div>
  );
}
