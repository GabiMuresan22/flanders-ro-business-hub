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
import { AlertCircle, Upload, X, ImageIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const EditBusinessPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);

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
      descriptionEn: "",
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
              btwNumber: business.btw_number || "",
              description: business.description,
              descriptionEn: (business as any).description_en || "",
              category: business.category,
              website: business.website || "",
              businessImage: undefined,
              agreeTerms: true,
              appointmentOnly: business.appointment_only || false,
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
            // Set current image if exists
            if (business.image_url) {
              setCurrentImageUrl(business.image_url);
            }
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: t('addBusiness.fileTooLarge'),
          description: t('addBusiness.fileTooLargeMessage'),
          variant: "destructive",
        });
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: t('addBusiness.invalidFileType'),
          description: t('addBusiness.invalidFileTypeMessage'),
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

  const removeCurrentImage = () => {
    setCurrentImageUrl(null);
  };

  async function onSubmit(values: FormSchema) {
    if (!user || !id) return;

    setIsSubmitting(true);
    
    try {
      let imageUrl = currentImageUrl;

      // Upload new image if selected
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
          btw_number: values.btwNumber,
          description: values.description,
          description_en: values.descriptionEn || null,
          category: values.category,
          website: values.website || null,
          image_url: imageUrl,
          appointment_only: values.appointmentOnly || false,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: t('editBusiness.successTitle') || "Business updated!",
        description: t('editBusiness.successMessage') || "Your business information has been updated successfully.",
      });
      
      navigate('/my-businesses');
    } catch (error) {
      if (import.meta.env.DEV) console.error('Error updating business:', error);

      const errorMessage = error instanceof Error ? error.message : t('editBusiness.genericError') || "Unable to update your business. Please try again later.";
      toast({
        title: t('editBusiness.errorTitle') || "Update failed",
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
    "Cosmetician",
    "Car Services", 
    "Construction",
    "Transportation",
    "Travel & Tourism",
    "Retail",
    "Professional Services",
    "Photo & Video",
    "Gift & Flowers",
    "IT & Marketing",
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
              {t('editBusiness.title')}
            </h1>
            <p className="text-white text-center mt-4 max-w-2xl mx-auto">
              {t('editBusiness.subtitle')}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <div className="bg-white rounded-lg shadow-md p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>{t('editBusiness.title')}</AlertTitle>
                  <AlertDescription>
                    {t('editBusiness.subtitle')}
                  </AlertDescription>
                </Alert>

                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('addBusiness.businessName')} *</FormLabel>
                      <FormControl>
                        <Input placeholder={t('addBusiness.businessNamePlaceholder')} {...field} />
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
                      <FormLabel>{t('addBusiness.ownerName')} *</FormLabel>
                      <FormControl>
                        <Input placeholder={t('addBusiness.ownerNamePlaceholder')} {...field} />
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
                        <FormLabel>{t('addBusiness.email')} *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder={t('addBusiness.emailPlaceholder')} {...field} />
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
                        <FormLabel>{t('addBusiness.phone')} *</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder={t('addBusiness.phonePlaceholder')} {...field} />
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
                      <FormLabel>{t('addBusiness.address')} *</FormLabel>
                      <FormControl>
                        <Input placeholder={t('addBusiness.addressPlaceholder')} {...field} />
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
                        <FormLabel>{t('addBusiness.city')} *</FormLabel>
                        <FormControl>
                          <Input placeholder={t('addBusiness.cityPlaceholder')} {...field} />
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
                        <FormLabel>{t('addBusiness.postalCode')} *</FormLabel>
                        <FormControl>
                          <Input placeholder={t('addBusiness.postalCodePlaceholder')} {...field} />
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
                      <FormLabel>{t('addBusiness.category')} *</FormLabel>
                      <FormControl>
                        <select 
                          {...field}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <option value="">{t('addBusiness.categorySelect')}</option>
                          {categories.map(category => (
                            <option key={category} value={category}>{t(`businessCategories.${category}`) || category}</option>
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
                      <FormLabel>{t('addBusiness.description')} * (RO)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder={t('addBusiness.descriptionPlaceholder')}
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
                  name="descriptionEn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('addBusiness.descriptionEn')} (EN)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder={t('addBusiness.descriptionEnPlaceholder')}
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <p className="text-sm text-muted-foreground">{t('addBusiness.descriptionEnHint')}</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('addBusiness.website')}</FormLabel>
                      <FormControl>
                        <Input 
                          type="url" 
                          placeholder={t('addBusiness.websitePlaceholder')} 
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Business Image Section */}
                <div className="space-y-4">
                  <h3 className="font-playfair text-lg font-semibold text-gray-800">
                    {t('addBusiness.businessImage') || 'Business Image'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {t('addBusiness.imageOptional') || 'Upload a photo of your business (optional)'}
                  </p>

                  {/* Current Image Display */}
                  {currentImageUrl && !imagePreview && (
                    <div className="relative inline-block">
                      <img
                        src={currentImageUrl}
                        alt="Current business"
                        className="w-48 h-48 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={removeCurrentImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <p className="text-sm text-muted-foreground mt-2">
                        {t('editBusiness.currentImage') || 'Current image'}
                      </p>
                    </div>
                  )}

                  {/* New Image Preview */}
                  {imagePreview && (
                    <div className="relative inline-block">
                      <img
                        src={imagePreview}
                        alt="New business preview"
                        className="w-48 h-48 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <p className="text-sm text-green-600 mt-2">
                        {t('editBusiness.newImage') || 'New image (will replace current)'}
                      </p>
                    </div>
                  )}

                  {/* Upload Button */}
                  {!imagePreview && (
                    <div className="flex items-center gap-4">
                      <label
                        htmlFor="businessImage"
                        className="flex items-center gap-2 px-4 py-2 border border-input rounded-md cursor-pointer hover:bg-accent transition-colors"
                      >
                        <Upload className="h-4 w-4" />
                        <span>{currentImageUrl ? (t('editBusiness.changeImage') || 'Change Image') : (t('addBusiness.uploadImage') || 'Upload Image')}</span>
                      </label>
                      <input
                        id="businessImage"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <span className="text-sm text-muted-foreground">
                        {t('addBusiness.maxFileSize') || 'Max 5MB, JPG/PNG'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Opening Hours Section */}
                <div className="space-y-4">
                  <h3 className="font-playfair text-lg font-semibold text-gray-800">{t('addBusiness.openingHours')}</h3>
                  <p className="text-sm text-gray-600">{t('addBusiness.openingHoursHelp')}</p>
                  
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
                              <Input placeholder={t('addBusiness.openingHoursPlaceholder')} {...field} />
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
                    {isSubmitting ? t('editBusiness.updating') : t('editBusiness.updateButton')}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate('/my-businesses')}
                    disabled={isSubmitting}
                  >
                    {t('common.cancel')}
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
