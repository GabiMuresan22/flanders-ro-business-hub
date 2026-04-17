import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

// Global function to open cookie preferences from anywhere (e.g. footer link)
export const openCookiePreferences = () => {
  window.dispatchEvent(new CustomEvent("open-cookie-preferences"));
};

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

type Tab = "consent" | "details" | "about";

const STORAGE_KEY = "cookieConsent";

const translations = {
  en: {
    brand: "Cookie preferences",
    tabs: { consent: "Consent", details: "Details", about: "About" },
    title: "This website uses cookies",
    description:
      "We use cookies to ensure the website works correctly, to analyze traffic, and to improve your experience. You can choose which categories to allow. For more information, see our",
    privacyPolicy: "Privacy Policy",
    categories: {
      essential: "Necessary",
      analytics: "Analytics",
      marketing: "Marketing",
    },
    details: {
      essential: "Essential for the website to function. Stores your cookie consent choice. Cannot be disabled.",
      analytics: "Help us understand how visitors interact with the website by collecting anonymous information (Google Analytics).",
      marketing: "Used to deliver relevant advertisements and measure ad performance.",
    },
    about: [
      "Cookies are small text files stored on your device. This website uses them only for essential functionality and, with your consent, for analytics and marketing.",
      "You can change or withdraw your consent at any time using the cookie button in the bottom-left corner of the page.",
    ],
    deny: "Deny",
    allowSelection: "Allow selection",
    allowAll: "Allow all",
    openLabel: "Open cookie preferences",
  },
  ro: {
    brand: "Preferințe cookie",
    tabs: { consent: "Consimțământ", details: "Detalii", about: "Despre" },
    title: "Acest site folosește cookie-uri",
    description:
      "Folosim cookie-uri pentru a asigura funcționarea corectă a site-ului, pentru a analiza traficul și pentru a îmbunătăți experiența ta. Poți alege ce categorii permiți. Pentru mai multe informații, consultă",
    privacyPolicy: "Politica de Confidențialitate",
    categories: {
      essential: "Necesare",
      analytics: "Analitice",
      marketing: "Marketing",
    },
    details: {
      essential: "Esențiale pentru funcționarea site-ului. Stochează alegerea ta privind cookie-urile. Nu pot fi dezactivate.",
      analytics: "Ne ajută să înțelegem cum interacționează vizitatorii cu site-ul, colectând informații anonime (Google Analytics).",
      marketing: "Folosite pentru a livra reclame relevante și a măsura performanța lor.",
    },
    about: [
      "Cookie-urile sunt fișiere text mici stocate pe dispozitivul tău. Acest site le folosește doar pentru funcționalitate esențială și, cu acordul tău, pentru analitice și marketing.",
      "Îți poți schimba sau retrage consimțământul oricând folosind butonul cookie din colțul stânga jos al paginii.",
    ],
    deny: "Refuză",
    allowSelection: "Permite selecția",
    allowAll: "Permite tot",
    openLabel: "Deschide preferințele cookie",
  },
  nl: {
    brand: "Cookievoorkeuren",
    tabs: { consent: "Toestemming", details: "Details", about: "Over" },
    title: "Deze website gebruikt cookies",
    description:
      "We gebruiken cookies om ervoor te zorgen dat de website correct werkt, om het verkeer te analyseren en om uw ervaring te verbeteren. U kunt kiezen welke categorieën u toestaat. Voor meer informatie, zie ons",
    privacyPolicy: "Privacybeleid",
    categories: {
      essential: "Noodzakelijk",
      analytics: "Statistieken",
      marketing: "Marketing",
    },
    details: {
      essential: "Essentieel voor het functioneren van de website. Slaat uw cookietoestemming op. Kan niet worden uitgeschakeld.",
      analytics: "Helpen ons te begrijpen hoe bezoekers met de website omgaan door anonieme informatie te verzamelen (Google Analytics).",
      marketing: "Gebruikt om relevante advertenties te tonen en de prestaties ervan te meten.",
    },
    about: [
      "Cookies zijn kleine tekstbestanden die op uw apparaat worden opgeslagen. Deze website gebruikt ze alleen voor essentiële functionaliteit en, met uw toestemming, voor analyses en marketing.",
      "U kunt uw toestemming op elk moment wijzigen of intrekken via de cookieknop linksonder op de pagina.",
    ],
    deny: "Weigeren",
    allowSelection: "Selectie toestaan",
    allowAll: "Alles toestaan",
    openLabel: "Cookievoorkeuren openen",
  },
};

