"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/services/supabaseClient";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";

export default function SettingsPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
    };
    getUser();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      toast.success("Signed out successfully!");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } else {
      toast.error("Error signing out");
    }
  };

  return (
  <div className="max-w-4xl mx-auto mt-10 p-6 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-md border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-8">
    
    {/* Image on Top (mobile) or Right (desktop) */}
    <div className="w-full md:w-auto flex justify-center">
      <Image
        src="/login.png"
        alt="Profile illustration"
        width={220}
        height={220}
        className="rounded-xl shadow-lg"
      />
    </div>

    {/* User Info */}
    <div className="w-full md:flex-1">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center md:text-left tracking-tight">
        Your Profile
      </h2>

      {user ? (
        <div className="flex flex-col sm:flex-row sm:justify-between items-center sm:items-start gap-6">
          {/* Avatar & Details */}
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Image
                src={user.user_metadata.avatar_url || "/default-profile.png"}
                alt="Profile"
                width={72}
                height={72}
                className="rounded-full border-4 border-white shadow-md transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {user.user_metadata.full_name}
              </h3>
              <p className="text-sm text-gray-500 break-all">{user.email}</p>
            </div>
          </div>

          {/* Button aligned right */}
          <div className="w-full sm:w-auto sm:self-end sm:ml-auto">
            <Button
              variant="destructive"
              className="mt-4 sm:mt-0 hover:scale-105 transition-transform"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        </div>

      ) : (
        <p className="text-gray-600 text-center animate-pulse">Loading user info...</p>
      )}
    </div>
  </div>
);

}
