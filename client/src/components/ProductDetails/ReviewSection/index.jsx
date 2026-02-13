import { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./ReviewSection.css";

const ReviewSection = () => {
  const [reviews, setReviews] = useState([
    {
      name: "Robert Karmazov",
      message: "Auctor magnis proin vitae laoreet ultrices ultricies diam. Sed duis mattis cras lacus donec. Aliquam.",
      rating: 4,
      avatar: "https://i.pravatar.cc/150?u=robert1"
    },
    {
      name: "Robert Karmazov",
      message: "Auctor magnis proin vitae laoreet ultrices ultricies diam. Sed duis mattis cras lacus donec. Aliquam.",
      rating: 4,
      avatar: "https://i.pravatar.cc/150?u=robert2"
    },
    {
      name: "Robert Karmazov",
      message: "Auctor magnis proin vitae laoreet ultrices ultricies diam. Sed duis mattis cras lacus donec. Aliquam.",
      rating: 4,
      avatar: "https://i.pravatar.cc/150?u=robert3"
    }
  ]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return alert("Please select a rating!");

    const newReview = {
      name,
      email,
      message,
      rating,
      avatar: `https://i.pravatar.cc/150?u=${name}`
    };

    setReviews([newReview, ...reviews]);
    setName("");
    setEmail("");
    setMessage("");
    setRating(0);
  };

  const ratingDistribution = [
    { label: "Five", stars: 5, count: 989, percentage: 70 },
    { label: "Four", stars: 4, count: "4.5K", percentage: 85 },
    { label: "Three", stars: 3, count: 50, percentage: 30 },
    { label: "Two", stars: 2, count: 16, percentage: 15 },
    { label: "One", stars: 1, count: 8, percentage: 5 },
  ];

  return (
    <section className="review-section">
      {/* 1. Rating Summary (Top) */}
      <div className="rating-summary">
        <div className="rating-bars">
          {ratingDistribution.map((row, index) => (
            <div key={index} className="bar-row">
              <span>{row.label}</span>
              <div className="star-icon"><FaStar /></div>
              <div className="bar-bg">
                <div className="bar-fill" style={{ width: `${row.percentage}%` }}></div>
              </div>
              <span>{row.count}</span>
            </div>
          ))}
        </div>

        <div className="avg-rating-card">
          <div className="avg-value-big">4.3</div>
          <div className="avg-stars-big">
            {[1, 2, 3, 4, 5].map((i) => (
              <FaStar key={i} className={i <= 4 ? "filled" : "empty"} />
            ))}
          </div>
          <div className="avg-count-label">50 Ratings</div>
        </div>
      </div>

      {/* 2. Bottom Split Section */}
      <div className="reviews-split-layout">

        {/* Left: Recent Feedbacks */}
        <div className="feedbacks-part">
          <h3 className="section-title">Recent Feedbacks</h3>
          <div className="feedback-list">
            {reviews.map((review, index) => (
              <div key={index} className="feedback-card">
                <div className="user-avatar">
                  <img src={review.avatar} alt={review.name} />
                </div>
                <div className="feedback-content">
                  <div className="feedback-header">
                    <h4>{review.name}</h4>
                    <div className="feedback-stars">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <FaStar key={i} className={i <= review.rating ? "active" : "empty"} />
                      ))}
                    </div>
                  </div>
                  <p className="feedback-text">{review.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Add a Review */}
        <div className="add-review-part">
          <h3 className="section-title">Add a Review</h3>
          <form onSubmit={handleSubmit} className="add-review-form">

            <div className="form-group">
              <label>Add Your Rating *</label>
              <div className="star-rating-selector">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={rating >= star ? "active" : ""}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                placeholder="JohnDoe@gmail.com"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Write Your Review *</label>
              <textarea
                placeholder="Write here..."
                value={message}
                required
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            <button type="submit" className="submit-review-btn">Submit</button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default ReviewSection;
