import Image from "next/image";
import { Inter } from "next/font/google";

// Pangea AuthN imports
import { useAuth } from "@pangeacyber/react-auth";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  // load helpful login functions and user auth states from the `useAuth` hook
  const { authenticated, user, login, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authenticated && !loading) {
      // Redirect to /login-success if user is authenticated
      router.push("/login-success");
    }
  }, [user, authenticated, loading])

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#8b5cf6] to-[#a855f7]">
      <h1 className="text-4xl font-bold text-white mb-6">Login with Passkeys 🔑</h1>
      <button
        className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-[#8b5cf6] shadow-sm transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:ring-offset-2 mb-6"
        onClick={login}
      >
        Login
      </button>
      <a
            className="text-xl font-light text-blue-300 underline"
            href="https://pangea.cloud/services/authn/?utm_source=blog&utm_medium=passkeys-nextjs-snippet"
            target="_blank"
            rel="noopener noreferrer"
          >
            Try Pangea AuthN for free today!
      </a>
    </div>
  );
}
