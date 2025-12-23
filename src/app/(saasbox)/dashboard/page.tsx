import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";

export default async function Page() {
  const headersList = await headers();
  const session = await auth.api.getSession({ headers: headersList });

  if (!session) {
    return redirect("/auth/sign-in");
  }

  return redirect("/dashboard/bug-reporter");
}
