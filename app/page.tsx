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
                href="/learn"
                className="px-8 py-4 bg-brand-yellow text-black font-semibold rounded-lg hover:bg-primary-dark transition-colors"
              >
                Start Learning
              </Link>
              <a
                href="#tools"
                className="px-8 py-4 border-2 border-brand-yellow text-brand-yellow font-semibold rounded-lg hover:bg-brand-yellow hover:text-black transition-colors"
              >
                Explore Tools
              </a>
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
            <div className="p-6 border border-gray-800 rounded-lg hover:border-brand-yellow transition-colors">
              <div className="text-brand-yellow text-4xl mb-4">📚</div>
              <h4 className="text-xl font-semibold mb-3">Educational Path</h4>
              <p className="text-gray-400">
                9 comprehensive lessons covering fiat system failures, Bitcoin fundamentals, and economic freedom.
              </p>
            </div>

            <div className="p-6 border border-gray-800 rounded-lg hover:border-brand-yellow transition-colors">
              <div className="text-brand-yellow text-4xl mb-4">📊</div>
              <h4 className="text-xl font-semibold mb-3">DCA Calculator</h4>
              <p className="text-gray-400">
                Compare Bitcoin performance against S&P500, Gold, and other assets with our interactive calculator.
              </p>
            </div>

            <div className="p-6 border border-gray-800 rounded-lg hover:border-brand-yellow transition-colors">
              <div className="text-brand-yellow text-4xl mb-4">🎥</div>
              <h4 className="text-xl font-semibold mb-3">Curated Content</h4>
              <p className="text-gray-400">
                Hand-picked videos and resources from the Bitcoin community to enhance your learning.
              </p>
            </div>
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
              href="/learn"
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
