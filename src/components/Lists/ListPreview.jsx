import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BooksPreview from './BookListPreview';
import { deleteList } from '../../services/lists.api';
import toast from 'react-hot-toast';
import { fetchUserById } from '../../services/users.api';
import useUserStore  from '../../stores/useUserStore';

const ListCard = ({ list, lists, setLists }) => {
  const [userFullName, setUserFullName] = useState('');

  const { user } = useUserStore();

  useEffect(() => {
    const getUserFullName = async () => {
      try {
        const userData = await fetchUserById(list.userId);
        setUserFullName(userData.fullName); 
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    getUserFullName();
  }, [list.userId]); 

  const handleDelete = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this list?");
    if (!isConfirmed) return;

    const updatedLists = lists.filter((l) => l._id !== list._id);
    setLists(updatedLists);

    try {
      const response = await deleteList(list.name);
      if (response.message === "List deleted successfully") {
        toast.success("List deleted successfully");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setLists((prevLists) => [...prevLists, list]);
      toast.error(error.message || "Error deleting the list");
    }
  };

  return (
    <div className="relative cursor-pointer w-full">
      <div className="flex flex-col h-full justify-between rounded overflow-hidden shadow-sm border border-slate-200 bg-white">
        <Link to={`/lists/${list._id}`}>
          <div className="px-4 py-4 flex-grow ">
            <div className="font-bold text-xl mb-2">{list.name}</div>
            <BooksPreview books={list.booksData} />
            <div className="flex flex-row mt-2 mb-1 gap-3">
              {/* Display the fetched full name of the user */}
              <p className="text-gray-700 text-sm">{userFullName || 'Loading user...'}</p>
              <p className="text-gray-500 text-sm">{list.books.length} books</p>
              {list.likesCount > 0 && (
                <p className="text-gray-500 text-sm">{list.likesCount} likes</p>
              )}
            </div>
            
            <p className="text-gray-700 text-sm leading-tight ">
              {list.description && list.description.length > 50
                ? list.description.slice(0, 30) + '...'
                : list.description || 'No description available'}
            </p>
          </div>
        </Link>
        <button className="absolute rounded-sm top-1 right-1 px-2 py-1 bg-blue-500 text-white hover:bg-blue-600 text-sm">
          {list.visibility}
        </button>
        {list.userId === user._id && (
          <button
            className="absolute rounded-sm bottom-1 right-1 px-2 py-1 bg-red-500 text-white hover:bg-red-600 text-sm"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
        
      </div>
    </div>
  );
};

export default ListCard;
