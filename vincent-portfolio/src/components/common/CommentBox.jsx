import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Share2, Smile } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';

const CommentBox = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: Date.now(),
          text: newComment,
          likes: 0,
          reactions: [],
          timestamp: new Date(),
        },
      ]);
      setNewComment('');
    }
  };

  const handleLike = (commentId) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );
  };

  const handleShare = (commentId) => {
    const comment = comments.find((c) => c.id === commentId);
    if (navigator.share) {
      navigator.share({
        title: 'Shared Comment',
        text: comment.text,
        url: window.location.href,
      });
    }
  };

  const addReaction = (commentId, emoji) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              reactions: [...new Set([...comment.reactions, emoji])],
            }
          : comment
      )
    );
    setShowEmojiPicker(false);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-semibold text-emerald-800 mb-4">Comments</h3>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 px-4 py-2 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Post
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white rounded-lg p-4 shadow">
            <p className="text-emerald-800 mb-2">{comment.text}</p>
            <div className="flex items-center gap-4 text-sm text-emerald-600">
              <button
                onClick={() => handleLike(comment.id)}
                className="flex items-center gap-1 hover:text-emerald-700"
              >
                <ThumbsUp className="w-4 h-4" />
                {comment.likes}
              </button>
              <button
                onClick={() => handleShare(comment.id)}
                className="flex items-center gap-1 hover:text-emerald-700"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="flex items-center gap-1 hover:text-emerald-700"
                >
                  <Smile className="w-4 h-4" />
                  React
                </button>
                {showEmojiPicker && (
                  <div className="absolute bottom-full right-0 mb-2">
                    <EmojiPicker
                      onEmojiClick={(emojiData) =>
                        addReaction(comment.id, emojiData.emoji)
                      }
                    />
                  </div>
                )}
              </div>
            </div>
            {comment.reactions.length > 0 && (
              <div className="mt-2 flex gap-1">
                {comment.reactions.map((emoji, index) => (
                  <span key={index}>{emoji}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentBox;