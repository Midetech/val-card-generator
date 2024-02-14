import type { Metadata } from "next";
import { Be_Vietnam_Pro, Inter } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import ThemeSwitcher from "./ThemeSwitcher";

const Be_Vietnam = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Val | Midecodes",
  description: "Happy Valentine's Day!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen mx-auto max-w-6xl flex flex-col bg-white dark:bg-black ">
        <Provider>
          <div className="self-end pt-3 pr-2 lg:pr-0 cursor-pointer">
            <ThemeSwitcher />
          </div>
          <main className="flex flex-col flex-1 max-w-6xl w-full  ">
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
