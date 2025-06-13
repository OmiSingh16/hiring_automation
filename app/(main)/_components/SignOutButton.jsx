"use client"
import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"
import { supabase } from "@/services/supabaseClient"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

export default function SignOutButton() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [open, setOpen] = useState(false)

  // Get the logged-in user
  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (data?.user) {
        setUser(data.user)
      }
    }
    getUser()
  }, [])

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      router.push("/auth")
    } else {
      console.error("Sign out error:", error.message)
    }
  }

  return (
    <>
      <div className="mb-2 flex flex-col items-start">
        {user && (
          <div className="mb-3 text-left text-sm text-gray-600 w-full px-2">
            <p className="font-medium text-gray-800 flex items-center gap-2">
              <User className="w-4 h-4" />
              {user.user_metadata?.name || user.email}
            </p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
        )}
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={() => setOpen(true)}
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>

      {/* Sign Out Confirmation Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Are you sure you want to sign out?</DialogTitle>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleSignOut}>Yes, Sign Out</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
