import { createClient } from '@/lib/supabase';
import { Skill, SkillWithCategory, Category, Content, License, getLocalizedValue, parseTags } from '@/types/database';
import { skills as mockSkills, SkillData } from '@/data/skills';

const supabase = createClient();

// Convert mock skill to SkillWithCategory format
function convertMockSkillToDbFormat(skill: SkillData): SkillWithCategory {
  return {
    id: skill.id,
    title_ko: skill.name,
    title_en: skill.name,
    sub_title_ko: skill.description,
    sub_title_en: skill.description,
    icon: skill.icon || skill.name.charAt(0).toUpperCase(),
    tags: skill.tags?.join(', ') || '',
    download_url: skill.repository || '',
    likes_count: skill.downloads || 0,
    views_count: skill.stars || 0,
    comments_count: skill.forks || 0,
    categories: skill.categories[0]?.toLowerCase() || 'general',
    created_at: skill.lastUpdate || new Date().toISOString(),
    category: {
      id: skill.categories[0]?.toLowerCase() || 'general',
      category_name_ko: skill.categories[0] || 'General',
      category_name_en: skill.categories[0] || 'General',
      icon: skill.categories[0]?.charAt(0) || 'G',
    },
    // Extended fields for detail page
    what_is_ko: skill.whatIsIt || '',
    what_is_en: skill.whatIsIt || '',
    how_to_use_ko: skill.howToUse || '',
    how_to_use_en: skill.howToUse || '',
    key_features: skill.keyFeatures || [],
    version: skill.version || '1.0.0',
    author: skill.author || 'Anthropic',
    license: skill.license || 'Apache-2.0',
  } as SkillWithCategory;
}

// Get all mock skills in database format
function getMockSkillsAsDbFormat(): SkillWithCategory[] {
  return mockSkills.map(convertMockSkillToDbFormat);
}

// Fetch all skills with their categories (includes mock Anthropic skills)
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
    // Return mock skills as fallback
    return getMockSkillsAsDbFormat();
  }

  // Combine database skills with mock Anthropic skills
  const dbSkills = data || [];
  const mockSkillsConverted = getMockSkillsAsDbFormat();

  // Filter out mock skills that might already exist in the database (by id)
  const dbSkillIds = new Set(dbSkills.map(s => s.id));
  const uniqueMockSkills = mockSkillsConverted.filter(s => !dbSkillIds.has(s.id));

  return [...dbSkills, ...uniqueMockSkills];
}

// Fetch a single skill by ID (checks both database and mock data)
export async function getSkillById(id: string): Promise<SkillWithCategory | null> {
  const { data, error } = await supabase
    .from('skills')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('id', id)
    .single();

  if (error || !data) {
    // Try to find in mock skills
    const mockSkill = mockSkills.find(s => s.id === id);
    if (mockSkill) {
      return convertMockSkillToDbFormat(mockSkill);
    }
    console.error('Error fetching skill:', error);
    return null;
  }

  return data;
}

// Fetch skills by category (includes mock skills)
export async function getSkillsByCategory(categoryId: string): Promise<SkillWithCategory[]> {
  const { data, error } = await supabase
    .from('skills')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('categories', categoryId)
    .order('likes_count', { ascending: false });

  // Filter mock skills by category (case-insensitive)
  const mockSkillsInCategory = mockSkills
    .filter(skill =>
      skill.categories.some(cat => cat.toLowerCase() === categoryId.toLowerCase())
    )
    .map(convertMockSkillToDbFormat);

  if (error) {
    console.error('Error fetching skills by category:', error);
    return mockSkillsInCategory;
  }

  // Combine and deduplicate
  const dbSkills = data || [];
  const dbSkillIds = new Set(dbSkills.map(s => s.id));
  const uniqueMockSkills = mockSkillsInCategory.filter(s => !dbSkillIds.has(s.id));

  return [...dbSkills, ...uniqueMockSkills].sort((a, b) => (b.likes_count || 0) - (a.likes_count || 0));
}

// Search skills by title and tags (includes mock skills)
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

  // Search in mock skills
  const mockResults = mockSkills
    .filter(skill =>
      skill.name.toLowerCase().includes(lowercaseQuery) ||
      skill.description.toLowerCase().includes(lowercaseQuery) ||
      skill.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      skill.categories.some(cat => cat.toLowerCase().includes(lowercaseQuery))
    )
    .map(convertMockSkillToDbFormat);

  if (error) {
    console.error('Error searching skills:', error);
    return mockResults;
  }

  // Combine and deduplicate
  const dbSkills = data || [];
  const dbSkillIds = new Set(dbSkills.map(s => s.id));
  const uniqueMockResults = mockResults.filter(s => !dbSkillIds.has(s.id));

  return [...dbSkills, ...uniqueMockResults].slice(0, 20);
}

// Fetch featured skills (top by likes, includes mock skills)
export async function getFeaturedSkills(limit: number = 6): Promise<SkillWithCategory[]> {
  const { data, error } = await supabase
    .from('skills')
    .select(`
      *,
      category:categories(*)
    `)
    .order('likes_count', { ascending: false })
    .limit(limit);

  // Get featured mock skills
  const featuredMockSkills = mockSkills
    .filter(s => s.featured)
    .map(convertMockSkillToDbFormat);

  if (error) {
    console.error('Error fetching featured skills:', error);
    return featuredMockSkills.slice(0, limit);
  }

  // Combine and deduplicate
  const dbSkills = data || [];
  const dbSkillIds = new Set(dbSkills.map(s => s.id));
  const uniqueMockSkills = featuredMockSkills.filter(s => !dbSkillIds.has(s.id));

  return [...dbSkills, ...uniqueMockSkills]
    .sort((a, b) => (b.likes_count || 0) - (a.likes_count || 0))
    .slice(0, limit);
}

// Fetch skill contents (what_is, how_to_use, key_features)
export async function getSkillContents(skillId: string): Promise<Content[]> {
  const { data, error } = await supabase
    .from('contents')
    .select('*')
    .eq('skills', skillId);

  if (error || !data || data.length === 0) {
    // Try to get content from mock skills
    const mockSkill = mockSkills.find(s => s.id === skillId);
    if (mockSkill) {
      const contents: Content[] = [];
      if (mockSkill.whatIsIt) {
        contents.push({
          id: `${skillId}-what-is`,
          skills: skillId,
          content_type: 'what_is',
          content_ko: mockSkill.whatIsIt,
          content_en: mockSkill.whatIsIt,
        } as Content);
      }
      if (mockSkill.howToUse) {
        contents.push({
          id: `${skillId}-how-to-use`,
          skills: skillId,
          content_type: 'how_to_use',
          content_ko: mockSkill.howToUse,
          content_en: mockSkill.howToUse,
        } as Content);
      }
      if (mockSkill.keyFeatures && mockSkill.keyFeatures.length > 0) {
        contents.push({
          id: `${skillId}-key-features`,
          skills: skillId,
          content_type: 'key_features',
          content_ko: mockSkill.keyFeatures.join('\n'),
          content_en: mockSkill.keyFeatures.join('\n'),
        } as Content);
      }
      return contents;
    }
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

  if (error || !data) {
    // Try to get license from mock skills
    const mockSkill = mockSkills.find(s => s.id === skillId);
    if (mockSkill) {
      return {
        id: `${skillId}-license`,
        skills: skillId,
        license_name: mockSkill.license || 'Apache-2.0',
        license_url: mockSkill.license === 'Apache-2.0'
          ? 'https://www.apache.org/licenses/LICENSE-2.0'
          : '',
      } as License;
    }
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
