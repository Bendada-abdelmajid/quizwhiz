import type { Metadata } from "next";
import { Open_Sans, Luckiest_Guy } from "next/font/google";
import "./globals.css";

const inter = Open_Sans({ subsets: ["latin"] });
const merienda = Luckiest_Guy({
  subsets: ["latin"], variable: "--Merienda",
  weight: "400"
});

export const metadata: Metadata = {
  title: "QuizWizdom - Test Your Knowledge",
  description: "Challenge yourself with our quiz app, featuring various categories and questions to test your general knowledge.",
  keywords: "quiz, trivia, general knowledge, test, fun, learning",
  authors:[{name:"abdrlmajid bendada", url:"https://bendadaabdelmajid.netlify.app"}],
  openGraph: {
    title: "QuizWizdom - Test Your Knowledge",
    description: "Challenge yourself with our quiz app, featuring various categories and questions to test your general knowledge.",
    url: "https://quizwizdom.vercel.app/",
    siteName: "Quiz App",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@YourTwitterHandle",
    title: "QuizWizdom - Test Your Knowledge",
    description: "Challenge yourself with our quiz app, featuring various categories and questions to test your general knowledge.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className={inter.className + " " + merienda.variable}>{children}</body>
    </html>
  );
}
