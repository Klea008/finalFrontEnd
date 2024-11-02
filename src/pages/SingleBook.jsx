import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import BookCard from '../components/BookCard';
import { fetchBookById, fetchRandomBook } from '../services/book.api';
import { fetchReviewsOfBook } from '../services/reviews.api';
import useUserStore from '../stores/useUserStore';
import { addBookToList } from '../services/lists.api';

const SingleBook = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [liked, setLiked] = useState(false);
  const [selectedList, setSelectedList] = useState('');
  const [newReview, setNewReview] = useState('');
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]); 
  const [similarBooks, setSimilarBooks] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookById(id).then((bookData) => {
      setBook(bookData);

      // Fetch reviews
      fetchReviewsOfBook(bookData._id).then((reviewData) => {
        setReviews(reviewData.reviews);
      })
      
      // Fetch similar books
      fetchRandomBook(bookData.genre, bookData._id).then(setSimilarBooks);
      console.log(bookData._id, similarBooks);
    });
  }, [id]);


  const handleAddReview = () => {
    console.log('Review added:', newReview);
    setNewReview('');
    setShowReviewForm(false);
  };

  const handleMarkAsRead = () => {
    const date = new Date().toLocaleDateString();
    setReadDate(date);
    console.log('Marked as read on:', date);
  };

  const handleLike = () => {
    addBookToList('favourites', book._id).then(() => {
      console.log('Book added to favourites');
    });
    setLiked(!liked);
  };

  if (!book) {
    return <div className="p-4">Book not found</div>;
  }

  const readingLists = ["To Read", "Currently Reading", "Read"];

  return (
    <div className={`flex flex-col min-h-screen `}>

      <Layout>
        <main className="flex-1 container mx-auto p-6 max-w-screen-lg">
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-500 dark:bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-800 mb-6"
          >
            Back
          </button>

          <div className={`flex flex-col md:flex-row items-start md:space-x-6 p-6 rounded-lg shadow-lg `}>
            <img
              src={book.image}
              alt={book.title}
              className="w-64 h-auto-lg rounded-sm shadow-md mb-6 md:mb-0"
            />

            <div className="flex-1 max-w-full overflow-hidden">
              <h2 className="text-4xl font-bold mb-4">{book.title}</h2>
              <p className="text-xl font-semibold mb-2">By {book.author}</p>
              <p className=""><strong>Genre:</strong> {book.genre}</p>
              <p className=""><strong>Published:</strong> {book.year}</p>
              <p className=""><strong>ISBN:</strong> {book.isbn}</p>
              <p className=""><strong>Original Language:</strong> {book.originalLanguage}</p>
              <p className=""><strong>Pages:</strong> {book.pages}</p>
              <p className=""><strong>Rating:</strong> {book.rating}</p>
              <p className=""><strong>Number Of Reviews:</strong> {book.numberOfReviews}</p>
              <p className=""><strong>Description:</strong> </p>
              <p className="">{book.description}</p>


              <div className="mt-6 flex gap-4 items-center">
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="bg-green-500 dark:bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 dark:hover:bg-green-800"
                >
                  {showReviewForm ? 'Cancel Review' : 'Add a Review'}
                </button>

                <button
                  onClick={handleMarkAsRead}
                  className="bg-yellow-500 dark:bg-yellow-700 text-white px-4 py-2 rounded hover:bg-yellow-600 dark:hover:bg-yellow-800"
                >
                  Mark as Read
                </button>

                <button
                  onClick={() => handleLike()}
                  className={`bg-red-500 dark:bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600 dark:hover:bg-red-800 ${liked ? 'opacity-75' : ''}`}
                >
                  {liked ? 'Liked' : 'Like'}
                </button>

                <select
                  value={selectedList}
                  onChange={(e) => setSelectedList(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 rounded p-2 bg-transparent dark:text-white"
                >
                  <option value="">Add to List</option>
                  {readingLists.map((list, index) => (
                    <option key={index} value={list}>{list}</option>
                  ))}
                </select>
              </div>

              {showReviewForm && (
                <div className="mt-6 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-2">Submit Your Review</h3>
                  <textarea
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded mb-4"
                    rows="4"
                    placeholder="Write your review here..."
                  />
                  <button
                    onClick={handleAddReview}
                    className="bg-blue-500 dark:bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-800"
                  >
                    Submit Review
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Reviews Section */}
          <section className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-4">Reviews</h3>
            {reviews.length > 0 ? (
              <ul className="space-y-4">
                {reviews.map((review, index) => (
                  <li key={index} className="border-b border-gray-300 dark:border-gray-700 pb-4">
                    <p className="font-semibold">{review.userName}</p>
                    <p className="text-gray-700 dark:text-gray-300 text-justify">{review.comment}</p>
                    <span className="text-yellow-500">Rating: {review.rating} / 5</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews yet.</p>
            )}
          </section>


          <section className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-4">Similar Books</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.isArray(similarBooks) && similarBooks.length > 0 ? (
                similarBooks.map((book, index) => (
                  <BookCard key={index} book={book} />
                ))
              ) : (
                <p> No similar books yet. </p>
              )}
            </div>
          </section>
        </main>
      </Layout>

    </div>
  );
};

export default SingleBook;
