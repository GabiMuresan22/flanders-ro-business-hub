import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Resource } from "@/types/resources";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Tag, Loader2 } from "lucide-react";
import { textToHtml } from "@/lib/utils";

/** Get display string for resource based on language (EN/NL/RO with fallbacks). */
function getResourceDisplay(
  resource: Resource,
  language: 'en' | 'ro' | 'nl',
  field: 'title' | 'excerpt' | 'content'
): string {
  const base = (resource as Record<string, string | null>)[field] || '';
  const en = (resource as Record<string, string | null>)[`${field}_en`];
  const nl = (resource as Record<string, string | null>)[`${field}_nl`];
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
    );
  }

  const displayTitle = getResourceDisplay(resource, language, 'title');
  const displayExcerpt = getResourceDisplay(resource, language, 'excerpt');
  const displayContent = getResourceDisplay(resource, language, 'content');
  const displayContentHtml = textToHtml(displayContent);
  const categoryLabel = t(`resources.categories.${resource.category}`) !== `resources.categories.${resource.category}` ? t(`resources.categories.${resource.category}`) : resource.category;

  return (
    <>
      <SEO
        title={`${displayTitle} | Romanian Business Hub`}
        description={displayExcerpt || displayTitle}
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

            {/* Content */}
            <article
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed
                prose-headings:font-playfair prose-headings:text-gray-900
                prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2
                prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:mb-4 prose-p:leading-relaxed
                prose-ul:my-4 prose-ul:pl-6 prose-li:mb-2
                prose-table:my-6 prose-table:w-full prose-table:border-collapse
                prose-th:bg-romania-blue/10 prose-th:text-left prose-th:p-3 prose-th:text-sm prose-th:font-semibold prose-th:text-gray-800 prose-th:border prose-th:border-gray-200
                prose-td:p-3 prose-td:text-sm prose-td:border prose-td:border-gray-200
                prose-blockquote:border-l-4 prose-blockquote:border-romania-blue prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:my-6
                prose-a:text-romania-blue prose-a:underline hover:prose-a:text-romania-blue/80
                prose-strong:text-gray-800"
              dangerouslySetInnerHTML={{ __html: displayContentHtml }}
            />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ResourceDetailPage;
