import { Cookie } from "lucide-react";
import { openCookiePreferences } from "./CookieConsent";
import { useLanguage } from "@/contexts/LanguageContext";

const labels: Record<string, string> = {
  en: "Cookie preferences",
  ro: "Preferințe cookie",
  nl: "Cookievoorkeuren",
};

const CookieSettingsButton = () => {
  const { language } = useLanguage();
  const label = labels[language] ?? labels.en;

  return (
    <button
      onClick={openCookiePreferences}
      aria-label={label}
      title={label}
      className="fixed bottom-6 left-6 z-40 h-11 w-11 rounded-full bg-card border border-border shadow-lg flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary transition-colors"
    >
      <Cookie className="h-5 w-5" />
    </button>
  );
};

export default CookieSettingsButton;
