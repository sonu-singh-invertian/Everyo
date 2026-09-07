const categoryData = {
    grocery: [
        { name: "Amul Taaza Milk 1L", price: "₹68", img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300&q=80" },
        { name: "Fresh Organic Bananas (6 Pcs)", price: "₹40", img: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=300&q=80" },
        { name: "Brown Bread", price: "₹45", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80" },
        { name: "Fresh Red Tomatoes 1kg", price: "₹35", img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80" }
    ],
    pharma: [
        { name: "Paracetamol 650mg", price: "₹30", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300&q=80" },
        { name: "Vitamin C Tablets", price: "₹120", img: "https://images.unsplash.com/photo-1550572017-edf7b613149e?auto=format&fit=crop&w=300&q=80" },
        { name: "First Aid Dettol Sanitizer", price: "₹80", img: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&w=300&q=80" }
    ],
    ride: [
        { name: "Quick Bike Taxi", price: "₹15/km", img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=300&q=80" },
        { name: "Auto Rickshaw", price: "₹22/km", img: "https://images.unsplash.com/photo-1597042681970-ed493922c23f?auto=format&fit=crop&w=300&q=80" },
        { name: "AC Mini Cab", price: "₹35/km", img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=300&q=80" }
    ],
    shopping: [
        { name: "Wireless Earbuds", price: "₹1,299", img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=300&q=80" },
        { name: "Casual Sneakers", price: "₹899", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80" }
    ]
};

let cartCount = 0;
let isSignUpMode = false;

// Open Categories
function openCategoryProducts(category) {
    const container = document.getElementById('categoryProductsContainer');
    const title = document.getElementById('modalCategoryTitle');
    const locationBox = document.getElementById('rideLocationBox');
    
    container.innerHTML = '';
    title.innerText = category.toUpperCase() + " Varieties";

    locationBox.style.display = (category === 'ride') ? 'block' : 'none';

    if (categoryData[category]) {
        categoryData[category].forEach(item => {
            const isRide = (category === 'ride');
            const btnText = isRide ? 'Book Ride Now' : 'Add to Cart';
            const btnAction = isRide ? `confirmRideBooking('${item.name}')` : `addToCart('${item.name}')`;

            const itemHTML = `
                <div class="product-item">
                    <img src="${item.img}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/150'">
                    <h5>${item.name}</h5>
                    <div class="p-price">${item.price}</div>
                    <button onclick="${btnAction}">${btnText}</button>
                </div>
            `;
            container.innerHTML += itemHTML;
        });
    }

    document.getElementById('productModal').style.display = 'flex';
}

function closeProductModal() { document.getElementById('productModal').style.display = 'none'; }

function confirmRideBooking(vehicleName) {
    const pickup = document.getElementById('pickupLocation').value;
    const drop = document.getElementById('dropLocation').value;

    if (!pickup || !drop) {
        showToast("⚠️ Kripya Pickup aur Drop location dono daalein!", "#ef4444");
        return;
    }

    closeProductModal();
    showToast(`🚕 ${vehicleName} booked from "${pickup}" to "${drop}"!`, "#22c55e");
}

function addToCart(itemName) {
    cartCount++;
    document.getElementById('cartCount').innerText = cartCount;
    showToast("✓ " + itemName + " Added to Cart!", "#22c55e");
}

// LOGIN & USER PROFILE LOGIC
function openLoginModal() { document.getElementById('loginModal').style.display = 'flex'; }
function closeLoginModal() { document.getElementById('loginModal').style.display = 'none'; }

function toggleAuthMode(event) {
    event.preventDefault();
    isSignUpMode = !isSignUpMode;

    const authTitle = document.getElementById('authTitle');
    const nameGroup = document.getElementById('nameGroup');
    const authSubmitBtn = document.getElementById('authSubmitBtn');
    const toggleText = document.getElementById('toggleText');

    if (isSignUpMode) {
        authTitle.innerText = "Create Everyo Account";
        nameGroup.style.display = "block";
        authSubmitBtn.innerText = "Sign Up";
        toggleText.innerHTML = 'Already have an account? <a href="#" onclick="toggleAuthMode(event)">Login Here</a>';
    } else {
        authTitle.innerText = "Login to Everyo";
        nameGroup.style.display = "none";
        authSubmitBtn.innerText = "Login";
        toggleText.innerHTML = 'New to Everyo? <a href="#" onclick="toggleAuthMode(event)">Create an Account</a>';
    }
}

function handleAuthSubmit(event) {
    event.preventDefault();
    const contact = document.getElementById('authContact').value;
    const name = document.getElementById('authName').value;

    closeLoginModal();

    // User Profile Display Setup
    const userName = name || contact.split('@')[0];
    document.getElementById('navUserName').innerText = userName;
    document.getElementById('menuUserContact').innerText = contact;

    // Switch View
    document.getElementById('loggedOutNav').style.display = 'none';
    document.getElementById('loggedInNav').style.display = 'block';

    if (isSignUpMode) {
        showToast(`🎉 Welcome to Everyo, ${userName}!`, "#22c55e");
    } else {
        showToast(`✓ Welcome Back, ${userName}!`, "#22c55e");
    }

    document.getElementById('loginForm').reset();
}

function toggleProfileMenu() {
    document.getElementById('profileMenu').classList.toggle('show');
}

function logoutUser(event) {
    event.preventDefault();
    document.getElementById('loggedInNav').style.display = 'none';
    document.getElementById('loggedOutNav').style.display = 'block';
    document.getElementById('profileMenu').classList.remove('show');
    showToast("Logged out successfully!", "#3b82f6");
}

// Close Dropdown Outside Click
window.onclick = function(event) {
    if (!event.target.matches('.btn-profile') && !event.target.matches('.btn-profile *')) {
        const menu = document.getElementById('profileMenu');
        if (menu && menu.classList.contains('show')) {
            menu.classList.remove('show');
        }
    }
}

function showToast(msg, bg) {
    let toast = document.createElement('div');
    toast.style.cssText = `position:fixed; bottom:20px; right:20px; background:${bg}; color:#fff; padding:12px 20px; border-radius:8px; z-index:9999; font-weight:bold; box-shadow:0 4px 10px rgba(0,0,0,0.2);`;
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function filterServices() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let cards = document.getElementsByClassName('card');

    Array.from(cards).forEach(card => {
        let title = card.getElementsByTagName('h4')[0].innerText.toLowerCase();
        let desc = card.getElementsByTagName('p')[0].innerText.toLowerCase();
        card.style.display = (title.includes(input) || desc.includes(input)) ? "flex" : "none";
    });
}

function filterCategory(category, element) {
    let cards = document.getElementsByClassName('card');
    let chips = document.getElementsByClassName('service-chip');

    Array.from(chips).forEach(chip => chip.classList.remove('active'));
    element.classList.add('active');

    Array.from(cards).forEach(card => {
        card.style.display = (category === 'all' || card.getAttribute('data-category') === category) ? "flex" : "none";
    });
}

function openRegisterModal() { document.getElementById('registerModal').style.display = 'flex'; }
function closeRegisterModal() { document.getElementById('registerModal').style.display = 'none'; }

function registerNewItem(event) {
    event.preventDefault();
    let cat = document.getElementById('itemCategory').value;
    let title = document.getElementById('itemTitle').value;
    let img = document.getElementById('itemImg').value;
    let price = document.getElementById('itemPrice').value;

    if(!categoryData[cat]) categoryData[cat] = [];
    categoryData[cat].push({ name: title, price: "₹" + price, img: img });

    document.getElementById('itemForm').reset();
    closeRegisterModal();
    showToast("✓ New item added to " + cat + " category!", "#22c55e");
}
let cartItems = [];

// Cart me item save karne wala function
function addToCart(itemName) {
    // Extract price integer from string or category database
    let foundPrice = 0;
    for (let cat in categoryData) {
        let matched = categoryData[cat].find(i => i.name === itemName);
        if (matched) {
            foundPrice = parseInt(matched.price.replace(/[^0-9]/g, '')) || 0;
            break;
        }
    }

    cartItems.push({ name: itemName, price: foundPrice });
    updateCartUI();
    showToast("✓ " + itemName + " Added to Cart!", "#22c55e");
}

// Cart UI Update Logic
function updateCartUI() {
    document.getElementById('cartCount').innerText = cartItems.length;
    const container = document.getElementById('cartItemsList');
    const totalElem = document.getElementById('cartTotalAmount');

    if (cartItems.length === 0) {
        container.innerHTML = '<p class="empty-cart-msg">Your cart is empty!</p>';
        totalElem.innerText = '₹0';
        return;
    }

    let html = '';
    let total = 0;

    cartItems.forEach((item, index) => {
        total += item.price;
        html += `
            <div class="cart-item">
                <div class="cart-item-details">
                    <h5>${item.name}</h5>
                    <p>₹${item.price}</p>
                </div>
                <button class="btn-remove" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    container.innerHTML = html;
    totalElem.innerText = "₹" + total;
}

// Remove item from cart
function removeFromCart(index) {
    cartItems.splice(index, 1);
    updateCartUI();
}

// Cart Modal Toggle
function openCartModal() {
    updateCartUI();
    document.getElementById('cartModal').style.display = 'flex';
}

function closeCartModal() {
    document.getElementById('cartModal').style.display = 'none';
}

// Checkout Logic
function checkoutCart() {
    if (cartItems.length === 0) {
        showToast("⚠️ Add items to cart before checkout!", "#ef4444");
        return;
    }
    closeCartModal();
    cartItems = [];
    updateCartUI();
    showToast("🎉 Order Placed Successfully!", "#22c55e");
}
