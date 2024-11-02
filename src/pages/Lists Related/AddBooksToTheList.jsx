import React, { useState } from 'react';
import Layout from '../../layout/Layout';
import { searchBooks } from '../../services/book.api';
import { addBookToList } from '../../services/lists.api';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreateNewList = () => {
  const { name } = useParams();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);


  const getBooks = async () => {
    if (!searchQuery) return;
    setLoading(true);
    try {
      const data = await searchBooks(searchQuery);
      // Check if data and data.books are defined
      if (data && data.books) {
        setBooks(data.books);
      } else {
        setBooks([]); 
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      setBooks([]); 
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async (bookid) => {
    const response = await addBookToList(name, bookid);
    console.log(response);
    toast.success(response.message);
    setBooks(books.filter((b) => b.id !== bookid));
  };

  return (
    <Layout>
      <main className="flex-1 container mx-auto p-6 max-w-screen-lg">
        <div className="text-3xl my-4">Add Book To The List: {name}</div>

        {/* Search input and button */}
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            placeholder="Search Books"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded flex-grow"
          />
          <button
            onClick={getBooks}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Search
          </button>
        </div>

        {/* Books Grid */}
        <section>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
                {
                  books.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-1">
                      {books.map((book) => (
                        <div key={book._id} className={`relative cursor-pointer`} onClick={() => handleAddBook(book._id)}>
                            <img
                              src={book.image}
                              alt={book.title}
                              className="w-full h-full shadow-lg object-cover" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No books found</p>
                  )
                }
            </div>
          )}
        </section>

        
      </main>
    </Layout>
  );
};

export default CreateNewList;
