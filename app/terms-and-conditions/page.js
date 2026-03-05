import Link from 'next/link';

export const metadata = {
    title: 'Terms and Conditions - Mentrix',
    description: 'Terms and Conditions for Mentrix services.',
};

export default function TermsPage() {
    return (
        <div className="stub-page">
            <h1>Terms and Conditions</h1>
            <p>
                This page outlines the terms and conditions governing the use of Mentrix services.
                Please review these terms carefully before using our services.
            </p>
            <Link href="/" className="back-link">← BACK TO HOME</Link>
        </div>
    );
}
