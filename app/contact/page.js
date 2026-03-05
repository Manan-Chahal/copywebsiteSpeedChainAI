import Link from 'next/link';

export const metadata = {
    title: 'Contact Us - Mentrix',
    description: 'Get in touch with the Mentrix team.',
};

export default function ContactPage() {
    return (
        <div className="stub-page">
            <h1>Contact Us</h1>
            <p>
                We&apos;d love to hear from you! Reach out to the Mentrix team for questions, support,
                or partnership inquiries.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                📍 5450 McGinnis Village Pl Suite #103, Alpharetta, GA 30005
            </p>
            <Link href="/" className="back-link">← BACK TO HOME</Link>
        </div>
    );
}
