import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default async function Home() {
  return (
<div>
      <SignedIn>
        <p>ログイン済み</p>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <p>ログインしてください</p>
      </SignedOut>
    </div>
  )
}