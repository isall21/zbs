import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}