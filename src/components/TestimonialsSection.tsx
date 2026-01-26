
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const TestimonialsSection: React.FC = () => {
  const { t } = useLanguage();

  const testimonials = [
    {
      id: 1,
      name: "Maria Ionescu",
      roleKey: "testimonials.role1",
      contentKey: "testimonials.content1",
      avatarUrl: "/images/avatar-1.jpg"
    },
    {
      id: 2,
      name: "Andrei Popescu",
      roleKey: "testimonials.role2",
      contentKey: "testimonials.content2",
      avatarUrl: "/images/avatar-2.jpg"
    },
    {
      id: 3,
      name: "Elena Dimitriu",
      roleKey: "testimonials.role3",
      contentKey: "testimonials.content3",
      avatarUrl: "/images/avatar-3.jpg"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4">{t('testimonials.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 mr-4">
                  <img 
                    src={testimonial.avatarUrl} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{t(testimonial.roleKey)}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">&ldquo;{t(testimonial.contentKey)}&rdquo;</p>
              <div className="mt-4 flex text-romania-yellow">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
