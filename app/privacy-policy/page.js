import Link from 'next/link';

export const metadata = {
    title: 'Privacy Policy - Mentrix',
    description: 'Privacy Policy for Mentrix services.',
};

export default function PrivacyPage() {
    return (
        <div className="stub-page">
            <h1>Privacy Policy</h1>
            <p>
                This page describes how Mentrix collects, uses, and protects your personal information.
                Your privacy is important to us.
            </p>
            <Link href="/" className="back-link">← BACK TO HOME</Link>
        </div>
    );
}
