import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, XCircle, Clock, ExternalLink, Mail, Phone, MapPin } from 'lucide-react';

interface Business {
  id: string;
  business_name: string;
  owner_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postal_code: string;
  description: string;
  category: string;
  website: string | null;
  status: string;
  created_at: string;
  user_id: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchBusinesses();
      
      // Subscribe to realtime updates
      const channel = supabase
        .channel('admin-businesses')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'businesses'
          },
          () => {
            fetchBusinesses();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [isAdmin]);

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/auth');
        return;
      }

      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .single();

      if (!roles) {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges.",
          variant: "destructive",
        });
        navigate('/');
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      console.error('Error checking admin status:', error);
      navigate('/');
    }
  };

  const fetchBusinesses = async () => {
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBusinesses(data || []);
    } catch (error) {
      console.error('Error fetching businesses:', error);
      toast({
        title: "Error",
        description: "Failed to load businesses.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateBusinessStatus = async (id: string, status: 'approved' | 'rejected') => {
    setProcessingId(id);
    try {
      const { error } = await supabase
        .from('businesses')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Business ${status} successfully.`,
      });
    } catch (error) {
      console.error('Error updating business:', error);
      toast({
        title: "Error",
        description: "Failed to update business status.",
        variant: "destructive",
      });
    } finally {
      setProcessingId(null);
    }
  };

  const deleteBusiness = async (id: string) => {
    if (!confirm('Are you sure you want to delete this business?')) return;
    
    setProcessingId(id);
    try {
      const { error } = await supabase
        .from('businesses')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Business deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting business:', error);
      toast({
        title: "Error",
        description: "Failed to delete business.",
        variant: "destructive",
      });
    } finally {
      setProcessingId(null);
    }
  };

  const BusinessCard = ({ business }: { business: Business }) => (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">{business.business_name}</CardTitle>
            <CardDescription>{business.category}</CardDescription>
          </div>
          <Badge 
            variant={
              business.status === 'approved' ? 'default' : 
              business.status === 'rejected' ? 'destructive' : 
              'secondary'
            }
          >
            {business.status === 'approved' && <CheckCircle className="h-3 w-3 mr-1" />}
            {business.status === 'rejected' && <XCircle className="h-3 w-3 mr-1" />}
            {business.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
            {business.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Owner</p>
          <p className="font-medium">{business.owner_name}</p>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Contact Information</p>
          <div className="space-y-1">
            <div className="flex items-center text-sm">
              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
              <a href={`mailto:${business.email}`} className="hover:underline">{business.email}</a>
            </div>
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{business.phone}</span>
            </div>
            <div className="flex items-start text-sm">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
              <span>{business.address}, {business.city} {business.postal_code}</span>
            </div>
          </div>
        </div>

        {business.website && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Website</p>
            <a 
              href={business.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-sm text-romania-blue hover:underline"
            >
              {business.website}
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        )}

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Description</p>
          <p className="text-sm">{business.description}</p>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Submitted</p>
          <p className="text-sm">{new Date(business.created_at).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
        </div>

        <div className="flex gap-2 pt-4 border-t">
          {business.status === 'pending' && (
            <>
              <Button
                onClick={() => updateBusinessStatus(business.id, 'approved')}
                disabled={processingId === business.id}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </Button>
              <Button
                onClick={() => updateBusinessStatus(business.id, 'rejected')}
                disabled={processingId === business.id}
                variant="destructive"
                className="flex-1"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
            </>
          )}
          {business.status === 'rejected' && (
            <Button
              onClick={() => updateBusinessStatus(business.id, 'approved')}
              disabled={processingId === business.id}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve
            </Button>
          )}
          {business.status === 'approved' && (
            <Button
              onClick={() => updateBusinessStatus(business.id, 'rejected')}
              disabled={processingId === business.id}
              variant="destructive"
              className="flex-1"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </Button>
          )}
          <Button
            onClick={() => deleteBusiness(business.id)}
            disabled={processingId === business.id}
            variant="outline"
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  const pendingBusinesses = businesses.filter(b => b.status === 'pending');
  const approvedBusinesses = businesses.filter(b => b.status === 'approved');
  const rejectedBusinesses = businesses.filter(b => b.status === 'rejected');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-romania-blue py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-white text-center">
              Admin Dashboard
            </h1>
            <p className="text-white/90 text-center mt-4 max-w-xl mx-auto">
              Manage business submissions and approvals
            </p>
          </div>
        </div>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Pending Review</CardDescription>
                  <CardTitle className="text-3xl">{pendingBusinesses.length}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Approved</CardDescription>
                  <CardTitle className="text-3xl">{approvedBusinesses.length}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Rejected</CardDescription>
                  <CardTitle className="text-3xl">{rejectedBusinesses.length}</CardTitle>
                </CardHeader>
              </Card>
            </div>

            <Tabs defaultValue="pending" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pending">
                  Pending ({pendingBusinesses.length})
                </TabsTrigger>
                <TabsTrigger value="approved">
                  Approved ({approvedBusinesses.length})
                </TabsTrigger>
                <TabsTrigger value="rejected">
                  Rejected ({rejectedBusinesses.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="space-y-4">
                {pendingBusinesses.length === 0 ? (
                  <Card>
                    <CardContent className="py-10 text-center">
                      <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No pending submissions</p>
                    </CardContent>
                  </Card>
                ) : (
                  pendingBusinesses.map(business => (
                    <BusinessCard key={business.id} business={business} />
                  ))
                )}
              </TabsContent>

              <TabsContent value="approved" className="space-y-4">
                {approvedBusinesses.length === 0 ? (
                  <Card>
                    <CardContent className="py-10 text-center">
                      <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No approved businesses yet</p>
                    </CardContent>
                  </Card>
                ) : (
                  approvedBusinesses.map(business => (
                    <BusinessCard key={business.id} business={business} />
                  ))
                )}
              </TabsContent>

              <TabsContent value="rejected" className="space-y-4">
                {rejectedBusinesses.length === 0 ? (
                  <Card>
                    <CardContent className="py-10 text-center">
                      <XCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No rejected businesses</p>
                    </CardContent>
                  </Card>
                ) : (
                  rejectedBusinesses.map(business => (
                    <BusinessCard key={business.id} business={business} />
                  ))
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
