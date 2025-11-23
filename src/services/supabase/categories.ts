import { createClient } from '@/lib/supabase';
import { Category, getLocalizedValue } from '@/types/database';

const supabase = createClient();

// Fetch all categories
export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('category_name_en');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data || [];
}

// Fetch a single category by ID
export async function getCategoryById(id: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
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
