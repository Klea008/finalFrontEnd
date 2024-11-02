import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import BookCard from '../components/BookCard';
import { fetchBookById, fetchRandomBook } from '../services/book.api';
import { fetchReviewsOfBook, addReview } from '../services/reviews.api';
import { addBookToList } from '../services/lists.api';
import ReviewCard from '../components/ReviewCard';
import toast from 'react-hot-toast';

const SingleBook = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [liked, setLiked] = useState(false);
  const [selectedList, setSelectedList] = useState('');
  const [newReview, setNewReview] = useState('');
  const [deletedReviewId, setDeletedReviewId] = useState(null);
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
  }, [id, newReview, deletedReviewId]);


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

  const handleAddReview= async (e) => {
    e.preventDefault();
    const ratingData = {
      comment: e.target.comment.value,
      rating: e.target.rating.value
    };
    const response = await addReview(book._id, ratingData);
    setNewReview(ratingData);
    toast.success(response.message);
  };

  const handleDeleteReview = (reviewId) => {
    setDeletedReviewId(reviewId);
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

            </div>
          </div>

          {/* Reviews Section */}
          <section className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">

            <div className='grid grid-cols-2 gap-4 text-sm'>
              <div>
                <h3 className="text-2xl font-bold mb-4">Reviews</h3>
                <form onSubmit={handleAddReview} className="flex flex-col gap-2">

                  <div>
                    <label htmlFor="" className=''> Your Review: </label>
                    <textarea
                      name="comment"
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded "
                      rows="6"
                      placeholder="Write your review here..."
                    />
                  </div>

                  <div><label htmlFor=""> Rating: </label>
                    <select name="rating" className="border border-gray-300 dark:border-gray-600 rounded p-2 bg-transparent dark:text-white">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select></div>
                  
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 mt-2 text-white rounded-lg shadow-md hover:bg-blue-600 focus:ring focus:ring-blue-500 focus:outline-none transition duration-300"
                  >
                    Submit
                  </button>
                </form>
              </div>

              <div>
                {reviews.length > 0 ? (
                  <ul className="space-y-2">
                    {reviews.map((review, index) => (
                      <ReviewCard key={index} review={review} handleDeleteReview={handleDeleteReview} />
                    ))}
                  </ul>
                ) : (
                  <p>No reviews yet.</p>
                )}
              </div>
            </div>

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
