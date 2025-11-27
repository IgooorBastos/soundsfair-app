import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <main className="container mx-auto px-4">
        <section className="min-h-[80vh] flex flex-col items-center justify-center text-center py-20">
          <div className="max-w-4xl">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Learn About{" "}
              <span className="text-brand-yellow">Fair Money</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              An educational platform about Bitcoin, economic freedom, and sound monetary principles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/lessons"
                className="px-8 py-4 bg-brand-yellow text-black font-semibold rounded-lg hover:bg-primary-dark transition-colors"
              >
                Start Learning
              </Link>
              <Link
                href="/tools/dca"
                className="px-8 py-4 border-2 border-brand-yellow text-brand-yellow font-semibold rounded-lg hover:bg-brand-yellow hover:text-black transition-colors"
              >
                DCA Calculator
              </Link>
            </div>
          </div>
        </section>

        {/* Features Preview */}
        <section id="learn" className="py-20">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              What You'll Learn
            </h3>
            <p className="text-xl text-gray-400">
              From zero to advanced Bitcoin knowledge
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/lessons" className="group p-6 border border-gray-800 rounded-lg hover:border-brand-yellow transition-all hover:scale-105">
              <div className="text-brand-yellow text-4xl mb-4">📚</div>
              <h4 className="text-xl font-semibold mb-3 group-hover:text-brand-yellow transition-colors">Educational Lessons</h4>
              <p className="text-gray-400 mb-4">
                5 comprehensive lessons covering Bitcoin as store of value, economic freedom, geopolitics, and protection strategies.
              </p>
              <span className="text-brand-yellow text-sm font-semibold">Start Learning →</span>
            </Link>

            <Link href="/tools/dca" className="group p-6 border border-gray-800 rounded-lg hover:border-brand-yellow transition-all hover:scale-105">
              <div className="text-brand-yellow text-4xl mb-4">📊</div>
              <h4 className="text-xl font-semibold mb-3 group-hover:text-brand-yellow transition-colors">DCA Calculator</h4>
              <p className="text-gray-400 mb-4">
                Compare Bitcoin performance against S&P500, Gold, and other assets with our interactive DCA calculator.
              </p>
              <span className="text-brand-yellow text-sm font-semibold">Try Calculator →</span>
            </Link>

            <Link href="/glossary" className="group p-6 border border-gray-800 rounded-lg hover:border-brand-yellow transition-all hover:scale-105">
              <div className="text-brand-yellow text-4xl mb-4">📖</div>
              <h4 className="text-xl font-semibold mb-3 group-hover:text-brand-yellow transition-colors">Bitcoin Glossary</h4>
              <p className="text-gray-400 mb-4">
                50+ essential Bitcoin terms explained. Searchable, filterable, and easy to understand definitions.
              </p>
              <span className="text-brand-yellow text-sm font-semibold">Browse Terms →</span>
            </Link>
          </div>
        </section>

        {/* Quick Access Section */}
        <section className="py-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              More Resources
            </h3>
            <p className="text-xl text-gray-400">
              Everything you need to master Bitcoin knowledge
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Link href="/faq" className="group p-8 border border-gray-800 rounded-lg hover:border-brand-yellow transition-all">
              <div className="flex items-start gap-4">
                <div className="text-brand-yellow text-3xl">❓</div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold mb-2 group-hover:text-brand-yellow transition-colors">Frequently Asked Questions</h4>
                  <p className="text-gray-400 text-sm mb-3">
                    20 comprehensive answers to the most common Bitcoin questions
                  </p>
                  <span className="text-brand-yellow text-sm font-semibold">View FAQs →</span>
                </div>
              </div>
            </Link>

            <Link href="/glossary" className="group p-8 border border-gray-800 rounded-lg hover:border-brand-yellow transition-all">
              <div className="flex items-start gap-4">
                <div className="text-brand-yellow text-3xl">📖</div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold mb-2 group-hover:text-brand-yellow transition-colors">Bitcoin Glossary</h4>
                  <p className="text-gray-400 text-sm mb-3">
                    50+ essential terms with clear definitions and related concepts
                  </p>
                  <span className="text-brand-yellow text-sm font-semibold">Browse Glossary →</span>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Journey?
            </h3>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands learning about sound money and economic freedom.
            </p>
            <Link
              href="/lessons"
              className="inline-block px-8 py-4 bg-brand-yellow text-black font-semibold rounded-lg hover:bg-primary-dark transition-colors"
            >
              Begin Learning Now
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
