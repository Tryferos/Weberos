import type {Metadata} from 'next';
import './globals.css';
import FontFamilies from '@constants/fonts-constant';
import AuthProvider from '@components/wrappers/AuthProvider';

export const metadata: Metadata = {
  title: 'Weberos',
  description: 'Pulled from https://github.com/Tryferos/Weberos',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${FontFamilies.Wotfard} ${FontFamilies.Inter} ${FontFamilies.Cubano} w-[100dvw] h-[100dvh] font-body antialiased`}>
        <AuthProvider>
          <div className="bg-main-bg layout-gradient w-full h-full">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
