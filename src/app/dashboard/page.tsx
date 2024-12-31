"use client";

 import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";  <button onClick={() => signOut()}>Abmelden</button>

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Laden...</p>;
  }

  if (!session?.user) {
    router.push("/login");
    return null;
  }

  return (
    <div>
      <h1>Willkommen {session.user.name} </h1>
      <button onClick={() => signOut()}>Abmelden</button>
    </div>
  );
}
