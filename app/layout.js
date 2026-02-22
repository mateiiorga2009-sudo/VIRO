import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "VIRO | IA para creadores de contenido",
  description:
    "Genera titulos ultra-CTR, prompts de miniaturas, intros y calendarios de ideas con IA.",
  metadataBase: new URL("https://viro.vercel.app"),
  openGraph: {
    title: "VIRO | IA para creadores de contenido",
    description:
      "Genera titulos ultra-CTR, prompts de miniaturas, intros y calendarios de ideas con IA.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-viro-bg text-white`}
      >
        {children}
      </body>
    </html>
  );
}
