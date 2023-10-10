import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { AppProviders } from "@app/components/app-providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Study react",
  description: "Test desc",
};

export default function RootLayout({ children }) {
  const menuButtonStyle = {
    textTransform: "uppercase",
    borderRadius: 0,
  };
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProviders>
          <nav className="border rounded-sm p-2">
            <ButtonGroup variant="text" aria-label="text button group">
              <Button style={menuButtonStyle}>
                <Link className="mr-2" href="/">
                  Home
                </Link>
              </Button>
              <Button style={menuButtonStyle}>
                <Link href="/students">Students</Link>
              </Button>
            </ButtonGroup>
          </nav>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
