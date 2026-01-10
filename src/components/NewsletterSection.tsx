import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [touched, setTouched] = useState(false);
  const { toast } = useToast();

  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (touched) {
      validateEmail(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setTouched(true);
    
    if (!validateEmail(email)) {
      return;
    }
    
    setLoading(true);

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email: email.trim().toLowerCase() }]);

      if (error) {
        // Handle duplicate email
        if (error.code === '23505') {
          toast({
            title: 'Already subscribed',
            description: 'This email is already subscribed to our newsletter.',
            variant: 'destructive',
          });
          return;
        }
        throw error;
      }

      toast({
        title: 'Successfully subscribed!',
        description: 'Thank you for subscribing to our newsletter.',
      });
      setEmail('');
      setTouched(false);
    } catch (error: unknown) {
      let errorMessage = 'Failed to subscribe. Please try again.';
      
      if (error instanceof Error && (error.message?.includes('network') || error.message?.includes('fetch'))) {
        errorMessage = 'Network error. Please check your connection.';
      }
      
      toast({
        title: 'Subscription failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-romania-yellow/10" aria-label="Newsletter subscription">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="h-12 w-12 text-romania-blue mx-auto mb-4" aria-hidden="true" />
          <h2 className="font-playfair text-3xl font-bold text-foreground mb-4">
            Stay Updated
          </h2>
          <p className="text-muted-foreground mb-8">
            Subscribe to our newsletter and get notified about new businesses, special offers, and community events
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto" noValidate>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-grow">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <div className="relative">
                  <Input
                    id="newsletter-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={() => setTouched(true)}
                    required
                    className={`flex-grow ${emailError && touched ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                    aria-invalid={emailError && touched ? 'true' : 'false'}
                    aria-describedby={emailError && touched ? 'email-error' : undefined}
                  />
                  {touched && !emailError && email && (
                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" aria-hidden="true" />
                  )}
                </div>
              </div>
              <Button 
                type="submit" 
                disabled={loading || (touched && !!emailError)}
                className="transition-all whitespace-nowrap"
                aria-busy={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" aria-hidden="true"></span>
                    Subscribing...
                  </span>
                ) : (
                  'Subscribe'
                )}
              </Button>
            </div>
            {emailError && touched && (
              <p id="email-error" className="mt-2 text-sm text-red-600 flex items-center gap-1 justify-center" role="alert">
                <AlertCircle className="h-4 w-4" />
                {emailError}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
