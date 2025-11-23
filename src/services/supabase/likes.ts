import { createClient } from '@/lib/supabase';
import { Like } from '@/types/database';

const supabase = createClient();

// Check if user has liked a skill
export async function hasUserLikedSkill(userId: string, skillId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('likes')
    .select('id')
    .eq('users', userId)
    .eq('skills', skillId)
    .single();

  if (error) {
    return false;
  }

  return !!data;
}

// Toggle like on a skill
export async function toggleLike(userId: string, skillId: string): Promise<{ liked: boolean; likesCount: number }> {
  const isLiked = await hasUserLikedSkill(userId, skillId);

  if (isLiked) {
    // Unlike
    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('users', userId)
      .eq('skills', skillId);

    if (error) {
      console.error('Error removing like:', error);
      throw error;
    }

    // Decrement likes count
    const { data: skill } = await supabase
      .from('skills')
      .select('likes_count')
      .eq('id', skillId)
      .single();

    const newCount = Math.max(0, (skill?.likes_count || 1) - 1);

    await supabase
      .from('skills')
      .update({ likes_count: newCount })
      .eq('id', skillId);

    return { liked: false, likesCount: newCount };
  } else {
    // Like
    const { error } = await supabase
      .from('likes')
      .insert({
        users: userId,
        skills: skillId,
      });

    if (error) {
      console.error('Error adding like:', error);
      throw error;
    }

    // Increment likes count
    const { data: skill } = await supabase
      .from('skills')
      .select('likes_count')
      .eq('id', skillId)
      .single();

    const newCount = (skill?.likes_count || 0) + 1;

    await supabase
      .from('skills')
      .update({ likes_count: newCount })
      .eq('id', skillId);

    return { liked: true, likesCount: newCount };
  }
}

// Get all likes for a user
export async function getUserLikes(userId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('likes')
    .select('skills')
    .eq('users', userId);

  if (error) {
    console.error('Error fetching user likes:', error);
    return [];
  }

  return data?.map(like => like.skills).filter(Boolean) as string[] || [];
}
