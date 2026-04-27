import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Hitiksha Pandav | MERN Stack Developer",
  description:
    "Portfolio of Hitiksha Pandav — MERN Stack Developer building scalable, real-world web applications with clean UI and smooth UX. 1.5+ years experience.",
  keywords: ["MERN Stack", "React", "Node.js", "MongoDB", "Developer", "Portfolio"],
  openGraph: {
    title: "Hitiksha Pandav | MERN Stack Developer",
    description: "Building scalable web applications with modern tech stacks.",
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
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
