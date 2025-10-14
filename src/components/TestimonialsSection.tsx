
import React from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatarUrl: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Maria Ionescu",
    role: "Restaurant Owner",
    content: "Being listed on the Romanian Business Hub has significantly increased our visibility in West Flanders. We've seen more Belgian customers coming to try our authentic Romanian cuisine.",
    avatarUrl: "/images/avatar-1.jpg"
  },
  {
    id: 2,
    name: "Andrei Popescu",
    role: "Car Service Owner",
    content: "This platform has helped me connect with the Romanian community in Belgium and grow my business. The directory listing has been invaluable for reaching new customers.",
    avatarUrl: "/images/avatar-2.jpg"
  },
  {
    id: 3,
    name: "Elena Dimitriu",
    role: "Bakery Owner",
    content: "Thanks to Romanian Business Hub, locals now know where to find authentic Romanian pastries. Our customer base has diversified significantly since joining.",
    avatarUrl: "/images/avatar-3.jpg"
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4">What Business Owners Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from Romanian business owners who have benefited from our platform
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
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">&ldquo;{testimonial.content}&rdquo;</p>
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
