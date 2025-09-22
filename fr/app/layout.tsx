import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import '@smastrom/react-rating/style.css'
import Script from 'next/script';
import { Providers } from './providers';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

export const metadata: Metadata = {
    title: 'DoneEZ',
    description:
        'DoneEZ is a user-friendly platform designed to connect you with reliable and highly-rated service professionals in your area. With DoneEZ, you can effortlessly schedule appointments with trusted experts and enjoy peace of mind knowing that your needs will be taken care of efficiently and effectively. Whether you need a plumber, electrician, or any other service provider, DoneEZ simplifies the process of finding and booking skilled professionals, giving you more time to focus on what matters most. On the other hand, DoneEZ is a platform where service professionals can promote and sell their services. By joining our network, professionals can receive qualified leads that may result in instant bookings or quote requests from potential customers.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></link>
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Providers>
                    {children}
                    <Script
                        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
                        strategy="afterInteractive"
                    />
                </Providers>
            </body>
        </html>
    );
}
