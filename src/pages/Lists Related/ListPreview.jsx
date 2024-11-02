import React, { useState, useEffect } from 'react';
import useUserStore from '../../stores/useUserStore';
import Layout from '../../layout/Layout';
import ListCard from '../../components/Lists/ListPreview';
import LoadingSpinner from '../../components/LoadingSpinner';
import { fetchBookById } from '../../services/book.api';
import { fetchListByUserId } from '../../services/lists.api';
import { Link } from 'react-router-dom';

const ListPreview = () => {
  const { user } = useUserStore();
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);

  const getLists = async () => {
    setLoading(true);
    try {
      const data = await fetchListByUserId();
      const updatedLists = await Promise.all(
        data.lists.map(async (list) => {
          const booksData = await Promise.all(
            list.books.map((bookId) => fetchBookById(bookId))
          );
          return { ...list, booksData };
        })
      );
      setLists(updatedLists);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLists();
  }, []);

  return (
    <Layout>
      {user ? (
        <div>
          <main className="flex-1 p-6">
            <div className="container mx-auto max-w-screen-lg">
              <section>
                <h1 className="text-3xl font-bold mb-6 capitalize">{user.fullName}'s Lists</h1>
              </section>

              <section className='mb-6'>
                {loading ? <LoadingSpinner /> : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {lists.map((list) => (
                      <ListCard key={list._id} list={list} lists={lists} setLists={setLists} />
                    ))}
                  </div>
                )}
              </section>
              <Link to="/list/create">
                <button
                  className="hidden md:block px-4 py-2 bg-blue-500 text-white  hover:bg-blue-600 right-0">
                  Create a new list
                </button>
              </Link>
            </div>
          </main>
        </div>
      ) : (
        <main className="flex-1 p-6">
          <div className="container mx-auto max-w-screen-lg">
              <p className="text-lg font-bold capitalize"> Please log in to view your lists. </p>
          </div>
        </main>
      )}
    </Layout>
  );
};

export default ListPreview;
