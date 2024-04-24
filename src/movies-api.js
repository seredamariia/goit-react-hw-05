import axios from 'axios';
const TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZTM3ZjZkMjQ1Nzc1N2UzNzg5MDlkNTZhNDBhOGM2YyIsInN1YiI6IjY2MjgxMDYyMmUyYjJjMDE0OTY2MzNmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wbNc0KpR2gmXaYKgAL_6fWeIzQV8AYl8qu0asv61fSU';

export const getTrendingMovies = async () => {
  const url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US`;
  const params = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };
  try {
    const response = await axios.get(url, params);
    return response.data.results;
  } catch (error) {
    console.log(error.message);
  }
};

export const getMovieDetails = async (id, path = '') => {
  const url = `https://api.themoviedb.org/3/movie/${id}${path}?language=en-US`;
  const params = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };
  try {
    const response = await axios.get(url, params);

    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getMoviesSearch = async (query, page = 1) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`;
  const params = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };
  try {
    const response = await axios.get(url, params);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
