import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, ShieldCheck } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { CashFlowTranslations } from '@/translations/cashflow';

interface Props {
  t: CashFlowTranslations;
}

export default function CashFlowLeadCapture({ t }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gdpr, setGdpr] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !gdpr) {
      toast({ title: t.leadValidation, variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from('newsletter_subscribers').insert({ email: email.trim().toLowerCase() });
      if (error && error.code !== '23505') throw error;
      toast({ title: t.leadSuccess, description: t.leadSuccessDesc });
      setName('');
      setEmail('');
      setGdpr(false);
    } catch {
      toast({ title: t.leadError, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <Card className="max-w-lg mx-auto border-2 border-primary/20 shadow-lg">
          <CardContent className="pt-8 pb-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="mx-auto w-fit rounded-full bg-primary/10 p-3">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">{t.leadTitle}</h2>
              <p className="text-sm text-muted-foreground">{t.leadSubtitle}</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="lead-name">{t.leadName}</Label>
                <Input id="lead-name" value={name} onChange={e => setName(e.target.value)} placeholder={t.leadNamePlaceholder} maxLength={100} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lead-email">{t.leadEmail}</Label>
                <Input id="lead-email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={t.leadEmailPlaceholder} maxLength={255} />
              </div>
              <div className="flex items-start gap-2">
                <Checkbox id="lead-gdpr" checked={gdpr} onCheckedChange={v => setGdpr(v === true)} className="mt-0.5" />
                <Label htmlFor="lead-gdpr" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                  {t.leadGdpr} <a href="/privacy-policy" className="underline text-primary">{t.leadGdprLink}</a>.
                </Label>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? t.leadSubmitting : t.leadSubmit}
              </Button>
            </form>
            <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>{t.leadTrust}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
