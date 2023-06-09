import { Layout } from "@/components/Layout";
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Layout>{children}</Layout>;
      </body>
    </html>
  );
}
