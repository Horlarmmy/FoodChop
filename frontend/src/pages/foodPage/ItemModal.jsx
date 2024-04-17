import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaEdit } from "react-icons/fa"; // Assuming react-icons is used for the edit icon
import { MdClose } from "react-icons/md";

const ItemModal = ({ item, onClose, userId }) => {
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);

  useEffect(() => {
    const loadedReviews =
      JSON.parse(localStorage.getItem(`reviews-${item.id}`)) ||
      item.reviews ||
      [];
    setReviews(loadedReviews);
  }, [item]);

  const handleReviewChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleAddOrUpdateReview = () => {
    if (!reviewText.trim()) {
      alert("Please enter a review.");
      return;
    }
    let updatedReviews;
    if (editingReviewId) {
      updatedReviews = reviews.map((review) =>
        review.id === editingReviewId
          ? { ...review, text: reviewText, date: new Date().toISOString() }
          : review
      );
    } else {
      const newReview = {
        id: Date.now(),
        userId: userId,
        text: reviewText,
        date: new Date().toISOString(),
      };
      updatedReviews = [...reviews, newReview];
    }

    setReviews(updatedReviews);
    setReviewText("");
    setEditingReviewId(null);
    localStorage.setItem(`reviews-${item.id}`, JSON.stringify(updatedReviews));
  };

  const startEdit = (reviewId) => {
    const reviewToEdit = reviews.find((review) => review.id === reviewId);
    if (reviewToEdit) {
      setEditingReviewId(reviewId);
      setReviewText(reviewToEdit.text);
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-500 bg-opacity-50 transition-opacity" />
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <button
              type="button"
              className="absolute right-5 top-5 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-4 md:right-5 md:top-7 lg:right-8 lg:top-6"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <MdClose className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {item.name}
              </h3>
              <div className="mt-2">
                <img
                  src={`/images/${item.imageUrl}`}
                  alt={item.name}
                  className="w-full h-64 object-cover rounded-md"
                />
                <p className="text-sm text-gray-500">{item.description}</p>
                <p className="font-bold text-primary text-xl">${item.price}</p>
              </div>
              <div className="mt-4">
                <h4 className="text-lg leading-6 font-medium text-gray-900">
                  Customer Reviews
                </h4>
                {reviews.length > 0 ? (
                  <ul className="mt-2">
                    {reviews.map((review) => (
                      <li
                        key={review.id}
                        className="text-sm border-b text-gray-900 border-gray-300 mt-2 flex justify-between items-center"
                      >
                        {review.text}{" "}
                        <span className="text-gray-500">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                        {review.userId === userId && (
                          <FaEdit
                            onClick={() => startEdit(review.id)}
                            className="cursor-pointer text-gray-700 hover:text-gray-900"
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No reviews yet.</p>
                )}
              </div>
              <div className="mt-4">
                <textarea
                  id="review"
                  name="review"
                  rows={3}
                  className="shadow-sm text-black p-2 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                  value={reviewText}
                  onChange={handleReviewChange}
                ></textarea>
                <button
                  type="button"
                  className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleAddOrUpdateReview}
                >
                  {editingReviewId ? "Update Review" : "Submit Review"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-secondary text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

ItemModal.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        userId: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ),
  }),
  onClose: PropTypes.func.isRequired,
  onAddReview: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default ItemModal;
