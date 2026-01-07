import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const emailSchema = z.string().email('Invalid email address');
const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
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

  // Real-time email validation
  useEffect(() => {
    if (emailTouched) {
      try {
        emailSchema.parse(email);
        setEmailError('');
      } catch (error) {
        if (error instanceof z.ZodError) {
          setEmailError(error.errors[0].message);
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
          setPasswordError(error.errors[0].message);
        }
      }
    }
  }, [password, passwordTouched]);

  useEffect(() => {
    // Get redirect parameter from URL
    const params = new URLSearchParams(window.location.search);
    const redirectPath = params.get('redirect') || '/';
    
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate(redirectPath);
      }
    };
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate(redirectPath);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const validateInputs = () => {
    let isValid = true;
    
    try {
      emailSchema.parse(email);
      setEmailError('');
    } catch (error) {
      if (error instanceof z.ZodError) {
        setEmailError(error.errors[0].message);
        isValid = false;
      }
    }
    
    try {
      passwordSchema.parse(password);
      setPasswordError('');
    } catch (error) {
      if (error instanceof z.ZodError) {
        setPasswordError(error.errors[0].message);
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
            title: 'Login Failed',
            description: 'Invalid email or password. Please try again.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Error',
            description: error.message,
            variant: 'destructive',
          });
        }
      } else {
        toast({
          title: 'Success',
          description: 'Logged in successfully!',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
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
            title: 'Account Exists',
            description: 'This email is already registered. Please login instead.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Error',
            description: error.message,
            variant: 'destructive',
          });
        }
      } else {
        toast({
          title: 'Success',
          description: 'Account created successfully! You can now login.',
        });
        setIsLogin(true);
        setPassword('');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-playfair font-bold text-center mb-6 text-romania-blue">
              {isLogin ? 'Login' : 'Create Account'}
            </h1>
            
            <form onSubmit={isLogin ? handleLogin : handleSignup} className="space-y-4">
              <div>
                <Label htmlFor="email">Email *</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
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
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
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
                    Must be at least 6 characters
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
                    Password meets requirements
                  </p>
                )}
              </div>

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
                      I agree to the{' '}
                      <Link 
                        to="/privacy-policy" 
                        className="text-romania-blue hover:underline"
                        target="_blank"
                      >
                        Privacy Policy
                      </Link>{' '}
                      and consent to the processing of my personal data *
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
                    Please wait...
                  </span>
                ) : (
                  isLogin ? 'Login' : 'Create Account'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setPassword('');
                  setEmailError('');
                  setPasswordError('');
                  setEmailTouched(false);
                  setPasswordTouched(false);
                  setGdprConsent(false);
                }}
                className="text-romania-blue hover:underline focus:outline-none focus:ring-2 focus:ring-romania-blue rounded"
                disabled={loading}
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : 'Already have an account? Login'}
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
