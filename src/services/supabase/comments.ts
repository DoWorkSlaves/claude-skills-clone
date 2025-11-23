import { createClient } from '@/lib/supabase';
import { Comment, CommentWithUser } from '@/types/database';

const supabase = createClient();

// Fetch comments for a skill
export async function getSkillComments(skillId: string): Promise<CommentWithUser[]> {
  const { data, error } = await supabase
    .from('comments')
    .select(`
      *,
      user:users(*)
    `)
    .eq('skills', skillId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching comments:', error);
    return [];
  }

  return data || [];
}

// Add a new comment
export async function addComment(
  skillId: string,
  userId: string,
  commentText: string,
  rating: number
): Promise<Comment | null> {
  const { data, error } = await supabase
    .from('comments')
    .insert({
      skills: skillId,
      users: userId,
      comment_text: commentText,
      rating: rating,
    })
    .select()
    .single();

  if (error) {
    console.error('Error adding comment:', error);
    return null;
  }

  // Update comments count on skill
  await supabase.rpc('increment_comments_count', { skill_id: skillId });

  return data;
}

// Delete a comment
export async function deleteComment(commentId: string, skillId: string): Promise<boolean> {
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId);

  if (error) {
    console.error('Error deleting comment:', error);
    return false;
  }

  // Decrement comments count on skill
  await supabase.rpc('decrement_comments_count', { skill_id: skillId });

  return true;
}

// Update a comment
export async function updateComment(
  commentId: string,
  commentText: string,
  rating: number
): Promise<Comment | null> {
  const { data, error } = await supabase
    .from('comments')
    .update({
      comment_text: commentText,
      rating: rating,
    })
    .eq('id', commentId)
    .select()
    .single();

  if (error) {
    console.error('Error updating comment:', error);
    return null;
  }

  return data;
}

// Get average rating for a skill
export async function getSkillAverageRating(skillId: string): Promise<number> {
  const { data, error } = await supabase
    .from('comments')
    .select('rating')
    .eq('skills', skillId);

  if (error || !data || data.length === 0) {
    return 0;
  }

  const sum = data.reduce((acc, comment) => acc + comment.rating, 0);
  return sum / data.length;
}
