import React, { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import useUserStore from '../stores/useUserStore';
import { fetchFavourites } from '../services/lists.api';
import { fetchBookById } from '../services/book.api';
import BookCard from '../components/BookCard';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useUserStore();
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetchFavourites();

        if (response.list && response.list.books) {
          const bookIds = response.list.books;

          const bookPromises = bookIds.map(id => fetchBookById(id));
          const bookDetails = await Promise.all(bookPromises);
          setBooks(bookDetails);
        } else {
          setError('No favorite books found.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch favorite books.');
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
            <div className='grid grid-cols-3 gap-2'>
              <div >
                <section>
                  <h1 className="text-3xl font-bold mb-6 capitalize">Profile</h1>
                </section>
                <p><strong>Full Name:</strong> {user.fullName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <button className="px-4 py-2 mt-4 bg-blue-500 text-white rounded-sm hover:bg-blue-600">Edit Profile</button>
              </div>
              <div className='col-span-2'>
                <p className="mb-2"><strong>Favourite Books:</strong></p>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-1">
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
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Profile;
