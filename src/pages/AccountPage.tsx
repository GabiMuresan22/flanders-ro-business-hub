import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { z } from "zod";
import { Building2, Edit, Plus, Eye } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import type { BusinessRow } from "@/types/database";

const profileSchema = z.object({
  full_name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  phone: z.string().trim().max(20, "Phone must be less than 20 characters").optional(),
});

const AccountPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [businesses, setBusinesses] = useState<BusinessRow[]>([]);
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      setUser(session.user);
      setFormData(prev => ({ ...prev, email: session.user.email || "" }));

      // Fetch profile data
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", session.user.id)
        .single();

      if (profile) {
        setFormData({
          full_name: profile.full_name || "",
          phone: profile.phone || "",
          email: session.user.email || "",
        });
      }

      // Fetch user's businesses
      const { data: bizData } = await supabase
        .from("businesses")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });
      if (bizData) setBusinesses(bizData);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = profileSchema.parse({
        full_name: formData.full_name,
        phone: formData.phone,
      });

      setLoading(true);

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: validatedData.full_name,
          phone: validatedData.phone || null,
        })
        .eq("user_id", user.id);

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your account information has been saved.",
      });
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.issues[0].message,
          variant: "destructive",
        });
      } else {
        const errorMessage = error instanceof Error ? error.message : "Failed to update profile";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast({
          title: "Error",
          description: error.message || "Failed to sign out",
          variant: "destructive",
        });
      } else {
        navigate("/");
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>My Account</CardTitle>
            <CardDescription>View and edit your account information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  disabled
                  className="bg-muted"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
                <Button type="button" variant="outline" onClick={handleSignOut}>
                  Sign Out
                </Button>
                <Link
                  to="/categories"
                  className="text-sm text-romania-blue hover:underline"
                >
                  {t('searchResults.browseCategories')}
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
        {/* My Businesses Section */}
        <Card className="max-w-2xl mx-auto mt-8 animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                {t('myBusinesses.title')}
              </CardTitle>
              <CardDescription>{t('myBusinesses.subtitle') || 'Manage your registered businesses'}</CardDescription>
            </div>
            <Link to="/add-business">
              <Button size="sm" className="gap-1.5">
                <Plus className="h-4 w-4" />
                {t('myBusinesses.addNewBusiness')}
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {businesses.length === 0 ? (
              <div className="text-center py-8">
                <Building2 className="h-12 w-12 mx-auto text-muted-foreground/40 mb-3" />
                <p className="text-muted-foreground font-medium">{t('myBusinesses.noBusinessesTitle')}</p>
                <p className="text-sm text-muted-foreground mt-1 mb-4">{t('myBusinesses.noBusinessesMessage')}</p>
                <Link to="/add-business">
                  <Button variant="outline" className="gap-2">
                    <Plus className="h-4 w-4" />
                    {t('myBusinesses.addFirstBusiness')}
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {businesses.map((biz) => (
                  <div
                    key={biz.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg border bg-card hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-foreground truncate">{biz.business_name}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {t(`businessCategories.${biz.category}`) || biz.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{biz.city}</span>
                        <Badge
                          variant={biz.status === 'approved' ? 'default' : 'secondary'}
                          className={`text-xs ${biz.status === 'approved' ? 'bg-green-600' : biz.status === 'pending' ? 'bg-yellow-500' : ''}`}
                        >
                          {biz.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {biz.status === 'approved' && (
                        <Link to={`/business/${biz.id}`}>
                          <Button variant="outline" size="sm" className="gap-1.5">
                            <Eye className="h-4 w-4" />
                            View
                          </Button>
                        </Link>
                      )}
                      <Link to={`/business/${biz.id}/edit`}>
                        <Button variant="outline" size="sm" className="gap-1.5">
                          <Edit className="h-4 w-4" />
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default AccountPage;