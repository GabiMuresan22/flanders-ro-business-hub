import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useParams } from 'react-router-dom';
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

const EditBusinessPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ id: string } | null>(null);

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
      agreeTerms: true,
      openingHours: {
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: "",
      },
    },
  });

  useEffect(() => {
    const checkAuthAndLoadBusiness = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth?redirect=/my-businesses');
        return;
      }

      setUser(session.user);

      // Load business data
      if (id) {
        try {
          const { data: business, error } = await supabase
            .from('businesses')
            .select('*')
            .eq('id', id)
            .eq('user_id', session.user.id)
            .single();

          if (error) throw error;

          if (business) {
            form.reset({
              businessName: business.business_name,
              ownerName: business.owner_name,
              email: business.email,
              phone: business.phone,
              address: business.address,
              city: business.city,
              postalCode: business.postal_code,
              description: business.description,
              category: business.category,
              website: business.website || "",
              businessImage: undefined,
              agreeTerms: true,
              openingHours: {
                monday: "",
                tuesday: "",
                wednesday: "",
                thursday: "",
                friday: "",
                saturday: "",
                sunday: "",
              },
            });
          }
        } catch (error) {
          if (import.meta.env.DEV) console.error('Error loading business:', error);
          toast({
            title: "Error",
            description: "Failed to load business data.",
            variant: "destructive",
          });
          navigate('/my-businesses');
        }
      }
      
      setIsLoading(false);
    };

    checkAuthAndLoadBusiness();
  }, [id, navigate, form, toast]);

  async function onSubmit(values: FormSchema) {
    if (!user || !id) return;

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('businesses')
        .update({
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
          opening_hours: values.openingHours || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Business updated!",
        description: "Your business information has been updated successfully.",
      });
      
      navigate('/my-businesses');
    } catch (error) {
      if (import.meta.env.DEV) console.error('Error updating business:', error);

      const errorMessage = error instanceof Error ? error.message : "Unable to update your business. Please try again later.";
      toast({
        title: "Update failed",
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-romania-blue"></div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-white">
        <div className="bg-romania-blue py-16">
          <div className="container mx-auto px-4">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white text-center">
              Edit Business
            </h1>
            <p className="text-white text-center mt-4 max-w-2xl mx-auto">
              Update your business information
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <div className="bg-white rounded-lg shadow-md p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Editing your business</AlertTitle>
                  <AlertDescription>
                    Update your business contact information and details here.
                  </AlertDescription>
                </Alert>

                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Romanian Delights Bakery" {...field} />
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <FormLabel>Phone *</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="+32 XXX XX XX XX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address *</FormLabel>
                      <FormControl>
                        <Input placeholder="Street name and number" {...field} />
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
                          <Input placeholder="e.g., Bruges" {...field} />
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
                          <Input placeholder="e.g., 8000" {...field} />
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
                          {...field}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <option value="">Select a category</option>
                          {categories.map(category => (
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your business, services, and what makes it special..."
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
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          type="url" 
                          placeholder="https://yourwebsite.com" 
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Opening Hours Section */}
                <div className="space-y-4">
                  <h3 className="font-playfair text-lg font-semibold text-gray-800">Opening Hours (Optional)</h3>
                  <p className="text-sm text-gray-600">Enter your business hours for each day (e.g., "09:00 - 17:00" or "Closed")</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const).map((day) => (
                      <FormField
                        key={day}
                        control={form.control}
                        name={`openingHours.${day}` as `openingHours.monday` | `openingHours.tuesday` | `openingHours.wednesday` | `openingHours.thursday` | `openingHours.friday` | `openingHours.saturday` | `openingHours.sunday`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="capitalize">{day}</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 09:00 - 17:00" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button 
                    type="submit" 
                    className="bg-romania-blue hover:bg-blue-700" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Updating...' : 'Update Business'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate('/my-businesses')}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditBusinessPage;
