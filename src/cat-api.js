import axios from 'axios';
   
axios.defaults.headers.common['x-api-key'] = 'your API key'; 
 
// Function to fetch cat breeds
export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

// Function to fetch cat information by breed
export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios
    .get(url)
    .then(response => {
      const catData = response.data[0];
      return {
        image: catData.url,
        breed: catData.breeds[0].name,
        description: catData.breeds[0].description,
        temperament: catData.breeds[0].temperament,
      };
    })
    .catch(error => {
      throw error;
    });
}
