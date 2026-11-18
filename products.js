const productGrid = document.getElementById('productGrid');
const categorySelect = document.getElementById('categorySelect');
const searchInput = document.getElementById('searchInput');
const statusMessage = document.getElementById('statusMessage');

const navButtons = document.querySelectorAll('.nav-btn');
const views = {
  products: document.getElementById('productsView'),
  checkout: document.getElementById('checkoutView'),
  summary: document.getElementById('summaryView')
};

// Store all products retrieved from the API
 export let allProducts = [];

// Format prices as USD
export const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

// 1. Fetch products from API
export async function loadProducts() {
  try {
    // Show loading message
    statusMessage.textContent = 'Loading products...';

    const response = await fetch('https://dummyjson.com/products?limit=20');

    // Check if API request was successful
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();

    // Store products
 if (!Array.isArray(data.products)) {
  throw new Error('Invalid product data received');
}

 allProducts = data.products;

    // Populate category dropdown
    populateCategories(allProducts);

    // Display products
    renderProducts();

    statusMessage.textContent = `${allProducts.length} products available`;

  } catch (error) {
    console.error(error);

    statusMessage.textContent =
      'Sorry, we could not load products. Please try again later.';

    productGrid.innerHTML = '';
  }
}

// 2. Populate category dropdown
export function populateCategories(products) {
  const categories = [
    'all',
    ...new Set(products.map(product => product.category))
  ];

  categorySelect.innerHTML = categories.map(category => {
    const label = category === 'all'
      ? 'All Categories'
      : category;

    return `<option value="${category}">${label}</option>`;
  }).join('');
}

// 3. Display and filter products
export function renderProducts() {

  // Get search input and selected category
  const query = searchInput.value.trim().toLowerCase();
  const selectedCategory = categorySelect.value;

  // Filter products by title and category
  const filteredProducts = allProducts.filter(product => {

    const matchesSearch = product.title
      .toLowerCase()
      .includes(query);

    const matchesCategory =
      selectedCategory === 'all' ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Display friendly message if no products match
  if (filteredProducts.length === 0) {
    productGrid.innerHTML =
      '<p>No products match your search.</p>';
    return;
  }

  // Create product cards dynamically using map()
  productGrid.innerHTML = filteredProducts.map(product => `
    <article class="product-card">

      <img
        src="${product.thumbnail}"
        alt="${product.title}"
        class="product-image"
      />

      <div class="product-content">

        <h3 class="product-title">${product.title}</h3>

        <p class="price">
          ${currency.format(product.price)}
        </p>

        <button
          class="add-btn"
          type="button"
          data-id="${product.id}"
        >
          Add to Cart
        </button>

      </div>

    </article>
  `).join('');
}

// 4. Search products as the user types
searchInput.addEventListener('input', renderProducts);

// 5. Filter products when category changes
categorySelect.addEventListener('change', renderProducts);

// Load products when the page opens
loadProducts();
