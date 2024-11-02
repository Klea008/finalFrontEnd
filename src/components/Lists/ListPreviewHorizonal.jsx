import React from 'react';
import { Link } from 'react-router-dom';
import BooksPreview from './BookListPreview';

const ListCard = ({ list }) => {
  return (
    <div className="relative cursor-pointer w-full">
      <div className="flex flex-row gap-3 h-full rounded overflow-hidden shadow-lg bg-white">
        <Link to={`/lists/${list._id}`}>
          <div className="pl-4 pr-20 py-4 flex-grow ">
            <div className="flex flex-row gap-5">
              <BooksPreview books={list.booksData} />
              <div className="flex flex-col">
                <div className="font-bold text-xl mb-1">{list.name}</div>
                <div className="flex flex-row gap-2 mb-1">
                  <p className="text-gray-700 text-sm">{list.books.length} books</p>
                  {list.likesCount > 0 && (
                    <p className="text-gray-700 text-sm">{list.likesCount} likes</p>
                  )}
                </div>
                <p className="text-gray-700 text-sm text-justify">
                  {list.description.length > 50
                    ? list.description.slice(0, 240) + '...'
                    : list.description}
                </p>
              </div>
            </div>
          </div>
        </Link>
        <button className="absolute top-0 right-0 px-2 py-1 bg-blue-500 text-white hover:bg-blue-600 text-sm">
          {list.visibility ? 'Public' : 'Private'}
        </button>
      </div>
    </div>
  );
};

export default ListCard;
