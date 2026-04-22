import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Resource } from "@/types/resources";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Tag, Loader2, Download, CheckCircle2, BookOpen } from "lucide-react";
import {
  getNormalizedResourceCategory,
  getResourceCategoryLabel,
} from "@/lib/resourceCategories";

// ─── Pillar page: "Ce vei afla din acest ghid" ───────────────────────────────
const PILLAR_GUIDE_POINTS: Record<string, string[]> = {
  'taxe-zelfstandig-belgia-ghid-complet-2026': [
    'Ce taxe plătești ca independent (zelfstandig) în Belgia în 2026',
    'Cum se împart contribuțiile sociale și impozitul pe venit',
    'Exemple reale de calcul la diferite niveluri de venit',
    'Ce poți deduce legal din impozit',
    'Cum să planifici bani pentru taxe și să nu fii luat prin surprindere',
  ],
  'tva-btw-belgia-ghid-complet-2026': [
    'Ce este TVA (BTW) și cum funcționează în Belgia',
    'Când trebuie să te înregistrezi ca plătitor de TVA și care este pragul',
    'Cotele de TVA din Belgia (21%, 12%, 6%)',
    'Regimul special pentru micii întreprinzători (kleine onderneming)',
    'Cum calculezi TVA de plată și cum o optimizezi legal',
  ],
  'cat-ramane-in-mana-venituri-belgia-2026': [
    'Cât rămâne efectiv în mână după toate taxele în Belgia',
    'Exemple reale pentru diferite niveluri de venit brut',
    'Diferența dintre a fi angajat și independent în Belgia',
    'Cum poți optimiza legal venitul net',
    'Comparație: zelfstandig vs. SRL (BV) în Belgia',
  ],
};

// ─── Recommended articles per slug ───────────────────────────────────────────
/** A related article shown in the "Articole recomandate" section at the bottom of each article page. */
interface RelatedArticle { slug: string; title: string; excerpt: string; }

