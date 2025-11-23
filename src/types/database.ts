// Database types matching Supabase schema

export interface Category {
  id: string;
  icon: string | null;
  category_name_ko: string | null;
  category_name_en: string | null;
}

export interface Skill {
  id: string;
  title_ko: string;
  title_en: string | null;
  sub_title_ko: string | null;
  sub_title_en: string | null;
  icon: string | null;
  comments_count: number;
  views_count: number;
  likes_count: number;
  download_url: string | null;
  tags: string | null;
  categories: string; // FK to categories table
}

export interface SkillWithCategory extends Skill {
  category: Category | null;
}

export interface User {
  id: string;
  email: string | null;
  nickname: string | null;
  avatar_url: string | null;
}

export interface Comment {
  id: string;
  rating: number;
  comment_text: string | null;
  created_at: string | null;
  users: string | null; // FK to users
  skills: string | null; // FK to skills
}

export interface CommentWithUser extends Comment {
  user: User | null;
}

export interface Content {
  id: string;
  content_type: string; // 'what_is', 'how_to_use', 'key_features'
  content_text: string | null;
  skills: string | null; // FK to skills
}

export interface License {
  id: string;
  license_type: string;
  github_url: string | null;
  owner_id: string | null;
  skills: string | null; // FK to skills
}

export interface Like {
  id: string;
  created_at: string;
  users: string | null; // FK to users
  skills: string | null; // FK to skills
}

// Helper type for localized content
export type LocalizedField<T extends { ko: string | null; en: string | null }> = T;

// Utility function to get localized value
export function getLocalizedValue(
  koValue: string | null | undefined,
  enValue: string | null | undefined,
  language: 'ko' | 'en'
): string {
  if (language === 'ko') {
    return koValue || enValue || '';
  }
  return enValue || koValue || '';
}

// Parse tags string to array
export function parseTags(tags: string | null): string[] {
  if (!tags) return [];
  return tags.split(',').map(tag => tag.trim()).filter(Boolean);
}
