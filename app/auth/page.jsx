"use client";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`, // send user back here
      },
    });

    if (error) {
      console.log("Error:", error.message);
    }
  };

  useEffect(() => {
    // Check if the user is already logged in (after redirect)
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (data?.user) {
        // ✅ If logged in, redirect to dashboard
        router.push("/dashboard");
      }
    };

    checkUser();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center border rounded-2xl p-8 bg-white">
        <Image
          src="/logo.png"
          alt="Logo"
          width={400}
          height={60}
          priority
          className="w-[180px]"
        />
        <div className="flex items-center flex-col">
          <Image
            src={"/login.png"}
            alt="logo"
            width={600}
            height={400}
            className="w-[400px] h-[250px] rounded-2xl"
          />
          <h2 className="text-2xl font-bold text-center mt-5">
            Welcome to Ai-Recruiter
          </h2>
          <p className="text-gray-500 text-center">Sign In With Google</p>
          <Button className="mt-7 w-full" onClick={signInWithGoogle}>
            Login With Google
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
