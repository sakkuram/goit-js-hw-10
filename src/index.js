import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

axios.defaults.headers.common['x-api-key'] = 
  'live_DTWX9A966i14AL48fZnBKngQ6axQmCn96fDrFErtpO8TTdkry9Eeq7TdGgwbCi5T';

// Elements 
const selectElement = document.querySelector('.breed-select'); 
const breedInfoDiv = document.getElementById('breed-info');
const catImage = document.createElement('img');
const catDescription = document.createElement('p');
const loaderElement = document.querySelector('p.loader');
const errorElement = document.querySelector('p.error');

// Hide loader and error initially
loaderElement.style.display = 'none';
errorElement.style.display = 'none';

// Populate breed-select dropdown with cat breeds
fetchBreeds()
  .then(breeds => {
    // Populate breed-select options with breed names and IDs
    breeds.forEach(breed => {
      const optionElement = document.createElement('option');
      optionElement.value = breed.id;
      optionElement.textContent = breed.name;
      selectElement.appendChild(optionElement);
    });
  })
  .catch(error => {
    console.error('Error fetching cat breeds:', error);
    // Display error message
    errorElement.style.display = 'block';
  });

// Event listener for when a breed is selected
selectElement.addEventListener('change', () => {
  const selectedBreedId = selectElement.value;

  // Show loader while fetching cat information
  loaderElement.style.display = 'block';

  // Fetch cat information based on the selected breed
  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      // Update the UI with cat information
      catImage.src = catData.image;
      catDescription.textContent = `Breed: ${catData.breed}\nDescription: ${catData.description}\nTemperament: ${catData.temperament}`;
      breedInfoDiv.appendChild(catImage);
      breedInfoDiv.appendChild(catDescription);
    })
    .catch(error => {
      console.error('Error fetching cat information:', error);
      // Display error message
      errorElement.style.display = 'block';
    })
    .finally(() => {
      // Hide loader after request is complete
      loaderElement.style.display = 'none';
    });
});
