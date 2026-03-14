import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, ShieldCheck } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export default function CashFlowLeadCapture() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gdpr, setGdpr] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !gdpr) {
      toast({ title: 'Completează toate câmpurile și acceptă GDPR.', variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from('newsletter_subscribers').insert({ email: email.trim().toLowerCase() });
      if (error && error.code !== '23505') throw error;
      toast({ title: '✅ Te-ai înregistrat cu succes!', description: 'Vei primi modelul pe email în curând.' });
      setName('');
      setEmail('');
      setGdpr(false);
    } catch {
      toast({ title: 'A apărut o eroare. Încearcă din nou.', variant: 'destructive' });
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
              <h2 className="text-xl font-bold text-foreground">
                Vrei și un model simplu de cash flow?
              </h2>
              <p className="text-sm text-muted-foreground">
                Lasă-ne adresa de email și îți trimitem un template Excel gratuit.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="lead-name">Nume</Label>
                <Input id="lead-name" value={name} onChange={e => setName(e.target.value)} placeholder="Numele tău" maxLength={100} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lead-email">Email</Label>
                <Input id="lead-email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@exemplu.com" maxLength={255} />
              </div>
              <div className="flex items-start gap-2">
                <Checkbox id="lead-gdpr" checked={gdpr} onCheckedChange={v => setGdpr(v === true)} className="mt-0.5" />
                <Label htmlFor="lead-gdpr" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                  Sunt de acord cu prelucrarea datelor personale conform <a href="/privacy-policy" className="underline text-primary">Politicii de Confidențialitate</a>.
                </Label>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Se trimite...' : 'Trimite-mi modelul'}
              </Button>
            </form>
            <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Datele tale sunt în siguranță. Nu facem spam.</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
