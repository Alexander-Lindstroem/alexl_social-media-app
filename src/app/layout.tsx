import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryClientProvider } from "@/providers/query-client-provider";
import { Toaster } from "sonner";
import { UserProvider } from "@/providers/user-context-provider";
import { createClient } from "@/utils/supabase/server-client";
import { PopupContextProvider } from "@/providers/popup-context-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        <PopupContextProvider>
          <UserProvider user={user}>
            <QueryClientProvider>{children}</QueryClientProvider>
          </UserProvider>
        </PopupContextProvider>
      </body>
    </html>
  );
}
