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
// Popup Alert Ko Hata Kar Naya Logic
function openService(serviceName) {
    // Alert msg hata kar seedhe cart message ya custom modal open kar sakte hain
    console.log(serviceName + " selected");
    
    // Alert ki jagah direct order confirmation message
    let toast = document.createElement('div');
    toast.style.cssText = "position:fixed; bottom:20px; right:20px; background:#111827; color:#fff; padding:12px 24px; border-radius:8px; z-index:9999; box-shadow:0 4px 10px rgba(0,0,0,0.3);";
    toast.innerText = "✓ " + serviceName + " selected! Proceeding to checkout...";
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}
