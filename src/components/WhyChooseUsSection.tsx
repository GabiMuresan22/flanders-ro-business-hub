import React from 'react';
import { Shield, Users, Clock, Award } from 'lucide-react';

const WhyChooseUsSection = () => {
  const features = [
    {
      icon: Shield,
      title: 'Verified Businesses',
      description: 'All businesses are verified and approved by our team'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built by and for the Romanian community in West Flanders'
    },
    {
      icon: Clock,
      title: 'Always Updated',
      description: 'Fresh information and new businesses added regularly'
    },
    {
      icon: Award,
      title: 'Quality Service',
      description: 'Only the best Romanian businesses make it to our directory'
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl font-bold text-foreground mb-4">
            Why Choose Romanian Business Hub?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your trusted directory for authentic Romanian businesses in West Flanders
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-romania-blue/10 mb-4">
                  <Icon className="h-8 w-8 text-romania-blue" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
