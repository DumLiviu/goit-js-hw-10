import axios from 'axios';

const API_KEY =
  'live_kdFqc4cR0XdhLzfGGqt2NA0T8YNHvjcHWpOEUfcTWkFosSu0G4c8zUuFHC7c3CLa';

axios.defaults.headers.common['x-api-key'] = API_KEY;

async function fetchBreeds() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (err) {
    Notiflix.Notify.failure('Failed to fetch breeds');
    throw err;
  }
}

async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    return response.data[0];
  } catch (err) {
    Notiflix.Notify.failure('Failed to fetch cat information');
    throw err;
  }
}

export { fetchBreeds, fetchCatByBreed };
