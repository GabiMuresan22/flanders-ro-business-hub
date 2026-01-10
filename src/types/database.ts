import type { Database, Tables } from '@/integrations/supabase/types';
import type { User } from '@supabase/supabase-js';

// Business types from database
export type BusinessRow = Tables<'businesses'>;
export type PublicBusiness = Tables<'public_businesses'>;
export type ReviewRow = Tables<'reviews'>;
export type ContactMessageRow = Tables<'contact_messages'>;
export type ProfileRow = Tables<'profiles'>;
export type UserRoleRow = Tables<'user_roles'>;

// Extended types for components that need additional fields
export type BusinessWithDetails = PublicBusiness & {
  phone?: string;
  email?: string;
  address?: string;
  imageUrl?: string;
  featured?: boolean;
};

// Type for BusinessCard component - accepts either PublicBusiness or BusinessRow
export type BusinessCardData = Partial<PublicBusiness> & {
  id: string;
  business_name: string;
  category: string;
  description?: string | null;
  city?: string | null;
  phone?: string;
  website?: string | null;
};

// User type from Supabase Auth
export type { User };
