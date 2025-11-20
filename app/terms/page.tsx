import Link from 'next/link';
import Logo from '@/components/Logo';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">


      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Terms of Service</h1>
        <p className="text-slate-600 text-lg mb-12 font-medium">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="prose prose-slate max-w-none space-y-8">
          <section className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 mb-4">Acceptance of Terms</h2>
            <p className="text-slate-600 leading-relaxed">
              By accessing and using WONDER, you accept and agree to be bound by these Terms of Service.
              If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 mb-4">Community Guidelines</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              WONDER is a community for thoughtful philosophical discussion. We expect all users to:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              <li>Engage respectfully with other community members</li>
              <li>Argue in good faith and seek genuine understanding</li>
              <li>Avoid personal attacks, harassment, or discrimination</li>
              <li>Not spam or post off-topic content</li>
              <li>Respect intellectual property and cite sources appropriately</li>
              <li>Not impersonate others or create multiple accounts</li>
            </ul>
          </section>

          <section className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 mb-4">Content Ownership</h2>
            <p className="text-slate-600 leading-relaxed">
              You retain ownership of the content you post on WONDER. By posting, you grant us
              a non-exclusive license to display, distribute, and store your content as part
              of our service. You are responsible for the content you post and must have the
              right to share it.
            </p>
          </section>

          <section className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 mb-4">AI-Powered Features</h2>
            <p className="text-slate-600 leading-relaxed">
              WONDER uses AI (Google Gemini) to provide structured debate analysis and insights.
              While we strive for accuracy, AI-generated content should be considered as one
              perspective among many, not absolute truth.
            </p>
          </section>

          <section className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 mb-4">Account Termination</h2>
            <p className="text-slate-600 leading-relaxed">
              We reserve the right to suspend or terminate accounts that violate these terms
              or our community guidelines. You may also delete your account at any time through
              your settings.
            </p>
          </section>

          <section className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 mb-4">Disclaimer</h2>
            <p className="text-slate-600 leading-relaxed">
              WONDER is provided "as is" without warranties of any kind. We are not responsible
              for the accuracy, reliability, or quality of user-generated content. The views
              expressed by users are their own and do not represent the views of WONDER.
            </p>
          </section>

          <section className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 mb-4">Changes to Terms</h2>
            <p className="text-slate-600 leading-relaxed">
              We may update these terms from time to time. Continued use of WONDER after changes
              constitutes acceptance of the updated terms.
            </p>
          </section>

          <section className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 mb-4">Contact</h2>
            <p className="text-slate-600 leading-relaxed">
              Questions about these terms? Contact us through the feedback feature in your
              account settings.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
