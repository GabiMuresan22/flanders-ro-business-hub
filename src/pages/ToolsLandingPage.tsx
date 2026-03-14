import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calculator,
  TrendingUp,
  Receipt,
  PiggyBank,
  ArrowRight,
  BarChart3,
  ShieldCheck,
  Target,
  Lightbulb,
  BookOpen,
  FileText,
  ChevronDown,
  Mail,
  Sparkles,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const TOOLS = [
  {
    title: 'Calculator Cash Flow',
    description: 'Vezi rapid câți bani intră, câți ies și dacă firma ta rămâne pe plus la final de lună.',
    cta: 'Deschide calculatorul',
    route: '/calculator-cash-flow',
    icon: Calculator,
    badge: 'Popular',
    available: true,
  },
  {
    title: 'Calculator ROI',
    description: 'Calculează randamentul unei investiții și vezi în cât timp îți recuperezi banii.',
    cta: 'Calculează ROI',
    route: '/resurse/instrumente/calculator-roi',
    icon: TrendingUp,
    badge: null,
    available: false,
  },
  {
    title: 'Calculator Taxe Belgia',
    description: 'Estimează taxele relevante pentru afacerea ta și înțelege mai bine obligațiile fiscale.',
    cta: 'Vezi estimarea',
    route: '/resurse/instrumente/calculator-taxe-belgia',
    icon: Receipt,
    badge: null,
    available: false,
  },
  {
    title: 'Calculator Profit',
    description: 'Analizează veniturile, cheltuielile și marja reală a afacerii tale.',
    cta: 'Calculează profitul',
    route: '/resurse/instrumente/calculator-profit',
    icon: PiggyBank,
    badge: null,
    available: false,
  },
];

const BENEFITS = [
  { icon: Target, title: 'Decizii mai clare', description: 'Înțelege cifrele și ia decizii bazate pe date reale.' },
  { icon: BarChart3, title: 'Control mai bun al banilor', description: 'Monitorizează fluxul de numerar și cheltuielile lunare.' },
  { icon: ShieldCheck, title: 'Planificare mai sigură', description: 'Pregătește-te pentru scenarii dificile și evită surprizele.' },
];

const SUGGESTIONS = [
  { text: 'Dacă vrei să vezi dacă firma ta are suficient cash', tool: 'Calculator Cash Flow', route: '/calculator-cash-flow', icon: Calculator },
  { text: 'Dacă vrei să analizezi o investiție', tool: 'Calculator ROI', route: '/resurse/instrumente/calculator-roi', icon: TrendingUp },
  { text: 'Dacă vrei să înțelegi cât rămâne în firmă', tool: 'Calculator Profit', route: '/resurse/instrumente/calculator-profit', icon: PiggyBank },
];

const ARTICLES = [
  { title: 'Ce este cash flow-ul și cum îl urmărești corect', slug: '#' },
  { title: 'Diferența dintre profit și cash flow', slug: '#' },
  { title: 'Ce taxe trebuie să urmărești în Belgia', slug: '#' },
  { title: 'Cum calculezi rentabilitatea unei investiții', slug: '#' },
];

const FAQS = [
  { q: 'Ce tipuri de instrumente voi găsi aici?', a: 'Găsești calculatoare financiare practice – de la cash flow și ROI, până la estimări de taxe și profit – concepute special pentru antreprenori români care activează în Belgia.' },
  { q: 'Sunt aceste calculatoare potrivite pentru antreprenori la început de drum?', a: 'Da, absolut. Instrumentele sunt simple, intuitive și nu necesită cunoștințe avansate de contabilitate. Sunt un punct de plecare excelent pentru a înțelege mai bine finanțele afacerii tale.' },
  { q: 'Pot folosi instrumentele gratuit?', a: 'Da, toate instrumentele de pe RO Business Hub sunt gratuite și accesibile fără cont.' },
  { q: 'Aceste rezultate înlocuiesc sfatul unui contabil?', a: 'Nu. Calculatoarele oferă estimări orientative care te ajută să înțelegi mai bine situația financiară. Pentru decizii importante, consultă întotdeauna un contabil autorizat.' },
  { q: 'Vor exista și alte instrumente în viitor?', a: 'Da, lucrăm constant la noi instrumente și resurse utile. Dacă ai sugestii, ne poți scrie oricând prin pagina de contact.' },
];

const ToolsLandingPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { toast } = useToast();

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gdprConsent) {
      toast({ title: 'Eroare', description: 'Trebuie să accepți politica de confidențialitate.', variant: 'destructive' });
      return;
    }
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('newsletter_subscribers').insert({ email: email.trim() });
      if (error?.code === '23505') {
        toast({ title: 'Deja abonat', description: 'Această adresă de email este deja înregistrată.' });
      } else if (error) {
        throw error;
      } else {
        toast({ title: 'Mulțumim!', description: 'Vei primi resursele pe email.' });
        setName('');
        setEmail('');
        setGdprConsent(false);
      }
    } catch {
      toast({ title: 'Eroare', description: 'A apărut o problemă. Încearcă din nou.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Instrumente pentru antreprenori români în Belgia | RO Business Hub"
        description="Calculatoare și resurse practice care te ajută să înțelegi mai bine banii, taxele și deciziile importante din afacerea ta."
        canonicalUrl="/resurse/instrumente"
      />
      <Navbar />
      <main id="main-content">

        {/* Hero */}
        <section className="relative bg-gradient-to-br from-romania-blue/5 via-background to-romania-yellow/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-romania-blue/10 text-romania-blue text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                <Sparkles className="h-4 w-4" />
                Resurse pentru antreprenori
              </div>
              <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Instrumente pentru antreprenori români în Belgia
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Calculatoare și resurse practice care te ajută să înțelegi mai bine banii, taxele și deciziile importante din afacerea ta.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#tools" className="inline-flex items-center justify-center gap-2 bg-romania-blue hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md">
                  Descoperă instrumentele
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link to="/resurse" className="inline-flex items-center justify-center gap-2 border-2 border-romania-blue text-romania-blue hover:bg-romania-blue/5 font-semibold py-3 px-6 rounded-lg transition-colors">
                  Vezi articolele utile
                </Link>
              </div>
            </div>

            {/* Summary card */}
            <div className="mt-12 max-w-md mx-auto bg-card border border-border rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-romania-blue/10 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-romania-blue" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Dashboard antreprenor</p>
                  <p className="text-xs text-muted-foreground">4 instrumente disponibile</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {TOOLS.map((tool) => (
                  <div key={tool.title} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <tool.icon className="h-3.5 w-3.5 text-romania-blue flex-shrink-0" />
                    <span className="truncate">{tool.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-foreground mb-4">
                De ce sunt utile aceste instrumente?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Aceste instrumente te ajută să iei decizii financiare mai bune, să monitorizezi cash flow-ul, să estimezi taxele și să evaluezi profitabilitatea afacerii tale din Belgia.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {BENEFITS.map((b) => (
                <div key={b.title} className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="h-12 w-12 mx-auto rounded-xl bg-romania-yellow/20 flex items-center justify-center mb-4">
                    <b.icon className="h-6 w-6 text-romania-blue" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section id="tools" className="py-16 md:py-20 bg-muted/30 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Instrumente disponibile
              </h2>
              <p className="text-muted-foreground">Alege instrumentul potrivit pentru nevoile tale.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {TOOLS.map((tool) => (
                <div key={tool.title} className="group bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:border-romania-blue/30 transition-all duration-300 flex flex-col relative overflow-hidden">
                  {tool.badge && (
                    <span className="absolute top-4 right-4 bg-romania-yellow text-foreground text-xs font-bold px-3 py-1 rounded-full">
                      {tool.badge}
                    </span>
                  )}
                  {!tool.available && (
                    <span className="absolute top-4 right-4 bg-muted text-muted-foreground text-xs font-medium px-3 py-1 rounded-full">
                      În curând
                    </span>
                  )}
                  <div className="h-12 w-12 rounded-xl bg-romania-blue/10 flex items-center justify-center mb-4 group-hover:bg-romania-blue/20 transition-colors">
                    <tool.icon className="h-6 w-6 text-romania-blue" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{tool.title}</h3>
                  <p className="text-sm text-muted-foreground mb-6 flex-1">{tool.description}</p>
                  {tool.available ? (
                    <Link
                      to={tool.route}
                      className="inline-flex items-center justify-center gap-2 bg-romania-blue hover:bg-blue-700 text-white font-semibold py-2.5 px-5 rounded-lg transition-colors text-sm w-full"
                    >
                      {tool.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="inline-flex items-center justify-center gap-2 bg-muted text-muted-foreground font-semibold py-2.5 px-5 rounded-lg text-sm w-full cursor-not-allowed"
                    >
                      {tool.cta}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Suggestions */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Cu ce să începi?
              </h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {SUGGESTIONS.map((s, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="h-10 w-10 rounded-lg bg-romania-blue/10 flex items-center justify-center mb-4">
                    <s.icon className="h-5 w-5 text-romania-blue" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{s.text}</p>
                  <p className="text-sm font-semibold text-foreground mb-3">→ Începe cu <span className="text-romania-blue">{s.tool}</span></p>
                  <Link to={s.route} className="text-sm font-medium text-romania-blue hover:underline inline-flex items-center gap-1">
                    Deschide
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Articles */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Articole utile pentru antreprenori
              </h2>
              <p className="text-muted-foreground">Citește mai mult despre subiectele financiare care contează.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {ARTICLES.map((a, i) => (
                <Link key={i} to={a.slug} className="flex items-start gap-3 bg-card border border-border rounded-xl p-5 hover:shadow-md hover:border-romania-blue/30 transition-all group">
                  <div className="h-9 w-9 rounded-lg bg-romania-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FileText className="h-4 w-4 text-romania-blue" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm group-hover:text-romania-blue transition-colors">{a.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">Articol · RO Business Hub</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Lead Capture */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto bg-card border border-border rounded-2xl shadow-lg p-8">
              <div className="text-center mb-6">
                <div className="h-12 w-12 mx-auto rounded-xl bg-romania-yellow/20 flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-romania-blue" />
                </div>
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-foreground mb-2">
                  Vrei să primești și alte resurse utile?
                </h2>
                <p className="text-sm text-muted-foreground">
                  Lasă-ne adresa ta de email și primești modele, ghiduri și articole practice pentru antreprenori români în Belgia.
                </p>
              </div>
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Nume"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-romania-blue/30 text-sm"
                />
                <input
                  type="email"
                  placeholder="Email *"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-romania-blue/30 text-sm"
                />
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={gdprConsent}
                    onChange={(e) => setGdprConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-border text-romania-blue focus:ring-romania-blue"
                  />
                  <span className="text-xs text-muted-foreground">
                    Sunt de acord cu{' '}
                    <Link to="/privacy-policy" className="text-romania-blue hover:underline">politica de confidențialitate</Link>
                    {' '}și accept să primesc emailuri cu resurse utile.
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-romania-blue hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Se trimite...' : 'Trimite-mi resursele'}
                </button>
              </form>
              <p className="text-xs text-muted-foreground text-center mt-4">
                🔒 Nu trimitem spam. Te poți dezabona oricând.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Întrebări frecvente
              </h2>
            </div>
            <div className="max-w-2xl mx-auto space-y-3">
              {FAQS.map((faq, i) => (
                <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left"
                  >
                    <span className="font-medium text-foreground text-sm pr-4">{faq.q}</span>
                    <ChevronDown className={`h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-4 animate-fade-in">
                      <p className="text-sm text-muted-foreground">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-16 md:py-20 bg-romania-blue">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-white mb-4">
              Construiești un business în Belgia?
            </h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Folosește resursele și instrumentele RO Business Hub pentru a lua decizii mai clare și mai sigure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/resurse" className="inline-flex items-center justify-center gap-2 bg-white text-romania-blue hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition-colors shadow-md">
                Vezi toate resursele
              </Link>
              <Link to="/add-business" className="inline-flex items-center justify-center gap-2 bg-romania-yellow hover:bg-yellow-400 text-foreground font-semibold py-3 px-6 rounded-lg transition-colors shadow-md">
                Adaugă afacerea
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default ToolsLandingPage;
