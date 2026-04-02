import { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import type { FormSchema } from '@/lib/validation/businessFormSchema';
import { Languages } from 'lucide-react';

type InvokePayload = {
  success?: boolean;
  text?: string;
  error?: string;
  message?: string;
};

export function BusinessDescriptionTranslateButtons({ form }: { form: UseFormReturn<FormSchema> }) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [loadingEn, setLoadingEn] = useState(false);
  const [loadingNl, setLoadingNl] = useState(false);

  const description = form.watch('description');

  const run = async (target: 'EN' | 'NL') => {
    const src = (description || '').trim();
    if (src.length < 10) {
      toast({
        title: t('addBusiness.translateSourceTooShort'),
        variant: 'destructive',
      });
      return;
    }

    if (target === 'EN') setLoadingEn(true);
    else setLoadingNl(true);

    try {
      const { data, error } = await supabase.functions.invoke<InvokePayload>('translate-description', {
        body: { text: src, target },
      });

      if (error) {
        throw new Error(error.message || 'invoke failed');
      }

      const payload = data;
      if (!payload?.success) {
        if (payload?.error === 'NOT_CONFIGURED') {
          toast({
            title: t('addBusiness.translateNotConfigured'),
            description: payload.message,
            variant: 'destructive',
          });
          return;
        }
        throw new Error(payload?.message || t('addBusiness.translateError'));
      }

      const out = payload.text ?? '';
      if (target === 'EN') {
        form.setValue('descriptionEn', out, { shouldDirty: true, shouldValidate: true });
        toast({ title: t('addBusiness.translateSuccessEn') });
      } else {
        form.setValue('descriptionNl', out, { shouldDirty: true, shouldValidate: true });
        toast({ title: t('addBusiness.translateSuccessNl') });
      }
    } catch (e) {
      toast({
        title: t('addBusiness.translateError'),
        description: e instanceof Error ? e.message : undefined,
        variant: 'destructive',
      });
    } finally {
      setLoadingEn(false);
      setLoadingNl(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-dashed border-muted-foreground/40 bg-muted/30 p-3">
      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
        <Languages className="h-3.5 w-3.5 shrink-0" aria-hidden />
        {t('addBusiness.translateHelper')}
      </p>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={loadingEn || loadingNl}
          onClick={() => void run('EN')}
        >
          {loadingEn ? t('addBusiness.translating') : t('addBusiness.translateToEn')}
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={loadingEn || loadingNl}
          onClick={() => void run('NL')}
        >
          {loadingNl ? t('addBusiness.translating') : t('addBusiness.translateToNl')}
        </Button>
      </div>
    </div>
  );
}
