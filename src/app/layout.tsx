import type { Metadata } from "next";
import { Roboto, Cormorant_Garamond } from "next/font/google";
import "@/styles/globals.css";
import Providers from "./providers";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-roboto",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Weather Hub",
  description: "Weather Hub App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.className} ${cormorant.variable}`}>
      <body>
        <Providers>
          <main className="main-content">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