export const CookieConsent = () => {
  const { language } = useLanguage();
  const [showBanner, setShowBanner] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("consent");
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  const t = translations[language as keyof typeof translations] ?? translations.en;

  useEffect(() => {
    try {
      const consent = localStorage.getItem(STORAGE_KEY);
      if (!consent) {
        setShowBanner(true);
      } else {
        const parsed = JSON.parse(consent) as Partial<CookiePreferences>;
        setPreferences({
          essential: true,
          analytics: !!parsed.analytics,
          marketing: !!parsed.marketing,
        });
      }
    } catch {
      setShowBanner(true);
    }

    const handleOpen = () => {
      setActiveTab("consent");
      setShowBanner(true);
    };
    window.addEventListener("open-cookie-preferences", handleOpen);
    return () => window.removeEventListener("open-cookie-preferences", handleOpen);
  }, []);

  const saveAndNotify = (prefs: CookiePreferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // localStorage may be blocked
    }
    window.dispatchEvent(new Event("cookieConsentUpdated"));
    setShowBanner(false);
  };

  const handleAllowAll = () =>
    saveAndNotify({ essential: true, analytics: true, marketing: true });

  const handleDeny = () =>
    saveAndNotify({ essential: true, analytics: false, marketing: false });

  const handleAllowSelection = () => saveAndNotify(preferences);

  const toggle = (key: "analytics" | "marketing") =>
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));

  if (!showBanner) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-background/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="w-full max-w-3xl bg-card border border-border rounded-lg shadow-2xl animate-in slide-in-from-bottom-4 duration-300 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5">
          <span className="text-lg font-semibold text-foreground">
            RO Business Hub<span className="text-primary">.</span>
          </span>
          <span className="text-xs text-muted-foreground">{t.brand}</span>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-3 border-b border-border mt-4">
          {(["consent", "details", "about"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 text-sm font-medium transition-colors relative ${
                activeTab === tab
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.tabs[tab]}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="px-6 py-5 max-h-[50vh] overflow-y-auto">
          {activeTab === "consent" && (
            <div className="space-y-4">
              <h2 id="cookie-title" className="text-base font-semibold text-foreground">
                {t.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t.description}{" "}
                <Link to="/privacy-policy" className="text-primary hover:underline">
                  {t.privacyPolicy}
                </Link>
                .
              </p>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <CategoryToggle label={t.categories.essential} checked disabled />
                <CategoryToggle
                  label={t.categories.analytics}
                  checked={preferences.analytics}
                  onChange={() => toggle("analytics")}
                />
                <CategoryToggle
                  label={t.categories.marketing}
                  checked={preferences.marketing}
                  onChange={() => toggle("marketing")}
                />
              </div>
            </div>
          )}

          {activeTab === "details" && (
            <div className="space-y-4 text-sm text-muted-foreground">
              <DetailRow title={t.categories.essential} description={t.details.essential} />
              <DetailRow title={t.categories.analytics} description={t.details.analytics} />
              <DetailRow title={t.categories.marketing} description={t.details.marketing} />
            </div>
          )}

          {activeTab === "about" && (
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              {t.about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p>
                <Link to="/privacy-policy" className="text-primary hover:underline">
                  {t.privacyPolicy}
                </Link>
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-6 pb-5 pt-2 border-t border-border">
          <Button variant="outline" size="sm" onClick={handleDeny}>
            {t.deny}
          </Button>
          <Button variant="outline" size="sm" onClick={handleAllowSelection}>
            {t.allowSelection}
          </Button>
          <Button size="sm" onClick={handleAllowAll}>
            {t.allowAll}
          </Button>
        </div>
      </div>
    </div>
  );
};

const CategoryToggle = ({
  label,
  checked,
  onChange,
  disabled,
}: {
  label: string;
  checked: boolean;
  onChange?: () => void;
  disabled?: boolean;
}) => (
  <div className="flex flex-col items-center justify-center gap-2 p-3 rounded-md border border-border bg-background/50">
    <span className="text-xs font-medium text-foreground text-center">{label}</span>
    <Switch
      checked={checked}
      onCheckedChange={onChange}
      disabled={disabled}
      aria-label={label}
    />
  </div>
);

const DetailRow = ({ title, description }: { title: string; description: string }) => (
  <div className="pb-3 border-b border-border/50 last:border-0">
    <p className="text-sm font-semibold text-foreground mb-1">{title}</p>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);
