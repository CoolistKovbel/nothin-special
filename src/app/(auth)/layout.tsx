

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen w-full bg-[#111] flex flex-col items-center justify-center">
      
      {children}
    </main>
  );
}
