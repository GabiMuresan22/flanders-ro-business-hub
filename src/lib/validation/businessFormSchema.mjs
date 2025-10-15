/**
 * Form validation schema for Add Business feature
 * JavaScript version for use in Node.js test scripts
 * 
 * IMPORTANT: This schema must stay in sync with businessFormSchema.ts
 * Any changes to validation rules should be made in both files.
 * This duplicate exists because .mjs test scripts cannot import TypeScript files.
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
  phone: z.string().min(9, {
    message: "Please enter a valid phone number.",
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
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  category: z.string({
    required_error: "Please select a business category.",
  }),
  website: z.string().url({
    message: "Please enter a valid website URL.",
  }).optional().or(z.literal('')),
  agreeTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions."
  }),
});
