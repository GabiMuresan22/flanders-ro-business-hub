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

const ResourceDetailPage = () => {
  const { slug } = useParams();
  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

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

  return (
    <>
      <SEO
        title={`${resource.title} | Romanian Business Hub`}
        description={resource.excerpt || resource.title}
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
                alt={resource.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
              />
            )}

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge variant="secondary" className="bg-romania-blue/10 text-romania-blue">
                <Tag className="h-3 w-3 mr-1" />
                {resource.category}
              </Badge>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(resource.created_at).toLocaleDateString("ro-RO", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              {resource.title}
            </h1>

            {/* Content */}
            <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {resource.content.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </article>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ResourceDetailPage;
