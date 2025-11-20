import Link from 'next/link';
import Logo from '@/components/Logo';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">


      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">About ARGUED</h1>
        <p className="text-slate-600 text-xl mb-12 font-medium leading-relaxed">
          Where curious minds explore ideas together—from casual questions to deep debates.
        </p>

        <div className="space-y-8">
          <section className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 mb-4">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed">
              ARGUED is a platform dedicated to fostering thoughtful philosophical discourse.
              We believe in the power of genuine dialogue and the pursuit of understanding
              through respectful, curious conversation. No PhD required—just bring your curiosity.
            </p>
          </section>

          <section className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 mb-4">How It Works</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Our platform uses advanced AI technology (Google Gemini) to provide structured
              debate analysis and insights. The AI evaluates philosophical arguments based on
              logic, evidence, and rhetorical effectiveness—helping participants improve their
              reasoning skills while maintaining fair, balanced discussions.
            </p>
            <p className="text-slate-600 leading-relaxed">
              But at its core, ARGUED is about human connection. The AI is just a tool to enhance
              thoughtful conversation, not replace it.
            </p>
          </section>

          <section className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 mb-4">Join the Community</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Whether you're a seasoned philosopher or just curious about big ideas,
              ARGUED welcomes you to engage in meaningful discussions and connect with
              fellow thinkers from around the world.
            </p>
            <Link
              href="/auth/signup"
              className="inline-block px-8 py-3 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-black"
            >
              Get Started
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
