import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/providers/CartProvider";

export const metadata: Metadata = {
  title: "Yodha Fitness Zone — Gym & Supplements Store",
  description:
    "Yodha Fitness Zone — unisex gym in Charilam, Tripura. Weight training, cardio, transformation programs, diet guidance and personal training, plus sports supplements delivered across India.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts: Manrope (headings) + Inter (body) + JetBrains Mono (prices) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@400;500;600&family=Manrope:wght@500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {/* Material Symbols Outlined */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface font-body text-body-md text-on-surface antialiased">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
