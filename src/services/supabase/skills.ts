import { createClient } from '@/lib/supabase';
import { Skill, SkillWithCategory, Category, Content, License, getLocalizedValue, parseTags } from '@/types/database';

const supabase = createClient();

// Fetch all skills with their categories
export async function getSkills(): Promise<SkillWithCategory[]> {
  const { data, error } = await supabase
    .from('skills')
    .select(`
      *,
      category:categories(*)
    `)
    .order('likes_count', { ascending: false });

  if (error) {
    console.error('Error fetching skills:', error);
    return [];
  }

  return data || [];
}

// Fetch a single skill by ID
export async function getSkillById(id: string): Promise<SkillWithCategory | null> {
  const { data, error } = await supabase
    .from('skills')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching skill:', error);
    return null;
  }

  return data;
}

// Fetch skills by category
export async function getSkillsByCategory(categoryId: string): Promise<SkillWithCategory[]> {
  const { data, error } = await supabase
    .from('skills')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('categories', categoryId)
    .order('likes_count', { ascending: false });

  if (error) {
    console.error('Error fetching skills by category:', error);
    return [];
  }

  return data || [];
}

// Search skills by title and tags
export async function searchSkills(query: string, language: 'ko' | 'en' = 'ko'): Promise<SkillWithCategory[]> {
  const lowercaseQuery = query.toLowerCase();

  const { data, error } = await supabase
    .from('skills')
    .select(`
      *,
      category:categories(*)
    `)
    .or(`title_ko.ilike.%${lowercaseQuery}%,title_en.ilike.%${lowercaseQuery}%,sub_title_ko.ilike.%${lowercaseQuery}%,sub_title_en.ilike.%${lowercaseQuery}%,tags.ilike.%${lowercaseQuery}%`)
    .order('likes_count', { ascending: false })
    .limit(20);

  if (error) {
    console.error('Error searching skills:', error);
    return [];
  }

  return data || [];
}

// Fetch featured skills (top by likes)
export async function getFeaturedSkills(limit: number = 6): Promise<SkillWithCategory[]> {
  const { data, error } = await supabase
    .from('skills')
    .select(`
      *,
      category:categories(*)
    `)
    .order('likes_count', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching featured skills:', error);
    return [];
  }

  return data || [];
}

// Fetch skill contents (what_is, how_to_use, key_features)
export async function getSkillContents(skillId: string): Promise<Content[]> {
  const { data, error } = await supabase
    .from('contents')
    .select('*')
    .eq('skills', skillId);

  if (error) {
    console.error('Error fetching skill contents:', error);
    return [];
  }

  return data || [];
}

// Fetch skill license
export async function getSkillLicense(skillId: string): Promise<License | null> {
  const { data, error } = await supabase
    .from('licenses')
    .select('*')
    .eq('skills', skillId)
    .single();

  if (error) {
    console.error('Error fetching skill license:', error);
    return null;
  }

  return data;
}

// Increment view count
export async function incrementViewCount(skillId: string): Promise<void> {
  const { error } = await supabase.rpc('increment_view_count', { skill_id: skillId });

  if (error) {
    // Fallback: manual increment
    const { data: skill } = await supabase
      .from('skills')
      .select('views_count')
      .eq('id', skillId)
      .single();

    if (skill) {
      await supabase
        .from('skills')
        .update({ views_count: (skill.views_count || 0) + 1 })
        .eq('id', skillId);
    }
  }
}

// Helper to convert database skill to display format
export function formatSkillForDisplay(skill: SkillWithCategory, language: 'ko' | 'en') {
  return {
    id: skill.id,
    title: getLocalizedValue(skill.title_ko, skill.title_en, language),
    description: getLocalizedValue(skill.sub_title_ko, skill.sub_title_en, language),
    icon: skill.icon,
    likesCount: skill.likes_count,
    viewsCount: skill.views_count,
    commentsCount: skill.comments_count,
    downloadUrl: skill.download_url,
    tags: parseTags(skill.tags),
    categoryId: skill.categories,
    categoryName: skill.category
      ? getLocalizedValue(skill.category.category_name_ko, skill.category.category_name_en, language)
      : '',
    categoryIcon: skill.category?.icon || '',
  };
}
