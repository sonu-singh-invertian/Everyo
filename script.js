// Database of Items Variety with Images
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

// Open Category Varieties Modal
function openCategoryProducts(category) {
    const container = document.getElementById('categoryProductsContainer');
    const title = document.getElementById('modalCategoryTitle');
    const locationBox = document.getElementById('rideLocationBox');
    
    container.innerHTML = '';
    title.innerText = category.toUpperCase() + " Varieties";

    if (category === 'ride') {
        locationBox.style.display = 'block';
    } else {
        locationBox.style.display = 'none';
    }

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

// Confirm Ride Booking
function confirmRideBooking(vehicleName) {
    const pickup = document.getElementById('pickupLocation').value;
    const drop = document.getElementById('dropLocation').value;

    if (!pickup || !drop) {
        showToast("⚠️ Kripya Pickup aur Drop location dono daalein!", "#ef4444");
        return;
    }

    closeProductModal();
    showToast(`🚕 ${vehicleName} booked from "${pickup}" to "${drop}"! Driver arriving soon.`, "#22c55e");
}

// Add to Cart Logic
function addToCart(itemName) {
    cartCount++;
    document.getElementById('cartCount').innerText = cartCount;
    showToast("✓ " + itemName + " Added to Cart!", "#22c55e");
}

// Login & Sign-Up Logic
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
    if (isSignUpMode) {
        showToast(`🎉 Account Created! Welcome to Everyo, ${name || 'User'}!`, "#22c55e");
    } else {
        showToast(`✓ Welcome Back! Logged in as ${contact}`, "#22c55e");
    }
    document.getElementById('loginForm').reset();
}

// Toast Notification
function showToast(msg, bg) {
    let toast = document.createElement('div');
    toast.style.cssText = `position:fixed; bottom:20px; right:20px; background:${bg}; color:#fff; padding:12px 20px; border-radius:8px; z-index:9999; font-weight:bold; box-shadow:0 4px 10px rgba(0,0,0,0.2);`;
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Search Filter
function filterServices() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let cards = document.getElementsByClassName('card');

    Array.from(cards).forEach(card => {
        let title = card.getElementsByTagName('h4')[0].innerText.toLowerCase();
        let desc = card.getElementsByTagName('p')[0].innerText.toLowerCase();
        card.style.display = (title.includes(input) || desc.includes(input)) ? "flex" : "none";
    });
}

// Category Filter Chips
function filterCategory(category, element) {
    let cards = document.getElementsByClassName('card');
    let chips = document.getElementsByClassName('service-chip');

    Array.from(chips).forEach(chip => chip.classList.remove('active'));
    element.classList.add('active');

    Array.from(cards).forEach(card => {
        card.style.display = (category === 'all' || card.getAttribute('data-category') === category) ? "flex" : "none";
    });
}

// Item Registration Modal Controls
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
