import { Poppins } from "next/font/google";
import Provider from "./provider";
import Head from "./head";

const poppins = Poppins({
  display: "swap",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={poppins.className} suppressHydrationWarning>
      <Head />
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
