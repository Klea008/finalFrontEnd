import React, { useState } from 'react';
import { searchBooks } from '../../services/book.api';
import { addBookToList } from '../../services/lists.api';
import toast from 'react-hot-toast';

const AddBookModal = ({ listName, onClose, setBooks }) => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooksList] = useState([]);

  const getBooks = async () => {
    if (!searchQuery) return;
    setLoading(true);
    try {
      const data = await searchBooks(searchQuery);
      if (data && data.books) {
        setBooksList(data.books);
      } else {
        setBooksList([]);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      setBooksList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async (book) => {
    try {
      console.log("book:", book);
      const response = await addBookToList(listName, book._id);
      toast.success(response.message);

      // Update the books state in ListDetails
      const newBook = await searchBooks(book.title); // Fetch the added book details
      console.log("newBook:", newBook);
      setBooks((prevBooks) => [...prevBooks, newBook.books[0]]); // Add the new book to the list

      setBooksList(books.filter((b) => b._id !== book._id));
    } catch (error) {
      toast.error('Failed to add book');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full">

        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;  {/* This is the "X" symbol for closing */}
        </button>

        <div className="text-xl mb-4">Add Book to List: {listName}</div>

        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            placeholder="Search Books"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded flex-grow"
          />
          <button onClick={getBooks} className="p-2 bg-blue-500 text-white rounded">
            Search
          </button>
        </div>

        <section>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              {books.length > 0 ? (
                <div className="grid grid-cols-1 gap-1">
                  {books.map((book) => (
                    <div
                      key={book._id}
                      className="relative cursor-pointer"
                      onClick={() => handleAddBook(book)}
                    >
                      <p className="text-sm">{book.title}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No books found</p>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AddBookModal;
