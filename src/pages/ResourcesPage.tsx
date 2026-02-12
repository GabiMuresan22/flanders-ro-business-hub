import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Resource } from "@/types/resources";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2, BookOpen } from "lucide-react";

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

const ResourcesPage = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { t, language } = useLanguage();
  const dateLocale = language === 'nl' ? 'nl-BE' : language === 'en' ? 'en-GB' : 'ro-RO';

  useEffect(() => {
    const fetchResources = async () => {
      const { data, error } = await supabase
        .from("resources")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (!error && data) {
        const list = (data as unknown as Resource[]).filter(
          (r) => r.category?.toLowerCase() !== "marketing"
        );
        setResources(list);
      }
      setLoading(false);
    };

    fetchResources();
  }, []);

  const categories = ["All", ...new Set(resources.map((r) => r.category))];

  const filteredResources =
    selectedCategory === "All"
      ? resources
      : resources.filter((r) => r.category === selectedCategory);

  return (
    <>
      <SEO
        title={t('resources.seoTitle')}
        description={t('resources.seoDescription')}
        keywords={t('resources.seoKeywords')}
        type="website"
      />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {/* Header */}
          <div className="bg-romania-blue py-12">
            <div className="container mx-auto px-4 text-center">
              <h1 className="font-playfair text-3xl md:text-4xl font-bold text-white">
                {t('resources.title')}
              </h1>
              <p className="text-white/80 mt-3 max-w-2xl mx-auto">
                {t('resources.subtitle')}
              </p>
            </div>
          </div>

          <section className="py-12">
            <div className="container mx-auto px-4">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 justify-center mb-10">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    onClick={() => setSelectedCategory(cat)}
                    className="rounded-full"
                    size="sm"
                  >
                    {cat === "All" ? t('resources.allCategories') : (t(`resources.categories.${cat}`) !== `resources.categories.${cat}` ? t(`resources.categories.${cat}`) : cat)}
                  </Button>
                ))}
              </div>

              {loading ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="h-10 w-10 animate-spin text-romania-blue" />
                </div>
              ) : filteredResources.length === 0 ? (
                <div className="text-center py-20">
                  <BookOpen className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg">{t('resources.noResources')}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredResources.map((resource) => {
                    const displayTitle = getResourceDisplay(resource, language, 'title');
                    const displayExcerpt = getResourceDisplay(resource, language, 'excerpt');
                    const categoryLabel = t(`resources.categories.${resource.category}`) !== `resources.categories.${resource.category}` ? t(`resources.categories.${resource.category}`) : resource.category;
                    return (
                      <Card
                        key={resource.id}
                        className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02]"
                      >
                        {resource.image_url && (
                          <div className="h-48 overflow-hidden">
                            <img
                              src={resource.image_url}
                              alt={displayTitle}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="secondary" className="bg-romania-blue/10 text-romania-blue">
                              {categoryLabel}
                            </Badge>
                            <span className="text-xs text-gray-400">
                              {new Date(resource.created_at).toLocaleDateString(dateLocale)}
                            </span>
                          </div>
                          <CardTitle className="text-lg font-playfair transition-colors duration-300 group-hover:text-romania-blue">
                            {displayTitle}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 text-sm line-clamp-3">
                            {displayExcerpt}
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Link to={`/resurse/${resource.slug}`} className="w-full">
                            <Button
                              variant="outline"
                              className="w-full transition-all duration-300 group-hover:bg-romania-blue group-hover:text-white group-hover:border-romania-blue"
                            >
                              {t('resources.readMore')}
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ResourcesPage;
