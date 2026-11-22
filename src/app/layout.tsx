import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#101113",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://mensah.dev-joseph.me"),
  title: {
    default: "Joseph Mensah — Software Engineer & Digital Product Builder",
    template: "%s | Joseph Mensah",
  },
  description:
    "Software engineer based in Accra, Ghana building thoughtful digital products, scalable full-stack systems, mobile applications and experiences that solve real-world problems.",
  keywords: [
    "Joseph Mensah",
    "Software Engineer",
    "Full-Stack Developer",
    "Mobile Developer",
    "Flutter",
    "NestJS",
    "Next.js",
    "React",
    "TypeScript",
    "Accra Ghana Developer",
  ],
  authors: [{ name: "Joseph Mensah", url: "https://mensah.dev-joseph.me" }],
  creator: "Joseph Mensah",
  publisher: "Joseph Mensah",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mensah.dev-joseph.me",
    title: "Joseph Mensah — Software Engineer & Digital Product Builder",
    description:
      "Software engineer based in Accra, Ghana building thoughtful digital products, scalable full-stack systems and mobile architectures.",
    siteName: "Joseph Mensah Portfolio",
    images: [
      {
        url: "/preview.jpg",
        width: 1200,
        height: 630,
        alt: "Joseph Mensah Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joseph Mensah — Software Engineer & Digital Product Builder",
    description:
      "Software engineer based in Accra, Ghana building thoughtful digital products, scalable systems and mobile architectures.",
    images: ["/preview.jpg"],
    creator: "@lord_joeh",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  verification: {
    google: "wBdnyt18DhoUrTj7N2VJj6SPopjCalWxsoTAhi0aqBw",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Joseph Mensah",
              jobTitle: "Software Engineer & Full-Stack Developer",
              url: "https://mensah.dev-joseph.me",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Accra",
                addressCountry: "Ghana",
              },
              sameAs: [
                "https://github.com/lord-joeh",
                "https://www.linkedin.com/in/josephtettehmensah",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-canvas text-content-primary antialiased selection:bg-lime/20 selection:text-lime">
        {children}
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
