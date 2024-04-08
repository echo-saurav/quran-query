import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Root from "./root";
import prev_image from "./prev.jpg"


export const metadata = {
  title: "Al Quran",
  description: "Explore Quran in different way",
  image: prev_image
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
      </body>
    </html>
  );
}
