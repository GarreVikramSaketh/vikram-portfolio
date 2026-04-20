import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vikram Saketh Garre | Full Stack & ML Engineer",
  description: "Computer Science undergraduate at SRM IST. Full stack developer with expertise in ML, cloud, and scalable systems.",
  keywords: ["Vikram Saketh Garre", "Full Stack Developer", "Machine Learning", "AWS", "React", "Node.js"],
  openGraph: {
    title: "Vikram Saketh Garre | Full Stack & ML Engineer",
    description: "CS undergrad building real-world AI and full stack applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
