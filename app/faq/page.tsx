import { getFAQs } from '@/app/lib/markdown';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import FAQClient from './FAQClient';

export const metadata = {
  title: 'Bitcoin FAQs | Soundsfair',
  description: '20 comprehensive answers to the most common Bitcoin questions',
};

export default async function FAQPage() {
  const faqs = await getFAQs();

  return (
    <div className="min-h-screen bg-surface-black">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-text-secondary">
            20 comprehensive answers to your Bitcoin questions
          </p>
        </div>

        <FAQClient faqs={faqs} />
      </main>

      <Footer />
    </div>
  );
}
