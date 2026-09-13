// Sample Products Data
const products = [
    { id: 1, name: 'Men\'s Kurta', price: 499, emoji: '👔', category: 'men' },
    { id: 2, name: 'Women\'s Saree', price: 799, emoji: '👗', category: 'women' },
    { id: 3, name: 'Kids Dress', price: 299, emoji: '👕', category: 'kids' },
    { id: 4, name: 'Men\'s Shirt', price: 599, emoji: '👕', category: 'men' },
    { id: 5, name: 'Women\'s Dupatta', price: 399, emoji: '🧣', category: 'women' },
    { id: 6, name: 'Kids Kurta', price: 349, emoji: '👶', category: 'kids' },
    { id: 7, name: 'Men\'s Dhoti', price: 699, emoji: '⚪', category: 'men' },
    { id: 8, name: 'Women\'s Lehenga', price: 1299, emoji: '✨', category: 'women' }
];

// Shopping Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Load products on page load
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    updateCartCount();
});

// Display Products
function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>Premium Quality Garment</p>
                <div class="product-price">₹${product.price}</div>
                <div class="product-buttons">
                    <button class="btn-add-cart" onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Add to Cart
function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show notification
    alert(`${name} added to cart!`);
}

// Update Cart Count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// View Cart
function viewCart() {
    const modal = document.getElementById('cart-modal');
    const cartItemsDiv = document.getElementById('cart-items');
    const totalPriceSpan = document.getElementById('total-price');
    
    cartItemsDiv.innerHTML = '';
    let totalPrice = 0;
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p style="text-align: center; padding: 2rem;">Your cart is empty!</p>';
        totalPriceSpan.textContent = '0';
    } else {
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>Quantity: <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)" style="width: 50px;"></p>
                </div>
                <div>
                    <span class="cart-item-price">₹${itemTotal}</span>
                    <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;
            cartItemsDiv.appendChild(cartItem);
        });
        totalPriceSpan.textContent = totalPrice;
    }
    
    modal.style.display = 'block';
}

// Update Quantity
function updateQuantity(index, quantity) {
    quantity = parseInt(quantity);
    if (quantity > 0) {
        cart[index].quantity = quantity;
    } else {
        cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    viewCart();
}

// Remove from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    viewCart();
}

// Close Cart Modal
function closeCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'none';
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Order placed successfully!\nTotal Amount: ₹${totalPrice}\n\nThank you for shopping at Delhi Readymade Center!`);
    
    // Clear cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    closeCart();
    loadProducts();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('cart-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}