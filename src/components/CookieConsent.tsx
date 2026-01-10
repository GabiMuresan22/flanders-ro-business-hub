import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const CookieConsent = () => {
  const { language } = useLanguage();
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    localStorage.setItem("cookieConsent", JSON.stringify(allAccepted));
    setShowBanner(false);
  };

  const handleRejectNonEssential = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    localStorage.setItem("cookieConsent", JSON.stringify(essentialOnly));
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("cookieConsent", JSON.stringify(preferences));
    setShowBanner(false);
  };

  if (!showBanner) return null;

  const content = {
    en: {
      title: "Cookie Preferences",
      description: "We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can choose which cookies you allow.",
      essential: "Essential Cookies",
      essentialDesc: "Required for website functionality (authentication, security)",
      analytics: "Analytics Cookies",
      analyticsDesc: "Help us understand how visitors use our site",
      marketing: "Marketing Cookies",
      marketingDesc: "Used to deliver relevant advertisements",
      acceptAll: "Accept All",
      rejectNonEssential: "Reject Non-Essential",
      savePreferences: "Save Preferences",
      customize: "Customize",
      privacyPolicy: "Privacy Policy",
      learnMore: "Learn more in our",
    },
    ro: {
      title: "Preferințe Cookie-uri",
      description: "Folosim cookie-uri pentru a îmbunătăți experiența dvs. de navigare, pentru a analiza traficul pe site și pentru a personaliza conținutul. Puteți alege ce cookie-uri permiteți.",
      essential: "Cookie-uri Esențiale",
      essentialDesc: "Necesare pentru funcționalitatea site-ului (autentificare, securitate)",
      analytics: "Cookie-uri Analitice",
      analyticsDesc: "Ne ajută să înțelegem cum vizitatorii folosesc site-ul nostru",
      marketing: "Cookie-uri de Marketing",
      marketingDesc: "Folosite pentru a livra reclame relevante",
      acceptAll: "Acceptă Toate",
      rejectNonEssential: "Respinge Non-Esențiale",
      savePreferences: "Salvează Preferințe",
      customize: "Personalizează",
      privacyPolicy: "Politica de Confidențialitate",
      learnMore: "Aflați mai multe în",
    }
  };

  const t = content[language as keyof typeof content];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom">
      <Card className="max-w-4xl mx-auto p-6 shadow-lg bg-card border-border">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-foreground mb-2">{t.title}</h2>
            <p className="text-sm text-muted-foreground mb-4">
              {t.description}{" "}
              <Link to="/privacy-policy" className="text-primary hover:underline">
                {t.learnMore} {t.privacyPolicy}
              </Link>
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRejectNonEssential}
            className="ml-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {showDetails && (
          <div className="space-y-4 mb-4">
            <div className="flex items-start gap-3">
              <Checkbox
                checked={preferences.essential}
                disabled
                id="essential"
              />
              <div className="flex-1">
                <label htmlFor="essential" className="text-sm font-medium text-foreground">
                  {t.essential}
                </label>
                <p className="text-xs text-muted-foreground">{t.essentialDesc}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                checked={preferences.analytics}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, analytics: checked as boolean })
                }
                id="analytics"
              />
              <div className="flex-1">
                <label htmlFor="analytics" className="text-sm font-medium text-foreground">
                  {t.analytics}
                </label>
                <p className="text-xs text-muted-foreground">{t.analyticsDesc}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                checked={preferences.marketing}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, marketing: checked as boolean })
                }
                id="marketing"
              />
              <div className="flex-1">
                <label htmlFor="marketing" className="text-sm font-medium text-foreground">
                  {t.marketing}
                </label>
                <p className="text-xs text-muted-foreground">{t.marketingDesc}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {!showDetails ? (
            <>
              <Button onClick={handleAcceptAll} className="flex-1 sm:flex-none">
                {t.acceptAll}
              </Button>
              <Button
                onClick={() => setShowDetails(true)}
                variant="outline"
                className="flex-1 sm:flex-none"
              >
                {t.customize}
              </Button>
              <Button
                onClick={handleRejectNonEssential}
                variant="ghost"
                className="flex-1 sm:flex-none"
              >
                {t.rejectNonEssential}
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleSavePreferences} className="flex-1 sm:flex-none">
                {t.savePreferences}
              </Button>
              <Button
                onClick={handleAcceptAll}
                variant="outline"
                className="flex-1 sm:flex-none"
              >
                {t.acceptAll}
              </Button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};
