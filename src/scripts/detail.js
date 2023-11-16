/* eslint-disable no-use-before-define */
/* eslint-disable indent */
import 'regenerator-runtime'; /* for async await transpile */
import '../styles/detail.css';
import { createRestaurantDetailTemplate, createLikeButtonTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../scripts/like-button-initiator';
 

document.addEventListener('DOMContentLoaded', async () => {
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
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data.restaurant;
    } catch (error) {
        console.error('Error fetching restaurant detail:', error);
        return null;
    }
}

function renderRestaurantDetail(restaurant) {
    // Mengisi informasi detail restoran ke dalam elemen HTML
    document.getElementById('restaurant-name').innerText = restaurant.name;
    document.getElementById('restaurant-image').src = `https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}`;
    document.getElementById('restaurant-address').innerText = `Address: ${restaurant.address}`;
    document.getElementById('restaurant-city').innerText = `City: ${restaurant.city}`;
    document.getElementById('restaurant-description').innerText = `Description: ${restaurant.description}`;

    renderMenuItems('food-menu', restaurant.menus.foods);
    renderMenuItems('drink-menu', restaurant.menus.drinks);
    renderCustomerReviews(restaurant.customerReviews);

    // eslint-disable-next-line no-undef
    LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: {
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            backdrop_path: movie.backdrop_path,
            vote_average: movie.vote_average,
            },
        }
      });
    }

const likeButtonContainer = document.getElementById('likeButtonContainer');
    likeButtonContainer.innerHTML = `
        <div id="likeButtonContainer">
            <!-- Tempat untuk menampilkan tombol favorit -->
        </div>
    `;

function renderMenuItems(listId, items) {
  const listElement = document.getElementById(listId);
  listElement.innerHTML = items.map((item) => `<li>${item.name}</li>`).join('');
}

function renderCustomerReviews(reviews) {
    const reviewsList = document.getElementById('customer-reviews');
    reviewsList.innerHTML = reviews.map((review) => `<li>${review.name}: ${review.review}</li>`).join('');
// eslint-disable-next-line eol-last
}