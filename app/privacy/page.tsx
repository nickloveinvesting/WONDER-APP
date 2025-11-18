import Link from 'next/link';
import Logo from '@/components/Logo';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-1.5">
          <div className="flex items-center justify-between">
            <Logo variant="black" size="sm" clickable={true} />
            <Link
              href="/"
              className="text-sm font-bold text-slate-700 hover:text-teal-600 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Privacy Policy</h1>
        <p className="text-slate-600 text-lg mb-12 font-medium">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="prose prose-slate max-w-none space-y-8">
          <section className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 mb-4">Information We Collect</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              When you create an account on Ponder, we collect:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              <li>Email address (for authentication)</li>
              <li>Username (public display name)</li>
              <li>Profile information you choose to share</li>
              <li>Your posts, comments, and debate contributions</li>
              <li>Usage data to improve our service</li>
            </ul>
          </section>

          <section className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 mb-4">How We Use Your Information</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              We use your information to:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              <li>Provide and maintain our philosophical discussion platform</li>
              <li>Authenticate your account and ensure security</li>
              <li>Display your contributions to the community</li>
              <li>Send you important updates about your account</li>
              <li>Improve our services and user experience</li>
            </ul>
          </section>

          <section className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 mb-4">Data Security</h2>
            <p className="text-slate-600 leading-relaxed">
              We use Supabase for secure authentication and data storage. Your password is encrypted,
              and we never store it in plain text. We implement industry-standard security measures
              to protect your personal information.
            </p>
          </section>

          <section className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 mb-4">Your Rights</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              <li>Access your personal data</li>
              <li>Update or correct your information</li>
              <li>Delete your account and associated data</li>
              <li>Export your contributions</li>
              <li>Opt-out of non-essential communications</li>
            </ul>
          </section>

          <section className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 mb-4">Contact Us</h2>
            <p className="text-slate-600 leading-relaxed">
              If you have questions about this privacy policy or your data, please contact us
              through the feedback feature in your account settings.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
