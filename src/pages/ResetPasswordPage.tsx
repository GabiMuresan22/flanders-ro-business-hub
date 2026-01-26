import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { z } from 'zod';
import { AlertCircle, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [newPasswordTouched, setNewPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [isValidSession, setIsValidSession] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    const init = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get('code');

      // If the reset link uses PKCE, exchange ?code=... for a session
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          toast({
            title: t('common.error'),
            description: t('auth.passwordUpdateFailed'),
            variant: 'destructive',
          });
          setCheckingSession(false);
          return;
        }
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsValidSession(true);
      } else {
        toast({
          title: t('common.error'),
          description: t('auth.invalidResetLink'),
          variant: 'destructive',
        });
      }
      setCheckingSession(false);
    };

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsValidSession(true);
        setCheckingSession(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [t, toast]);

  const validateUpdatePassword = () => {
    let isValid = true;

    setNewPasswordTouched(true);
    setConfirmPasswordTouched(true);

    try {
      passwordSchema.parse(newPassword);
      setNewPasswordError('');
    } catch (error) {
      if (error instanceof z.ZodError) {
        setNewPasswordError(error.issues[0].message);
      }
      isValid = false;
    }

    if (confirmPassword !== newPassword) {
      setConfirmPasswordError(t('auth.passwordsDoNotMatch'));
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    return isValid;
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateUpdatePassword()) return;

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });

      if (error) {
        const isSamePassword = error.message?.includes('same password') || 
                               (error as any).code === 'same_password';
        toast({
          title: t('common.error'),
          description: isSamePassword ? t('auth.samePasswordError') : t('auth.passwordUpdateFailed'),
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: t('common.success'),
        description: t('auth.passwordUpdated'),
      });

      navigate('/account', { replace: true });
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('auth.passwordUpdateFailed'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-gray-50 px-4 py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-romania-blue"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isValidSession) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-gray-50 px-4 py-12">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-playfair font-bold mb-4 text-romania-blue">
                {t('auth.invalidResetLink')}
              </h1>
              <p className="text-gray-600 mb-6">
                {t('auth.invalidResetLinkDescription')}
              </p>
              <Button
                onClick={() => navigate('/auth')}
                className="bg-romania-blue hover:bg-blue-700"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('auth.backToLogin')}
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-playfair font-bold text-center mb-4 text-romania-blue">
              {t('auth.setNewPassword')}
            </h1>
            <p className="text-gray-600 text-center mb-6">{t('auth.setNewPasswordDescription')}</p>

            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <Label htmlFor="new-password">{t('auth.newPassword')} *</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('auth.passwordPlaceholder')}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    onBlur={() => setNewPasswordTouched(true)}
                    required
                    disabled={loading}
                    className={newPasswordError && newPasswordTouched ? 'border-red-500 focus-visible:ring-red-500 pr-20' : 'pr-20'}
                    aria-invalid={newPasswordError && newPasswordTouched ? 'true' : 'false'}
                    aria-describedby={newPasswordError && newPasswordTouched ? 'new-password-error' : undefined}
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
                {newPasswordError && newPasswordTouched && (
                  <p id="new-password-error" className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
                    <AlertCircle className="h-4 w-4" />
                    {newPasswordError}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="confirm-password">{t('auth.confirmPassword')} *</Label>
                <Input
                  id="confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('auth.passwordPlaceholder')}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={() => setConfirmPasswordTouched(true)}
                  required
                  disabled={loading}
                  className={confirmPasswordError && confirmPasswordTouched ? 'border-red-500 focus-visible:ring-red-500' : ''}
                  aria-invalid={confirmPasswordError && confirmPasswordTouched ? 'true' : 'false'}
                  aria-describedby={confirmPasswordError && confirmPasswordTouched ? 'confirm-password-error' : undefined}
                />
                {confirmPasswordError && confirmPasswordTouched && (
                  <p id="confirm-password-error" className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
                    <AlertCircle className="h-4 w-4" />
                    {confirmPasswordError}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-romania-blue hover:bg-blue-700 transition-all"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" aria-hidden="true"></span>
                    {t('common.loading')}
                  </span>
                ) : (
                  t('auth.updatePassword')
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => navigate('/auth')}
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
};

export default ResetPasswordPage;
