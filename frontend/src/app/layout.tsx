import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { ToastProvider } from "@/components/Toast";
import { ThemeProvider } from "@/lib/theme-context";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://knowledgecontinuity.io"),
  title: "Knowledge Continuity | Enterprise Project Handover Platform",
  description:
    "Evidence-linked project knowledge handover platform. Reconstruct architectural decisions, operational risks, and critical dependencies with exact source citations.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  openGraph: {
    title: "Knowledge Continuity",
    description: "Evidence-linked project knowledge handover platform for engineering teams.",
    url: "https://knowledgecontinuity.io",
    siteName: "Knowledge Continuity",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body className="antialiased overflow-x-hidden transition-colors duration-300">
        <ThemeProvider>
          <ToastProvider>
            <AuthProvider>{children}</AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
