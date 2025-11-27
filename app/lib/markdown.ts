import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

const contentDirectory = path.join(process.cwd(), 'content');

export interface LessonMetadata {
  title: string;
  level: number;
  duration: string;
  difficulty: string;
  prerequisites: string;
  slug: string;
}

export interface Lesson {
  metadata: LessonMetadata;
  content: string;
  htmlContent: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  relatedTerms?: string[];
}

export interface FAQ {
  question: string;
  shortAnswer: string;
  detailedAnswer: string;
  category: string;
}

/**
 * Get all lesson slugs
 */
export function getAllLessonSlugs(): string[] {
  const lessonsDir = path.join(contentDirectory, 'lessons');
  const filenames = fs.readdirSync(lessonsDir);

  return filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => filename.replace(/\.md$/, ''));
}

/**
 * Get lesson by slug
 */
export async function getLessonBySlug(slug: string): Promise<Lesson> {
  const fullPath = path.join(contentDirectory, 'lessons', `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);

  // Extract metadata from content
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : slug;

  const durationMatch = content.match(/\*\*Duration:\*\*\s+(.+)/);
  const duration = durationMatch ? durationMatch[1] : 'Unknown';

  const difficultyMatch = content.match(/\*\*Difficulty:\*\*\s+(.+)/);
  const difficulty = difficultyMatch ? difficultyMatch[1] : 'Intermediate';

  const prerequisitesMatch = content.match(/\*\*Prerequisites:\*\*\s+(.+)/);
  const prerequisites = prerequisitesMatch ? prerequisitesMatch[1] : 'None';

  const levelMatch = slug.match(/level-(\d+)/);
  const level = levelMatch ? parseInt(levelMatch[1]) : 1;

  // Process markdown to HTML
  const processedContent = await remark()
    .use(gfm)
    .use(html, { sanitize: false })
    .process(content);

  const htmlContent = processedContent.toString();

  return {
    metadata: {
      title,
      level,
      duration,
      difficulty,
      prerequisites,
      slug,
    },
    content,
    htmlContent,
  };
}

/**
 * Get all lessons with metadata
 */
export async function getAllLessons(): Promise<Lesson[]> {
  const slugs = getAllLessonSlugs();
  const lessons = await Promise.all(
    slugs.map(slug => getLessonBySlug(slug))
  );

  return lessons.sort((a, b) => a.metadata.level - b.metadata.level);
}

/**
 * Parse quiz questions from lesson content
 */
export function parseQuizFromContent(content: string): Array<{
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}> {
  const quizSection = content.split('# Level')[1]?.split('Quiz')[1];
  if (!quizSection) return [];

  const questions: Array<{
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }> = [];

  // Regex to match quiz questions
  const questionRegex = /###\s+Question\s+\d+\s+(.+?)\n\n((?:^[A-D]\).+$\n?)+)\*\*Correct Answer:\*\*\s+([A-D])\s+\*\*Explanation:\*\*\s+(.+?)(?=\n\n---|\n\n###|$)/gms;

  let match;
  while ((match = questionRegex.exec(quizSection)) !== null) {
    const [, questionText, optionsText, correctAnswer, explanation] = match;

    const options = optionsText
      .trim()
      .split('\n')
      .map(line => line.replace(/^[A-D]\)\s*/, '').trim());

    questions.push({
      question: questionText.trim(),
      options,
      correctAnswer,
      explanation: explanation.trim(),
    });
  }

  return questions;
}

/**
 * Get glossary terms
 */
export async function getGlossary(): Promise<GlossaryTerm[]> {
  const glossaryPath = path.join(contentDirectory, 'glossary', 'bitcoin-glossary.md');
  const fileContents = fs.readFileSync(glossaryPath, 'utf8');

  const terms: GlossaryTerm[] = [];

  // Parse glossary - each term starts with ### Term Name
  const termRegex = /###\s+(.+?)\n(.+?)(?=\n###|\n##|$)/gs;

  let match;
  while ((match = termRegex.exec(fileContents)) !== null) {
    const [, term, definition] = match;

    const relatedMatch = definition.match(/\*\*Related terms:\*\*\s+(.+)/);
    const relatedTerms = relatedMatch
      ? relatedMatch[1].split(',').map(t => t.trim())
      : [];

    // Convert markdown to HTML for definition
    const processedDefinition = await remark()
      .use(gfm)
      .use(html)
      .process(definition.trim());

    terms.push({
      term: term.trim(),
      definition: String(processedDefinition),
      relatedTerms,
    });
  }

  return terms;
}

/**
 * Get FAQs
 */
export async function getFAQs(): Promise<FAQ[]> {
  const faqPath = path.join(contentDirectory, 'faq', 'bitcoin-faq.md');
  const fileContents = fs.readFileSync(faqPath, 'utf8');

  const faqs: FAQ[] = [];

  // Parse FAQs - each question starts with ### number.
  const faqRegex = /###\s+(\d+)\.\s+(.+?)\n\n\*\*Short answer:\*\*\s+(.+?)\n\n\*\*Detailed answer:\*\*\s+(.+?)(?=\n\n###|\n\n##|$)/gs;

  let match;
  let currentCategory = 'General';

  // Extract categories
  const categoryMatches = fileContents.matchAll(/##\s+(.+?)\n/g);
  const categories = Array.from(categoryMatches).map(m => m[1]);

  while ((match = faqRegex.exec(fileContents)) !== null) {
    const [, number, question, shortAnswer, detailedAnswer] = match;

    // Determine category based on position in file
    const questionIndex = parseInt(number);
    if (questionIndex <= 4) currentCategory = 'Getting Started';
    else if (questionIndex <= 7) currentCategory = 'Understanding Bitcoin';
    else if (questionIndex <= 10) currentCategory = 'Using Bitcoin';
    else if (questionIndex <= 12) currentCategory = 'Technical Questions';
    else if (questionIndex <= 14) currentCategory = 'Security & Privacy';
    else if (questionIndex <= 16) currentCategory = 'Economics & Investment';
    else if (questionIndex <= 18) currentCategory = 'Philosophical & Social';
    else currentCategory = 'Miscellaneous';

    // Convert markdown to HTML for detailed answer
    const processedDetailedAnswer = await remark()
      .use(gfm)
      .use(html)
      .process(detailedAnswer.trim());

    faqs.push({
      question: question.trim(),
      shortAnswer: shortAnswer.trim(),
      detailedAnswer: String(processedDetailedAnswer),
      category: currentCategory,
    });
  }

  return faqs;
}

/**
 * Search content across lessons, glossary, and FAQs
 */
export async function searchContent(query: string): Promise<{
  lessons: Lesson[];
  glossaryTerms: GlossaryTerm[];
  faqs: FAQ[];
}> {
  const lowerQuery = query.toLowerCase();

  const allLessons = await getAllLessons();
  const glossary = await getGlossary();
  const faqs = await getFAQs();

  const matchingLessons = allLessons.filter(lesson =>
    lesson.metadata.title.toLowerCase().includes(lowerQuery) ||
    lesson.content.toLowerCase().includes(lowerQuery)
  );

  const matchingGlossaryTerms = glossary.filter(term =>
    term.term.toLowerCase().includes(lowerQuery) ||
    term.definition.toLowerCase().includes(lowerQuery)
  );

  const matchingFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(lowerQuery) ||
    faq.shortAnswer.toLowerCase().includes(lowerQuery) ||
    faq.detailedAnswer.toLowerCase().includes(lowerQuery)
  );

  return {
    lessons: matchingLessons,
    glossaryTerms: matchingGlossaryTerms,
    faqs: matchingFAQs,
  };
}
