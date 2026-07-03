import type { Metadata } from "next";
import { DarkModeToggle } from "./components/DarkModeToggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "URL Shortener",
  description: "Create short, shareable links with QR codes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'light';
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="bg-white dark:bg-gray-900">
        <div className="absolute top-4 right-4 z-50">
          <DarkModeToggle />
        </div>
        {children}
      </body>
    </html>
  );
}
