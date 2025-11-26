import Header from "./Header";
import { auth } from "@/auth";
import { headers } from "next/headers";

export default async function HeaderWrapper() {
  const session = await auth.api.getSession({
        headers: await headers()
    })

  const user = session?.user ?? null;

  return <Header user={user} />;
}
