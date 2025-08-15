import type {Metadata} from 'next';
import './globals.css';
import FontFamilies from '@constants/fonts';
import AuthProvider from '@components/wrappers/AuthProvider';
import Elements from '@constants/elements';
import {WeberosPopupListener} from '@components/popups/PopupListener';
import WeberosPopupElement from '@components/popups/WeberosPopupElement';

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
        className={`${FontFamilies.Wotfard} ${FontFamilies.Inter} ${FontFamilies.Cubano} w-[100dvw] relative h-[100dvh] font-body antialiased`}>
        <AuthProvider>
          <div
            id={Elements.PageLayoutWrapperId}
            className="bg-main-bg layout-gradient w-full h-full">
            {children}
          </div>
        </AuthProvider>
        <WeberosPopupElement />
        <WeberosPopupListener />
      </body>
    </html>
  );
}
