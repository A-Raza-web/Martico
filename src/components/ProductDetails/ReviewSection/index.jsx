import { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./ReviewSection.css";

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [showReviews, setShowReviews] = useState(false); // 👈 toggle state

  // compute average rating to show in header
  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = {
      name,
      message,
      rating,
    };

    setReviews([newReview, ...reviews]);
    setName("");
    setMessage("");
    setRating(0);
    setShowReviews(true); // submit ke baad reviews dikhao
  };

  return (
    <section className="review-section" aria-labelledby="reviews-heading">
      <div className="review-header">
        <h2 id="reviews-heading">Customer Reviews</h2>

        {reviews.length > 0 ? (
          <div className="avg-rating" aria-live="polite">
            <div className="avg-value">{averageRating}</div>
            <div className="avg-stars" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((i) => (
                <FaStar key={i} className={i <= Math.round(averageRating) ? "filled" : ""} />
              ))}
            </div>
            <div className="review-count">{reviews.length} review{reviews.length > 1 ? 's' : ''}</div>
          </div>
        ) : (
          <p className="no-review-intro">Be the first to review this product!</p>
        )}
      </div>

      {/* Buttons */}
      <div className="review-btns">
        <button
          type="button"
          aria-pressed={!showReviews}
          className={!showReviews ? "active" : ""}
          onClick={() => setShowReviews(false)}
        >
          Submit Review
        </button>

        <button
          type="button"
          aria-pressed={showReviews}
          className={showReviews ? "active" : ""}
          onClick={() => setShowReviews(true)}
        >
          View Reviews
        </button>
      </div>

      {/* ================= FORM ================= */}
      {!showReviews && (
        <form onSubmit={handleSubmit} className="review-form">
          <label htmlFor="review-name" className="sr-only">
            Your Name
          </label>
          <input
            id="review-name"
            type="text"
            placeholder="Your Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            aria-label="Your name"
          />

          <label htmlFor="review-message" className="sr-only">
            Your Review
          </label>
          <textarea
            id="review-message"
            placeholder="Write your review..."
            value={message}
            required
            onChange={(e) => setMessage(e.target.value)}
            aria-label="Your review"
          ></textarea>

          <div className="stars" role="radiogroup" aria-label="Rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={rating >= star ? "active" : ""}
                onClick={() => setRating(star)}
                role="radio"
                aria-checked={rating === star}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setRating(star);
                }}
                aria-label={`${star} star`}
              />
            ))}
          </div>

          <button type="submit">Submit Review</button>
        </form>
      )}

      {/* ================= REVIEWS LIST ================= */}
      {showReviews && (
        <div className="review-list">
          {reviews.length === 0 ? (
            <p className="no-review">No reviews yet 😕</p>
          ) : (
            reviews.map((review, index) => (
              <div className="review-card" key={index}>
                <div className="card-head">
                  <div className="avatar" aria-hidden="true">{review.name ? review.name.charAt(0).toUpperCase() : "U"}</div>
                  <div className="meta">
                    <h4>{review.name}</h4>
                    <div className="rating" aria-label={`Rating: ${review.rating} out of 5`}>
                      {[...Array(review.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                </div>

                <p>{review.message}</p>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
};

export default ReviewSection;
