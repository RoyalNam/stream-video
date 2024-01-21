import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import Navbar from '@/components/Navbar';
import { LocalStorageDataProvider } from '@/context/store';
import ScrollToTopButton from '@/components/ScrollToTopButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Stream',
    description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <LocalStorageDataProvider>
                    <div className="">
                        <Navbar />
                        <main className="w-full max-w-8xl mx-auto px-4">{children}</main>
                        <ScrollToTopButton />
                    </div>
                </LocalStorageDataProvider>
            </body>
        </html>
    );
}
