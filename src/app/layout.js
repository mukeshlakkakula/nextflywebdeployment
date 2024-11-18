import localFont from "next/font/local";
import "./globals.css";
import Head from "next/head";

// Load custom fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// SEO and metadata for better indexing and social sharing
export const metadata = {
  title: "FlyYourTech - Innovative IT Solutions",
  description:
    "Offering custom technology solutions from web and app development to blockchain and AI. Partner with FlyYourTech to elevate your business.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/logo.png" /> {/* Correct path to the favicon */}
        {/* SEO Meta Tags */}
        <meta
          name="description"
          content="Offering custom technology solutions from web and app development to blockchain and AI. Partner with FlyYourTech to elevate your business."
        />
        <meta
          name="keywords"
          content="ecommerce packages, custom solutions, Madhya Pradesh, Fly Your Tech, best tech company, technology solutions"
        />
        {/* Open Graph Meta Tags */}
        <meta
          property="og:title"
          content="FlyYourTech - Innovative IT Solutions"
        />
        <meta
          property="og:description"
          content="Offering custom technology solutions from web and app development to blockchain and AI. Partner with FlyYourTech to elevate your business."
        />
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:url" content="https://flyyourtech.com" />
        <meta property="og:type" content="website" />
        {/* Viewport for responsiveness */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