const ARTICLE_RECOMMENDATIONS: Record<string, RelatedArticle[]> = {
  'taxe-zelfstandig-belgia-ghid-complet-2026': [
    { slug: 'tva-btw-belgia-ghid-complet-2026', title: 'TVA în Belgia (BTW) – ghid complet 2026', excerpt: 'Când trebuie să te înregistrezi ca plătitor de TVA și cât plătești.' },
    { slug: 'cat-ramane-in-mana-venituri-belgia-2026', title: 'Cât rămâne în mână din veniturile tale în Belgia (2026)', excerpt: 'Exemple reale despre venitul net după toate taxele.' },
    { slug: 'cum-devii-independent-belgia-ghid-complet-2026', title: 'Cum devii independent în Belgia – ghid complet 2026', excerpt: 'Toți pașii pentru a deveni independent în Belgia în 2026.' },
  ],
  'tva-btw-belgia-ghid-complet-2026': [
    { slug: 'taxe-zelfstandig-belgia-ghid-complet-2026', title: 'Ce taxe plătești ca zelfstandig în Belgia – ghid complet 2026', excerpt: 'Contribuții sociale și impozit pe venit explicate simplu.' },
    { slug: 'cat-ramane-in-mana-venituri-belgia-2026', title: 'Cât rămâne în mână din veniturile tale în Belgia (2026)', excerpt: 'Calculează ce rămâne efectiv după toate taxele.' },
    { slug: 'srl-vs-nv-belgia-diferente-avantaje', title: 'SRL vs NV în Belgia – diferențe și avantaje', excerpt: 'Compară cele două forme juridice principale pentru afacerea ta.' },
  ],
  'cat-ramane-in-mana-venituri-belgia-2026': [
    { slug: 'taxe-zelfstandig-belgia-ghid-complet-2026', title: 'Ce taxe plătești ca zelfstandig în Belgia – ghid complet 2026', excerpt: 'Ghid complet despre contribuțiile sociale și impozitul pe venit.' },
    { slug: 'tva-btw-belgia-ghid-complet-2026', title: 'TVA în Belgia (BTW) – ghid complet 2026', excerpt: 'Ghid complet despre TVA pentru independenți și firme.' },
    { slug: 'srl-vs-nv-belgia-diferente-avantaje', title: 'SRL vs NV în Belgia – diferențe și avantaje', excerpt: 'Compară cele două forme juridice principale.' },
  ],
  'taxe-independent-belgia-2026': [
    { slug: 'taxe-zelfstandig-belgia-ghid-complet-2026', title: 'Ce taxe plătești ca zelfstandig în Belgia – ghid complet 2026', excerpt: 'Ghid complet și actualizat despre taxele pentru independenți.' },
    { slug: 'tva-btw-belgia-ghid-complet-2026', title: 'TVA în Belgia (BTW) – ghid complet 2026', excerpt: 'Când trebuie să te înregistrezi ca plătitor de TVA.' },
    { slug: 'cat-ramane-in-mana-venituri-belgia-2026', title: 'Cât rămâne în mână din veniturile tale în Belgia (2026)', excerpt: 'Calculează venitul net după toate taxele.' },
  ],
  'srl-vs-nv-belgia-diferente-avantaje': [
    { slug: 'taxe-zelfstandig-belgia-ghid-complet-2026', title: 'Ce taxe plătești ca zelfstandig în Belgia – ghid complet 2026', excerpt: 'Contribuții sociale și impozit pe venit pentru independenți.' },
    { slug: 'dividende-belgia-2026-ghid-complet', title: 'Dividende în Belgia 2026 – ghid complet', excerpt: 'Cum se impozitează dividendele și cum le poți optimiza.' },
    { slug: 'cum-devii-independent-belgia-ghid-complet-2026', title: 'Cum devii independent în Belgia – ghid complet 2026', excerpt: 'Toți pașii pentru a deveni independent sau a-ți deschide firmă.' },
  ],
  'cum-devii-independent-belgia-ghid-complet-2026': [
    { slug: 'taxe-zelfstandig-belgia-ghid-complet-2026', title: 'Ce taxe plătești ca zelfstandig în Belgia – ghid complet 2026', excerpt: 'Ce taxe vei plăti după ce devii independent.' },
    { slug: 'tva-btw-belgia-ghid-complet-2026', title: 'TVA în Belgia (BTW) – ghid complet 2026', excerpt: 'Când și cum te înregistrezi ca plătitor de TVA.' },
    { slug: 'checklist-primele-30-zile-independent-belgia', title: 'Checklist primele 30 zile ca independent în Belgia', excerpt: 'Ce trebuie să faci în primele 30 zile după ce devii independent.' },
  ],
  'checklist-primele-30-zile-independent-belgia': [
    { slug: 'cum-devii-independent-belgia-ghid-complet-2026', title: 'Cum devii independent în Belgia – ghid complet 2026', excerpt: 'Pașii pentru a deveni independent în Belgia.' },
    { slug: 'taxe-zelfstandig-belgia-ghid-complet-2026', title: 'Ce taxe plătești ca zelfstandig în Belgia – ghid complet 2026', excerpt: 'Ce taxe vei plăti ca independent.' },
    { slug: 'tva-btw-belgia-ghid-complet-2026', title: 'TVA în Belgia (BTW) – ghid complet 2026', excerpt: 'Ghid complet despre TVA pentru independenți.' },
  ],
  'peppol-belgia-2026-facturare-electronica-obligatorie': [
    { slug: 'tva-btw-belgia-ghid-complet-2026', title: 'TVA în Belgia (BTW) – ghid complet 2026', excerpt: 'Ghid complet despre TVA pentru independenți și firme.' },
    { slug: 'taxe-zelfstandig-belgia-ghid-complet-2026', title: 'Ce taxe plătești ca zelfstandig în Belgia – ghid complet 2026', excerpt: 'Contribuții sociale și impozit pe venit.' },
    { slug: 'srl-vs-nv-belgia-diferente-avantaje', title: 'SRL vs NV în Belgia – diferențe și avantaje', excerpt: 'Comparație între formele juridice principale.' },
  ],
  'impozitul-pe-dividende-belgia-2026': [
    { slug: 'dividende-belgia-2026-ghid-complet', title: 'Dividende în Belgia 2026 – ghid complet', excerpt: 'Ghid complet despre dividende în Belgia.' },
    { slug: 'srl-vs-nv-belgia-diferente-avantaje', title: 'SRL vs NV în Belgia – diferențe și avantaje', excerpt: 'Compară formele juridice și impactul fiscal.' },
    { slug: 'taxe-zelfstandig-belgia-ghid-complet-2026', title: 'Ce taxe plătești ca zelfstandig în Belgia – ghid complet 2026', excerpt: 'Contribuții sociale și impozit pe venit.' },
  ],
  'dividende-belgia-2026-ghid-complet': [
    { slug: 'srl-vs-nv-belgia-diferente-avantaje', title: 'SRL vs NV în Belgia – diferențe și avantaje', excerpt: 'Compară formele juridice și impactul fiscal.' },
    { slug: 'cat-ramane-in-mana-venituri-belgia-2026', title: 'Cât rămâne în mână din veniturile tale în Belgia (2026)', excerpt: 'Calculează venitul net după toate taxele.' },
    { slug: 'taxe-zelfstandig-belgia-ghid-complet-2026', title: 'Ce taxe plătești ca zelfstandig în Belgia – ghid complet 2026', excerpt: 'Contribuții sociale și impozit pe venit.' },
  ],
  'marketing-afacere-belgia-ghid-pas-cu-pas': [
    { slug: 'primirii-10-clienti-belgia-ghid-2026', title: 'Cum îți găsești primii 10 clienți în Belgia – ghid 2026', excerpt: 'Strategii practice pentru a atrage primii clienți.' },
    { slug: 'plan-marketing-12-luni-belgia-ghid-complet', title: 'Plan de marketing 12 luni Belgia – ghid complet', excerpt: 'Structurează-ți marketingul pe un an întreg.' },
    { slug: 'ghid-google-business-belgia-2026', title: 'Ghid Google Business Belgia 2026', excerpt: 'Cum să-ți optimizezi profilul Google Business.' },
  ],
  'plan-marketing-12-luni-belgia-ghid-complet': [
    { slug: 'marketing-afacere-belgia-ghid-pas-cu-pas', title: 'Marketing pentru afacerea ta în Belgia – ghid pas cu pas', excerpt: 'Cum să-ți faci singur marketingul pentru afacerea din Belgia.' },
    { slug: 'primirii-10-clienti-belgia-ghid-2026', title: 'Cum îți găsești primii 10 clienți în Belgia – ghid 2026', excerpt: 'Strategii practice pentru primii clienți.' },
    { slug: 'ghid-google-business-belgia-2026', title: 'Ghid Google Business Belgia 2026', excerpt: 'Optimizează-ți prezența pe Google.' },
  ],
  'ghid-google-business-belgia-2026': [
    { slug: 'marketing-afacere-belgia-ghid-pas-cu-pas', title: 'Marketing pentru afacerea ta în Belgia – ghid pas cu pas', excerpt: 'Ghid complet de marketing pentru afaceri din Belgia.' },
    { slug: 'primirii-10-clienti-belgia-ghid-2026', title: 'Cum îți găsești primii 10 clienți în Belgia – ghid 2026', excerpt: 'Atrage primii clienți pentru afacerea ta.' },
    { slug: 'plan-marketing-12-luni-belgia-ghid-complet', title: 'Plan de marketing 12 luni Belgia – ghid complet', excerpt: 'Planifică-ți marketingul pe termen lung.' },
  ],
  'primirii-10-clienti-belgia-ghid-2026': [
    { slug: 'marketing-afacere-belgia-ghid-pas-cu-pas', title: 'Marketing pentru afacerea ta în Belgia – ghid pas cu pas', excerpt: 'Ghid complet de marketing pentru afaceri din Belgia.' },
    { slug: 'ghid-google-business-belgia-2026', title: 'Ghid Google Business Belgia 2026', excerpt: 'Optimizează-ți profilul Google Business.' },
    { slug: 'checklist-primele-30-zile-independent-belgia', title: 'Checklist primele 30 zile ca independent în Belgia', excerpt: 'Toți pașii necesari în prima lună de independență.' },
  ],
  'cash-flow-antreprenori-belgia-ghid-practic': [
    { slug: 'taxe-zelfstandig-belgia-ghid-complet-2026', title: 'Ce taxe plătești ca zelfstandig în Belgia – ghid complet 2026', excerpt: 'Planifică-ți taxele pentru un cash flow sănătos.' },
    { slug: 'cat-ramane-in-mana-venituri-belgia-2026', title: 'Cât rămâne în mână din veniturile tale în Belgia (2026)', excerpt: 'Calculează venitul net disponibil.' },
    { slug: 'business-canvas-ghid-plan-afacere', title: 'Cum să îți construiești un Business Plan într-o singură pagină', excerpt: 'Model practic pentru planul tău de afaceri.' },
  ],
  'business-canvas-ghid-plan-afacere': [
    { slug: 'cash-flow-antreprenori-belgia-ghid-practic', title: 'Cash Flow pentru antreprenori în Belgia – ghid practic', excerpt: 'Gestionează fluxul de numerar al afacerii tale.' },
    { slug: 'cum-devii-independent-belgia-ghid-complet-2026', title: 'Cum devii independent în Belgia – ghid complet 2026', excerpt: 'Toți pașii pentru a deveni independent în Belgia.' },
    { slug: 'taxe-zelfstandig-belgia-ghid-complet-2026', title: 'Ce taxe plătești ca zelfstandig în Belgia – ghid complet 2026', excerpt: 'Contribuții sociale și impozit pe venit.' },
  ],
};

