const API_BASE_URL = 'https://final-back-end-yevq.vercel.app/api/books';

export const fetchBooks = async (page, limit, genre, search) => {
  const url = new URL(`${API_BASE_URL}`);

  // Append query parameters
  url.searchParams.append('page', page);
  url.searchParams.append('limit', limit);

  if (genre) {
    url.searchParams.append('genre', genre);
  }

  if (search) {
    url.searchParams.append('search', search); 
  }

  const response = await fetch(url);
  const data = await response.json();

  return {
    books: data.books,
    totalPages: data.pagination.totalPages,
  };
};

export const searchBooks = async (search, limit = 8) => {
  const url = new URL(`${API_BASE_URL}`);
  url.searchParams.append('search', search);
  url.searchParams.append('limit', limit);
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const fetchGenres = async () => {
  const response = await fetch(`${API_BASE_URL}/genre`);
  const data = await response.json();
  return data.genres;
};

export const fetchAuthors = async () => {
  const response = await fetch(`${API_BASE_URL}/authors`);
  const data = await response.json();
  return data.authors;
};

export const fetchBookById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  const data = await response.json();
  return data.book;
};

export const fetchRandomBook = async (genre, id) => {
  const response = await fetch(`${API_BASE_URL}/random/${genre}/${id}`);
  const data = await response.json();
  return data.randomBooks;  // Access the books array directly
};

export const addBook = async (book) => {
  const response = await fetch(`${API_BASE_URL}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
    credentials: 'include',
  });
  const data = await response.json();
  return data.book;
};

export const updateBook = async (bookId, book) => {
  const response = await fetch(`${API_BASE_URL}/${bookId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  });
  const data = await response.json();
  return data.book;
};

export const deleteBook = async (bookId) => {
  const response = await fetch(`${API_BASE_URL}/${bookId}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
};

export const deleteManyBooks = async (bookIds) => {
  console.log(bookIds);
  const response = await fetch(`${API_BASE_URL}/many/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ids: bookIds }),
    credentials: 'include',
  });

  if (!response.ok) throw new Error('Failed to delete books');

  const data = await response.json();
  return data;
};
