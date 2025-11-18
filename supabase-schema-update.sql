-- ============================================
-- COMPLETE COMMENTS SYSTEM WITH ALL FEATURES
-- ============================================

-- Drop existing comments table and recreate with new structure
DROP TABLE IF EXISTS comment_likes CASCADE;
DROP TABLE IF EXISTS comments CASCADE;

-- Create comments table with all features
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  skill_id TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE, -- For threaded replies
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5), -- Star rating (1-5), nullable for replies
  user_email TEXT,
  user_name TEXT,
  user_avatar TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT content_length CHECK (char_length(content) >= 1 AND char_length(content) <= 2000)
);

-- Create unique constraint: one root comment per user per skill
-- (users can only write one main comment per skill, but unlimited replies)
CREATE UNIQUE INDEX unique_user_skill_comment
  ON comments (user_id, skill_id)
  WHERE parent_id IS NULL;

-- Create comment_likes table
CREATE TABLE comment_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  comment_id UUID NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_like UNIQUE (comment_id, user_id) -- One like per user per comment
);

-- Create indexes for performance
CREATE INDEX idx_comments_skill_id ON comments(skill_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_comments_parent_id ON comments(parent_id);
CREATE INDEX idx_comments_created_at ON comments(created_at DESC);
CREATE INDEX idx_comment_likes_comment_id ON comment_likes(comment_id);
CREATE INDEX idx_comment_likes_user_id ON comment_likes(user_id);

-- Enable Row Level Security
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_likes ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES FOR COMMENTS
-- ============================================

-- Anyone can view comments
CREATE POLICY "Anyone can view comments"
  ON comments FOR SELECT
  USING (true);

-- Authenticated users can insert comments
CREATE POLICY "Authenticated users can insert comments"
  ON comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own comments (content only, not rating after creation)
CREATE POLICY "Users can update own comments"
  ON comments FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own comments
CREATE POLICY "Users can delete own comments"
  ON comments FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- RLS POLICIES FOR LIKES
-- ============================================

-- Anyone can view likes
CREATE POLICY "Anyone can view likes"
  ON comment_likes FOR SELECT
  USING (true);

-- Authenticated users can add likes
CREATE POLICY "Authenticated users can add likes"
  ON comment_likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own likes (unlike)
CREATE POLICY "Users can delete own likes"
  ON comment_likes FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to get comment with like count and user's like status
CREATE OR REPLACE FUNCTION get_comment_stats(comment_uuid UUID, user_uuid UUID DEFAULT NULL)
RETURNS TABLE (
  like_count BIGINT,
  user_has_liked BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::BIGINT as like_count,
    CASE
      WHEN user_uuid IS NULL THEN FALSE
      ELSE EXISTS (
        SELECT 1 FROM comment_likes
        WHERE comment_id = comment_uuid AND user_id = user_uuid
      )
    END as user_has_liked
  FROM comment_likes
  WHERE comment_id = comment_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- ENABLE REALTIME (if needed)
-- ============================================

-- Run this in Supabase Dashboard if you want real-time updates:
-- Go to Database > Replication > Enable for 'comments' and 'comment_likes' tables
