'use client';

import { useState, useMemo } from 'react';
import type { GlossaryTerm } from '@/app/lib/markdown';

interface GlossaryClientProps {
  terms: GlossaryTerm[];
}

export default function GlossaryClient({ terms }: GlossaryClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  // Get unique first letters
  const letters = useMemo(() => {
    const uniqueLetters = new Set(terms.map(t => t.term[0].toUpperCase()));
    return Array.from(uniqueLetters).sort();
  }, [terms]);

  // Filter terms
  const filteredTerms = useMemo(() => {
    let filtered = terms;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        term =>
          term.term.toLowerCase().includes(query) ||
          term.definition.toLowerCase().includes(query)
      );
    }

    if (selectedLetter) {
      filtered = filtered.filter(t => t.term[0].toUpperCase() === selectedLetter);
    }

    return filtered;
  }, [terms, searchQuery, selectedLetter]);

  // Group terms by letter
  const groupedTerms = useMemo(() => {
    const grouped: Record<string, GlossaryTerm[]> = {};
    filteredTerms.forEach(term => {
      const letter = term.term[0].toUpperCase();
      if (!grouped[letter]) {
        grouped[letter] = [];
      }
      grouped[letter].push(term);
    });
    return grouped;
  }, [filteredTerms]);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Search and Filter */}
      <div className="mb-8">
        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search terms or definitions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 bg-surface-charcoal border-2 border-border-default
              rounded-lg text-text-primary placeholder-text-muted
              focus:border-brand-gold focus:outline-none transition-colors"
          />
        </div>

        {/* Letter Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedLetter(null)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all
              ${selectedLetter === null
                ? 'bg-brand-gold text-surface-black'
                : 'bg-surface-charcoal text-text-secondary hover:text-text-primary hover:border-brand-gold border-2 border-border-default'
              }`}
          >
            All
          </button>
          {letters.map(letter => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all
                ${selectedLetter === letter
                  ? 'bg-brand-gold text-surface-black'
                  : 'bg-surface-charcoal text-text-secondary hover:text-text-primary hover:border-brand-gold border-2 border-border-default'
                }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 text-text-tertiary">
        {filteredTerms.length} {filteredTerms.length === 1 ? 'term' : 'terms'} found
      </div>

      {/* Terms List */}
      {Object.keys(groupedTerms).length === 0 ? (
        <div className="text-center py-12 text-text-tertiary">
          No terms found matching your search.
        </div>
      ) : (
        <div className="space-y-8">
          {Object.keys(groupedTerms).sort().map(letter => (
            <div key={letter} id={letter}>
              <h2 className="text-3xl font-bold text-brand-gold mb-4 pb-2 border-b-2 border-brand-gold/30">
                {letter}
              </h2>
              <div className="space-y-6">
                {groupedTerms[letter].map((term, index) => (
                  <div
                    key={index}
                    className="p-6 bg-surface-charcoal border border-border-default rounded-lg
                      hover:border-brand-gold/50 transition-all"
                  >
                    <h3 className="text-2xl font-bold text-text-primary mb-3">
                      {term.term}
                    </h3>
                    <div
                      className="text-text-secondary leading-relaxed prose prose-invert prose-sm max-w-none
                        prose-p:text-text-secondary prose-strong:text-text-primary
                        prose-a:text-brand-gold prose-code:text-brand-gold"
                      dangerouslySetInnerHTML={{ __html: term.definition }}
                    />
                    {term.relatedTerms && term.relatedTerms.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-border-default">
                        <span className="text-text-tertiary text-sm font-semibold">Related terms:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {term.relatedTerms.map((related, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-surface-dark text-brand-gold text-sm rounded-full
                                border border-brand-gold/30"
                            >
                              {related}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
