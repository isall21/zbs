import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Discover Your Beautypreneur DNA",
  description:
    "Kuis singkat 1–2 menit untuk mengenali minat dan potensimu di bidang beauty dan bisnis.",
  applicationName: "Beautypreneur DNA",
};

export const viewport = {
  themeColor: "#2A1233",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={poppins.variable}>{children}</body>
    </html>
  );
}