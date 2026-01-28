import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { Mail, Phone, MapPin, Send, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { contactFormSchema } from "@/lib/validation/contactFormSchema";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAntiSpam } from "@/hooks/useAntiSpam";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const ContactPage = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const antiSpam = useAntiSpam(3000);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setErrors({});

    const spamCheck = await antiSpam.validateSubmission();
    if (!spamCheck.isValid) {
      toast({
        title: t('contact.submissionError'),
        description: spamCheck.error,
        variant: "destructive",
      });
      return;
    }

    try {
      const validatedData = contactFormSchema.parse(formData);

      setIsSubmitting(true);

      const { data, error } = await supabase.functions.invoke("submit-contact", {
        body: {
          name: validatedData.name,
          email: validatedData.email,
          subject: validatedData.subject,
          message: validatedData.message,
        },
      });

      if (error || !data?.success) {
        const errorMessage = data?.error || error?.message || "Failed to send message. Please try again later.";
        
        if (import.meta.env.DEV) {
          console.error("Error saving contact message:", error || data?.error);
        }

        toast({
          title: t('contact.errorTitle'),
          description: errorMessage,
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Email notification is now handled by the submit-contact edge function

      toast({
        title: t('contact.successTitle'),
        description: t('contact.successMessage'),
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setIsSubmitting(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);

        toast({
          title: t('contact.validationError'),
          description: t('contact.validationErrorMessage'),
          variant: "destructive",
        });
      }
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title={t('contact.seoTitle')}
        description={t('contact.seoDescription')}
        keywords={t('contact.seoKeywords')}
        type="website"
      />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <div className="bg-romania-blue py-12">
            <div className="container mx-auto px-4">
              <h1 className="font-playfair text-3xl md:text-4xl font-bold text-white text-center">{t('contact.title')}</h1>
              <p className="text-white/90 text-center mt-4 max-w-xl mx-auto">
                {t('contact.subtitle')}
              </p>
            </div>
          </div>

          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                  <div className="md:col-span-2">
                    <div className="bg-white shadow-md rounded-lg p-6 h-full flex flex-col justify-between">
                      <div className="flex-1 flex flex-col justify-center">
                        <h2 className="font-playfair text-xl font-semibold text-gray-900 mb-6 text-center">{t('contact.infoTitle')}</h2>
                        <div className="space-y-4 w-full max-w-sm mx-auto">
                          <div className="flex items-start">
                            <Mail className="h-6 w-6 text-romania-blue mr-3 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-gray-600">{t('contact.emailLabel')}</p>
                              <a href="mailto:info@ro-businesshub.be" className="text-romania-blue hover:underline">
                                info@ro-businesshub.be
                              </a>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Phone className="h-6 w-6 text-romania-blue mr-3 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-gray-600">{t('contact.phoneLabel')}</p>
                              <a href="tel:+32467789259" className="text-romania-blue hover:underline">
                                +32 467 78 92 59
                              </a>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <MapPin className="h-6 w-6 text-romania-blue mr-3 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-gray-600">{t('contact.addressLabel')}</p>
                              <p className="text-gray-800">
                                8800 Roeselare
                                <br />
                                West Flanders, Belgium
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                        <h3 className="font-medium text-gray-800 mb-3">{t('contact.followUs')}</h3>
                        <div className="flex space-x-4 justify-center">
                          <a href="#" className="text-romania-blue hover:text-romania-red transition-colors">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path
                                fillRule="evenodd"
                                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </a>
                          <a href="#" className="text-romania-blue hover:text-romania-red transition-colors">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                          </a>
                          <a href="#" className="text-romania-blue hover:text-romania-red transition-colors">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path
                                fillRule="evenodd"
                                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-3">
                    <div className="bg-white shadow-md rounded-lg p-6 h-full">
                      <h2 className="font-playfair text-xl font-semibold text-gray-900 mb-6">{t('contact.formTitle')}</h2>
                      <form onSubmit={handleSubmit}>
                        <input
                          type="text"
                          name={antiSpam.honeypotField.name}
                          value={antiSpam.honeypotField.value}
                          onChange={(e) => antiSpam.honeypotField.onChange(e.target.value)}
                          style={antiSpam.honeypotField.style}
                          tabIndex={antiSpam.honeypotField.tabIndex}
                          autoComplete={antiSpam.honeypotField.autoComplete ?? "new-password"}
                          autoCorrect={antiSpam.honeypotField.autoCorrect ?? "off"}
                          autoCapitalize={antiSpam.honeypotField.autoCapitalize ?? "none"}
                          spellCheck={antiSpam.honeypotField.spellCheck ?? false}
                          inputMode={antiSpam.honeypotField.inputMode ?? "none"}
                          data-lpignore={antiSpam.honeypotField["data-lpignore"] ?? "true"}
                          data-1p-ignore={antiSpam.honeypotField["data-1p-ignore"] ?? "true"}
                          aria-hidden={antiSpam.honeypotField["aria-hidden"] ?? true}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                              {t('contact.nameLabel')} *
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              maxLength={100}
                              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-romania-blue focus:border-transparent transition-colors ${
                                errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                              }`}
                              aria-required="true"
                              aria-invalid={errors.name ? "true" : "false"}
                              aria-describedby={errors.name ? "name-error" : undefined}
                            />
                            {errors.name && (
                              <p
                                id="name-error"
                                className="mt-1 text-sm text-red-600 flex items-center gap-1"
                                role="alert"
                              >
                                <AlertCircle className="h-4 w-4" />
                                {errors.name}
                              </p>
                            )}
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                              {t('contact.emailFieldLabel')} *
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              maxLength={255}
                              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-romania-blue focus:border-transparent transition-colors ${
                                errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                              }`}
                              aria-required="true"
                              aria-invalid={errors.email ? "true" : "false"}
                              aria-describedby={errors.email ? "email-error" : undefined}
                            />
                            {errors.email && (
                              <p
                                id="email-error"
                                className="mt-1 text-sm text-red-600 flex items-center gap-1"
                                role="alert"
                              >
                                <AlertCircle className="h-4 w-4" />
                                {errors.email}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="mb-6">
                          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('contact.subjectLabel')} *
                          </label>
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            maxLength={200}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-romania-blue focus:border-transparent transition-colors ${
                              errors.subject ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                            }`}
                            aria-required="true"
                            aria-invalid={errors.subject ? "true" : "false"}
                            aria-describedby={errors.subject ? "subject-error" : undefined}
                          />
                          {errors.subject && (
                            <p
                              id="subject-error"
                              className="mt-1 text-sm text-red-600 flex items-center gap-1"
                              role="alert"
                            >
                              <AlertCircle className="h-4 w-4" />
                              {errors.subject}
                            </p>
                          )}
                        </div>

                        <div className="mb-6">
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('contact.messageLabel')} * <span className="text-gray-500 text-xs">{t('contact.messageHint')}</span>
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            maxLength={2000}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-romania-blue focus:border-transparent ${
                              errors.message ? "border-red-500" : "border-gray-300"
                            }`}
                            aria-required="true"
                            aria-invalid={errors.message ? "true" : "false"}
                            aria-describedby={errors.message ? "message-error" : undefined}
                          ></textarea>
                          {errors.message && (
                            <p
                              id="message-error"
                              className="mt-1 text-sm text-red-600 flex items-center gap-1"
                              role="alert"
                            >
                              <AlertCircle className="h-4 w-4" />
                              {errors.message}
                            </p>
                          )}
                        </div>

                        <div className="mb-6">
                          <p className="text-sm text-gray-600">
                            {t('contact.gdprText')}{" "}
                            <Link to="/privacy-policy" className="text-romania-blue hover:underline">
                              {t('auth.privacyPolicy')}
                            </Link>{" "}
                            {t('contact.gdprSuffix')}
                          </p>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`w-full flex justify-center items-center py-3 px-4 rounded-md text-white font-semibold transition-colors ${
                            isSubmitting
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-romania-blue hover:bg-blue-700"
                          }`}
                        >
                          {isSubmitting ? (
                            t('contact.submitting')
                          ) : (
                            <>
                              <Send className="h-5 w-5 mr-2" />
                              {t('contact.submitButton')}
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