/** Get display string for resource based on language (EN/NL/RO with fallbacks). */
function getResourceDisplay(
  resource: Resource,
  language: 'en' | 'ro' | 'nl',
  field: 'title' | 'excerpt' | 'content'
): string {
  const r = resource as unknown as Record<string, string | null>;
  const base = r[field] || '';
  const en = r[`${field}_en`];
  const nl = r[`${field}_nl`];
  if (language === 'en') return en || base;
  if (language === 'nl') return nl || en || base;
  return base || en || nl || '';
}

const ResourceDetailPage = () => {
  const { slug } = useParams();
  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);
  const { t, language } = useLanguage();
  const dateLocale = language === 'nl' ? 'nl-BE' : language === 'en' ? 'en-GB' : 'ro-RO';

  useEffect(() => {
    const fetchResource = async () => {
      if (!slug) return;
      const { data, error } = await supabase
        .from("resources")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (!error && data) {
        setResource(data as unknown as Resource);
      }
      setLoading(false);
    };

    fetchResource();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-romania-blue" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!resource) {
    return (
      <>
        <SEO
          title={t('resources.notFound')}
          description={t('resources.notFoundMessage')}
          noindex
        />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow flex flex-col items-center justify-center py-20 px-4">
            <h1 className="font-playfair text-2xl font-bold text-gray-900 mb-4">
              {t('resources.notFound')}
            </h1>
            <p className="text-gray-600 mb-6">{t('resources.notFoundMessage')}</p>
            <Link to="/resurse">
              <Button>{t('resources.backToResources')}</Button>
            </Link>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  const displayTitle = getResourceDisplay(resource, language, 'title');
  const displayExcerpt = getResourceDisplay(resource, language, 'excerpt');
  const displayContent = getResourceDisplay(resource, language, 'content');
  const categoryLabel = getResourceCategoryLabel(
    getNormalizedResourceCategory(resource),
    t,
  );

  const BASE_URL = 'https://www.ro-businesshub.be';
  const resourceUrl = `${BASE_URL}/resurse/${resource.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": displayTitle,
    "description": displayExcerpt || displayTitle,
    "image": resource.image_url ? [resource.image_url] : undefined,
    "datePublished": resource.created_at,
    "dateModified": resource.created_at,
    "author": {
      "@type": "Organization",
      "name": "Romanian Business Hub",
      "url": BASE_URL
    },
    "publisher": {
      "@type": "Organization",
      "name": "Romanian Business Hub",
      "url": BASE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/favicon.svg`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": resourceUrl
    }
  };

  // FAQ schema for articles with FAQ sections
  const faqItems: { q: string; a: string }[] = [];
  if (resource.slug === 'taxe-independent-belgia-2026') {
    faqItems.push(
      { q: 'Cât plătești taxe ca independent în Belgia?', a: 'Totalul taxelor (contribuții sociale + impozit pe venit) variază de obicei între 30% și 55% din profit, în funcție de cât câștigi și ce cheltuieli deductibile ai.' },
      { q: 'Taxele sunt mai mari decât în România?', a: 'Da, în general taxele în Belgia sunt semnificativ mai mari decât în România, mai ales impozitul pe venit progresiv. România aplică un impozit fix de 10%, pe când în Belgia poate ajunge și la 50%.' },
      { q: 'Pot reduce taxele legal?', a: 'Da. Prin deduceri corecte ale cheltuielilor profesionale, planificare fiscală și colaborare cu un contabil, poți reduce semnificativ suma impozitelor.' },
      { q: 'Am nevoie de contabil?', a: 'Nu este obligatoriu legal, dar este foarte recomandat. Un contabil bun te poate ajuta să economisești mai mult decât costul serviciului și te ferește de greșeli fiscale costisitoare.' },
      { q: 'Se calculează taxele pe venit sau pe profit?', a: 'Taxele se calculează pe profitul net, adică venitul minus cheltuielile deductibile. Nu plătești impozit pe toată suma facturată.' },
    );
  } else if (resource.slug === 'marketing-afacere-belgia-ghid-pas-cu-pas') {
    faqItems.push(
      { q: 'Am nevoie de o agentie de marketing pentru afacerea mea in Belgia?', a: 'Nu. Poti incepe singur cu pasi simpli: Google Business Profile, recenzii, poze si postari constante pe social media. O agentie poate ajuta mai tarziu, dar nu este necesara la inceput.' },
      { q: 'Cat costa sa iti faci singur marketingul?', a: 'Costul poate fi zero. Google Business Profile este gratuit, postarea pe Facebook este gratuita, iar cererea de recenzii nu costa nimic. Singura investitie reala este timpul tau.' },
      { q: 'Cat de repede voi vedea rezultate?', a: 'Daca aplici planul de 30 de zile din acest ghid in mod constant, vei observa primele rezultate (mai multe apeluri, mesaje, vizite) dupa 2-4 saptamani.' },
      { q: 'Ce este cel mai important lucru pe care trebuie sa il fac?', a: 'Sa iti creezi si sa iti optimizezi profilul Google Business. Acesta este cel mai important canal pentru clienti locali in Belgia.' },
      { q: 'Trebuie sa postez in fiecare zi pe social media?', a: 'Nu. Un plan de 2-3 postari pe saptamana este suficient. Important este sa fii constant, nu sa postezi mult.' },
    );
  } else if (resource.slug === 'checklist-primele-30-zile-independent-belgia') {
    faqItems.push(
      { q: 'Ce trebuie sa fac in primele 30 de zile ca independent in Belgia?', a: 'Trebuie sa acoperi 3 zone: administrativ (cont bancar, TVA, contabil), financiar (facturare, organizare documente) si marketing (Google Business, pagina web, continut constant).' },
      { q: 'Am nevoie de contabil de la inceput?', a: 'Da, este foarte recomandat. Un contabil bun te ajuta sa platesti corect taxele, iti ofera claritate si iti protejeaza afacerea de la inceput.' },
      { q: 'Cum atrag clienti fara buget de marketing?', a: 'Concentreaza-te pe Google Business Profile (gratuit), cere recenzii de la clienti multumiti, posteaza constant pe social media si fii activ in comunitati locale.' },
      { q: 'Cat de repede pot vedea rezultate?', a: 'Daca urmezi planul de 30 de zile din acest ghid cu consistenta, vei observa primele rezultate (apeluri, mesaje, clienti noi) dupa 2-4 saptamani.' },
    );
  } else if (resource.slug === 'plan-marketing-12-luni-belgia-ghid-complet') {
    faqItems.push(
      { q: 'De ce am nevoie de un plan de marketing pe 12 luni?', a: 'Un plan pe 12 luni iti ofera claritate, control si rezultate predictibile. Fara el, marketingul tau va fi haotic si inconsistent.' },
      { q: 'Pot face marketing fara o echipa dedicata?', a: 'Da. Acest ghid este conceput pentru antreprenori care lucreaza singuri. Structura in 4 faze te ajuta sa organizezi totul pas cu pas.' },
      { q: 'Care este cea mai mare greseala in marketing?', a: 'Lipsa unei strategii clare. Majoritatea antreprenorilor fac activitati de marketing fara obiective, fara masurare si fara consistenta.' },
      { q: 'Cat de repede voi vedea rezultate?', a: 'Primele rezultate apar de obicei dupa faza de fundatie (lunile 1-3). Rezultate consistente si predictibile apar dupa 6-9 luni de executie organizata.' },
      { q: 'Ce canale de marketing ar trebui sa aleg?', a: 'Pentru majoritatea afacerilor din Belgia, focusul pe 2-3 canale (website, Facebook/Instagram, email marketing) aduce rezultate mai bune decat prezenta slaba peste tot.' },
    );
  } else if (resource.slug === 'tva-btw-belgia-ghid-complet-2026') {
    faqItems.push(
      { q: 'Cand trebuie sa ma inregistrez pentru TVA in Belgia?', a: 'Daca venitul tau anual depaseste 25.000 EUR, trebuie sa te inregistrezi ca platitor de TVA. Sub acest prag poti beneficia de regimul de scutire (kleine onderneming).' },
      { q: 'Cat este TVA standard in Belgia?', a: 'Cota standard de TVA in Belgia este 21%. Exista si cote reduse de 12% (restaurante) si 6% (alimente, constructii in anumite conditii).' },
      { q: 'Ce se intampla daca depasesc pragul de 25.000 EUR si nu ma inregistrez?', a: 'Risti penalitati, taxe retroactive si amenzi. Este important sa monitorizezi constant veniturile si sa te inregistrezi la timp.' },
      { q: 'Cum se calculeaza TVA de plata?', a: 'TVA de plata = TVA colectata (de la clienti) minus TVA deductibila (de la cheltuieli). Platesti doar diferenta catre stat.' },
      { q: 'Pot optimiza TVA-ul legal?', a: 'Da. Prin deducerea tuturor cheltuielilor eligibile, alegerea corecta a regimului TVA si colaborarea cu un contabil bun poti optimiza semnificativ.' },
    );
  } else if (resource.slug === 'peppol-belgia-2026-facturare-electronica-obligatorie') {
    faqItems.push(
      { q: 'Ce este PEPPOL?', a: 'PEPPOL (Pan-European Public Procurement Online) este un sistem standardizat pentru trimiterea facturilor electronice direct intre sisteme contabile, fara PDF sau email.' },
      { q: 'Cand devine obligatoriu PEPPOL in Belgia?', a: 'De la 1 aprilie 2026, facturarea electronica prin PEPPOL devine obligatorie pentru toate tranzactiile B2B in Belgia.' },
      { q: 'Cine este obligat sa foloseasca PEPPOL?', a: 'Toti independentii, SRL-urile, SA-urile si orice firma inregistrata in Belgia care emite facturi B2B, indiferent de marimea afacerii.' },
      { q: 'Mai pot trimite facturi PDF pe email dupa 2026?', a: 'Nu. Dupa 1 aprilie 2026, facturile PDF trimise pe email nu vor mai fi considerate conforme pentru tranzactiile B2B.' },
      { q: 'Ce risc daca nu implementez PEPPOL?', a: 'Risti ca facturile sa fie considerate invalide, probleme la deduceri TVA, intarzieri la plati si posibile sanctiuni fiscale.' },
    );
  } else if (resource.slug === 'srl-vs-nv-belgia-diferente-avantaje') {
    faqItems.push(
      { q: 'SRL si NV au raspundere limitata?', a: 'Da, ambele forme juridice ofera raspundere limitata in Belgia. Patrimoniul personal este protejat in ambele cazuri.' },
      { q: 'Pot incepe singur un SRL?', a: 'Da, SRL (BV) poate avea un singur fondator. Este cea mai populara optiune pentru antreprenorii solo din Belgia.' },
      { q: 'Pot incepe singur un NV?', a: 'Da, dar rar are sens fara investitori. Capitalul minim de 61.500 EUR si structura complexa fac NV nepotrivit pentru inceput.' },
      { q: 'Care este mai bun pentru un roman in Belgia?', a: 'In majoritatea cazurilor, SRL (BV) este alegerea potrivita. Ofera flexibilitate, costuri mai mici si o structura simpla, ideala pentru IMM-uri si servicii.' },
      { q: 'Pot trece de la SRL la NV?', a: 'Da, dar implica costuri si modificari juridice. Este posibil sa transformi un SRL in NV pe masura ce afacerea creste si ai nevoie de o structura mai complexa.' },
    );
  }

  const faqSchema = faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      }
    }))
  } : null;

  return (
    <>
      <StructuredData data={articleSchema} />
      {faqSchema && <StructuredData data={faqSchema} />}
      <SEO
        title={`${displayTitle} | Romanian Business Hub`}
        description={displayExcerpt || displayTitle}
        keywords={`${displayTitle}, Romanian business resources, West Flanders Belgium, ${categoryLabel}`}
        type="article"
      />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Back link */}
            <Link
              to="/resurse"
              className="inline-flex items-center text-romania-blue hover:underline mb-6 gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('resources.backToResources')}
            </Link>

            {/* Cover image */}
            {resource.image_url && (
              <img
                src={resource.image_url}
                alt={displayTitle}
                className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
              />
            )}

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge variant="secondary" className="bg-romania-blue/10 text-romania-blue">
                <Tag className="h-3 w-3 mr-1" />
                {categoryLabel}
              </Badge>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(resource.created_at).toLocaleDateString(dateLocale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              {displayTitle}
            </h1>

            {/* Pillar: "Ce vei afla din acest ghid" */}
            {PILLAR_GUIDE_POINTS[resource.slug] && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h2 className="font-playfair text-xl font-bold text-gray-900 mb-4">
                  Ce vei afla din acest ghid
                </h2>
                <ul className="space-y-2">
                  {PILLAR_GUIDE_POINTS[resource.slug].map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA 1 – after intro / before content */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-gray-800 font-medium">
                Vrei să știi exact cât ai de plătit în cazul tău?
              </p>
              <Link to="/contact" className="shrink-0">
                <Button className="w-full sm:w-auto bg-romania-blue hover:bg-romania-blue/90">
                  → Contactează-mă
                </Button>
              </Link>
            </div>

            {/* Content */}
            <article
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed
                prose-headings:font-playfair prose-headings:text-gray-900
                prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2
                prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:mb-4 prose-p:leading-relaxed
                prose-ul:my-4 prose-ul:pl-6 prose-li:mb-2
                prose-table:my-6 prose-table:w-full prose-table:border-collapse
                prose-th:bg-romania-blue prose-th:text-left prose-th:p-3 prose-th:text-sm prose-th:font-semibold prose-th:text-white prose-th:border prose-th:border-gray-200
                prose-td:p-3 prose-td:text-sm prose-td:border prose-td:border-gray-200
                prose-blockquote:border-l-4 prose-blockquote:border-romania-blue prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:my-6
                prose-a:text-romania-blue prose-a:underline hover:prose-a:text-romania-blue/80
                prose-strong:text-gray-800"
              dangerouslySetInnerHTML={{ __html: displayContent }}
            />

            {/* Download PDF */}
            {resource.slug === 'business-canvas-ghid-plan-afacere' && (
              <div className="mt-8 p-4 bg-romania-blue/5 border border-romania-blue/20 rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{language === 'nl' ? 'Download het sjabloon' : language === 'en' ? 'Download the template' : 'Descarcă modelul'}</p>
                  <p className="text-sm text-gray-600">{language === 'nl' ? 'Model Plan de Afaceri (PDF)' : language === 'en' ? 'Business Plan Template (PDF)' : 'Model Plan de Afaceri (PDF)'}</p>
                </div>
                <a
                  href="/downloads/model-plan-afaceri.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <Button variant="default" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                </a>
              </div>
            )}

            {/* CTA 2 – after main content */}
            <div className="mt-10 bg-romania-blue/5 border border-romania-blue/20 rounded-lg p-6">
              <p className="text-gray-800 font-medium mb-3">
                Dacă situația ta este mai complexă, îți pot explica exact ce ai de făcut.
              </p>
              <Link to="/contact">
                <Button variant="outline" className="border-romania-blue text-romania-blue hover:bg-romania-blue hover:text-white">
                  → Vezi serviciile
                </Button>
              </Link>
            </div>

            {/* Articole recomandate */}
            {ARTICLE_RECOMMENDATIONS[resource.slug] && (
              <section className="mt-12">
                <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-romania-blue" />
                  Articole recomandate
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {ARTICLE_RECOMMENDATIONS[resource.slug].map((art) => (
                    <Link
                      key={art.slug}
                      to={`/resurse/${art.slug}`}
                      className="block border border-gray-200 rounded-lg p-4 hover:border-romania-blue hover:shadow-md transition-all duration-200 group"
                    >
                      <h3 className="font-semibold text-gray-900 group-hover:text-romania-blue text-sm mb-1 leading-snug">
                        {art.title}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-2">{art.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* CTA final */}
            <div className="mt-10 mb-4 bg-romania-blue text-white rounded-lg p-8 text-center">
              <h2 className="font-playfair text-2xl font-bold mb-3">
                Ai nevoie de ajutor pentru taxe sau deschiderea unei afaceri în Belgia?
              </h2>
              <p className="text-white/85 mb-6 text-base">
                Îți explic exact ce trebuie să faci, în funcție de situația ta concretă.
              </p>
              <Link to="/contact">
                <Button className="bg-amber-400 hover:bg-amber-300 text-black font-bold px-8 py-3 text-base">
                  👉 Contactează-mă
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ResourceDetailPage;
