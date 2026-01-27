import React from 'react';
import { Shield, Users, Clock, Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const WhyChooseUsSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Shield,
      titleKey: 'whyChooseUs.verifiedTitle',
      descKey: 'whyChooseUs.verifiedDesc'
    },
    {
      icon: Users,
      titleKey: 'whyChooseUs.communityTitle',
      descKey: 'whyChooseUs.communityDesc'
    },
    {
      icon: Clock,
      titleKey: 'whyChooseUs.updatedTitle',
      descKey: 'whyChooseUs.updatedDesc'
    },
    {
      icon: Award,
      titleKey: 'whyChooseUs.qualityTitle',
      descKey: 'whyChooseUs.qualityDesc'
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl font-bold text-foreground mb-4">
            {t('whyChooseUs.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('whyChooseUs.subtitle')}
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
                <h3 className="font-semibold text-lg mb-2 text-foreground">{t(feature.titleKey)}</h3>
                <p className="text-muted-foreground">{t(feature.descKey)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
