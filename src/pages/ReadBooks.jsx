import React, { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import useUserStore from '../stores/useUserStore';
import { fetchReadBooks } from '../services/lists.api';
import { fetchBookById } from '../services/book.api';
import BookCard from '../components/BookCard';
import { Link } from 'react-router-dom';

const ReadBooks = () => {
  const { user } = useUserStore();
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null); // State to hold any potential errors

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetchReadBooks();

        // Check if response and list of books are valid
        if (response.list && response.list.books) {
          const bookIds = response.list.books;

          // Fetch details for each book using fetchBookById
          const bookPromises = bookIds.map(id => fetchBookById(id));
          const bookDetails = await Promise.all(bookPromises); // Wait for all fetches to complete
          setBooks(bookDetails); // Set the book objects in the state
        } else {
          setError('No favorite books found.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch favorite books.'); // Set error message
      }
    };

    fetchBooks();
  }, []);

  if (!user) {
    return (
      <Layout>
        <div>
          <main className="flex-1 p-6">
            <div className="container mx-auto max-w-screen-lg">
              <p className="text-lg font-bold capitalize">Please Login to see your profile</p>
            </div>
          </main>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        <main className="flex-1 p-6">
          <div className="container mx-auto max-w-screen-lg">
            <section>
              <h1 className="text-3xl font-bold mb-6 capitalize">Books you have read</h1>
            </section>
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
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default ReadBooks;
