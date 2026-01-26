/**
 * Form validation schema for Add Business feature
 * Shared between the form component and tests to maintain single source of truth
 */

import { z } from 'zod';

export const formSchema = z.object({
  businessName: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  ownerName: z.string().min(2, {
    message: "Owner name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(1, {
    message: "Please enter a phone number.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  postalCode: z.string().min(4, {
    message: "Please enter a valid postal code.",
  }),
  btwNumber: z.string().min(1, {
    message: "BTW number is required for Belgian businesses.",
  }).regex(/^BE\s?\d{4}\.?\d{3}\.?\d{3}$/, {
    message: "Please enter a valid Belgian BTW number (e.g., BE 0123.456.789).",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  category: z.string().min(1, {
    message: "Please select a business category.",
  }),
  website: z.string().url({
    message: "Please enter a valid website URL.",
  }).optional().or(z.literal('')),
  businessImage: z.any().optional(),
  appointmentOnly: z.boolean().default(false),
  agreeTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions."
  }),
  openingHours: z.object({
    monday: z.string().optional(),
    tuesday: z.string().optional(),
    wednesday: z.string().optional(),
    thursday: z.string().optional(),
    friday: z.string().optional(),
    saturday: z.string().optional(),
    sunday: z.string().optional(),
  }).optional(),
});

export type FormSchema = z.infer<typeof formSchema>;
