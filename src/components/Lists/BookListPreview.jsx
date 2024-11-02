import React from 'react';
import { Link } from 'react-router-dom';

const BooksPreview = ({ books }) => {
  const maxBooks = 5;
  const emptySlots = maxBooks - (books?.length || 0);

  return (
    <div className="relative flex">
      {books?.slice(0, maxBooks).map((book, index) => (
        <div
          key={book._id}
          className="relative cursor-pointer"
          style={{
            width: '70px', height: '107px',
            marginLeft: index !== 0 ? '-15px' : '0',
            zIndex: 5 - index,
          }}
        >
          <Link to={`/books/${book._id}`}>
            <img src={book.image} alt={book.title} className="w-full h-full shadow-lg object-cover" />
          </Link>
        </div>
      ))}

      {/* Render empty book cards to fill remaining spaces */}
      {Array.from({ length: emptySlots }).map((_, index) => (
        <div
          key={index}
          className="relative cursor-default bg-slate-100"
          style={{
            width: '70px', height: '107px',
            marginLeft: books?.length > 0 ? '-15px' : '0',
            zIndex: 5 - (books.length + index),
          }}
        >
          {/* Optionally add some content or styling inside the empty cards */}
          <div className="w-full h-full flex items-center justify-center text-sm text-slate-400 border border-slate-400">
            Empty
          </div>
        </div>
      ))}
    </div>
  );
};

export default BooksPreview;
