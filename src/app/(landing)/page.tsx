import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#000] text-white">

        <nav>
          <Link href="/login">Login</Link>
          <Link href="/register">register</Link>
        </nav>

    </main>
  );
}
