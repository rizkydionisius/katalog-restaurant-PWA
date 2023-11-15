import 'regenerator-runtime'; /* for async await transpile */
import '../styles/detail.css';

document.addEventListener('DOMContentLoaded', async function () {
  const restaurantId = getRestaurantIdFromUrl();
  const restaurant = await fetchRestaurantDetail(restaurantId);

  if (restaurant) {
    renderRestaurantDetail(restaurant);
  } else {
    console.error('Error fetching restaurant detail.');
  }
});

function getRestaurantIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

async function fetchRestaurantDetail(restaurantId) {
  try {
    const response = await fetch(`https://restaurant-api.dicoding.dev/detail/${restaurantId}`);
    const data = await response.json();
    return data.restaurant;
  } catch (error) {
    console.error('Error fetching restaurant detail:', error);
    return null;
  }
}

function renderRestaurantDetail(restaurant) {
  const detailContainer = document.getElementById('restaurant-detail');

  const imageUrl = `https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}`;

  // Menambahkan elemen-elemen ke dalam container detail
  detailContainer.innerHTML = `
    <img src="${imageUrl}" alt="${restaurant.name}" class="restaurant-image">
    <div class="restaurant-info">
        <h2>${restaurant.name}</h2>
        <p>City: ${restaurant.city}</p>
        <p>Rating: ${restaurant.rating}</p>
        <p>Address: ${restaurant.address}</p>
        <p>Description: ${restaurant.description}</p>
        <h3>Menu:</h3>
        <p>Food: ${restaurant.menus.foods.join(', ')}</p>
        <p>Drinks: ${restaurant.menus.drinks.join(', ')}</p>
        <h3>Customer Reviews:</h3>
        <ul id="customer-reviews"></ul>
    </div>
  `;

  renderCustomerReviews(restaurant.customerReviews);
}

function renderCustomerReviews(reviews) {
  const reviewsList = document.getElementById('customer-reviews');

  reviews.forEach(review => {
    const listItem = document.createElement('li');
    listItem.textContent = `${review.name}: ${review.review}`;
    reviewsList.appendChild(listItem);
  });
}
