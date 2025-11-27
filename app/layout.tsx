import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "GM Checkin",
  description: "Daily GM Checkin on Base - Active Farcater",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
