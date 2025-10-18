
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { formSchema, type FormSchema } from '@/lib/validation/businessFormSchema';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const AddBusinessPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setIsCheckingAuth(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);
  
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      ownerName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      description: "",
      category: "",
      website: "",
      agreeTerms: false,
    },
  });

  async function onSubmit(values: FormSchema) {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to submit a business.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Insert business into Supabase with user_id
      const { data, error } = await supabase
        .from('businesses')
        .insert({
          business_name: values.businessName,
          owner_name: values.ownerName,
          email: values.email,
          phone: values.phone,
          address: values.address,
          city: values.city,
          postal_code: values.postalCode,
          description: values.description,
          category: values.category,
          website: values.website || null,
          status: 'pending',
          user_id: user.id
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      if (import.meta.env.DEV) {
        console.log('Business submitted successfully:', data);
      }

      // Send email notification to admin
      try {
        await supabase.functions.invoke('notify-new-business', {
          body: {
            business_name: values.businessName,
            owner_name: values.ownerName,
            email: values.email,
            phone: values.phone,
            category: values.category,
            city: values.city,
          },
        });
      } catch (emailError) {
        // Log but don't fail the submission
        if (import.meta.env.DEV) {
          console.error('Failed to send notification email:', emailError);
        }
      }
      
      toast({
        title: "Business submission received!",
        description: "We'll review your business and add it to our directory soon.",
      });
      
      // Reset the form
      form.reset();
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error submitting business:', error);
      }
      
      toast({
        title: "Submission failed",
        description: "Unable to submit your business. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const categories = [
    "Restaurant & Food", 
    "Bakery",
    "Grocery",
    "Beauty & Wellness", 
    "Car Services", 
    "Construction",
    "Transportation",
    "Travel & Tourism",
    "Retail",
    "Professional Services",
    "Other"
  ];

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-romania-blue py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-white text-center">
              Add Your Business
            </h1>
            <p className="text-white/90 text-center mt-4 max-w-xl mx-auto">
              Join our directory to increase your visibility and connect with the local Romanian community in West Flanders.
            </p>
          </div>
        </div>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-6">
              {!user && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Login Required</AlertTitle>
                  <AlertDescription>
                    You must be logged in to submit a business. Please{' '}
                    <a href="/auth?redirect=/add-business" className="underline font-semibold">
                      login or create an account
                    </a>{' '}
                    to continue.
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="bg-white shadow-md rounded-lg p-6 md:p-8">
              <h2 className="font-playfair text-2xl font-semibold text-gray-900 mb-6">Business Information</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="businessName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Your business name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="ownerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Owner Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="+32 xxx xx xx xx" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address *</FormLabel>
                          <FormControl>
                            <Input placeholder="Street address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City *</FormLabel>
                            <FormControl>
                              <Input placeholder="City" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postal Code *</FormLabel>
                            <FormControl>
                              <Input placeholder="Postal code" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Category *</FormLabel>
                          <FormControl>
                            <select
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                              {...field}
                            >
                              <option value="" disabled>Select a category</option>
                              {categories.map((category) => (
                                <option key={category} value={category}>{category}</option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="https://yourwebsite.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Description *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your business, services, and what makes it special..." 
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="agreeTerms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 bg-gray-50">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I agree to the terms and conditions and privacy policy *
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-romania-blue hover:bg-blue-700" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Business'}
                  </Button>
                </form>
              </Form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AddBusinessPage;
