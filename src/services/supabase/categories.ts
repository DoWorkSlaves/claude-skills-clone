import { createClient } from '@/lib/supabase';
import { Category, getLocalizedValue } from '@/types/database';

const supabase = createClient();

// Mock categories based on the Anthropic skills
const mockCategories: Category[] = [
  {
    id: 'creative',
    category_name_ko: '크리에이티브',
    category_name_en: 'Creative',
    icon: '🎨',
  },
  {
    id: 'dev',
    category_name_ko: '개발',
    category_name_en: 'Dev',
    icon: '💻',
  },
  {
    id: 'design',
    category_name_ko: '디자인',
    category_name_en: 'Design',
    icon: '🎯',
  },
  {
    id: 'office',
    category_name_ko: '오피스',
    category_name_en: 'Office',
    icon: '📄',
  },
  {
    id: 'productivity',
    category_name_ko: '생산성',
    category_name_en: 'Productivity',
    icon: '⚡',
  },
  {
    id: 'communication',
    category_name_ko: '커뮤니케이션',
    category_name_en: 'Communication',
    icon: '💬',
  },
  {
    id: 'meta',
    category_name_ko: '메타',
    category_name_en: 'Meta',
    icon: '🔧',
  },
];

// Fetch all categories (includes mock categories)
export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('category_name_en');

  if (error) {
    console.error('Error fetching categories:', error);
    return mockCategories;
  }

  // Combine database categories with mock categories
  const dbCategories = data || [];
  const dbCategoryIds = new Set(dbCategories.map(c => c.id.toLowerCase()));
  const uniqueMockCategories = mockCategories.filter(c => !dbCategoryIds.has(c.id.toLowerCase()));

  return [...dbCategories, ...uniqueMockCategories].sort((a, b) =>
    a.category_name_en.localeCompare(b.category_name_en)
  );
}

// Fetch a single category by ID (checks both database and mock data)
export async function getCategoryById(id: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    // Try to find in mock categories
    const mockCategory = mockCategories.find(c => c.id.toLowerCase() === id.toLowerCase());
    if (mockCategory) {
      return mockCategory;
    }
    console.error('Error fetching category:', error);
    return null;
  }

  return data;
}

// Helper to format category for display
export function formatCategoryForDisplay(category: Category, language: 'ko' | 'en') {
  return {
    id: category.id,
    name: getLocalizedValue(category.category_name_ko, category.category_name_en, language),
    icon: category.icon,
  };
}
