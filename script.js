let user = { email: '', password: '' };
let isLoggedIn = false;
let cart = [];
let deliveryAddress = { address: '', mobile: '', zip: '' };
let previousOrders = [];

const products = {
  fruits: [
    { name: 'Apples', price: 150, quality: 'Good', temperature: 22, humidity: 60, freshness: 80 },
    { name: 'Bananas', price: 50, quality: 'Good', temperature:18, humidity: 85, freshness: 90 },
    { name: 'Grapes', price: 60, quality: 'Good', temperature: 22, humidity: 90, freshness: 80 },
    { name: 'Mangoes', price: 200, quality: 'Good', temperature: 25, humidity: 55, freshness: 85 }
  ],
  vegetables: [
    { name: 'Tomatoes', price: 50, quality: 'Good', temperature: 20, humidity: 75, freshness: 90 },
    { name: 'Brinjal', price: 60, quality: 'Good', temperature: 15, humidity: 90, freshness: 90 },
    { name: 'Potatoes', price: 40, quality: 'Good', temperature: 10, humidity: 85, freshness: 90 },
    { name: 'Spinach', price: 20, quality: 'Good', temperature: 18, humidity: 70, freshness: 92 }
  ]
};

const warehouses = [
  { city: 'Mumbai', capacity: '5000 tons' },
  { city: 'Delhi', capacity: '4500 tons' },
  { city: 'Bangalore', capacity: '4000 tons' },
  { city: 'Madhya Pradesh', capacity: '6000 tons' },
  { city: 'Tamil Nadu', capacity: '55000 tons' },
  { city: 'Hyderabad', capacity: '6500 tons' }
];

function init() {
  if (!isLoggedIn) {
    renderLogin();
  } else {
    showSection('products');
  }
}

function renderLogin() {
  document.getElementById('mainContent').innerHTML = `
    <div class="card">
      <h2>Login</h2>
      <input type="email" id="email" placeholder="Enter Email" required>
      <input type="password" id="password" placeholder="Enter Password" required>
      <button class="main-btn" onclick="login()">Login</button>
    </div>
  `;
}

function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  if (!email.includes('@')) {
    alert('Invalid Email: must contain "@"');
    return;
  }
  if (!password) {
    alert('Password cannot be empty');
    return;
  }
  user.email = email;
  user.password = password;
  isLoggedIn = true;
  showSection('products');
}

function logout() {
  isLoggedIn = false;
  cart = [];
  deliveryAddress = {};
  init();
}

function showSection(section) {
  if (!isLoggedIn) {
    renderLogin();
    return;
  }
  switch (section) {
    case 'products':
      renderProducts();
      break;
    case 'cart':
      renderCart();
      break;
    case 'warehouse':
      renderWarehouses();
      break;
    case 'orders':
      renderOrders();
      break;
  }
}

function renderProducts() {
  let html = `<div class="card"><h2>Fruits</h2><div class="product-list">`;
  products.fruits.forEach((product, index) => {
    html += `
      <div class="product-item">
        <h3>${product.name}</h3>
        <p>Price: ₹${product.price}/kg</p>
        <p>Quality: ${product.quality}</p>
        <p>Temperature: ${product.temperature}°C, Humidity: ${product.humidity}%, Freshness: ${product.freshness}%</p>
        <button class="main-btn" onclick="addToCart('fruits', ${index})">Add to Cart</button>
      </div>
    `;
  });
  html += `</div><h2>Vegetables</h2><div class="product-list">`;
  products.vegetables.forEach((product, index) => {
    html += `
      <div class="product-item">
        <h3>${product.name}</h3>
        <p>Price: ₹${product.price}/kg</p>
        <p>Quality: ${product.quality}</p>
        <p>Temperature: ${product.temperature}°C, Humidity: ${product.humidity}%, Freshness: ${product.freshness}%</p>
        <button class="main-btn" onclick="addToCart('vegetables', ${index})">Add to Cart</button>
      </div>
    `;
  });
  html += `</div></div>`;
  document.getElementById('mainContent').innerHTML = html;
}

function addToCart(category, index) {
  const product = products[category][index];
  cart.push(product);
  alert(`${product.name} added to cart`);
}

function renderCart() {
  if (cart.length === 0) {
    document.getElementById('mainContent').innerHTML = `<div class="card"><h2>Cart</h2><p>Your cart is empty.</p></div>`;
    return;
  }
  let html = `<div class="card"><h2>Your Cart</h2><div class="product-list">`;
  cart.forEach((item, idx) => {
    html += `<div class="product-item"><h3>${item.name}</h3><p>Price: ₹${item.price}</p></div>`;
  });
  html += `</div><h3>Enter Delivery Details</h3>
    <input type="text" id="address" placeholder="Address">
    <input type="text" id="mobile" placeholder="Mobile Number (10 digits)">
    <input type="text" id="zip" placeholder="Zip Code (6 digits)">
    <button class="main-btn" onclick="checkout()">Place Order</button>
    </div>`;
  document.getElementById('mainContent').innerHTML = html;
}

function checkout() {
  const address = document.getElementById('address').value;
  const mobile = document.getElementById('mobile').value;
  const zip = document.getElementById('zip').value;

  if (mobile.length !== 10 || isNaN(mobile)) {
    alert('Mobile number must be exactly 10 digits.');
    return;
  }
  if (zip.length !== 6 || isNaN(zip)) {
    alert('Zip code must be exactly 6 digits.');
    return;
  }

  deliveryAddress = { address, mobile, zip };
  previousOrders.push({ cart: [...cart], deliveryAddress });
  cart = [];
  alert('Order Placed Successfully!');
  showSection('products');
}

function renderWarehouses() {
  let html = `<div class="card"><h2>Warehouse Locations</h2><div class="warehouse-list">`;
  warehouses.forEach(wh => {
    html += `<div class="warehouse-item"><h3>${wh.city}</h3><p>Capacity: ${wh.capacity}</p></div>`;
  });
  html += `</div></div>`;
  document.getElementById('mainContent').innerHTML = html;
}

function renderOrders() {
  if (previousOrders.length === 0) {
    document.getElementById('mainContent').innerHTML = `<div class="card"><h2>Previous Orders</h2><p>No previous orders found.</p></div>`;
    return;
  }
  let html = `<div class="card"><h2>Previous Orders</h2><div class="order-list">`;
  previousOrders.forEach(order => {
    html += `
      <div class="order-item">
        <p>Delivery Address: ${order.deliveryAddress.address}</p>
        <p>Mobile: ${order.deliveryAddress.mobile}</p>
        <p>Zip Code: ${order.deliveryAddress.zip}</p>
        <h4>Items:</h4>
        <ul>${order.cart.map(item => `<li>${item.name} - ₹${item.price}</li>`).join('')}</ul>
      </div>
    `;
  });
  html += `</div></div>`;
  document.getElementById('mainContent').innerHTML = html;
}

window.onload = init;
