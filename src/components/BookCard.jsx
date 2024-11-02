import React from 'react'
import { Link } from 'react-router-dom'


const BookCard = ({ book }) => {
  return (

    <div key={book._id} className={`relative cursor-pointer`}>
      <Link to={`/books/${book._id}`} >
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full shadow-lg object-cover" />
      </Link>
    </div>
  )
}

export default BookCard