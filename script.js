// Collections array to store data
let collections = [
    {
        id: 1,
        name: "Classic Men's Collection",
        description: "Premium quality cotton shirts and pants for men",
        price: 499,
        image: "https://via.placeholder.com/250x200?text=Mens+Collection",
        category: "Men's Wear"
    },
    {
        id: 2,
        name: "Women's Traditional Wear",
        description: "Beautiful traditional ethnic wear for women",
        price: 799,
        image: "https://via.placeholder.com/250x200?text=Womens+Collection",
        category: "Women's Wear"
    },
    {
        id: 3,
        name: "Kids Casual Wear",
        description: "Comfortable and stylish clothes for kids",
        price: 399,
        image: "https://via.placeholder.com/250x200?text=Kids+Collection",
        category: "Kids Wear"
    }
];

// Load collections from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
    loadCollectionsFromStorage();
    displayCollections();
});

// Load collections from localStorage
function loadCollectionsFromStorage() {
    const stored = localStorage.getItem('collections');
    if (stored) {
        collections = JSON.parse(stored);
    }
}

// Save collections to localStorage
function saveCollectionsToStorage() {
    localStorage.setItem('collections', JSON.stringify(collections));
}

// Display all collections
function displayCollections() {
    const grid = document.getElementById('collectionGrid');
    grid.innerHTML = '';
    
    collections.forEach(collection => {
        const card = document.createElement('div');
        card.className = 'collection-card';
        card.innerHTML = `
            <img src="${collection.image}" alt="${collection.name}">
            <div class="collection-card-content">
                <h3>${collection.name}</h3>
                <span class="category">${collection.category}</span>
                <p>${collection.description}</p>
                <p class="price">₹${collection.price}</p>
                <button class="btn btn-primary" style="width: 100%; margin-top: 10px;">Add to Cart</button>
                <button class="btn btn-secondary" style="width: 100%; margin-top: 10px; background: #ff6b6b;" onclick="deleteCollection(${collection.id})">Delete</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Open add collection form
function openAddCollectionForm() {
    document.getElementById('addCollectionModal').style.display = 'block';
}

// Close add collection form
function closeAddCollectionForm() {
    document.getElementById('addCollectionModal').style.display = 'none';
    document.getElementById('collectionForm').reset();
}

// Add new collection
function addCollection(event) {
    event.preventDefault();
    
    const name = document.getElementById('collectionName').value;
    const description = document.getElementById('collectionDesc').value;
    const price = parseFloat(document.getElementById('collectionPrice').value);
    const image = document.getElementById('collectionImage').value;
    const category = document.getElementById('collectionCategory').value;
    
    const newCollection = {
        id: Date.now(),
        name: name,
        description: description,
        price: price,
        image: image,
        category: category
    };
    
    collections.push(newCollection);
    saveCollectionsToStorage();
    displayCollections();
    closeAddCollectionForm();
    
    alert('✅ Collection added successfully!');
}

// Delete collection
function deleteCollection(id) {
    if (confirm('Are you sure you want to delete this collection?')) {
        collections = collections.filter(c => c.id !== id);
        saveCollectionsToStorage();
        displayCollections();
        alert('❌ Collection deleted!');
    }
}

// Scroll to collection section
function scrollToCollection() {
    document.getElementById('collection').scrollIntoView({ behavior: 'smooth' });
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('addCollectionModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});