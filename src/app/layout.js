import "./globals.css";
import { Analytics } from '@vercel/analytics/react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Root from "./root";


export const metadata = {
  title: "Al Quran",
  description: "Explore Quran in different way",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <Root>
            {children}
          </Root>
        </AntdRegistry>
        <Analytics />
      </body>
    </html>
  );
}
