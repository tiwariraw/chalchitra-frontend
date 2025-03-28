"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function PrivateRoute({ children }) {
  const { authenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authenticated) {
      router.push("/login");
    }
  }, [authenticated, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    return null; // Redirect will happen from useEffect
  }

  return children;
}
