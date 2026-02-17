import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageSquare, Trash2, Reply, Send, Smile, ThumbsUp, Lightbulb, Star, CheckCircle } from 'lucide-react';
import apiService from '../../services/apiService';
import { useAuth } from '../../context/AuthContext';

const CommentsSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: '', content: '', emoji: null });
  const [replyTo, setReplyTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { currentUser, isAdmin } = useAuth();

  const emojiOptions = [
    { icon: '👍', name: 'Agree', color: 'bg-blue-500' },
    { icon: '💡', name: 'Insightful', color: 'bg-yellow-500' },
    { icon: '⭐', name: 'Excellent', color: 'bg-orange-500' },
    { icon: '✅', name: 'Helpful', color: 'bg-green-500' },
    { icon: '🎯', name: 'On Point', color: 'bg-red-500' },
    { icon: '🔥', name: 'Fire', color: 'bg-purple-500' }
  ];

  // Fetch comments
  const fetchComments = async () => {
    try {
      const data = await apiService.getAll('comments');
      // Sort by date (newest first)
      setComments(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // Post new comment
  const handlePostComment = async (e) => {
    e.preventDefault();
    try {
      await apiService.create('comments', {
        ...newComment,
        createdAt: new Date().toISOString(),
        reactions: { likes: 0 },
        replies: [],
        type: 'professional'
      });
      setNewComment({ name: '', content: '', emoji: null });
      setShowEmojiPicker(false);
      fetchComments();
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('Error posting comment');
    }
  };

  // Reply to comment
  const handleReply = async (commentId) => {
    try {
      const comment = comments.find(c => c.id === commentId);
      const updatedReplies = [...(comment.replies || []), {
        id: Date.now(),
        name: replyTo.name,
        content: replyContent,
        createdAt: new Date().toISOString()
      }];
      
      await apiService.update('comments', commentId, {
        ...comment,
        replies: updatedReplies
      });
      
      setReplyTo(null);
      setReplyContent('');
      fetchComments();
    } catch (error) {
      console.error('Error posting reply:', error);
    }
  };

  // Like comment
  const handleLike = async (commentId) => {
    try {
      const comment = comments.find(c => c.id === commentId);
      await apiService.update('comments', commentId, {
        ...comment,
        reactions: {
          ...comment.reactions,
          likes: (comment.reactions?.likes || 0) + 1
        }
      });
      fetchComments();
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  // Delete comment (admin only)
  const handleDelete = async (commentId) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;
    try {
      await apiService.delete('comments', commentId);
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  // Delete reply (admin only)
  const handleDeleteReply = async (commentId, replyId) => {
    if (!confirm('Are you sure you want to delete this reply?')) return;
    try {
      const comment = comments.find(c => c.id === commentId);
      const updatedReplies = (comment.replies || []).filter(r => r.id !== replyId);
      await apiService.update('comments', commentId, {
        ...comment,
        replies: updatedReplies
      });
      fetchComments();
    } catch (error) {
      console.error('Error deleting reply:', error);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-tech-dots opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-4">
            Professional Remarks
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Share your professional insights, feedback, or collaborate on technical discussions. 
            This space is dedicated to professional remarks from fellow developers, engineers, and industry experts.
          </p>
        </motion.div>

        {/* Post Comment Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-12"
        >
          <form onSubmit={handlePostComment} className="glass-dark rounded-2xl p-6 border border-emerald-500/20">
            <h3 className="text-xl font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Share Your Professional Insight
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={newComment.name}
                onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
                required
              />
              <textarea
                placeholder="Share your professional perspective, technical feedback, or industry insights... (e.g., 'Great approach to scalable architecture!' or 'Have you considered implementing microservices?')"
                value={newComment.content}
                onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 resize-none"
                rows="4"
                required
              ></textarea>
              
              {/* Emoji Selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  <Smile className="w-5 h-5" />
                  <span className="text-sm">Add a professional reaction emoji</span>
                </button>
                
                {showEmojiPicker && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-8 left-0 glass-dark rounded-xl p-4 border border-emerald-500/20 z-10"
                  >
                    <p className="text-xs text-gray-400 mb-3">Select an emoji to express your reaction:</p>
                    <div className="grid grid-cols-6 gap-2">
                      {emojiOptions.map((emoji) => (
                        <button
                          key={emoji.name}
                          type="button"
                          onClick={() => {
                            setNewComment({ ...newComment, emoji: emoji.icon });
                            setShowEmojiPicker(false);
                          }}
                          className={`w-10 h-10 rounded-lg ${emoji.color} hover:opacity-80 transition-all duration-300 flex items-center justify-center text-xl`}
                          title={emoji.name}
                        >
                          {emoji.icon}
                        </button>
                      ))}
                    </div>
                    {newComment.emoji && (
                      <div className="mt-3 pt-3 border-t border-emerald-500/20">
                        <p className="text-xs text-gray-400">Selected: <span className="text-emerald-400">{newComment.emoji}</span></p>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
              
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Post Professional Remark
              </button>
            </div>
          </form>
        </motion.div>

        {/* Comments List */}
        <div className="max-w-4xl mx-auto space-y-6">
          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mx-auto"></div>
              <p className="text-gray-400 mt-4">Loading comments...</p>
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-10 glass-dark rounded-2xl">
              <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            comments.map((comment, index) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                index={index}
                isAdmin={isAdmin}
                onReply={setReplyTo}
                onLike={handleLike}
                onDelete={handleDelete}
                onDeleteReply={handleDeleteReply}
              />
            ))
          )}
        </div>

        {/* Reply Form Modal */}
        {replyTo && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-dark rounded-2xl p-8 max-w-lg w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-emerald-400">Reply to {replyTo.name}</h3>
                <button
                  onClick={() => setReplyTo(null)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); handleReply(replyTo.id); }}>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={replyTo.name}
                  onChange={(e) => setReplyTo({ ...replyTo, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 mb-4"
                  required
                />
                <textarea
                  placeholder="Your Reply"
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 resize-none mb-4"
                  rows="4"
                  required
                ></textarea>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Post Reply
                  </button>
                  <button
                    type="button"
                    onClick={() => setReplyTo(null)}
                    className="px-6 py-3 glass-dark text-gray-400 rounded-xl font-medium hover:bg-white/10 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

// Comment Item Component
const CommentItem = ({ comment, index, isAdmin, onReply, onLike, onDelete, onDeleteReply }) => {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-dark rounded-2xl p-6 border border-emerald-500/20"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
            {comment.emoji || comment.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-200">{comment.name}</h4>
            <div className="flex items-center gap-2">
              <p className="text-gray-500 text-sm">
                {new Date(comment.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              {comment.type === 'professional' && (
                <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/20">
                  Professional Remark
                </span>
              )}
            </div>
          </div>
        </div>
        {isAdmin && (
          <button
            onClick={() => onDelete(comment.id)}
            className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      <p className="text-gray-300 mb-4">{comment.content}</p>

      {/* Actions */}
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => onLike(comment.id)}
          className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors duration-300"
        >
          <Heart className={`w-5 h-5 ${comment.reactions?.likes > 0 ? 'fill-current' : ''}`} />
          <span>{comment.reactions?.likes || 0}</span>
        </button>
        <button
          onClick={() => setShowReplies(!showReplies)}
          className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors duration-300"
        >
          <MessageSquare className="w-5 h-5" />
          <span>{comment.replies?.length || 0} Replies</span>
        </button>
        <button
          onClick={() => onReply({ id: comment.id, name: comment.name })}
          className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300"
        >
          <Reply className="w-5 h-5" />
          <span>Reply</span>
        </button>
      </div>

      {/* Replies */}
      {showReplies && comment.replies && comment.replies.length > 0 && (
        <div className="space-y-4 pl-8 border-l-2 border-emerald-500/20">
          {comment.replies.map((reply, idx) => (
            <div key={reply.id} className="glass-dark rounded-xl p-4 border border-emerald-500/10">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                    {reply.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-gray-200">{reply.name}</h5>
                    <p className="text-gray-500 text-xs">
                      {new Date(reply.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                {isAdmin && (
                  <button
                    onClick={() => onDeleteReply(comment.id, reply.id)}
                    className="p-1 rounded bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
              <p className="text-gray-300 text-sm">{reply.content}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default CommentsSection;