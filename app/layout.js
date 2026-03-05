import './globals.css';

export const metadata = {
    title: 'Mentrix - AI Avatar Personal Branding',
    description: 'Scale your personal brand with our done-for-you AI Avatar. DigiDoppel helps you build your brand, generate leads, and create content effortlessly.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Roboto:wght@300;400;500;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>{children}</body>
        </html>
    );
}
