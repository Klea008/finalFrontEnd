import React, { useState, useEffect } from 'react';
import useUserStore from '../../stores/useUserStore';
import ListCard from '../../components/Lists/ListPreview';
import Layout from '../../layout/Layout';
import { fetchPublishedLists } from '../../services/lists.api';
import { fetchBookById } from '../../services/book.api';
import LoadingSpinner from '../../components/LoadingSpinner';

const Discovery = () => {

  const { user } = useUserStore();

  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);


  const getLists = async () => {
    setLoading(true);
    try {
      const data = await fetchPublishedLists();
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
                <h1 className="text-3xl font-bold mb-6 capitalize">Published Lists</h1>
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
            </div>
          </main>
        </div>
      ) : (
        <main className="flex-1 p-6">
          <div className="container mx-auto max-w-screen-lg">
              <p className="text-lg font-bold capitalize"> Please log in to view public lists. </p>
          </div>
        </main>
      )}
    </Layout>
  );
};

export default Discovery;
