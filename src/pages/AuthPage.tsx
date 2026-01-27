import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { z } from 'zod';
import { AlertCircle, CheckCircle2, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const emailSchema = z.string().email('Invalid email address');
const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');

type AuthView = 'login' | 'signup' | 'forgot-password';

const AuthPage = () => {
  const [view, setView] = useState<AuthView>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [gdprConsent, setGdprConsent] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  // Real-time email validation
  useEffect(() => {
    if (emailTouched) {
      try {
        emailSchema.parse(email);
        setEmailError('');
      } catch (error) {
        if (error instanceof z.ZodError) {
          setEmailError(error.issues[0].message);
        }
      }
    }
  }, [email, emailTouched]);

  // Real-time password validation
  useEffect(() => {
    if (passwordTouched) {
      try {
        passwordSchema.parse(password);
        setPasswordError('');
      } catch (error) {
        if (error instanceof z.ZodError) {
          setPasswordError(error.issues[0].message);
        }
      }
    }
  }, [password, passwordTouched]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const redirectPath = searchParams.get('redirect') || '/';

    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate(redirectPath);
      }
    };

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate(redirectPath);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const validateEmail = () => {
    try {
      emailSchema.parse(email);
      setEmailError('');
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setEmailError(error.issues[0].message);
      }
      return false;
    }
  };

  const validateInputs = () => {
    let isValid = true;
    
    if (!validateEmail()) {
      isValid = false;
    }
    
    try {
      passwordSchema.parse(password);
      setPasswordError('');
    } catch (error) {
      if (error instanceof z.ZodError) {
        setPasswordError(error.issues[0].message);
        isValid = false;
      }
    }
    
    return isValid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: t('auth.loginFailed'),
            description: t('auth.invalidCredentials'),
            variant: 'destructive',
          });
        } else {
          toast({
            title: t('common.error'),
            description: error.message,
            variant: 'destructive',
          });
        }
      } else {
        toast({
          title: t('common.success'),
          description: t('auth.loginFailed').replace('Failed', 'successful'),
        });
      }
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('auth.unexpectedError'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      if (error) {
        if (error.message.includes('already registered')) {
          toast({
            title: t('auth.accountExists'),
            description: t('auth.emailAlreadyRegistered'),
            variant: 'destructive',
          });
        } else {
          toast({
            title: t('common.error'),
            description: error.message,
            variant: 'destructive',
          });
        }
      } else {
        toast({
          title: t('common.success'),
          description: t('auth.accountCreated'),
        });
        setView('login');
        setPassword('');
      }
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('auth.unexpectedError'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailTouched(true);
    if (!validateEmail()) return;

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast({
          title: t('common.error'),
          description: t('auth.resetLinkFailed'),
          variant: 'destructive',
        });
      } else {
        toast({
          title: t('common.success'),
          description: t('auth.resetLinkSent'),
        });
        setView('login');
      }
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('auth.unexpectedError'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setPassword('');
    setEmailError('');
    setPasswordError('');
    setEmailTouched(false);
    setPasswordTouched(false);
    setGdprConsent(false);
  };

  const switchView = (newView: AuthView) => {
    resetForm();
    setView(newView);
  };

  // Forgot Password View
  if (view === 'forgot-password') {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-gray-50 px-4 py-12">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h1 className="text-3xl font-playfair font-bold text-center mb-4 text-romania-blue">
                {t('auth.resetPassword')}
              </h1>
              <p className="text-gray-600 text-center mb-6">
                {t('auth.resetPasswordDescription')}
              </p>
              
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <Label htmlFor="email">{t('auth.email')} *</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder={t('auth.emailPlaceholder')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => setEmailTouched(true)}
                      required
                      disabled={loading}
                      className={emailError && emailTouched ? 'border-red-500 focus-visible:ring-red-500' : ''}
                      aria-invalid={emailError && emailTouched ? 'true' : 'false'}
                      aria-describedby={emailError && emailTouched ? 'email-error' : undefined}
                    />
                    {emailTouched && !emailError && email && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" aria-hidden="true" />
                    )}
                  </div>
                  {emailError && emailTouched && (
                    <p id="email-error" className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
                      <AlertCircle className="h-4 w-4" />
                      {emailError}
                    </p>
                  )}
                </div>

                <Button
                  type="submit" 
                  className="w-full bg-romania-blue hover:bg-blue-700 transition-all"
                  disabled={loading || (emailTouched && !!emailError)}
                  aria-busy={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" aria-hidden="true"></span>
                      {t('common.loading')}
                    </span>
                  ) : (
                    t('auth.sendResetLink')
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => switchView('login')}
                  className="text-romania-blue hover:underline focus:outline-none focus:ring-2 focus:ring-romania-blue rounded inline-flex items-center gap-1"
                  disabled={loading}
                >
                  <ArrowLeft className="h-4 w-4" />
                  {t('auth.backToLogin')}
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Login / Signup View
  const isLogin = view === 'login';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-playfair font-bold text-center mb-6 text-romania-blue">
              {isLogin ? t('auth.login') : t('auth.createAccount')}
            </h1>
            
            <form onSubmit={isLogin ? handleLogin : handleSignup} className="space-y-4">
              <div>
                <Label htmlFor="email">{t('auth.email')} *</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('auth.emailPlaceholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setEmailTouched(true)}
                    required
                    disabled={loading}
                    className={emailError && emailTouched ? 'border-red-500 focus-visible:ring-red-500' : ''}
                    aria-invalid={emailError && emailTouched ? 'true' : 'false'}
                    aria-describedby={emailError && emailTouched ? 'email-error' : undefined}
                  />
                  {emailTouched && !emailError && email && (
                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" aria-hidden="true" />
                  )}
                </div>
                {emailError && emailTouched && (
                  <p id="email-error" className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
                    <AlertCircle className="h-4 w-4" />
                    {emailError}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="password">{t('auth.password')} *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={isLogin ? 'current-password' : 'new-password'}
                    placeholder={t('auth.passwordPlaceholder')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setPasswordTouched(true)}
                    required
                    disabled={loading}
                    className={passwordError && passwordTouched ? 'border-red-500 focus-visible:ring-red-500 pr-20' : 'pr-20'}
                    aria-invalid={passwordError && passwordTouched ? 'true' : 'false'}
                    aria-describedby={passwordError && passwordTouched ? 'password-error' : 'password-hint'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-romania-blue rounded p-1"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    tabIndex={0}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {!isLogin && !passwordError && (
                  <p id="password-hint" className="mt-1 text-sm text-gray-500">
                    {t('auth.passwordHint')} {t('auth.passwordStrengthHint')}
                  </p>
                )}
                {passwordError && passwordTouched && (
                  <p id="password-error" className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
                    <AlertCircle className="h-4 w-4" />
                    {passwordError}
                  </p>
                )}
                {passwordTouched && !passwordError && password && (
                  <p className="mt-1 text-sm text-green-600 flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" />
                    {t('auth.passwordMeetsRequirements')}
                  </p>
                )}
              </div>

              {isLogin && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => switchView('forgot-password')}
                    className="text-sm text-romania-blue hover:underline focus:outline-none focus:ring-2 focus:ring-romania-blue rounded"
                    disabled={loading}
                  >
                    {t('auth.forgotPassword')}
                  </button>
                </div>
              )}

              {!isLogin && (
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="gdpr-consent"
                    checked={gdprConsent}
                    onCheckedChange={(checked) => setGdprConsent(checked === true)}
                    disabled={loading}
                    aria-describedby="gdpr-consent-label"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="gdpr-consent"
                      id="gdpr-consent-label"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t('auth.gdprConsent')}{' '}
                      <Link 
                        to="/privacy-policy" 
                        className="text-romania-blue hover:underline"
                        target="_blank"
                      >
                        {t('auth.privacyPolicy')}
                      </Link>{' '}
                      {t('auth.gdprConsentSuffix')} *
                    </label>
                  </div>
                </div>
              )}

              <Button
                type="submit" 
                className="w-full bg-romania-blue hover:bg-blue-700 transition-all"
                disabled={loading || (emailTouched && !!emailError) || (passwordTouched && !!passwordError) || (!isLogin && !gdprConsent)}
                aria-busy={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" aria-hidden="true"></span>
                    {t('common.loading')}
                  </span>
                ) : (
                  isLogin ? t('auth.login') : t('auth.createAccount')
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => switchView(isLogin ? 'signup' : 'login')}
                className="text-romania-blue hover:underline focus:outline-none focus:ring-2 focus:ring-romania-blue rounded"
                disabled={loading}
              >
                {isLogin ? t('auth.noAccount') : t('auth.hasAccount')}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthPage;
