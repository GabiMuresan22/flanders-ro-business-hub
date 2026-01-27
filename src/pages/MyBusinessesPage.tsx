import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BusinessListSkeleton from '@/components/skeletons/BusinessListSkeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Building2, Edit, Trash2, Plus, Mail, Phone, MapPin, Globe, Clock } from 'lucide-react';
import type { BusinessRow } from '@/types/database';
import type { User } from '@supabase/supabase-js';

const MyBusinessesPage = () => {
  const [businesses, setBusinesses] = useState<BusinessRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchBusinesses = useCallback(async (userId: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setBusinesses(data || []);
    } catch (error) {
      if (import.meta.env.DEV) console.error('Error fetching businesses:', error);
      toast({
        title: "Error",
        description: "Failed to load your businesses.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    const checkAuthAndFetchBusinesses = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth?redirect=/my-businesses');
        return;
      }

      setUser(session.user);
      await fetchBusinesses(session.user.id);
    };

    checkAuthAndFetchBusinesses();
  }, [navigate, fetchBusinesses]);

  const handleDelete = async (businessId: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('businesses')
        .delete()
        .eq('id', businessId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Business deleted successfully.",
      });

      setBusinesses(businesses.filter(b => b.id !== businessId));
    } catch (error) {
      if (import.meta.env.DEV) console.error('Error deleting business:', error);
      toast({
        title: "Error",
        description: "Failed to delete business.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "destructive" | "outline" | "secondary"> = {
      approved: 'default',
      pending: 'secondary',
      rejected: 'destructive',
    };

    return (
      <Badge variant={variants[status] || 'secondary'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <div className="bg-romania-blue py-12">
            <div className="container mx-auto px-4">
              <div className="h-10 bg-white/20 rounded w-1/3 mx-auto mb-4 animate-pulse"></div>
              <div className="h-6 bg-white/10 rounded w-1/2 mx-auto animate-pulse"></div>
            </div>
          </div>
          
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                  <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded w-40 animate-pulse"></div>
                </div>
                <BusinessListSkeleton />
              </div>
            </div>
          </section>
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
              My Businesses
            </h1>
            <p className="text-white/90 text-center mt-4 max-w-xl mx-auto">
              Manage your business listings and track their approval status
            </p>
          </div>
        </div>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-playfair font-semibold text-gray-900">
                  Your Submissions ({businesses.length})
                </h2>
                <Button 
                  onClick={() => navigate('/add-business')}
                  className="bg-romania-blue hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Business
                </Button>
              </div>

              {businesses.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Building2 className="h-16 w-16 text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No businesses yet</h3>
                    <p className="text-gray-500 mb-6 text-center max-w-md">
                      You haven't submitted any businesses. Start by adding your first business to our directory.
                    </p>
                    <Button 
                      onClick={() => navigate('/add-business')}
                      className="bg-romania-blue hover:bg-blue-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Business
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6">
                  {businesses.map((business) => (
                    <Card key={business.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl font-playfair">
                              {business.business_name}
                            </CardTitle>
                            <CardDescription className="mt-2">
                              <span className="inline-flex items-center text-sm">
                                <Clock className="h-4 w-4 mr-1" />
                                Submitted {new Date(business.created_at).toLocaleDateString()}
                              </span>
                            </CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(business.status)}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-start gap-2">
                            <Building2 className="h-5 w-5 text-romania-blue mt-0.5" />
                            <div>
                              <p className="text-sm text-gray-500">Category</p>
                              <p className="font-medium">{business.category}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <MapPin className="h-5 w-5 text-romania-blue mt-0.5" />
                            <div>
                              <p className="text-sm text-gray-500">Location</p>
                              <p className="font-medium">{business.city}, {business.postal_code}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Mail className="h-5 w-5 text-romania-blue mt-0.5" />
                            <div>
                              <p className="text-sm text-gray-500">Email</p>
                              <p className="font-medium">{business.email}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Phone className="h-5 w-5 text-romania-blue mt-0.5" />
                            <div>
                              <p className="text-sm text-gray-500">Phone</p>
                              <p className="font-medium">{business.phone}</p>
                            </div>
                          </div>
                        </div>

                        {business.website && (
                          <div className="flex items-start gap-2 mb-4">
                            <Globe className="h-5 w-5 text-romania-blue mt-0.5" />
                            <div>
                              <p className="text-sm text-gray-500">Website</p>
                              <a 
                                href={business.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="font-medium text-romania-blue hover:underline"
                              >
                                {business.website}
                              </a>
                            </div>
                          </div>
                        )}

                        <div className="mb-4">
                          <p className="text-sm text-gray-500 mb-1">Description</p>
                          <p className="text-gray-700 line-clamp-2">{business.description}</p>
                        </div>

                        <div className="flex gap-2 pt-4 border-t">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/business/${business.id}/edit`)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete your business listing.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(business.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MyBusinessesPage;
