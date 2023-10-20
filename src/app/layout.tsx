import { ReactNode } from 'react';

import { NextIntlClientProvider } from 'next-intl';

import ThemeProvider from '@/components/ThemeProvider';
import '@/styles/globals.css';

import 'antd/dist/reset.css';

type Props = {
  children: ReactNode;
};

// Even though this component is just passing its children through, the presence
// of this file fixes an issue in Next.js 13.4 where link clicks that switch
// the locale would otherwise cause a full reload.
export default function RootLayout({ children }: Props) {
  const locale = 'zh-CN';
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale}>
          <ThemeProvider locale="zh-CN">
            <main>{children}</main>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
