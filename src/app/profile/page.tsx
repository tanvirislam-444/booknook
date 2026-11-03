
"use client";

import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { data: session, } = authClient.useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  };

  if (!session?.user) {
    return null;
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

        <div className="rounded-2xl border border-[#E8DCCB] bg-white p-8 shadow-sm">

          {/* Profile Image */}
          <div className="flex flex-col items-center">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name}
                width={100}
                height={100}
                unoptimized
                className="h-24 w-24 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#873E23] text-3xl font-bold text-white">
                {user.name?.charAt(0).toUpperCase()}
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

          {/* User Information */}
          <div className="space-y-5">
            <div>
              <p className="text-sm text-[#806D60]">Full Name</p>
              <p className="mt-1 font-semibold text-[#422B1F]">
                {user.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-[#806D60]">Email Address</p>
              <p className="mt-1 font-semibold text-[#422B1F]">
                {user.email}
              </p>
            </div>
          </div>

          {/* Sign Out */}
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
