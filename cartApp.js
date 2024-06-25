// Function to initialize the cart in localStorage if it doesn't exist
function initializeCart() {
    let cart = JSON.parse(localStorage.getItem('cart')); // Parse existing cart from localStorage
    if (!cart) {
      cart = []; // Initialize an empty cart if none exists
      localStorage.setItem('cart', JSON.stringify(cart)); // Store the initial empty cart in localStorage
    }
  }
  
  // List of items for sale
  const itemsForSale = [
    { id: 1, name: 'Apples', price: 2.00 },
    { id: 2, name: 'Bananas', price: 1.50 },
    { id: 3, name: 'Milk', price: 3.50 },
    { id: 4, name: 'Bread', price: 2.99 },
    { id: 5, name: 'Eggs', price: 2.75 },
    { id: 6, name: 'Cheese', price: 4.99 },
    { id: 7, name: 'Yogurt', price: 1.99 },
    { id: 8, name: 'Tomatoes', price: 1.50 },
    { id: 9, name: 'Potatoes', price: 1.00 },
    { id: 10, name: 'Spinach', price: 2.00 }
  ];
  
  // Function to display items for sale
  function displayItems() {
    const itemsList = document.getElementById('items');
  
    itemsForSale.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
  
      const addButton = document.createElement('button');
      addButton.textContent = 'Add to Cart';
      addButton.addEventListener('click', function() {
        addItemToCart(item);
      });
  
      li.appendChild(addButton);
      itemsList.appendChild(li);
    });
  }
  
  // Function to add an item to the cart
  function addItemToCart(item) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.push(item); // Add item to cart
    localStorage.setItem('cart', JSON.stringify(cart)); // Update cart in localStorage
    displayCart(); // Update displayed cart
    updateCartTotal(); // Update total price in the cart display
  }
  
  // Function to display the cart contents
  function displayCart() {
    const cartItemsList = document.getElementById('cartItems');
    const cart = JSON.parse(localStorage.getItem('cart'));
  
    cartItemsList.innerHTML = ''; // Clear previous cart items
  
    cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
  
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', function() {
        removeItemFromCart(item.id);
      });
  
      li.appendChild(removeButton);
      cartItemsList.appendChild(li);
    });
  }
  
  // Function to remove an item from the cart
  function removeItemFromCart(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart = cart.filter(item => item.id !== itemId); // Filter out the item to be removed
    localStorage.setItem('cart', JSON.stringify(cart)); // Update cart in localStorage
    displayCart(); // Update displayed cart
    updateCartTotal(); // Update total price in the cart display
  }
  
  // Function to update the cart total price display
  function updateCartTotal() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const cartTotal = cart.reduce((total, item) => total + item.price, 0).toFixed(2);
    document.getElementById('cartTotal').textContent = cartTotal;
  }
  
  // Event listener for the addItemForm submission
  document.addEventListener('DOMContentLoaded', function() {
    displayItems(); // Display items for sale when the DOM is loaded
  
    document.getElementById('addItemForm').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form submission
      const itemName = document.getElementById('itemName').value;
      const itemPrice = parseFloat(document.getElementById('itemPrice').value);
  
      // Generate a unique ID for the item (for simplicity, using a timestamp)
      const itemId = new Date().getTime().toString();
  
      const newItem = {
        id: itemId,
        name: itemName,
        price: itemPrice
      };
  
      addItemToCart(newItem); // Add item to cart
      document.getElementById('itemName').value = ''; // Clear item name input field
      document.getElementById('itemPrice').value = ''; // Clear item price input field
    });
  
    // Event listener for the displayCartButton click
    document.getElementById('displayCartButton').addEventListener('click', function() {
      displayCart();
    });
  
    // Event listener for the checkoutButton click (optional)
    document.getElementById('checkoutButton').addEventListener('click', function() {
      alert('Checkout functionality can be implemented here!');
    });
  
    // Initialize the cart when the script loads
    initializeCart();
  });