// Pangea AuthN imports
import { useAuth } from "@pangeacyber/react-auth";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const { authenticated, user, logout, loading, getToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authenticated && !loading) {
      // Redirect to / if user is NOT authenticated
      router.push("/");
    }
  }, [user, authenticated, loading])

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center bg-gradient-to-br from-[#7e22ce] to-[#a855f7]">
      <div className="rounded-lg bg-white p-8 shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <div className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-500">hi {user?.email}</div>
          <button
        className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-[#8b5cf6] shadow-sm transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:ring-offset-2 mb-6" onClick={logout}>
            Sign Out
            </button>
        </div>

        <div className="flex items-center justify-start g">
          {/* Fun lil GIF */}
          <div className="flex flex-col"><iframe src="https://giphy.com/embed/IwAZ6dvvvaTtdI8SD5" width="480" height="400" frameBorder="0" className="h-3/4 w-3/4" allowFullScreen></iframe><p className="text-xs"><a href="https://giphy.com/gifs/theoffice-the-office-tv-michaels-birthday-IwAZ6dvvvaTtdI8SD5">via GIPHY</a></p></div>

          {/* Access user's information through user variable */}
          <p className="flex-none text-[#8b5cf6]">User Name: {user?.profile.first_name} {user?.profile.last_name}</p> 
        </div>
      </div>
      <div className="space-y-4 mt-6">
          <div className="flex items-center space-x-4">
          <a
            className="text-xl font-light text-blue-300 underline"
            href="https://pangea.cloud/services/authn/?utm_source=blog&utm_medium=passkeys-nextjs-snippet"
            target="_blank"
            rel="noopener noreferrer"
          >
            Try Pangea AuthN for free today!
          </a>
          </div>
      </div>
    </div>
  );
}
