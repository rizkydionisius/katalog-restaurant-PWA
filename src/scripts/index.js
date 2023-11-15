import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';

document.addEventListener("DOMContentLoaded", async function () {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".right-section");

  hamburger.addEventListener("click", function () {
    menu.classList.toggle("active");
  });

  window.addEventListener("resize", function () {
    adjustHeroImageSize();
  });

  adjustHeroImageSize();

  const restaurants = await fetchData();
  renderRestaurantList(restaurants);

  window.addEventListener("load", () => {
    registerServiceWorker();
  });
});

async function fetchData() {
  try {
    const response = await fetch('https://restaurant-api.dicoding.dev/list');
    const data = await response.json();
    return data.restaurants;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

function adjustHeroImageSize() {
  const heroImage = document.querySelector(".hero img");
  const viewportWidth = window.innerWidth;

  if (viewportWidth >= 1200) {
    heroImage.style.minWidth = "1000px";
  } else {
    heroImage.style.minWidth = "0";
  }
}

function renderRestaurantList(restaurants) {
    const restaurantListContainer = document.getElementById("my-main-content");

    // Loop melalui setiap restoran dan buat elemen card
    restaurants.forEach(restaurant => {
        const card = document.createElement("div");
        card.classList.add("restaurant-card");

        // Ganti URL gambar dengan URL dari API
        const imageUrl = `https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}`;
        
        // Menambahkan elemen-elemen ke dalam card 
        card.innerHTML = `
            <img src="${imageUrl}" alt="${restaurant.name}" class="restaurant-image">
            <div class="restaurant-info">
                <h2>${restaurant.name}</h2>
                <p>${restaurant.city}</p>
                <p>Rating: ${restaurant.rating}</p>
                <p>${restaurant.description}</p>
                <a href="detail.html?id=${restaurant.id}" class="details-button">Details</a>
            </div>
        `;

        // Tambahkan card ke dalam container
        restaurantListContainer.appendChild(card);

        const detailScript = document.createElement("script");
        detailScript.setAttribute("type", "module");
        detailScript.setAttribute("src", "../scripts/detail.js");
        document.body.appendChild(detailScript);
    });
}

function showRestaurantDetail(restaurantId) {
  console.log('Show detail for restaurant with ID:', restaurantId);
  // Implement navigation to detail page or show detail in a modal
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Error registering ServiceWorker:', error);
      });
  }
}
