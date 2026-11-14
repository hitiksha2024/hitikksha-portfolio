import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Hitiksha Pandav | Full Stack Developer & Freelance Engineer",
  description:
    "Portfolio of Hitiksha Pandav — Full Stack & MERN Developer building scalable, production-grade web applications. 2+ years experience. Open for full-time roles & freelance projects.",
  keywords: [
    "MERN Stack Developer",
    "Full Stack Developer",
    "React Developer",
    "Node.js Developer",
    "Freelance Web Developer",
    "MVP Development",
    "MongoDB",
    "Software Engineer Portfolio",
  ],
  openGraph: {
    title: "Hitiksha Pandav | Full Stack Developer & Freelance Engineer",
    description: "Building production-grade web applications, scalable APIs & rapid MVPs. 2+ years experience.",
    type: "website",
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;
                // Signal to LocatorJS to stop injecting hooks
                window.__LOCATOR_OPTS__ = { disabled: true };
                
                const originalWarn = console.warn;
                const originalError = console.error;
                const originalLog = console.log;
                
                // Suppress specific noise from extensions and Three.js deprecations
                const suppress = (args) => {
                  const msg = args.map(a => String(a)).join(' ');
                  return /locator|THREE\\.Clock|No valid renderers|React instance.*not supported/.test(msg);
                };
                
                console.warn = function() { 
                  if (suppress(Array.from(arguments))) return;
                  originalWarn.apply(console, arguments);
                };
                console.error = function() { 
                  if (suppress(Array.from(arguments))) return;
                  originalError.apply(console, arguments);
                };
                console.log = function() { 
                  if (suppress(Array.from(arguments))) return;
                  originalLog.apply(console, arguments);
                };
              })();
            `,
          }}
        />
      </head>
      <body className={`${jakarta.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
