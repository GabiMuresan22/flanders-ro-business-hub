import React from 'react';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

export interface SocialMediaValues {
  facebook: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  twitter: string;
}

export const EMPTY_SOCIAL_MEDIA: SocialMediaValues = {
  facebook: '',
  instagram: '',
  tiktok: '',
  youtube: '',
  twitter: '',
};

const PLATFORMS = [
  { key: 'facebook' as const, label: 'Facebook', placeholder: 'https://facebook.com/...' },
  { key: 'instagram' as const, label: 'Instagram', placeholder: 'https://instagram.com/...' },
  { key: 'tiktok' as const, label: 'TikTok', placeholder: 'https://tiktok.com/@...' },
  { key: 'youtube' as const, label: 'YouTube', placeholder: 'https://youtube.com/...' },
  { key: 'twitter' as const, label: 'X (Twitter)', placeholder: 'https://x.com/...' },
];

interface SocialMediaInputsProps {
  values: SocialMediaValues;
  onChange: (values: SocialMediaValues) => void;
}

const SocialMediaInputs: React.FC<SocialMediaInputsProps> = ({ values, onChange }) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium leading-none">
        {t('addBusiness.socialMedia')}
      </label>
      <p className="text-sm text-muted-foreground">{t('addBusiness.socialMediaHint')}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PLATFORMS.map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="text-sm text-muted-foreground mb-1 block">{label}</label>
            <Input
              type="url"
              placeholder={placeholder}
              value={values[key]}
              onChange={(e) => onChange({ ...values, [key]: e.target.value })}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaInputs;

/** Save social links to the database after business creation */
export async function saveSocialLinks(
  supabase: any,
  businessId: string,
  socialMedia: SocialMediaValues
) {
  const entries = Object.entries(socialMedia).filter(([, url]) => url.trim() !== '');
  if (entries.length === 0) return;

  const rows = entries.map(([platform, url]) => ({
    business_id: businessId,
    platform,
    url: url.trim(),
  }));

  await supabase.from('social_links').insert(rows);
}

/** Update social links: delete old ones, insert new ones */
export async function updateSocialLinks(
  supabase: any,
  businessId: string,
  socialMedia: SocialMediaValues
) {
  // Delete existing
  await supabase.from('social_links').delete().eq('business_id', businessId);

  // Insert new non-empty entries
  const entries = Object.entries(socialMedia).filter(([, url]) => url.trim() !== '');
  if (entries.length === 0) return;

  const rows = entries.map(([platform, url]) => ({
    business_id: businessId,
    platform,
    url: url.trim(),
  }));

  await supabase.from('social_links').insert(rows);
}
