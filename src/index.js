import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');
const catImage = document.querySelector('.cat-image');
const catName = document.querySelector('.cat-name');
const catDescription = document.querySelector('.cat-description');
const catTemperament = document.querySelector('.cat-temperament');

document.addEventListener('DOMContentLoaded', async () => {
  loader.classList.remove('hidden');
  try {
    const breeds = await fetchBreeds();
    breedSelect.innerHTML = breeds
      .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
      .join('');
    new SlimSelect({ select: '.breed-select' });
    breedSelect.classList.remove('hidden');
  } catch {
    Notiflix.Notify.failure('Failed to load breed list. Try again later.');
  } finally {
    loader.classList.add('hidden');
  }
});

breedSelect.addEventListener('change', async event => {
  const breedId = event.target.value;
  if (breedId) {
    loader.classList.remove('hidden');
    catInfo.classList.add('hidden');
    try {
      const cat = await fetchCatByBreed(breedId);
      catImage.src = cat.url;
      catName.textContent = cat.breeds[0].name;
      catDescription.textContent = cat.breeds[0].description;
      catTemperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;
      catInfo.classList.remove('hidden');
    } catch {
      Notiflix.Notify.failure(
        'Failed to load cat information. Try again later.'
      );
    } finally {
      loader.classList.add('hidden');
    }
  }
});
