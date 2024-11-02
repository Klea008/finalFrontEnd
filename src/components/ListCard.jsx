import React from 'react'
import { Link } from 'react-router-dom'

const ListCard = ({ list }) => {
  return (
    <div className="relative cursor-pointer" key={list._id}>
      <div className="flex flex-col h-full justify-between max-w-sm rounded overflow-hidden shadow-lg bg-white"> 
        <Link to={`/lists/${list._id}`}>
          <div className="px-4 py-4 flex-grow"> {/* Allows this content to grow if necessary */}
            <div className="font-bold text-xl mb-2">{list.name}</div>
            <p className="text-gray-700 text-sm mb-4">{list.description}</p>
          </div>
        </Link>
        <button
          className="absolute top-2 right-2 px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
          onClick={() => list.visibility = !list.visibility}
        >
          {list.visibility ? 'Public' : 'Private'}
        </button>
      </div>
    </div>
  )
}
{/* <div key={list._id} className={`relative cursor-pointer`}>
      <div className="uppercase absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm rounded-b-lg">
        {list.name}
      </div>
      <img src="https://images.pexels.com/photos/28216688/pexels-photo-28216688/free-photo-of-autumn-camping.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt={list.name} className="w-full h-full object-cover rounded-lg" />
      <button className="absolute top-2 right-2 px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm" >
        <Link to={`/lists/${list._id}`} >
          See more
        </Link>
      </button>
    </div> 
  )
}*/}

export default ListCard