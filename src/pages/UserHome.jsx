import React, { useState, useEffect } from 'react';
import { fetchBooks, fetchGenres } from '../services/book.api';
import BookCard from '../components/BookCard';
import Layout from '../layout/Layout';
import { CiSearch } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";

const UserHome = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedSort, setSelectedSort] = useState('title');

  const [genres, setGenre] = useState([]);
  const [books, setBooks] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [limit] = useState(32);
  const [loading, setLoading] = useState(false);

  const getBooks = async (page, genre = selectedGenre, sortBy = selectedSort, search = searchQuery) => {
    setLoading(true);
    try {
      let data;
      if (genre === 'All') {
        data = await fetchBooks(page, limit, undefined, search);
      } else {
        data = await fetchBooks(page, limit, genre, search);
      }
      setBooks(data.books);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
    getBooks(1, genre, selectedSort);
  };

  useEffect(() => {
    getBooks(currentPage, selectedGenre, selectedSort);
  }, [currentPage, selectedGenre, selectedSort]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      getBooks(page);
    }
  };

  const getAllGenres = () => {
    fetchGenres().then(setGenre).catch(error => {
      console.error('Error fetching genres:', error);
      setGenre([]);
    });
  };

  useEffect(() => {
    getAllGenres();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query) {
      getBooks(currentPage);
    } else {
      getBooks(1, selectedGenre, selectedSort, query);
    }
  };

  const handleCancelSearch = () => {
    setSearchQuery(""); // Clear the search query only
  };

  useEffect(() => {
    getBooks(1, selectedGenre, selectedSort, searchQuery);
  }, [searchQuery, selectedGenre, selectedSort]); 

  return (
    <div className={`flex flex-col min-h-screen`}>
      <Layout>
        <main className="flex-1 p-6">
          <div className="container mx-auto max-w-screen-lg">
            {/* Filter and Sort */}
            <div className="flex flex-col md:flex-row md:justify-between mb-6">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <select
                  value={selectedGenre}
                  onChange={(e) => handleGenreClick(e.target.value)}
                  className="text-black border border-gray-300 dark:border-gray-600 rounded p-2 bg-transparent dark:text-white text-sm"
                >
                  <option value={"All"} className="bg-white dark:bg-gray-900 text-black dark:text-white">ALL OF THEM</option>
                  {genres.map((genre, index) => (
                    <option
                      key={index}
                      value={genre}
                      className="bg-white dark:bg-gray-900 text-black dark:text-white"
                    >
                      {genre}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedSort}
                  onChange={(e) => handleSortClick(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 rounded p-2 bg-transparent dark:text-white text-sm"
                >
                  <option value="title" className='bg-white dark:bg-gray-900 text-black dark:text-white'>Sort by Title</option>
                  <option value="date" className='bg-white dark:bg-gray-900 text-black dark:text-white'>Sort by Date</option>
                </select>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 dark:border-gray-600 rounded p-2 bg-transparent dark:text-white text-sm pl-10"
                  />
                  <button
                    onClick={() => handleSearch(searchQuery)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
                  >
                    <CiSearch />
                  </button>
                  {searchQuery && (
                    <button
                      onClick={handleCancelSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
                    >
                      <MdOutlineCancel />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Books Grid */}
            <section>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-1">
                  {books.map((book) => (
                    <BookCard key={book._id} book={book} />
                  ))}
                </div>
              )}
            </section>

            <div className="pagination mt-4 flex justify-center">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded ml-2"
              >
                Next
              </button>
            </div>
          </div>
        </main>
      </Layout>
    </div>
  );
};

export default UserHome;
