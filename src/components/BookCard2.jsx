import React from 'react'
import { Link } from 'react-router-dom'


const BookCard2 = ({ book }) => {
  return (
    <div key={book._id} className={`relative cursor-pointer`}>
      <img
        src={book.image}
        alt={book.title}
        className="w-full h-full shadow-lg object-cover" />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm ">
        {book.title}
      </div>
      <button className="absolute top-2 right-2 px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm" >
        <Link to={`/books/${book._id}`} >
          See more
        </Link>
      </button>
    </div>
  )
}

export default BookCard2