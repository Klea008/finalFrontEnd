import React, { useState } from 'react';
import Layout from '../../layout/Layout';
import { addList } from '../../services/lists.api';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreateNewList = () => {
  const [newList, setNewList] = useState(null); // State to hold the new list

  const handleSubmit = async (e) => {
    e.preventDefault();
    const listData = {
      name: e.target.name.value,
      description: e.target.description.value,
      visibility: e.target.visibility.value,
    };

    // Call the addList function and get the response
    const response = await addList(listData);
    if (response.list) {
      setNewList(response.list); 
      toast.success(response.message);
    }
    
    console.log(newList);

  };

  return (
    <Layout>
      <main className="flex-1 container mx-auto p-6 max-w-screen-lg">
        <div className="text-3xl my-4">Create New List</div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="List Name"
              name="name"
              className="border border-gray-300 dark:border-gray-400 rounded-lg p-2 w-full focus:ring focus:ring-blue-500 focus:outline-none transition duration-300 bg-transparent dark:text-white"
            />
            <textarea
              type="text"
              placeholder="List Description"
              name="description"
              className="border h-[200px] border-gray-300 dark:border-gray-400 rounded-lg p-2 w-full focus:ring focus:ring-blue-500 focus:outline-none transition duration-300 bg-transparent dark:text-white"
            />
            <input
              type="text"
              placeholder="List Visibility"
              name="visibility"
              className="border border-gray-300 dark:border-gray-400 rounded-lg p-2 w-full focus:ring focus:ring-blue-500 focus:outline-none transition duration-300 bg-transparent dark:text-white"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:ring focus:ring-blue-500 focus:outline-none transition duration-300"
            >
              Create List
            </button>
          </div>
        </form>

        {/* Conditionally render the link if the newList is created */}
        {newList && (
          console.log(newList.name ),
          <Link to={`/list/add/${newList.name}`}><button
            className="px-4 py-2 bg-yellow-500 my-2 text-white rounded-lg shadow-md hover:bg-yellow-600 focus:ring focus:ring-yellow-500 focus:outline-none transition duration-300"
          >
            Add books
          </button></Link>
        )}
      </main>
    </Layout>
  );
};

export default CreateNewList;
