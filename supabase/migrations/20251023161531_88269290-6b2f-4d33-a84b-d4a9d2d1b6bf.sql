-- Create business_reports table
CREATE TABLE public.business_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reporter_email TEXT NOT NULL,
  issue_type TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.business_reports ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a report
CREATE POLICY "Anyone can submit business reports"
ON public.business_reports
FOR INSERT
WITH CHECK (true);

-- Users can view their own reports
CREATE POLICY "Users can view their own reports"
ON public.business_reports
FOR SELECT
USING (auth.uid() = user_id OR reporter_email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Admins can view all reports
CREATE POLICY "Admins can view all reports"
ON public.business_reports
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- Admins can update reports
CREATE POLICY "Admins can update reports"
ON public.business_reports
FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

-- Admins can delete reports
CREATE POLICY "Admins can delete reports"
ON public.business_reports
FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_business_reports_updated_at
BEFORE UPDATE ON public.business_reports
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();