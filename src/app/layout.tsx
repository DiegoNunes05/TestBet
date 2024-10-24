import "./styles/globals.css";
import {ReactNode} from "react";
import { ThemeProvider } from "./ThemeContext";

export const metadata = {
  title: "TestBet",
  description: "Casa de aposta feita pra voce treinar suas estratégias",
};

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
