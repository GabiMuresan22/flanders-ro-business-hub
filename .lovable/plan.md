
## Plan: Add Category Translations and New "Gift and Flowers" Category

### Overview
This plan addresses three main areas:
1. Add comprehensive category translations for all existing categories
2. Translate the footer category names and links
3. Add a new "Gift and Flowers" category throughout the application

---

### 1. Update Translation Files

#### English (`src/translations/en.json`)

Add/update the `businessCategories` section:
```json
"businessCategories": {
  "Restaurant & Food": "Restaurant & Food",
  "Bakery": "Bakery",
  "Grocery": "Grocery",
  "Beauty & Wellness": "Beauty & Wellness",
  "Beauty Salon": "Beauty Salon",
  "Car Services": "Car Services",
  "Car Service": "Car Service",
  "Construction": "Construction",
  "Transportation": "Transportation",
  "Transport": "Transport",
  "Travel & Tourism": "Travel & Tourism",
  "Retail": "Retail",
  "Professional Services": "Professional Services",
  "Gift & Flowers": "Gift & Flowers",
  "Other Services": "Other Services",
  "Other": "Other"
}
```

Add footer category translations:
```json
"footer": {
  // ... existing keys ...
  "categoryRestaurants": "Restaurants",
  "categoryBakeries": "Bakeries",
  "categoryGrocery": "Grocery Stores",
  "categoryCarServices": "Car Services",
  "categoryBeauty": "Beauty Salons",
  "categoryConstruction": "Construction",
  "categoryGiftFlowers": "Gift & Flowers",
  "privacyPolicy": "Privacy Policy"
}
```

#### Romanian (`src/translations/ro.json`)

Add/update the `businessCategories` section:
```json
"businessCategories": {
  "Restaurant & Food": "Restaurant și Mâncare",
  "Bakery": "Patiserie",
  "Grocery": "Alimentară",
  "Beauty & Wellness": "Frumusețe și Wellness",
  "Beauty Salon": "Salon de Frumusețe",
  "Car Services": "Servicii Auto",
  "Car Service": "Service Auto",
  "Construction": "Construcții",
  "Transportation": "Transport",
  "Transport": "Transport",
  "Travel & Tourism": "Călătorii și Turism",
  "Retail": "Comerț cu amănuntul",
  "Professional Services": "Servicii Profesionale",
  "Gift & Flowers": "Cadouri și Flori",
  "Other Services": "Alte Servicii",
  "Other": "Altele"
}
```

Add footer category translations:
```json
"footer": {
  // ... existing keys ...
  "categoryRestaurants": "Restaurante",
  "categoryBakeries": "Patiserii",
  "categoryGrocery": "Magazine Alimentare",
  "categoryCarServices": "Servicii Auto",
  "categoryBeauty": "Saloane de Frumusețe",
  "categoryConstruction": "Construcții",
  "categoryGiftFlowers": "Cadouri și Flori",
  "privacyPolicy": "Politica de Confidențialitate"
}
```

---

### 2. Update Footer Component

Modify `src/components/Footer.tsx` to use translations for category names:

```tsx
<nav aria-label="Business categories">
  <h3 className="...">{t('footer.categories')}</h3>
  <ul className="space-y-2">
    <li><Link to="/category/restaurant-food">{t('footer.categoryRestaurants')}</Link></li>
    <li><Link to="/category/bakery">{t('footer.categoryBakeries')}</Link></li>
    <li><Link to="/category/grocery">{t('footer.categoryGrocery')}</Link></li>
    <li><Link to="/category/car-services">{t('footer.categoryCarServices')}</Link></li>
    <li><Link to="/category/beauty-wellness">{t('footer.categoryBeauty')}</Link></li>
    <li><Link to="/category/construction">{t('footer.categoryConstruction')}</Link></li>
    <li><Link to="/category/gift-flowers">{t('footer.categoryGiftFlowers')}</Link></li>
  </ul>
</nav>
```

Also translate the Privacy Policy link:
```tsx
<li><Link to="/privacy-policy">{t('footer.privacyPolicy')}</Link></li>
```

---

### 3. Add "Gift & Flowers" Category to Forms

Update the categories array in both:
- `src/pages/AddBusinessPage.tsx` (line 250-262)
- `src/pages/EditBusinessPage.tsx` (line 164-176)

```tsx
const categories = [
  "Restaurant & Food", 
  "Bakery",
  "Grocery",
  "Beauty & Wellness", 
  "Car Services", 
  "Construction",
  "Transportation",
  "Travel & Tourism",
  "Retail",
  "Professional Services",
  "Gift & Flowers",  // NEW
  "Other"
];
```

---

### 4. Add Icon for "Gift & Flowers" Category

Update `src/pages/CategoriesListPage.tsx` to include the new category icon:

```tsx
import { Gift } from 'lucide-react';  // Add import

const getCategoryIcon = (category: string) => {
  const iconMap: Record<string, JSX.Element> = {
    // ... existing icons ...
    'Gift & Flowers': <Gift size={48} />,
  };
  return iconMap[category] || <Briefcase size={48} />;
};
```

---

### Files to Modify

| File | Changes |
|------|---------|
| `src/translations/en.json` | Add missing category translations, footer category translations |
| `src/translations/ro.json` | Add Romanian translations for all categories and footer |
| `src/components/Footer.tsx` | Use translation keys for category links and Privacy Policy |
| `src/pages/AddBusinessPage.tsx` | Add "Gift & Flowers" to categories array |
| `src/pages/EditBusinessPage.tsx` | Add "Gift & Flowers" to categories array |
| `src/pages/CategoriesListPage.tsx` | Add Gift icon for new category |

---

### Technical Notes

- The `CategoryCard` component already supports translation via the `t('businessCategories.${category}')` pattern
- The `categoryToSlug` function in `utils.ts` will automatically convert "Gift & Flowers" to "gift-flowers"
- No database changes required - categories are stored as text strings
