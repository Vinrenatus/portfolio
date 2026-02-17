import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send } from 'lucide-react';

const CommentBox = () => {
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the comment to your backend
    console.log('Comment submitted:', comment);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setComment('');
    }, 3000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-tech-dots opacity-20"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass-dark rounded-2xl p-8 border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 mb-4"
              >
                <MessageSquare className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-emerald-400 mb-2">Leave a Comment</h3>
              <p className="text-gray-400">Have questions or feedback? I'd love to hear from you!</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your comment here..."
                  className="w-full p-4 bg-white/5 border border-emerald-500/20 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 resize-none"
                  rows="5"
                  required
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={submitted}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                  submitted
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                    : 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-emerald-500/25'
                }`}
              >
                {submitted ? (
                  <>
                    <span>✓</span> Comment Submitted!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" /> Submit Comment
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommentBox;