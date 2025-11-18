'use client';

import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { ScrollToTopFab } from '@/components/Layout/ScrollToTopFab';
import { InteractiveHero } from '@/components/Dashboard/InteractiveHero';
import { FeatureBoxes } from '@/components/Dashboard/FeatureBoxes';
import { SearchBar } from '@/components/Dashboard/SearchBar';
import { CategorySections } from '@/components/Dashboard/CategorySection';

export default function Home() {
  return (
    <>
      <Header />

      {/* Interactive Hero Section */}
      <InteractiveHero />

      {/* Feature Boxes Section */}
      <FeatureBoxes />

      {/* Search Bar Section */}
      <SearchBar />

      {/* Category Sections with Skills */}
      <CategorySections />

      {/* Footer */}
      <Footer />

      {/* Floating Action Button */}
      <ScrollToTopFab />
    </>
  );
}
