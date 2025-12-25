import "@/app/(landing)/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <body className="antialiased">{children}</body>;
}
