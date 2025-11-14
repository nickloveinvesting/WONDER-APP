import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6">About PhiloDuel</h1>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-gray-300 leading-relaxed">
                PhiloDuel is a platform dedicated to fostering intellectual discourse through
                fair, AI-judged philosophical debates. We believe in the power of reasoned
                argument and the pursuit of truth through dialogue.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">How It Works</h2>
              <p className="text-gray-300 leading-relaxed">
                Our platform uses advanced AI technology to objectively evaluate philosophical
                arguments based on logic, evidence, and rhetorical effectiveness. This ensures
                fair judgment and helps participants improve their reasoning skills.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Join the Community</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Whether you're a seasoned philosopher or just curious about big ideas,
                PhiloDuel welcomes you to engage in meaningful debates and connect with
                fellow thinkers.
              </p>
              <Link
                href="/auth/signup"
                className="inline-block px-6 py-3 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition font-medium"
              >
                Get Started
              </Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
