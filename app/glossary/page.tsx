import { getGlossary } from '@/app/lib/markdown';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import GlossaryClient from './GlossaryClient';

export const metadata = {
  title: 'Bitcoin Glossary | Soundsfair',
  description: '50+ essential Bitcoin terms defined - from Address to UTXO',
};

export default async function GlossaryPage() {
  const glossaryTerms = await getGlossary();

  return (
    <div className="min-h-screen bg-surface-black">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Bitcoin Glossary
          </h1>
          <p className="text-xl text-text-secondary">
            50+ essential terms you need to know
          </p>
        </div>

        <GlossaryClient terms={glossaryTerms} />
      </main>

      <Footer />
    </div>
  );
}
