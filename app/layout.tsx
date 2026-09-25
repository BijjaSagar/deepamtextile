import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0d2818",
};

export const metadata: Metadata = {
  title: "Deepam Textile | Premium Towels & Home Textiles Manufacturer | Solapur, India",
  description:
    "Deepam Textile is an Indian manufacturer of luxury bath towels, hotel linen and home textiles for hospitality, retail and private label buyers across South East Asia, Middle East, and Europe.",
  keywords: [
    "Deepam Textile",
    "Solapur towels manufacturer",
    "luxury bath towels export",
    "hotel linen manufacturer India",
    "towels export to South East Asia",
    "towels export to Middle East Dubai",
    "towels export to Europe OEKO-TEX",
    "private label towel manufacturer",
  ],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Deepam Textile | Premium Towels & Home Textiles Manufacturer",
    description:
      "Direct B2B textile manufacturing from Solapur, India for hospitality, retail, and private label buyers across South East Asia, Middle East, and Europe.",
    siteName: "Deepam Textile",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="min-h-screen antialiased bg-[#f9f6f0] text-[#19211c]">
        {children}
      </body>
    </html>
  );
}
