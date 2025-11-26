import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Learn Bitcoin - Educational Path | soundsfair",
  description: "Complete educational path from zero to advanced Bitcoin knowledge. Learn about fiat system failures, Bitcoin fundamentals, geopolitics, and economic freedom.",
};

const lessons = [
  {
    level: 1,
    title: "The Fiat Money System and Its Failures",
    description: "Understand how the current monetary system works and why it's fundamentally flawed.",
    topics: ["History of money", "Fiat currency creation", "Inflation and purchasing power", "Central banking"],
    duration: "30 min",
    status: "available" as const,
  },
  {
    level: 2,
    title: "The Banking System and Debt Creation",
    description: "Learn how banks create money through debt and the implications for the economy.",
    topics: ["Fractional reserve banking", "Money multiplication", "Debt cycles", "Economic bubbles"],
    duration: "35 min",
    status: "available" as const,
  },
  {
    level: 3,
    title: "Bitcoin: A Revolution Against Fiat",
    description: "Discover how Bitcoin offers an alternative to the fiat monetary system.",
    topics: ["Bitcoin basics", "Decentralization", "Fixed supply", "Censorship resistance"],
    duration: "40 min",
    status: "available" as const,
  },
  {
    level: 4,
    title: "Bitcoin and Geopolitics",
    description: "Explore Bitcoin's role in global power dynamics and international relations.",
    topics: ["Monetary sovereignty", "Sanctions resistance", "Global adoption", "Nation-state involvement"],
    duration: "45 min",
    status: "available" as const,
  },
  {
    level: 5,
    title: "Bitcoin as Store of Value",
    description: "Understanding Bitcoin's properties as digital gold and inflation hedge.",
    topics: ["Scarcity", "Digital gold", "Inflation protection", "Long-term value"],
    duration: "40 min",
    status: "coming-soon" as const,
  },
  {
    level: 6,
    title: "Bitcoin as Economic Freedom Tool",
    description: "How Bitcoin empowers individuals with financial sovereignty.",
    topics: ["Self-custody", "Borderless transactions", "Financial inclusion", "Privacy"],
    duration: "40 min",
    status: "coming-soon" as const,
  },
  {
    level: 7,
    title: "Bitcoin's Geopolitical Future",
    description: "Analyzing Bitcoin's potential impact on future global economics.",
    topics: ["Adoption trends", "Regulatory landscape", "Game theory", "Future scenarios"],
    duration: "45 min",
    status: "coming-soon" as const,
  },
  {
    level: 8,
    title: "Protection Strategies Against Fiat Collapse",
    description: "Practical strategies for protecting wealth in an uncertain monetary environment.",
    topics: ["Diversification", "Bitcoin allocation", "Security best practices", "Long-term strategy"],
    duration: "50 min",
    status: "coming-soon" as const,
  },
  {
    level: 9,
    title: "Conclusion: The Path to Financial Freedom",
    description: "Bringing it all together - your roadmap to economic sovereignty.",
    topics: ["Key takeaways", "Action plan", "Resources", "Community"],
    duration: "30 min",
    status: "coming-soon" as const,
  },
];

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-20">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Learn About <span className="text-brand-yellow">Bitcoin</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            A comprehensive 9-level educational path from zero to advanced Bitcoin knowledge.
            Learn at your own pace, from fiat system failures to economic freedom.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="px-6 py-3 bg-gray-900 border border-gray-800 rounded-lg">
              <div className="text-brand-yellow font-semibold">9 Lessons</div>
              <div className="text-sm text-gray-400">Progressive Path</div>
            </div>
            <div className="px-6 py-3 bg-gray-900 border border-gray-800 rounded-lg">
              <div className="text-brand-yellow font-semibold">6+ Hours</div>
              <div className="text-sm text-gray-400">Total Content</div>
            </div>
            <div className="px-6 py-3 bg-gray-900 border border-gray-800 rounded-lg">
              <div className="text-brand-yellow font-semibold">All Levels</div>
              <div className="text-sm text-gray-400">Beginner Friendly</div>
            </div>
          </div>
        </section>

        {/* Learning Path */}
        <section className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">Your Learning Path</h3>
          <div className="space-y-6">
            {lessons.map((lesson) => (
              <div
                key={lesson.level}
                className={`border rounded-lg p-6 transition-all ${
                  lesson.status === "available"
                    ? "border-gray-800 hover:border-brand-yellow cursor-pointer"
                    : "border-gray-800 opacity-60"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-yellow text-black font-bold">
                        {lesson.level}
                      </span>
                      <div>
                        <h4 className="text-xl font-semibold">{lesson.title}</h4>
                        <span className="text-sm text-gray-400">{lesson.duration}</span>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4">{lesson.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {lesson.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-3 py-1 bg-gray-900 border border-gray-800 rounded-full text-sm text-gray-400"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {lesson.status === "available" ? (
                      <button className="px-6 py-2 bg-brand-yellow text-black font-semibold rounded-lg hover:bg-primary-dark transition-colors whitespace-nowrap">
                        Start Lesson
                      </button>
                    ) : (
                      <span className="px-6 py-2 bg-gray-900 text-gray-500 font-semibold rounded-lg text-center whitespace-nowrap">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Resources */}
        <section className="max-w-5xl mx-auto mt-20">
          <h3 className="text-3xl font-bold mb-8 text-center">Additional Resources</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-gray-800 rounded-lg p-6 text-center hover:border-brand-yellow transition-colors">
              <div className="text-brand-yellow text-4xl mb-4">📊</div>
              <h4 className="text-xl font-semibold mb-3">DCA Calculator</h4>
              <p className="text-gray-400 mb-4">
                Compare Bitcoin's performance against traditional assets.
              </p>
              <button className="text-brand-yellow hover:underline">Coming Soon</button>
            </div>

            <div className="border border-gray-800 rounded-lg p-6 text-center hover:border-brand-yellow transition-colors">
              <div className="text-brand-yellow text-4xl mb-4">🎥</div>
              <h4 className="text-xl font-semibold mb-3">Video Library</h4>
              <p className="text-gray-400 mb-4">
                Curated videos from Bitcoin educators and experts.
              </p>
              <button className="text-brand-yellow hover:underline">Coming Soon</button>
            </div>

            <div className="border border-gray-800 rounded-lg p-6 text-center hover:border-brand-yellow transition-colors">
              <div className="text-brand-yellow text-4xl mb-4">📚</div>
              <h4 className="text-xl font-semibold mb-3">Reading List</h4>
              <p className="text-gray-400 mb-4">
                Essential books and articles about Bitcoin and sound money.
              </p>
              <button className="text-brand-yellow hover:underline">Coming Soon</button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-2xl mx-auto text-center mt-20">
          <div className="border border-gray-800 rounded-lg p-8 bg-gray-900">
            <h3 className="text-2xl font-bold mb-4">Ready to Begin?</h3>
            <p className="text-gray-300 mb-6">
              Start with Level 1 and progress at your own pace. Each lesson builds
              on the previous one to give you a complete understanding of Bitcoin.
            </p>
            <button className="px-8 py-4 bg-brand-yellow text-black font-semibold rounded-lg hover:bg-primary-dark transition-colors">
              Start Level 1
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
