
-- Create the table for resources/articles
CREATE TABLE public.resources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT,
    is_published BOOLEAN DEFAULT true NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can read published resources
CREATE POLICY "Public can view published resources" 
ON public.resources FOR SELECT 
USING (is_published = true);

-- Policy: Admins can manage all resources
CREATE POLICY "Admins can insert resources"
ON public.resources FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update resources"
ON public.resources FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete resources"
ON public.resources FOR DELETE
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Admins can view all resources (including unpublished)
CREATE POLICY "Admins can view all resources"
ON public.resources FOR SELECT
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Insert seed data
INSERT INTO public.resources (title, slug, category, excerpt, content, image_url)
VALUES 
('Cum să îți înregistrezi o afacere în Belgia', 'inregistrare-afacere-belgia', 'Legal', 'Ghid complet despre pașii necesari pentru a deschide o firmă în Belgia.', 'Acesta este conținutul detaliat despre cum să deschizi o firmă în Belgia. Primul pas este să alegi structura juridică potrivită pentru afacerea ta. În Belgia, cele mai comune forme sunt: SRL (Société à Responsabilité Limitée), SA (Société Anonyme) și întreprindere individuală.', 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2070'),
('Marketing Digital pentru începători', 'marketing-digital-incepatori', 'Marketing', 'Strategii de bază pentru a-ți promova afacerea pe social media și online.', 'Marketingul digital este esențial pentru orice afacere modernă. În acest ghid, vom acoperi principalele canale de marketing digital: Social Media Marketing, SEO (Search Engine Optimization), Email Marketing și Google Ads.', 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=2074');
