import axios from 'axios';

const API_KEY = 'fbbdd30f4c6c1a4ab23ac7e7ac397785';
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'pt-BR',
  },
});

export const getPopularMovies = async () => {
  try {
    const response = await tmdbApi.get('/movie/popular');
    //console.log(response.data)
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar filmes populares:', error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    const { data } = await tmdbApi.get('/search/movie', {
      params: {
        query,
      },
    });
    //console.log("data.results",query, " ", data.results);
    const sortedResults = data.results.sort((a, b) => b.popularity - a.popularity);
    const topFiveResults = sortedResults.slice(0, 8);

    return topFiveResults;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default tmdbApi;