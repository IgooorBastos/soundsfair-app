'use client';

import { useState, useMemo } from 'react';
import type { FAQ } from '@/app/lib/markdown';

interface FAQClientProps {
  faqs: FAQ[];
}

export default function FAQClient({ faqs }: FAQClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = new Set(faqs.map(f => f.category));
    return ['All', ...Array.from(uniqueCategories)];
  }, [faqs]);

  // Filter FAQs
  const filteredFAQs = useMemo(() => {
    let filtered = faqs;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        faq =>
          faq.question.toLowerCase().includes(query) ||
          faq.shortAnswer.toLowerCase().includes(query) ||
          faq.detailedAnswer.toLowerCase().includes(query)
      );
    }

    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(f => f.category === selectedCategory);
    }

    return filtered;
  }, [faqs, searchQuery, selectedCategory]);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search and Filter */}
      <div className="mb-8">
        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 bg-surface-charcoal border-2 border-border-default
              rounded-lg text-text-primary placeholder-text-muted
              focus:border-brand-gold focus:outline-none transition-colors"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category === 'All' ? null : category)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm
                ${selectedCategory === category || (selectedCategory === null && category === 'All')
                  ? 'bg-brand-gold text-surface-black'
                  : 'bg-surface-charcoal text-text-secondary hover:text-text-primary hover:border-brand-gold border-2 border-border-default'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 text-text-tertiary">
        {filteredFAQs.length} {filteredFAQs.length === 1 ? 'question' : 'questions'} found
      </div>

      {/* FAQ List */}
      {filteredFAQs.length === 0 ? (
        <div className="text-center py-12 text-text-tertiary">
          No questions found matching your search.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <div
                key={index}
                className="bg-surface-charcoal border border-border-default rounded-lg overflow-hidden
                  hover:border-brand-gold/50 transition-all"
              >
                {/* Question (always visible, clickable) */}
                <button
                  onClick={() => toggleExpand(index)}
                  className="w-full px-6 py-5 text-left flex items-start justify-between gap-4
                    hover:bg-surface-dark transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2 py-1 bg-brand-gold/10 text-brand-gold text-xs rounded">
                        {faq.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-text-secondary text-sm">
                      {faq.shortAnswer}
                    </p>
                  </div>
                  <div className="flex-shrink-0 mt-1">
                    <div
                      className={`w-6 h-6 flex items-center justify-center rounded-full
                        bg-brand-gold/10 text-brand-gold transition-transform
                        ${isExpanded ? 'rotate-180' : ''}`}
                    >
                      ▼
                    </div>
                  </div>
                </button>

                {/* Detailed Answer (expandable) */}
                {isExpanded && (
                  <div className="px-6 pb-6 border-t border-border-default">
                    <div
                      className="mt-4 prose prose-invert prose-sm max-w-none
                        prose-p:text-text-secondary prose-p:leading-relaxed
                        prose-headings:text-text-primary prose-headings:font-semibold
                        prose-a:text-brand-gold prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-text-primary
                        prose-code:text-brand-gold prose-code:bg-surface-dark prose-code:px-1 prose-code:rounded
                        prose-ul:text-text-secondary prose-ol:text-text-secondary
                        prose-li:my-1
                        prose-blockquote:border-l-4 prose-blockquote:border-brand-gold prose-blockquote:pl-4
                        prose-table:text-text-secondary"
                      dangerouslySetInnerHTML={{ __html: faq.detailedAnswer }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Additional Help */}
      <div className="mt-12 p-6 bg-surface-charcoal border border-brand-gold/30 rounded-lg text-center">
        <h3 className="text-xl font-semibold text-text-primary mb-3">
          Still have questions?
        </h3>
        <p className="text-text-secondary mb-4">
          Check out our comprehensive course or ask via our Lightning-powered Q&A service
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/lessons"
            className="px-6 py-3 bg-brand-gold text-surface-black font-semibold rounded-lg
              hover:bg-brand-gold-hover transition-colors"
          >
            Start Learning
          </a>
          <a
            href="/qa"
            className="px-6 py-3 border-2 border-brand-gold text-brand-gold font-semibold rounded-lg
              hover:bg-brand-gold hover:text-surface-black transition-colors"
          >
            Ask a Question
          </a>
        </div>
      </div>
    </div>
  );
}
