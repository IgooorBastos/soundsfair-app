import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { getAllLessons } from '@/app/lib/markdown';

export const metadata = {
  title: 'All Lessons | Soundsfair',
  description: 'Complete Bitcoin education course - from store of value to financial freedom',
};

export default async function LessonsPage() {
  const lessons = await getAllLessons();

  return (
    <div className="min-h-screen bg-surface-black">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Bitcoin Education Course
          </h1>
          <p className="text-xl text-text-secondary mb-6">
            Master Bitcoin from store of value to financial freedom in 5 comprehensive lessons
          </p>
          <div className="flex items-center justify-center gap-4 text-text-tertiary">
            <span>📚 {lessons.length} Lessons</span>
            <span>•</span>
            <span>⏱️ ~4 hours total</span>
            <span>•</span>
            <span>🎯 50+ quiz questions</span>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {lessons.map((lesson, index) => {
            const isCompleted = false; // TODO: Get from localStorage/user progress
            const isLocked = index > 0 && !isCompleted; // TODO: Check if previous lesson completed

            return (
              <Link
                key={lesson.metadata.slug}
                href={isLocked ? '#' : `/lessons/${lesson.metadata.slug}`}
                className={`group relative p-6 rounded-lg border-2 transition-all
                  ${isLocked
                    ? 'border-border-default bg-surface-charcoal opacity-60 cursor-not-allowed'
                    : 'border-border-default bg-surface-charcoal hover:border-brand-gold hover:shadow-glow'
                  }`}
              >
                {/* Level Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-semibold">
                      Level {lesson.metadata.level}
                    </div>
                    {isCompleted && (
                      <div className="text-semantic-success text-2xl">✓</div>
                    )}
                    {isLocked && (
                      <div className="text-text-muted text-2xl">🔒</div>
                    )}
                  </div>
                  <div className="text-text-tertiary text-sm">
                    {lesson.metadata.duration}
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl font-bold text-text-primary mb-2 group-hover:text-brand-gold transition-colors">
                  {lesson.metadata.title}
                </h3>

                <div className="text-text-tertiary text-sm mb-4">
                  {lesson.metadata.difficulty} • {lesson.metadata.prerequisites}
                </div>

                {/* Excerpt */}
                <p className="text-text-secondary line-clamp-2 mb-4">
                  {lesson.content.split('\n\n')[2]?.substring(0, 150)}...
                </p>

                {/* Progress Bar (if started) */}
                {!isLocked && !isCompleted && (
                  <div className="mt-4">
                    <div className="w-full bg-surface-dark rounded-full h-2">
                      <div
                        className="bg-brand-gold/50 h-2 rounded-full"
                        style={{ width: '0%' }}
                      />
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="mt-4">
                  {isLocked ? (
                    <span className="text-text-muted text-sm">
                      Complete previous lesson to unlock
                    </span>
                  ) : isCompleted ? (
                    <span className="text-semantic-success font-semibold">
                      Review Lesson →
                    </span>
                  ) : (
                    <span className="text-brand-gold font-semibold group-hover:underline">
                      Start Lesson →
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Additional Resources */}
        <div className="max-w-5xl mx-auto mt-16 grid md:grid-cols-3 gap-6">
          <Link
            href="/glossary"
            className="p-6 rounded-lg border-2 border-border-default bg-surface-charcoal
              hover:border-brand-gold hover:shadow-glow transition-all"
          >
            <div className="text-4xl mb-3">📖</div>
            <h4 className="text-xl font-semibold text-text-primary mb-2">
              Glossary
            </h4>
            <p className="text-text-secondary">
              50+ essential Bitcoin terms defined
            </p>
          </Link>

          <Link
            href="/faq"
            className="p-6 rounded-lg border-2 border-border-default bg-surface-charcoal
              hover:border-brand-gold hover:shadow-glow transition-all"
          >
            <div className="text-4xl mb-3">❓</div>
            <h4 className="text-xl font-semibold text-text-primary mb-2">
              FAQs
            </h4>
            <p className="text-text-secondary">
              20 comprehensive answers to common questions
            </p>
          </Link>

          <Link
            href="/tools/dca"
            className="p-6 rounded-lg border-2 border-border-default bg-surface-charcoal
              hover:border-brand-gold hover:shadow-glow transition-all"
          >
            <div className="text-4xl mb-3">📊</div>
            <h4 className="text-xl font-semibold text-text-primary mb-2">
              DCA Calculator
            </h4>
            <p className="text-text-secondary">
              Compare Bitcoin vs traditional assets
            </p>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
