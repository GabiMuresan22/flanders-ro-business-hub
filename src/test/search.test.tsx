import { describe, it, expect, vi, beforeEach } from "vitest";
// @ts-expect-error - @testing-library/dom peer dep missing in build
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useSearchParams } from "react-router-dom";
import React from "react";

// ---- Mock Supabase --------------------------------------------------------
const mockSelect = vi.fn();
const mockFrom = vi.fn(() => ({ select: mockSelect }));
vi.mock("@/integrations/supabase/client", () => ({
  supabase: { from: mockFrom },
}));

// ---- Mock Language Context -------------------------------------------------
vi.mock("@/contexts/LanguageContext", () => ({
  useLanguage: () => ({
    language: "en" as const,
    setLanguage: vi.fn(),
    toggleLanguage: vi.fn(),
    t: (key: string) => {
      const map: Record<string, string> = {
        "hero.searchPlaceholder": "Search businesses…",
        "hero.title": "Romanian Business Hub",
        "hero.subtitle": "Find Romanian businesses",
        "hero.searchButton": "Search",
        "searchResults.title": "Search Results",
        "searchResults.filterResults": "Filter Results",
        "searchResults.category": "Category",
        "searchResults.city": "City",
        "searchResults.allCategories": "All Categories",
        "searchResults.allCities": "All Cities",
        "searchResults.foundCount": "{count} {businessLabel} found",
        "searchResults.business": "business",
        "searchResults.businesses": "businesses",
        "searchResults.noBusinessesFound": "No businesses found",
        "searchResults.noMatchMessage": 'No results for "{query}"',
        "searchResults.enterSearchTerm": "Enter a search term",
        "searchResults.showingResultsFor": 'Showing results for "{query}"',
        "searchResults.backToHome": "Back to Home",
        "searchResults.browseCategories": "Browse Categories",
        "searchResults.titleWithQuery": "Search: {query}",
        "searchResults.titleDefault": "Search",
        "common.home": "Home",
      };
      return map[key] ?? key;
    },
  }),
}));

// ---- Helpers ---------------------------------------------------------------
const sampleBusinesses = [
  {
    id: "1",
    business_name: "Pizza Roma",
    category: "Restaurants",
    city: "Bruges",
    postal_code: "8000",
    description: "Authentic Italian pizza",
    description_en: null,
    description_nl: null,
    phone: "123",
    email: "a@b.com",
    website: null,
    image_url: null,
    btw_number: null,
    status: "approved",
    appointment_only: false,
    created_at: "2026-01-01",
    updated_at: "2026-01-01",
  },
  {
    id: "2",
    business_name: "Clean Pro",
    category: "Cleaning",
    city: "Ghent",
    postal_code: "9000",
    description: "Professional cleaning",
    description_en: null,
    description_nl: null,
    phone: "456",
    email: "c@d.com",
    website: null,
    image_url: null,
    btw_number: null,
    status: "approved",
    appointment_only: false,
    created_at: "2026-01-01",
    updated_at: "2026-01-01",
  },
  {
    id: "3",
    business_name: "Electric Expert",
    category: "Services",
    city: "Bruges",
    postal_code: "8000",
    description: "Electrical installations",
    description_en: null,
    description_nl: null,
    phone: "789",
    email: "e@f.com",
    website: null,
    image_url: null,
    btw_number: null,
    status: "approved",
    appointment_only: false,
    created_at: "2026-01-01",
    updated_at: "2026-01-01",
  },
];

// ---- Tests: Search filtering logic (unit) ----------------------------------
describe("Search filtering logic", () => {
  function filterBusinesses(
    businesses: typeof sampleBusinesses,
    query: string,
    category = "all",
    city = "all"
  ) {
    return businesses.filter((b) => {
      const q = query.toLowerCase();
      const matchesSearch =
        b.business_name.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.city.toLowerCase().includes(q) ||
        b.postal_code.toLowerCase().includes(q);
      const matchesCategory = category === "all" || b.category === category;
      const matchesCity = city === "all" || b.city === city;
      return matchesSearch && matchesCategory && matchesCity;
    });
  }

  it("finds businesses by name", () => {
    const results = filterBusinesses(sampleBusinesses, "pizza");
    expect(results).toHaveLength(1);
    expect(results[0].business_name).toBe("Pizza Roma");
  });

  it("finds businesses by city", () => {
    const results = filterBusinesses(sampleBusinesses, "bruges");
    expect(results).toHaveLength(2);
  });

  it("finds businesses by postal code", () => {
    const results = filterBusinesses(sampleBusinesses, "9000");
    expect(results).toHaveLength(1);
    expect(results[0].business_name).toBe("Clean Pro");
  });

  it("finds businesses by description keyword", () => {
    const results = filterBusinesses(sampleBusinesses, "electrical");
    expect(results).toHaveLength(1);
    expect(results[0].business_name).toBe("Electric Expert");
  });

  it("finds businesses by category", () => {
    const results = filterBusinesses(sampleBusinesses, "cleaning");
    expect(results).toHaveLength(1);
  });

  it("returns empty for non-matching query", () => {
    const results = filterBusinesses(sampleBusinesses, "xyznotfound");
    expect(results).toHaveLength(0);
  });

  it("is case-insensitive", () => {
    const results = filterBusinesses(sampleBusinesses, "PIZZA");
    expect(results).toHaveLength(1);
  });

  it("filters by category", () => {
    const results = filterBusinesses(sampleBusinesses, "", "Restaurants");
    expect(results).toHaveLength(1);
    expect(results[0].business_name).toBe("Pizza Roma");
  });

  it("filters by city", () => {
    const results = filterBusinesses(sampleBusinesses, "", "all", "Ghent");
    expect(results).toHaveLength(1);
    expect(results[0].business_name).toBe("Clean Pro");
  });

  it("combines query with category filter", () => {
    const results = filterBusinesses(sampleBusinesses, "bruges", "Services");
    expect(results).toHaveLength(1);
    expect(results[0].business_name).toBe("Electric Expert");
  });

  it("returns all for empty query and 'all' filters", () => {
    const results = filterBusinesses(sampleBusinesses, "");
    expect(results).toHaveLength(3);
  });
});

// ---- Tests: HeroSection search form ----------------------------------------
describe("HeroSection search form", () => {
  // Capture navigations
  let navigatedTo: string | null = null;

  const CaptureNav = () => {
    const [params] = useSearchParams();
    navigatedTo = params.get("q");
    return <div data-testid="search-page">q={navigatedTo}</div>;
  };

  beforeEach(() => {
    navigatedTo = null;
  });

  const renderHero = async () => {
    const HeroSection = (await import("@/components/HeroSection")).default;
    return render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/search" element={<CaptureNav />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it("renders the search input", async () => {
    await renderHero();
    expect(screen.getByLabelText(/search businesses/i)).toBeInTheDocument();
  });

  it("navigates to /search?q= on submit", async () => {
    await renderHero();
    const input = screen.getByLabelText(/search businesses/i);
    fireEvent.change(input, { target: { value: "pizza" } });
    fireEvent.submit(input.closest("form")!);
    expect(screen.getByTestId("search-page")).toHaveTextContent("q=pizza");
  });

  it("does not navigate when query is empty", async () => {
    await renderHero();
    const input = screen.getByLabelText(/search businesses/i);
    fireEvent.submit(input.closest("form")!);
    expect(screen.queryByTestId("search-page")).not.toBeInTheDocument();
  });
});
