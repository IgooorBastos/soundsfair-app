import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "About soundsfair - Our Mission & Vision",
  description: "Learn about soundsfair's mission to educate people about Bitcoin, fair money, and economic freedom through accessible educational content.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-20">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            About <span className="text-brand-yellow">soundsfair</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            An educational platform dedicated to teaching the world about Bitcoin,
            sound money principles, and economic freedom.
          </p>
        </section>

        {/* Mission Section */}
        <section className="max-w-4xl mx-auto mb-20">
          <div className="border border-gray-800 rounded-lg p-8 md:p-12">
            <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              We believe that understanding money is fundamental to economic freedom.
              soundsfair exists to provide clear, accessible education about Bitcoin and
              the principles of sound monetary systems.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Our goal is to help people understand why fair money matters, how the
              current fiat system works, and how Bitcoin offers an alternative path
              toward financial sovereignty.
            </p>
          </div>
        </section>

        {/* What We Offer */}
        <section className="max-w-4xl mx-auto mb-20">
          <h3 className="text-3xl font-bold mb-8 text-center">What We Offer</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-800 rounded-lg p-6 hover:border-brand-yellow transition-colors">
              <div className="text-brand-yellow text-3xl mb-4">📚</div>
              <h4 className="text-xl font-semibold mb-3">Progressive Learning</h4>
              <p className="text-gray-400">
                9 comprehensive lessons that take you from understanding fiat system
                failures to mastering Bitcoin fundamentals and geopolitical implications.
              </p>
            </div>

            <div className="border border-gray-800 rounded-lg p-6 hover:border-brand-yellow transition-colors">
              <div className="text-brand-yellow text-3xl mb-4">📊</div>
              <h4 className="text-xl font-semibold mb-3">Interactive Tools</h4>
              <p className="text-gray-400">
                Hands-on calculators and tools to help you understand Bitcoin's
                performance and make informed decisions about your financial future.
              </p>
            </div>

            <div className="border border-gray-800 rounded-lg p-6 hover:border-brand-yellow transition-colors">
              <div className="text-brand-yellow text-3xl mb-4">🎥</div>
              <h4 className="text-xl font-semibold mb-3">Curated Content</h4>
              <p className="text-gray-400">
                Carefully selected videos and resources from Bitcoin experts and
                educators to supplement your learning journey.
              </p>
            </div>

            <div className="border border-gray-800 rounded-lg p-6 hover:border-brand-yellow transition-colors">
              <div className="text-brand-yellow text-3xl mb-4">🌍</div>
              <h4 className="text-xl font-semibold mb-3">Global Perspective</h4>
              <p className="text-gray-400">
                Understanding Bitcoin's role in geopolitics and its potential to
                provide economic freedom across borders.
              </p>
            </div>
          </div>
        </section>

        {/* Our Principles */}
        <section className="max-w-4xl mx-auto mb-20">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 md:p-12">
            <h3 className="text-3xl font-bold mb-6 text-center">Our Principles</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold text-brand-yellow mb-2">
                  Educational First
                </h4>
                <p className="text-gray-300">
                  We prioritize clear, accurate education over hype or promises.
                  Our content is fact-based and designed for learners of all levels.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-brand-yellow mb-2">
                  Financial Sovereignty
                </h4>
                <p className="text-gray-300">
                  We believe in empowering individuals with knowledge to make their
                  own financial decisions and protect their economic freedom.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-brand-yellow mb-2">
                  Sound Money Principles
                </h4>
                <p className="text-gray-300">
                  We teach the fundamental principles of sound money: scarcity,
                  durability, divisibility, and resistance to censorship.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-brand-yellow mb-2">
                  Accessible to All
                </h4>
                <p className="text-gray-300">
                  Quality Bitcoin education should be available to everyone,
                  regardless of their technical or financial background.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-2xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Start Learning?</h3>
          <p className="text-xl text-gray-400 mb-8">
            Begin your journey to understanding Bitcoin and fair money principles.
          </p>
          <Link
            href="/learn"
            className="inline-block px-8 py-4 bg-brand-yellow text-black font-semibold rounded-lg hover:bg-primary-dark transition-colors"
          >
            Start Learning Now
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
