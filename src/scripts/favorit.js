/* eslint-disable no-use-before-define */
/* eslint-disable arrow-parens */
import 'regenerator-runtime'; /* for async await transpile */
import '../styles/favorit.css';

document.addEventListener('DOMContentLoaded', async () => {
  const favoriteRestaurants = await getFavoriteRestaurantsFromIndexedDB();
  renderFavoriteRestaurants(favoriteRestaurants);
});

async function getFavoriteRestaurantsFromIndexedDB() {
// Implement code to retrieve favorite restaurants from IndexedDB
// Use indexedDB API to retrieve data
// Return the list of favorite restaurants
}

function renderFavoriteRestaurants(restaurants) {
  const favoriteRestaurantsContainer = document.getElementById('favorite-restaurants');

  restaurants.forEach(restaurant => {
    const restaurantItem = createRestaurantItem(restaurant);
    favoriteRestaurantsContainer.appendChild(restaurantItem);
  });
}

function createRestaurantItem(restaurant) {
// Create HTML elements for each restaurant item
  const restaurantItem = document.createElement('div');
  restaurantItem.classList.add('restaurant-item');

  // Populate restaurant details (name, image, city/rating/description, CTA to detail page)
  restaurantItem.innerHTML = `
        <img src="${restaurant.imageUrl}" alt="${restaurant.name}" class="restaurant-image">
        <h2>${restaurant.name}</h2>
        <p>${restaurant.city}</p>
        <!-- Add more details like rating or description as needed -->
        <a href="detail.html?id=${restaurant.id}" class="details-button">Details</a>
    `;

  return restaurantItem;
}
