const API_BASE_URL = 'https://final-back-end-yevq.vercel.app/api/reviews';

export const fetchReviewsOfBook = async (bookId) => {
  const response = await fetch(`${API_BASE_URL}/${bookId}`);
  const data = await response.json();
  return data;
}

export const addReview = async (bookId, review) => {
  const response = await fetch(`${API_BASE_URL}/${bookId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(review),
    credentials: 'include',
  });
  const data = await response.json();
  return data;
}

export const deleteReview = async ( reviewId) => {
  const response = await fetch(`${API_BASE_URL}/${reviewId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  const data = await response.json();
  return data;
}

export const editReview = async (bookId, reviewId, review) => {
  const response = await fetch(`${API_BASE_URL}/${bookId}/${reviewId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(review),
    credentials: 'include',
  });
  const data = await response.json();
  return data;
}