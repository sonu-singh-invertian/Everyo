// Quick Search Logic
function filterServices() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let cards = document.getElementsByClassName('card');

    Array.from(cards).forEach(card => {
        let title = card.getElementsByTagName('h4')[0].innerText.toLowerCase();
        let desc = card.getElementsByTagName('p')[0].innerText.toLowerCase();
        
        if (title.includes(input) || desc.includes(input)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}

// Category Filter Logic
function filterCategory(category) {
    let cards = document.getElementsByClassName('card');
    let chips = document.getElementsByClassName('service-chip');

    // Update active UI chip
    Array.from(chips).forEach(chip => chip.classList.remove('active'));
    event.target.classList.add('active');

    // Filter Cards
    Array.from(cards).forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}

// Service Action Mock
function openService(serviceName) {
    alert(serviceName + " section khol diya gaya hai! Yahan aap backend integration kar sakte hain.");
}