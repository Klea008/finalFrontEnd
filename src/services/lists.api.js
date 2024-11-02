const API_BASE_URL = 'https://final-back-end-yevq.vercel.app/api/lists';


export const fetchListByUserId = async () => {
  const response = await fetch(`${API_BASE_URL}/`, {
    method: 'GET',
    credentials: 'include',
  });
  const data = await response.json();
  return data;
}

export const fetchListItemsById = async (listId) => {
  const response = await fetch(`${API_BASE_URL}/listItems/${listId}`, {
    method: 'GET',
    credentials: 'include',
  });
  const data = await response.json();
  return data;
}

export const fetchFavourites = async () => {
  const response = await fetch(`${API_BASE_URL}/favourites`,
    { method: 'GET', credentials: 'include' });
  const data = await response.json();
  return data;
}
export const fetchBookmarks = async () => {
  const response = await fetch(`${API_BASE_URL}/bookmarks`,
    { method: 'GET', credentials: 'include' });
  const data = await response.json();
  return data;
}
export const fetchReadBooks = async () => {
  const response = await fetch(`${API_BASE_URL}/read`,
    { method: 'GET', credentials: 'include' });
  const data = await response.json();
  return data;
}
export const fetchPublishedLists = async () => {
  const response = await fetch(`${API_BASE_URL}/published/lists`);
  const data = await response.json();
  return data;
}

export const fetchItemsFromList = async (listname) => {
  const response = await fetch(`${API_BASE_URL}/`, {
    method: 'GET',
    credentials: 'include',
    body: JSON.stringify({ listname }),
  });
  const data = await response.json();
  return data;
}

export const addList = async (list) => {
  const response = await fetch(`${API_BASE_URL}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(list),
    credentials: 'include',
  });
  const data = await response.json();
  return data;
}

export const deleteList = async (listName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ listName }), // Sending listName in the request body
      credentials: 'include',
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return { success: false, message: error.message };
  }
};


export const addBookToList = async (listName, bookId) => {
  const response = await fetch(`${API_BASE_URL}/listItems`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ listName, bookId }),
    credentials: 'include',
  });
  const data = await response.json();
  return data;
}

export const deleteBookFromList = async (listName, bookId) => {
  const response = await fetch(`${API_BASE_URL}/listItems`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ listName, bookId }),
    credentials: 'include',
  });
  const data = await response.json();
  return data;
}

export const likeList = async (listId) => {
  const response = await fetch(`${API_BASE_URL}/${listId}/like`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = await response.json();
  return data;
}

export const unlikeList = async (listId) => {
  const response = await fetch(`${API_BASE_URL}/${listId}/unlike`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = await response.json();
  return data;
}