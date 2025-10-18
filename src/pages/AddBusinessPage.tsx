
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
import { AlertCircle, Upload, X } from 'lucide-react';

const AddBusinessPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
      businessImage: undefined,
      agreeTerms: false,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Image must be less than 5MB",
          variant: "destructive",
        });
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
  };

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
      let imageUrl = null;

      // Upload image if selected
      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('business-images')
          .upload(fileName, selectedFile, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          throw new Error(`Image upload failed: ${uploadError.message}`);
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('business-images')
          .getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

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
          image_url: imageUrl,
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
      
      // Reset the form and image
      form.reset();
      setSelectedFile(null);
      setImagePreview(null);
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error('Error submitting business:', error);
      }
      
      let errorMessage = "Unable to submit your business. Please try again later.";
      
      // Provide more specific error messages
      if (error.message?.includes('duplicate')) {
        errorMessage = "This business has already been submitted.";
      } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
        errorMessage = "Network error. Please check your connection and try again.";
      } else if (error.code === '23505') {
        errorMessage = "A business with this information already exists.";
      }
      
      toast({
        title: "Submission failed",
        description: errorMessage,
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
                            <Input 
                              placeholder="Your business name" 
                              {...field}
                              aria-required="true"
                            />
                          </FormControl>
                          <FormMessage className="flex items-center gap-1 text-red-600">
                            {form.formState.errors.businessName && (
                              <>
                                <span className="text-sm">⚠️</span>
                                <span>{form.formState.errors.businessName.message}</span>
                              </>
                            )}
                          </FormMessage>
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
                            <Input 
                              type="email" 
                              placeholder="your@email.com" 
                              {...field}
                              aria-required="true"
                            />
                          </FormControl>
                          <FormMessage className="flex items-center gap-1 text-red-600">
                            {form.formState.errors.email && (
                              <>
                                <span className="text-sm">⚠️</span>
                                <span>{form.formState.errors.email.message}</span>
                              </>
                            )}
                          </FormMessage>
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

                    <div className="space-y-2">
                      <FormLabel>Business Photo (Optional)</FormLabel>
                      <div className="flex flex-col gap-4">
                        {imagePreview ? (
                          <div className="relative w-full max-w-md">
                            <img 
                              src={imagePreview} 
                              alt="Business preview" 
                              className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                            />
                            <button
                              type="button"
                              onClick={removeImage}
                              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                              aria-label="Remove image"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <label 
                            htmlFor="business-image" 
                            className="flex flex-col items-center justify-center w-full max-w-md h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-10 h-10 mb-3 text-gray-400" />
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">PNG, JPG or WEBP (max 5MB)</p>
                            </div>
                            <input
                              id="business-image"
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleFileChange}
                            />
                          </label>
                        )}
                      </div>
                    </div>

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
                              maxLength={1000}
                              {...field} 
                              aria-required="true"
                              aria-describedby="description-counter"
                            />
                          </FormControl>
                          <div className="flex justify-between items-start">
                            <FormMessage className="flex items-center gap-1 text-red-600">
                              {form.formState.errors.description && (
                                <>
                                  <span className="text-sm">⚠️</span>
                                  <span>{form.formState.errors.description.message}</span>
                                </>
                              )}
                            </FormMessage>
                            <span id="description-counter" className="text-xs text-gray-500">
                              {field.value?.length || 0}/1000
                            </span>
                          </div>
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

                  <Button 
                    type="submit" 
                    className="w-full bg-romania-blue hover:bg-blue-700 transition-all" 
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2 justify-center">
                        <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" aria-hidden="true"></span>
                        Submitting...
                      </span>
                    ) : (
                      'Submit Business'
                    )}
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
