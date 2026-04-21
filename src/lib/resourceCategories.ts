import type { Resource } from "@/types/resources";

export const RESOURCE_CATEGORY_ID = {
  ALL: "ALL",
  TAXE_BELGIA: "TAXE_BELGIA",
  INFIINTARE_FIRMA_BELGIA: "INFIINTARE_FIRMA_BELGIA",
  GHIDURI_PRACTICE: "GHIDURI_PRACTICE",
} as const;

export type ResourceCategoryId =
  (typeof RESOURCE_CATEGORY_ID)[keyof typeof RESOURCE_CATEGORY_ID];

export type NormalizedResourceCategory = Exclude<
  ResourceCategoryId,
  typeof RESOURCE_CATEGORY_ID.ALL
>;

export type NormalizedResource = Resource & {
  normalizedCategory: NormalizedResourceCategory;
};

export const RESOURCE_FILTER_ORDER: readonly ResourceCategoryId[] = [
  RESOURCE_CATEGORY_ID.ALL,
  RESOURCE_CATEGORY_ID.TAXE_BELGIA,
  RESOURCE_CATEGORY_ID.INFIINTARE_FIRMA_BELGIA,
  RESOURCE_CATEGORY_ID.GHIDURI_PRACTICE,
];

const CANONICAL_RESOURCE_CATEGORIES = new Set<NormalizedResourceCategory>([
  RESOURCE_CATEGORY_ID.TAXE_BELGIA,
  RESOURCE_CATEGORY_ID.INFIINTARE_FIRMA_BELGIA,
  RESOURCE_CATEGORY_ID.GHIDURI_PRACTICE,
]);

const RESOURCE_CATEGORY_LABELS: Record<
  NormalizedResourceCategory,
  string
> = {
  [RESOURCE_CATEGORY_ID.TAXE_BELGIA]: "Taxe Belgia",
  [RESOURCE_CATEGORY_ID.INFIINTARE_FIRMA_BELGIA]:
    "Înființare firmă Belgia",
  [RESOURCE_CATEGORY_ID.GHIDURI_PRACTICE]: "Ghiduri practice",
};

const TAXE_BELGIA_SLUGS = new Set([
  "tva-btw-belgia-ghid-complet-2026",
  "taxe-zelfstandig-belgia-ghid-complet-2026",
  "cat-ramane-in-mana-venituri-belgia-2026",
  "taxe-independent-belgia-2026",
  "impozitul-pe-dividende-belgia-2026",
  "dividende-belgia-2026-ghid-complet",
]);

const INFIINTARE_FIRMA_BELGIA_SLUGS = new Set([
  "cum-devii-independent-belgia-ghid-complet-2026",
  "srl-vs-nv-belgia-diferente-avantaje",
  "checklist-primele-30-zile-independent-belgia",
  "peppol-belgia-2026-facturare-electronica-obligatorie",
  "inregistrare-afacere-belgia",
  "cum-devii-independent-belgia-2025",
]);

const GHIDURI_PRACTICE_SLUGS = new Set([
  "cash-flow-antreprenori-belgia-ghid-practic",
  "business-canvas-ghid-plan-afacere",
  "marketing-digital-incepatori",
  "afaceri-romanesti-belgia-vizibilitate-online",
  "ghid-google-business-belgia-2026",
  "primirii-10-clienti-belgia-ghid-2026",
  "marketing-afacere-belgia-ghid-pas-cu-pas",
  "plan-marketing-12-luni-belgia-ghid-complet",
]);

const LEGACY_CATEGORY_FALLBACKS: Record<string, NormalizedResourceCategory> = {
  Taxe: RESOURCE_CATEGORY_ID.TAXE_BELGIA,
  Legal: RESOURCE_CATEGORY_ID.INFIINTARE_FIRMA_BELGIA,
  Marketing: RESOURCE_CATEGORY_ID.GHIDURI_PRACTICE,
  Business: RESOURCE_CATEGORY_ID.GHIDURI_PRACTICE,
};

export function isNormalizedResourceCategory(
  category: string,
): category is NormalizedResourceCategory {
  return CANONICAL_RESOURCE_CATEGORIES.has(
    category as NormalizedResourceCategory,
  );
}

export function getNormalizedResourceCategory(
  resource: Pick<Resource, "slug" | "category">,
): NormalizedResourceCategory {
  if (isNormalizedResourceCategory(resource.category)) {
    return resource.category;
  }

  if (TAXE_BELGIA_SLUGS.has(resource.slug)) {
    return RESOURCE_CATEGORY_ID.TAXE_BELGIA;
  }

  if (INFIINTARE_FIRMA_BELGIA_SLUGS.has(resource.slug)) {
    return RESOURCE_CATEGORY_ID.INFIINTARE_FIRMA_BELGIA;
  }

  if (GHIDURI_PRACTICE_SLUGS.has(resource.slug)) {
    return RESOURCE_CATEGORY_ID.GHIDURI_PRACTICE;
  }

  return (
    LEGACY_CATEGORY_FALLBACKS[resource.category] ??
    RESOURCE_CATEGORY_ID.GHIDURI_PRACTICE
  );
}

export function normalizeResource(resource: Resource): NormalizedResource {
  return {
    ...resource,
    normalizedCategory: getNormalizedResourceCategory(resource),
  };
}

export function getResourceCategoryLabel(
  category: ResourceCategoryId,
  t: (key: string) => string,
): string {
  if (category === RESOURCE_CATEGORY_ID.ALL) {
    return t("resources.allCategories");
  }

  const translationKey = `resources.categories.${category}`;
  const translatedLabel = t(translationKey);

  return translatedLabel !== translationKey
    ? translatedLabel
    : RESOURCE_CATEGORY_LABELS[category];
}
