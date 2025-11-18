# Complete Comments System Implementation Guide

## Step 1: Run the SQL in Supabase

Go to **Supabase Dashboard → SQL Editor** and run the file: `supabase-schema-update.sql`

This will create:
- `comments` table with `parent_id`, `rating`, and user info fields
- `comment_likes` table for likes
- Unique constraint: one root comment per user per skill
- All necessary RLS policies and indexes

## Step 2: Enable Realtime (Optional but recommended)

Go to **Supabase Dashboard → Database → Replication**
- Enable `comments` table
- Enable `comment_likes` table

## Step 3: Update the remaining components

The following files still need to be updated:

### 1. `src/components/Comments/CommentItem.tsx`

This component needs major updates to show:
- Star rating display (for root comments only)
- Like button with count
- Reply button
- Updated to handle the new CommentForm signature

Key changes:
```typescript
// Add state for replies
const [showReplyForm, setShowReplyForm] = useState(false);

// Display rating if it exists
{comment.rating && (
  <Rating value={comment.rating} readOnly size="small" />
)}

// Like button
<IconButton onClick={() => onLike(comment.id)}>
  <FavoriteIcon color={comment.user_has_liked ? 'error' : 'default'} />
</IconButton>
<Typography variant="caption">{comment.like_count}</Typography>

// Reply button
<Button onClick={() => setShowReplyForm(!showReplyForm)}>
  Reply
</Button>

// Reply form
{showReplyForm && (
  <CommentForm
    onSubmit={(content) => onReply(comment.id, content)}
    isReply={true}
    placeholder="Write a reply..."
  />
)}
```

### 2. `src/components/Comments/CommentSection.tsx`

Major updates needed:
- Check if user has already commented (one comment per skill)
- Handle like/unlike
- Handle replies
- Update to pass `userId` to service calls
- Update form submission to handle rating

Key changes:
```typescript
const [hasCommented, setHasCommented] = useState(false);

// Check if user has commented
useEffect(() => {
  if (user) {
    commentService.userHasCommented(skillId, user.id).then(setHasCommented);
  }
}, [skillId, user]);

// Update load comments to pass userId
const data = await commentService.getCommentsBySkillId(skillId, user?.id);

// Handle add comment with rating
const handleAddComment = async (content: string, rating?: number | null) => {
  const newComment = await commentService.addComment({
    skill_id: skillId,
    user_id: user.id,
    content,
    rating,
    user_email: user.email,
    user_name: user.user_metadata?.full_name,
    user_avatar: user.user_metadata?.avatar_url,
  });
  setHasCommented(true);
  // ...
};

// Handle like
const handleLike = async (commentId: string) => {
  if (!user) return;
  const comment = findComment(comments, commentId);
  if (comment?.user_has_liked) {
    await commentService.unlikeComment(commentId, user.id);
  } else {
    await commentService.likeComment(commentId, user.id);
  }
  // Reload comments
};

// Handle reply
const handleReply = async (parentId: string, content: string) => {
  await commentService.addComment({
    skill_id: skillId,
    user_id: user.id,
    parent_id: parentId,
    content,
    user_email: user.email,
    user_name: user.user_metadata?.full_name,
    user_avatar: user.user_metadata?.avatar_url,
  });
  // Reload comments
};
```

### 3. `src/components/Comments/CommentList.tsx`

Needs to:
- Pass `onLike` and `onReply` handlers to CommentItem
- Render nested replies recursively

### 4. Create `src/components/Comments/CommentThread.tsx` (NEW FILE)

A recursive component to render nested replies:

```typescript
import { Comment } from '@/types/comment';
import { CommentItem } from './CommentItem';

interface CommentThreadProps {
  comment: Comment;
  currentUserId?: string;
  onEdit: (id: string, content: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onLike: (id: string) => Promise<void>;
  onReply: (parentId: string, content: string) => Promise<void>;
  depth?: number;
}

export const CommentThread: React.FC<CommentThreadProps> = ({
  comment,
  currentUserId,
  onEdit,
  onDelete,
  onLike,
  onReply,
  depth = 0,
}) => {
  return (
    <Box sx={{ ml: depth > 0 ? 4 : 0 }}>
      <CommentItem
        comment={comment}
        currentUserId={currentUserId}
        onEdit={onEdit}
        onDelete={onDelete}
        onLike={onLike}
        onReply={onReply}
      />
      {comment.replies?.map((reply) => (
        <CommentThread
          key={reply.id}
          comment={reply}
          currentUserId={currentUserId}
          onEdit={onEdit}
          onDelete={onDelete}
          onLike={onLike}
          onReply={onReply}
          depth={depth + 1}
        />
      ))}
    </Box>
  );
};
```

## Summary

**What you have now:**
✅ SQL schema with all features
✅ TypeScript types updated
✅ CommentService with all functions
✅ CommentForm with rating selector
✅ Translations added

**What you need to complete:**
1. Run the SQL in Supabase
2. Update CommentItem component
3. Update CommentSection component
4. Update CommentList component
5. Create CommentThread component

Would you like me to implement the remaining components now?
