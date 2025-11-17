import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Logo from '@/components/Logo';
import DiscussionPreviewCard from '@/components/DiscussionPreviewCard';

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect('/debates');
  }

  return (
    <div className="min-h-screen">
      {/* Header/Navigation - ULTRA COMPACT ~32px total */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-7">
            {/* Logo - Extra Small */}
            <div className="flex items-center">
              <Logo variant="black" size="sm" clickable={true} />
            </div>

            {/* Desktop Navigation Links - Ultra Compact */}
            <nav className="hidden lg:flex items-center space-x-5">
              <Link
                href="#community"
                className="text-[11px] font-bold text-slate-700 hover:text-teal-600 transition-colors"
              >
                Community
              </Link>
              <Link
                href="#how-it-works"
                className="text-[11px] font-bold text-slate-700 hover:text-teal-600 transition-colors"
              >
                How It Works
              </Link>
              <Link
                href="#for-me"
                className="text-[11px] font-bold text-slate-700 hover:text-teal-600 transition-colors"
              >
                Is This For Me?
              </Link>
            </nav>

            {/* Auth Buttons - Ultra Compact */}
            <div className="flex items-center space-x-2">
              <Link
                href="/auth/login"
                className="px-3 py-0.5 text-slate-700 text-[11px] font-bold hover:text-teal-600 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="px-3 py-1 bg-teal-500 text-white text-[11px] font-bold rounded-md hover:bg-teal-600 transition-all shadow-md"
              >
                Join Free
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Reduced spacing */}
      <section className="relative py-8 lg:py-12 bg-gradient-to-b from-stone-50 via-white to-stone-50 overflow-hidden">
        {/* Background Decorative Blurs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-slate-100/30 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column: Content */}
            <div className="text-center lg:text-left">
              {/* Simplified Social Proof Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-teal-50 border border-teal-200 rounded-full mb-8">
                <span className="text-sm font-bold text-slate-700">
                  500+ curious minds • Free to join
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
                Your philosophical<br/>community.<br/>
                <span className="text-teal-600">Curious minds</span><br/>
                <span className="text-teal-600">welcome.</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-slate-600 leading-relaxed mb-10 font-medium">
                Finally, a place where your big questions belong. Think deeply with others who care 
                about ethics, consciousness, AI, and the ideas that matter — <strong className="text-slate-900 font-bold">no PhD required</strong>.
              </p>
              
              <div className="flex flex-col sm:flex-row lg:flex-row items-center lg:items-start justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
                <Link
                  href="/auth/signup"
                  className="px-10 py-4 bg-teal-500 text-white text-lg font-black rounded-xl hover:bg-teal-600 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                >
                  Join the Community
                </Link>
                <Link
                  href="/debates"
                  className="px-10 py-4 border-2 border-slate-300 text-slate-700 text-lg font-black rounded-xl hover:border-teal-500 hover:bg-teal-50 transition-all shadow-lg"
                >
                  Explore Discussions
                </Link>
              </div>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-500 font-bold">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span>No credentials needed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span>Always free</span>
                </div>
              </div>
            </div>

            {/* Right Column: Discussion Preview Cards - FIXED VISIBILITY */}
            <div className="hidden lg:block relative h-[550px] pt-8">
              <div className="relative w-full h-full">
                {/* Card 2 - Background (visible) */}
                <div className="absolute top-12 left-6 right-0 z-10 transform rotate-1 opacity-70">
                  <div className="bg-white rounded-xl p-5 shadow-xl border border-slate-200">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-7 h-7 bg-slate-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        JD
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2 line-clamp-2">
                      New to philosophy: How do I know if my moral beliefs are justified?
                    </h3>
                    <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                      I've been thinking about this a lot lately...
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2 py-1 rounded border font-bold bg-slate-100 text-slate-700 border-slate-300">
                        Ethics
                      </span>
                      <span className="text-slate-500 font-semibold">3 helpful responses</span>
                    </div>
                  </div>
                </div>

                {/* Card 1 - Foreground (fully visible) */}
                <div className="absolute top-0 left-0 right-6 z-20">
                  <DiscussionPreviewCard
                    communityVibe="Welcoming & Thoughtful"
                    avatars={[
                      { initials: "96", role: "expert" },
                      { initials: "ME", role: "member" },
                      { initials: "EK", role: "member" }
                    ]}
                    exploringCount={7}
                    title="Should AI systems be allowed to make medical decisions?"
                    description="Thoughtful discussion exploring autonomy, trust, and the nature of expertise..."
                    topicTag="AI Ethics"
                    topicColor="teal"
                    activityLevel="Active Now"
                    contributionCount={12}
                  />
                </div>

                {/* Floating Activity Indicator */}
                <div className="absolute bottom-8 right-0 bg-white rounded-xl shadow-2xl p-4 border-l-4 border-teal-500 z-30 w-56">
                  <p className="text-sm font-bold text-slate-700 mb-1">
                    2,300+ discussions this month
                  </p>
                  <Link
                    href="/debates"
                    className="text-sm font-bold text-teal-600 hover:text-teal-700 inline-flex items-center"
                  >
                    Join them →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section id="community" className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-gradient-to-br from-stone-50 to-white rounded-2xl p-8 border-2 border-slate-200 shadow-lg">
              <div className="text-5xl font-black text-teal-600 mb-2">2,847</div>
              <div className="text-slate-600 font-bold text-sm">Active Discussions</div>
            </div>
            <div className="bg-gradient-to-br from-stone-50 to-white rounded-2xl p-8 border-2 border-slate-200 shadow-lg">
              <div className="text-5xl font-black text-slate-900 mb-2">500+</div>
              <div className="text-slate-600 font-bold text-sm">Community Members</div>
            </div>
            <div className="bg-gradient-to-br from-stone-50 to-white rounded-2xl p-8 border-2 border-slate-200 shadow-lg">
              <div className="text-5xl font-black text-teal-600 mb-2">95%</div>
              <div className="text-slate-600 font-bold text-sm">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 lg:py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-3xl p-12 shadow-2xl aspect-square flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">💭</div>
                  <div className="text-white text-2xl font-bold">Discussion Preview</div>
                  <div className="text-slate-300 text-sm mt-2">Coming Soon</div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                How ARGUED works
              </h2>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed font-medium">
                Philosophy shouldn't feel intimidating. We've built a space where thinking deeply 
                is natural and accessible.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-teal-500 text-white rounded-xl flex items-center justify-center text-xl font-black shadow-lg">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">Choose your topic</h3>
                    <p className="text-slate-600 leading-relaxed font-medium">
                      Browse discussions on ethics, AI, consciousness, or start your own. 
                      Every topic welcomes beginners.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-slate-700 text-white rounded-xl flex items-center justify-center text-xl font-black shadow-lg">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">Share your perspective</h3>
                    <p className="text-slate-600 leading-relaxed font-medium">
                      Write as little or as much as you want. Quick takes and deep dives are both welcome.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-teal-500 text-white rounded-xl flex items-center justify-center text-xl font-black shadow-lg">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">Learn from others</h3>
                    <p className="text-slate-600 leading-relaxed font-medium">
                      Get thoughtful responses from people who actually care. No toxicity, just genuine dialogue.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Format Cards */}
      <section id="for-me" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              Three ways to engage
            </h2>
            <p className="text-xl text-slate-600 font-medium">
              Pick the format that matches your mood and energy
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quick Takes */}
            <div className="group bg-gradient-to-br from-stone-50 to-white rounded-2xl p-8 border-2 border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-t-teal-500">
              <div className="text-5xl mb-6">⚡</div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Quick Takes</h3>
              <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                Short, focused questions perfect for lunch breaks. Think shower thoughts, 
                but with actual philosophers responding.
              </p>
              <div className="text-sm text-slate-500 font-bold">
                ~5 minute discussions
              </div>
            </div>
            
            {/* Deep Dives */}
            <div className="group bg-gradient-to-br from-stone-50 to-white rounded-2xl p-8 border-2 border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-t-slate-700">
              <div className="text-5xl mb-6">🔍</div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Deep Dives</h3>
              <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                Extended explorations where complexity is welcomed. Bring your nuanced takes 
                and evolving thoughts.
              </p>
              <div className="text-sm text-slate-500 font-bold">
                ~20+ minute discussions
              </div>
            </div>
            
            {/* Formal Duels */}
            <div className="group bg-gradient-to-br from-stone-50 to-white rounded-2xl p-8 border-2 border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-t-teal-500">
              <div className="text-5xl mb-6">⚔️</div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Formal Duels</h3>
              <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                Structured debates with AI-powered judging. Test your logic against others 
                and earn reputation points.
              </p>
              <div className="text-sm text-slate-500 font-bold">
                Competitive & rated
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Challenge */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative">
          <div className="inline-block px-4 py-2 bg-teal-500/20 border border-teal-400/30 rounded-full mb-6">
            <span className="text-teal-300 text-sm font-bold">Daily Challenge</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
            Today's philosophical question
          </h2>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-10 border border-white/20 mb-10">
            <p className="text-2xl text-white leading-relaxed font-medium italic">
              "If you could know the exact date of your death, would you want to know? 
              And would that knowledge change how you live?"
            </p>
          </div>
          
          <p className="text-xl text-slate-300 mb-8 font-medium">
            Join ARGUED to get thought-provoking questions like this delivered daily
          </p>
          
          <Link
            href="/auth/signup"
            className="inline-block px-10 py-4 bg-teal-500 text-white text-lg font-black rounded-xl hover:bg-teal-600 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Start Getting Challenges
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 lg:py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              What the community is saying
            </h2>
            <p className="text-xl text-slate-600 font-medium">
              Real people finding their philosophical home
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="text-slate-700 leading-relaxed mb-6 text-lg font-medium">
                "I didn't think I was 'smart enough' for philosophy. ARGUED changed that. 
                People here actually want to help you think better."
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white font-black text-sm shadow-lg">
                  SC
                </div>
                <div>
                  <div className="font-black text-slate-900">Sarah Chen</div>
                  <div className="text-sm text-slate-500 font-semibold">Software Engineer</div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="text-slate-700 leading-relaxed mb-6 text-lg font-medium">
                "Finally found people who actually think about these things. It's like discovering 
                a secret community hiding in plain sight."
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center text-white font-black text-sm shadow-lg">
                  MP
                </div>
                <div>
                  <div className="font-black text-slate-900">Marcus Patel</div>
                  <div className="text-sm text-slate-500 font-semibold">Graduate Student</div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-slate-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="text-slate-700 leading-relaxed mb-6 text-lg font-medium">
                "The AI ethics discussions here are the most practical and rigorous I've found online. 
                Better than academic papers because people actually engage."
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full flex items-center justify-center text-white font-black text-sm shadow-lg">
                  EK
                </div>
                <div>
                  <div className="font-black text-slate-900">Elena Kowalski</div>
                  <div className="text-sm text-slate-500 font-semibold">ML Engineer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight mb-8 tracking-tight">
            Your philosophical community<br/>is waiting
          </h2>
          <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed mb-12 font-medium">
            Join 500+ curious minds exploring ethics, consciousness, AI, and the questions that matter. 
            <strong className="text-white font-bold"> Free to join, welcoming to beginners, valuable for everyone.</strong>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-10">
            <Link
              href="/auth/signup"
              className="px-14 py-5 bg-teal-500 text-white text-xl font-black rounded-xl hover:bg-teal-600 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Join ARGUED Free
            </Link>
            <Link
              href="/debates"
              className="px-14 py-5 border-2 border-slate-400 text-white text-xl font-black rounded-xl hover:bg-white/10 transition-all shadow-lg"
            >
              Explore Discussions
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400 font-bold">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-teal-500/20 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <span>No credit card</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-teal-500/20 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <span>No credentials needed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-teal-500/20 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <span>Always free</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <Logo variant="white" size="sm" clickable={false} />
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4 max-w-sm font-medium">
                Your welcoming community for serious philosophical inquiry. 
                Where curious minds think deeply together.
              </p>
              <p className="text-slate-500 text-xs font-bold">
                No PhD required. Just bring your curiosity.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-black mb-4 text-sm">Explore</h4>
              <ul className="space-y-2 text-slate-400 text-sm font-medium">
                <li>
                  <Link href="/debates" className="hover:text-teal-400 transition-colors">
                    Active Discussions
                  </Link>
                </li>
                <li>
                  <Link href="/debates" className="hover:text-teal-400 transition-colors">
                    Topic Communities
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="hover:text-teal-400 transition-colors">
                    How It Works
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-black mb-4 text-sm">Community</h4>
              <ul className="space-y-2 text-slate-400 text-sm font-medium">
                <li>
                  <Link href="/debates" className="hover:text-teal-400 transition-colors">
                    Guidelines
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signup" className="hover:text-teal-400 transition-colors">
                    Getting Started
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-teal-400 transition-colors">
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row items-center justify-between text-sm">
            <p className="text-slate-400 font-medium">© 2025 ARGUED. Made with care for curious minds.</p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0 text-slate-400 font-medium">
              <Link href="#" className="hover:text-teal-400 transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-teal-400 transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
