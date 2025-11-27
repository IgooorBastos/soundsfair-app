import { getLessonBySlug, getAllLessonSlugs, parseQuizFromContent } from '@/app/lib/markdown';
import { notFound } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import QuizComponent from '@/app/components/Quiz';
import LessonNavigation from '@/app/components/LessonNavigation';

export async function generateStaticParams() {
  const slugs = getAllLessonSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = await getLessonBySlug(slug);

  return {
    title: `${lesson.metadata.title} | Soundsfair`,
    description: `Learn about ${lesson.metadata.title} - ${lesson.metadata.duration} lesson`,
  };
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let lesson;
  try {
    lesson = await getLessonBySlug(slug);
  } catch (error) {
    notFound();
  }

  const quizQuestions = parseQuizFromContent(lesson.content);

  return (
    <div className="min-h-screen bg-surface-black">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Lesson Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-semibold">
              Level {lesson.metadata.level}
            </span>
            <span className="text-text-tertiary">{lesson.metadata.duration}</span>
            <span className="px-3 py-1 bg-surface-charcoal text-text-secondary rounded-full text-sm">
              {lesson.metadata.difficulty}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            {lesson.metadata.title}
          </h1>

          {lesson.metadata.prerequisites !== 'None' && (
            <p className="text-text-tertiary">
              <span className="font-semibold">Prerequisites:</span> {lesson.metadata.prerequisites}
            </p>
          )}
        </div>

        {/* Lesson Content */}
        <article
          className="prose prose-invert prose-lg max-w-none mb-12
                     prose-headings:text-text-primary
                     prose-p:text-text-secondary prose-p:leading-relaxed
                     prose-a:text-brand-gold prose-a:no-underline hover:prose-a:underline
                     prose-strong:text-text-primary prose-strong:font-semibold
                     prose-code:text-brand-gold prose-code:bg-surface-charcoal prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                     prose-pre:bg-surface-charcoal prose-pre:border prose-pre:border-border-default
                     prose-blockquote:border-l-4 prose-blockquote:border-brand-gold prose-blockquote:bg-surface-charcoal prose-blockquote:py-4 prose-blockquote:px-6
                     prose-ul:text-text-secondary prose-ol:text-text-secondary
                     prose-li:text-text-secondary prose-li:my-2
                     prose-table:text-text-secondary
                     prose-th:text-text-primary prose-th:bg-surface-charcoal
                     prose-td:border-border-default
                     "
          dangerouslySetInnerHTML={{ __html: lesson.htmlContent }}
        />

        {/* Quiz Section */}
        {quizQuestions.length > 0 && (
          <div className="mt-16">
            <QuizComponent questions={quizQuestions} lessonSlug={slug} lessonLevel={lesson.metadata.level} />
          </div>
        )}

        {/* Lesson Navigation */}
        <LessonNavigation currentLevel={lesson.metadata.level} />
      </main>

      <Footer />
    </div>
  );
}
