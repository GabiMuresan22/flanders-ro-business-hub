export interface Resource {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string;
  image_url: string | null;
  created_at: string;
  is_published: boolean;
  title_en: string | null;
  excerpt_en: string | null;
  content_en: string | null;
}
