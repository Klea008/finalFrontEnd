import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../layout/Layout';
import { fetchListItemsById, likeList, unlikeList, deleteBookFromList } from '../../services/lists.api';
import { fetchBookById } from '../../services/book.api';
import { GoHeart, GoHeartFill } from "react-icons/go";
import useUserStore from '../../stores/useUserStore';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import AddBookModal from './AddBookModal';  // Import the new modal component

const ListDetails = () => {
  const { user } = useUserStore();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState({});
  const [liked, setLiked] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);  // State to control modal

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const listItemsResponse = await fetchListItemsById(id);
        setList(listItemsResponse.lists);
        const booksData = await Promise.all(
          listItemsResponse.lists.books.map((bookId) => fetchBookById(bookId))
        );
        setBooks(booksData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleLiking = async () => {
    try {
      setLiked((prevLiked) => !prevLiked);

      if (liked) {
        await unlikeList(id);
        setList((prevList) => ({
          ...prevList,
          likes: prevList.likes.filter((userId) => userId !== user._id),
          likesCount: prevList.likesCount - 1,
        }));
      } else {
        await likeList(id);
        setList((prevList) => ({
          ...prevList,
          likes: [...prevList.likes, user._id],
          likesCount: prevList.likesCount + 1,
        }));
      }
    } catch (error) {
      console.error('Error liking/unliking list:', error);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      const response = await deleteBookFromList(list.name, bookId);
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
      toast.success(response.message);
    } catch (error) {
      console.error('Error deleting book:', error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Layout>
        <main className="flex-1 container mx-auto p-6 max-w-screen-lg">
          <div className="flex flex-row gap-5">
            <button
              onClick={() => navigate(-1)}
              className="bg-blue-500 dark:bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-800 mb-6"
            >
              Back
            </button>

            <div className="ml-auto">
              <button
                onClick={handleLiking}
                className="bg-blue-500 dark:bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-800"
              >
                {liked ? <GoHeartFill /> : <GoHeart />}
              </button>
              <p>Likes: {list.likesCount}</p>
            </div>
          </div>

          {/* List Details */}
          <section>
            <div className="flex flex-row gap-5">
              <h1 className="text-3xl font-bold mb-4 uppercase">{list.name}</h1>
              <p className="font-bold mb-4 ml-auto uppercase">{list.visibility}</p>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-justify">{list.description}</p>
          </section>

          {/* Books Grid */}
          <section>
            {loading ? (
              <p>Loading...</p>
            ) : books.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-1">
                {books.map((book) => (
                  <div key={book._id} className={`relative cursor-pointer`}>
                    <Link to={`/books/${book._id}`}>
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-full h-full shadow-lg object-cover"
                      />
                    </Link>
                    <button
                      className="absolute bottom-0 right-0 px-2 py-1 bg-red-500 rounded-sm text-white hover:bg-red-600 text-sm"
                      onClick={() => handleDeleteBook(book._id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No books in this list.</p>
            )}
          </section>

          {/* Add Book Button */}
          <button
            onClick={() => setIsModalOpen(true)} // Open modal
            className="bg-green-500 text-white rounded p-2 mt-4"
          >
            Add Book
          </button>

          {/* AddBookModal */}
          {isModalOpen && (
            <AddBookModal
              listName={list.name}
              onClose={() => setIsModalOpen(false)}
              setBooks={setBooks} // Pass setBooks to AddBookModal
            />
          )}
        </main>
      </Layout>
    </div>
  );
};

export default ListDetails;
