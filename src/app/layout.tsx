import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
   title: "Todo App",
   description: "Aneeq's Todo App",
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en">
         <body
            className={`flex justify-center items-center min-h-screen ${inter.className}`}
         >
            {children}
         </body>
      </html>
   );
}
