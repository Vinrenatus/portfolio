import React, { useState } from "react";

const Testimonials = () => {
  const [formData, setFormData] = useState({
    profession: "",
    projectTitle: "",
    description: "",
    rating: 0,
    timeline: "",
    startDate: "",
    endDate: "",
  });
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTestimonial = {
      ...formData,
      id: Date.now(),
      reactions: {
        thumbsUp: { emoji: "👍", count: 0 },
        heart: { emoji: "❤️", count: 0 },
        laugh: { emoji: "😂", count: 0 },
        surprise: { emoji: "😮", count: 0 },
        thumbsDown: { emoji: "👎", count: 0 }
      },
      comments: [],
    };

    setTestimonialsData([...testimonialsData, newTestimonial]);
    setShowPopup(true);

    // Clear form
    setFormData({
      profession: "",
      projectTitle: "",
      description: "",
      rating: 0,
      timeline: "",
      startDate: "",
      endDate: "",
    });

    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  const handleTimelineChange = (value) => {
    setFormData({
      ...formData,
      timeline: value,
      endDate: value === "Ongoing" ? "" : formData.endDate,
    });
  };

  const addReaction = (id, emoji) => {
    setTestimonialsData((prevData) =>
      prevData.map((testimonial) =>
        testimonial.id === id
          ? {
              ...testimonial,
              reactions: {
                ...testimonial.reactions,
                [emoji]: {
                  ...testimonial.reactions[emoji],
                  count: testimonial.reactions[emoji].count + 1
                }
              }
            }
          : testimonial
      )
    );
  };

  const addComment = (id) => {
    if (commentText.trim() === "") return;

    setTestimonialsData((prevData) =>
      prevData.map((testimonial) =>
        testimonial.id === id
          ? { ...testimonial, comments: [...testimonial.comments, commentText] }
          : testimonial
      )
    );
    setCommentText("");
  };

  const shareTestimonial = (platform, testimonial) => {
    const shareText = `Check out this testimonial about ${testimonial.projectTitle}: ${testimonial.description}`;
    const shareUrl = encodeURIComponent(shareText);

    let shareLink = "";
    switch (platform) {
      case "Facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        break;
      case "Twitter":
        shareLink = `https://twitter.com/intent/tweet?text=${shareUrl}`;
        break;
      case "LinkedIn":
        shareLink = `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`;
        break;
      case "WhatsApp":
        shareLink = `https://api.whatsapp.com/send?text=${shareUrl}`;
        break;
      default:
        break;
    }
    window.open(shareLink, "_blank");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.15)",
          backgroundColor: "#fdfdfd",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#33cc33" }}>Submit a Testimonial</h2>

        {/* Profession */}
        <label>
          Profession:
          <select
            value={formData.profession}
            onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              marginBottom: "12px",
              backgroundColor: "#33cc33",
              color: "#fff"
            }}
          >
            <option value="">Select a profession</option>
            <option value="Tutoring">Tutoring</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Professional Writing">Professional Writing</option>
          </select>
        </label>

        {/* Project Title */}
        <input
          type="text"
          placeholder="Project Title"
          value={formData.projectTitle}
          onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
          required
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginBottom: "12px",
            backgroundColor: "#33cc33",
            color: "#fff"
          }}
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginBottom: "12px",
            minHeight: "100px",
            backgroundColor: "#33cc33",
            color: "#fff"
          }}
        ></textarea>

        {/* Rating */}
        <label>
          Rating:
          <div style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setFormData({ ...formData, rating: star })}
                style={{
                  fontSize: "24px",
                  color: formData.rating >= star ? "#FFD700" : "#ccc",
                  margin: "0 5px",
                }}
              >
                ★
              </span>
            ))}
          </div>
        </label>

        {/* Timeline */}
        <label>
          Project Timeline:
          <select
            value={formData.timeline}
            onChange={(e) => handleTimelineChange(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              marginBottom: "12px",
              backgroundColor: "#33cc33",
              color: "#fff"
            }}
          >
            <option value="">Select a timeline</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Last Three Months">Last Three Months</option>
            <option value="Last Year">Last Year</option>
            <option value="Last Five Years">Last Five Years</option>
          </select>
        </label>

        {/* Start Date */}
        <input
          type="date"
          value={formData.startDate}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          required
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginBottom: "12px",
            backgroundColor: "#33cc33",
            color: "#fff"
          }}
        />

        {/* End Date */}
        <input
          type="date"
          value={formData.endDate}
          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          required
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginBottom: "12px",
            backgroundColor: "#33cc33",
            color: "#fff"
          }}
        />

        <button
          type="submit"
          style={{
            backgroundColor: "green",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            width: "100%",
          }}
        >
          Submit
        </button>
      </form>

      {/* Popup */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
              textAlign: "center",
              color: "#33cc33",
            }}
          >
            <p>Testimonial submitted successfully!</p>
          </div>
        </div>
      )}

      {/* Testimonials List */}
      <div style={{ marginTop: "30px" }}>
        {testimonialsData.map((testimonial) => (
          <div
            key={testimonial.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "12px",
              marginBottom: "20px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h3 style={{ marginBottom: "10px", color: "#33cc33" }}>{testimonial.projectTitle}</h3>
            <p>{testimonial.description}</p>
            <p><strong>Rating:</strong> {testimonial.rating} ★</p>
            <p><strong>Profession:</strong> {testimonial.profession}</p>
            <p><strong>Timeline:</strong> {testimonial.timeline}</p>
            <p><strong>Start Date:</strong> {testimonial.startDate}</p>
            <p><strong>End Date:</strong> {testimonial.endDate}</p>

            {/* Reactions */}
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              {Object.keys(testimonial.reactions).map((reaction) => (
                <button
                  key={reaction}
                  onClick={() => addReaction(testimonial.id, reaction)}
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    padding: "5px 10px",
                    cursor: "pointer",
                    color: "#33cc33",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span style={{ marginRight: "5px" }}>{testimonial.reactions[reaction].emoji}</span>
                  {testimonial.reactions[reaction].count}
                </button>
              ))}
            </div>

            {/* Comments */}
            <div style={{ marginTop: "15px" }}>
              <textarea
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  backgroundColor: "#f2f2f2",
                  color: "#333",
                  marginBottom: "10px",
                  minHeight: "50px",
                }}
              />
              <button
                onClick={() => addComment(testimonial.id)}
                style={{
                  backgroundColor: "#33cc33",
                  color: "#fff",
                  padding: "10px 15px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Comment
              </button>
            </div>

            {/* Comments List */}
            <div style={{ marginTop: "10px" }}>
              {testimonial.comments.map((comment, index) => (
                <p key={index} style={{ margin: "5px 0", fontSize: "14px" }}>
                  {comment}
                </p>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px" }}>
              <button
                onClick={() => shareTestimonial("Facebook", testimonial)}
                style={{
                  backgroundColor: "#3b5998",
                  color: "#fff",
                  padding: "8px 15px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Share on Facebook
              </button>
              <button
                onClick={() => shareTestimonial("Twitter", testimonial)}
                style={{
                  backgroundColor: "#00acee",
                  color: "#fff",
                  padding: "8px 15px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Share on Twitter
              </button>
              <button
                onClick={() => shareTestimonial("LinkedIn", testimonial)}
                style={{
                  backgroundColor: "#0077b5",
                  color: "#fff",
                  padding: "8px 15px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Share on LinkedIn
              </button>
              <button
                onClick={() => shareTestimonial("WhatsApp", testimonial)}
                style={{
                  backgroundColor: "#25d366",
                  color: "#fff",
                  padding: "8px 15px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Share on WhatsApp
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;






