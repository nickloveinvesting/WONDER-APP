/**
 * ARGUED Landing Page Template
 * Hero section, value proposition, how it works, CTA
 * Uses ARGUED branding with cream background
 */

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../ui/Button';

export function LandingPageTemplate() {
  return (
    <main className="min-h-screen bg-argued-cream">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex justify-center mb-8">
            <Image
              src="/logo-black.png"
              alt="ARGUED"
              width={200}
              height={64}
              priority
              className="h-16 w-auto"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-argued-navy mb-6 font-sans">
            Where Quality Arguments Matter
          </h1>
          <p className="text-xl md:text-2xl text-argued-black mb-8 max-w-3xl mx-auto font-serif">
            Chess.com for philosophy. Compete with philosophers worldwide. Build your DeLO rating through well-reasoned,
            evidence-backed arguments judged by AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button variant="primary" size="lg">
                Start Debating
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-argued-navy text-center mb-12 font-sans">
            Why ARGUED?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="text-5xl mb-4">⚖️</div>
              <h3 className="text-2xl font-bold text-argued-navy mb-3 font-sans">
                Fair AI Judgment
              </h3>
              <p className="text-argued-black font-serif">
                Gemini AI evaluates arguments based on logic, evidence, and rhetoric.
                No popularity contests. No bias. Just merit.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-argued-navy mb-3 font-sans">
                Measurable Progress
              </h3>
              <p className="text-argued-black font-serif">
                Earn your DeLO rating through consistent performance. Track your logic,
                evidence, and rhetoric scores over time.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold text-argued-navy mb-3 font-sans">
                Competitive Excellence
              </h3>
              <p className="text-argued-black font-serif">
                Climb the global leaderboard. Compete with philosophers from around
                the world. Excellence is competitive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-argued-navy">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12 font-sans">
            How It Works
          </h2>
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="bg-argued-brown text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 font-sans">
                  Choose a Debate
                </h3>
                <p className="text-argued-cream font-serif">
                  Browse open debates on topics ranging from ethics to metaphysics.
                  Take a FOR or AGAINST position.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="bg-argued-brown text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 font-sans">
                  Make Your Argument
                </h3>
                <p className="text-argued-cream font-serif">
                  Craft your best philosophical argument. Back it with evidence.
                  Structure it with logic. Frame it with rhetoric.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="bg-argued-brown text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 font-sans">
                  Get AI Judgment
                </h3>
                <p className="text-argued-cream font-serif">
                  Receive detailed scores for logic (coherence), evidence (citations),
                  and rhetoric (persuasiveness). Learn from feedback.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="bg-argued-brown text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold text-xl">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 font-sans">
                  Build Your Rating
                </h3>
                <p className="text-argued-cream font-serif">
                  Win debates to increase your DeLO rating. Climb the leaderboard.
                  Earn achievements. Become a master debater.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-argued-navy mb-2">500+</p>
              <p className="text-argued-gray">Active Philosophers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-argued-navy mb-2">2,000+</p>
              <p className="text-argued-gray">Debates Judged</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-argued-navy mb-2">50+</p>
              <p className="text-argued-gray">Active Topics</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-argued-navy">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-sans">
            Ready to Argue?
          </h2>
          <p className="text-xl text-argued-cream mb-8 font-serif">
            Join the arena of ideas. Test your reasoning. Build your reputation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button variant="secondary" size="lg">
                Sign Up Free
              </Button>
            </Link>
            <Link href="/debates">
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-argued-navy">
                Explore Debates
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-argued-navy border-t-2 border-argued-brown py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Image
                src="/logo-white.png"
                alt="ARGUED"
                width={140}
                height={45}
                className="h-8 w-auto mb-4"
              />
              <p className="text-argued-cream text-sm font-serif">
                Where quality arguments matter.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-3 font-sans">Product</h4>
              <ul className="space-y-2 text-argued-cream text-sm">
                <li><Link href="/debates">Debates</Link></li>
                <li><Link href="/leaderboard">Leaderboard</Link></li>
                <li><Link href="/about">About</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-3 font-sans">Community</h4>
              <ul className="space-y-2 text-argued-cream text-sm">
                <li><Link href="/community">Forums</Link></li>
                <li><Link href="/schools">Schools of Thought</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-3 font-sans">Legal</h4>
              <ul className="space-y-2 text-argued-cream text-sm">
                <li><Link href="/terms">Terms</Link></li>
                <li><Link href="/privacy">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-argued-brown/30 pt-6 text-center text-argued-cream text-sm">
            © 2025 ARGUED. Where argumentation is a skill.
          </div>
        </div>
      </footer>
    </main>
  );
}
