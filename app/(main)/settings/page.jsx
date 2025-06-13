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
      const { data, error } = await supabase.auth.getUser();
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
      window.location.href = "/";
    } else {
      toast.error("Error signing out");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>

      {user ? (
        <div className="flex items-center gap-4">
          <Image
            src={user.user_metadata.avatar_url || "/default-profile.png"}
            alt="Profile"
            width={64}
            height={64}
            className="rounded-full"
          />
          <div>
            <h3 className="text-lg font-semibold">{user.user_metadata.full_name}</h3>
            <p className="text-gray-500">{user.email}</p>
            <Button variant="destructive" className="mt-4" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
}
