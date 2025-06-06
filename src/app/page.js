"use client"
import Link from "next/link";

export default function Home() {

  return (<>
    <div className="text-secondary text-3xl font-semibold text-center capitalize my-20">
      <div className="flex flex-col gap-y-5">
        <Link href="/login">Login</Link>
        <Link href="/reset-password">Reset password</Link>
        <Link href="/verification-email">verification email </Link>
        <Link href="/verify-email">verify email </Link>
        <Link href="/dashboard">dashboard </Link>
      </div>
    </div>
  </>)
}