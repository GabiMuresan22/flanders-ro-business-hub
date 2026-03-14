import { Link } from 'react-router-dom';
import { Construction, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';

const TRANSLATIONS = {
  ro: {
    title: 'În curând',
    subtitle: 'Lucrăm la acest instrument. Va fi disponibil în curând!',
    back: 'Înapoi la instrumente',
  },
  en: {
    title: 'Coming Soon',
    subtitle: 'We are working on this tool. It will be available soon!',
    back: 'Back to tools',
  },
  nl: {
    title: 'Binnenkort beschikbaar',
    subtitle: 'We werken aan deze tool. Hij is binnenkort beschikbaar!',
    back: 'Terug naar tools',
  },
};

const ComingSoonToolPage = () => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language as keyof typeof TRANSLATIONS] || TRANSLATIONS.ro;

  return (
    <>
      <SEO title={t.title} description={t.subtitle} />
      <Navbar />
      <main id="main-content" className="min-h-[60vh] flex items-center justify-center bg-muted/30">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto">
            <div className="h-16 w-16 mx-auto rounded-2xl bg-romania-yellow/20 flex items-center justify-center mb-6">
              <Construction className="h-8 w-8 text-romania-blue" />
            </div>
            <h1 className="font-playfair text-3xl font-bold text-foreground mb-4">{t.title}</h1>
            <p className="text-muted-foreground mb-8">{t.subtitle}</p>
            <Link
              to="/resurse/instrumente"
              className="inline-flex items-center gap-2 bg-romania-blue hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.back}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ComingSoonToolPage;
