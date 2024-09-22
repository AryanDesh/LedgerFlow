'use client'
import { signIn, signOut, useSession} from "next-auth/react"
import {Appbar} from "@repo/ui/Appbar"
export default function Home() {
  const session = useSession();
  return (
    <div className='text-3xl'>
      <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user}></Appbar>
    </div>
  );
}
