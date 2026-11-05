
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

interface Borrow {
  _id: string;
  bookId: string;
  status?: string;
}

interface Book {
  _id: string;
  title: string;
}

const ProfilePage = () => {const { data: session} = authClient.useSession();
  const router = useRouter();

  const [myBooksCount, setMyBooksCount] = useState(0);
  const [myBorrowCount, setMyBorrowCount] = useState(0);
 

  useEffect(() => {
    const fetchProfileCounts = async () => {
      if (!session?.user?.email) return;

      try {
        const email = encodeURIComponent(session.user.email);
        const token = await getTokenFromClient();
        const [myBooksRes, myBorrowsRes] = await Promise.all([ fetch(`http://localhost:8000/my-books?email=${email}`, {
            cache: "no-store",
              headers: {
      Authorization: `Bearer ${token}`,
    },
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/borrows?email=${email}`, {
            cache: "no-store",
              headers: {
      Authorization: `Bearer ${token}`,
    },
          }),
        ]);

        const myBooks: Book[] = await myBooksRes.json();
        const myBorrows: Borrow[] = await myBorrowsRes.json();

        setMyBooksCount(myBooks.length);
        const activeBorrows = myBorrows.filter(
          (book) => book.status !== "returned"
        );

        setMyBorrowCount(activeBorrows.length);
      } catch (error) {
        console.error("Profile count error:", error);
      }
    };

    fetchProfileCounts();
  }, [session?.user?.email]);

  // Sign Out
  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  };

  if (!session?.user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF5EC]">
        <div className="text-center">
          <h2 className="text-xl font-bold text-[#422B1F]">
            Please Login First
          </h2>

          <Link
            href="/login"
            className="mt-4 inline-block rounded-lg bg-[#873E23] px-6 py-3 font-semibold text-white hover:bg-[#A65B3D]"
          >
            Go to Login
          </Link>
        </div>
      </main>
    );
  }

  const user = session.user;

  return (
    <main className="min-h-screen bg-[#FAF5EC] px-5 py-16">
      <div className="mx-auto max-w-3xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#422B1F]">
            My Profile
          </h1>

          <p className="mt-2 text-[#806D60]">
            Manage your BookNook account.
          </p>
        </div>

        <div className="rounded-2xl border border-[#E8DCCB] bg-[#FFFDF8] p-6 shadow-sm sm:p-8">

      
          <div className="flex flex-col items-center">

      
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "User profile"}
                width={100}
                height={100}
                unoptimized
                className="h-24 w-24 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#873E23] text-3xl font-bold text-white">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}

            <h2 className="mt-4 text-2xl font-bold text-[#422B1F]">
              {user.name}
            </h2>

            <p className="mt-1 text-sm text-[#806D60]">
              {user.email}
            </p>

          </div>

<div className="my-8 border-t border-[#E8DCCB]" />

<div className="space-y-4">
  {/* Full Name */}
  <div className="group flex items-center gap-4 rounded-2xl border border-[#E8DCCB] bg-[#FAF5EC] p-4 transition-all duration-300 hover:border-[#B97852]/50 hover:shadow-sm">
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E8DCCB]/60 text-[#873E23]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="23"
        height="23"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    </div>

    <div className="min-w-0 flex-1">
      <p className="text-xs font-medium uppercase tracking-wider text-[#806D60]">
        Full Name
      </p>
      <p className="mt-1 truncate text-base font-semibold text-[#422B1F]">
        {user.name || "Not provided"}
      </p>
    </div>
  </div>

  {/* Email Address */}
  <div className="group flex items-center gap-4 rounded-2xl border border-[#E8DCCB] bg-[#FAF5EC] p-4 transition-all duration-300 hover:border-[#B97852]/50 hover:shadow-sm">
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E8DCCB]/60 text-[#873E23]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="23"
        height="23"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    </div>

    <div className="min-w-0 flex-1">
      <p className="text-xs font-medium uppercase tracking-wider text-[#806D60]">
        Email Address
      </p>
      <p className="mt-1 truncate text-base font-semibold text-[#422B1F]">
        {user.email || "Not provided"}
      </p>
    </div>
  </div>
</div>

          <div className="my-8 border-t border-[#E8DCCB] pt-8">

            <div className="mb-6">
              <h3 className="text-xl font-bold text-[#422B1F]">
                My Library
              </h3>

              <p className="mt-1 text-sm text-[#806D60]">
                Manage your books and borrowing activities.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              <Link
                href="/my-borrows"
                className="group rounded-2xl border border-[#E8DCCB] bg-[#FAF5EC] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#B97852] hover:shadow-lg"
              >
                <div className="flex items-center justify-between">

                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#F0E3D5] text-3xl transition group-hover:bg-[#E8D2BF]">
                    📚
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-[#806D60]">
                      Total Borrowed
                    </p>

                    <h2 className="mt-1 text-3xl font-bold text-[#B97852]">
                      { myBorrowCount}
                    </h2>
                  </div>

                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#B97852]">
                    View Borrowed Books
                  </span>

                  <span className="text-lg text-[#B97852] transition group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
              <Link
                href="/my-books"
                className="group rounded-2xl border border-[#E8DCCB] bg-[#FAF5EC] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#B97852] hover:shadow-lg"
              >
                <div className="flex items-center justify-between">

                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#F0E3D5] text-3xl transition group-hover:bg-[#E8D2BF]">
                    📖
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-[#806D60]">
                      Total Added Books
                    </p>

                    <h2 className="mt-1 text-3xl font-bold text-[#B97852]">
                      {myBooksCount}
                    </h2>
                  </div>

                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#B97852]">
                    View My Books
                  </span>

                  <span className="text-lg text-[#B97852] transition group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>

            </div>
          </div>

          <div className="mt-8 border-t border-[#E8DCCB] pt-6">
            <button
              onClick={handleSignOut}
              className="w-full rounded-lg bg-[#873E23] px-5 py-3 font-semibold text-white transition hover:bg-[#A65B3D]"
            >
              Sign Out
            </button>
          </div>

        </div>
      </div>
    </main>
  );
};

export default ProfilePage;


