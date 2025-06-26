// Gallery slider functionality
let currentSlideIndex = 0;
const totalSlides = 2;

function updateSlider() {
    const slider = document.getElementById('gallerySlider');
    const currentSlideSpan = document.getElementById('currentSlide');
    const dots = document.querySelectorAll('.gallery-dot');
    
    slider.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    currentSlideSpan.textContent = currentSlideIndex + 1;
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlideIndex);
    });
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    updateSlider();
}

function previousSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
}

function goToSlide(index) {
    currentSlideIndex = index;
    updateSlider();
}

// Auto-slide functionality (optional)
setInterval(() => {
    nextSlide();
}, 8000); // Change slide every 8 seconds

// Photo upload functionality
function loadPhoto(input, index) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const galleryItems = document.querySelectorAll('.gallery-item');
            galleryItems[index].innerHTML = `<img src="${e.target.result}" alt="Gallery photo">`;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// Address copy functionality
function copyAddress() {
    const address = "Near Jasodhara Awas, Adi Sakti Nagar - 5th Lane Road, Lochapada";
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(address).then(() => {
            showCopySuccess();
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = address;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showCopySuccess();
    }
}

function showCopySuccess() {
    const btn = document.querySelector('.copy-address-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '✅ Copied!';
    btn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = 'linear-gradient(135deg, #8B4513, #CD853F)';
    }, 2000);
}

// Google Maps functionality (updated with actual address)
function openGoogleMaps() {
    const address = "Near Jasodhara Awas, Adi Sakti Nagar - 5th Lane Road, Lochapada";
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
}

// Route help toggle functionality
function toggleRouteHelp() {
    const routeSection = document.getElementById('routeHelpSection');
    const toggleBtn = document.querySelector('.route-toggle-btn');
    
    if (routeSection.classList.contains('active')) {
        routeSection.classList.remove('active');
        toggleBtn.innerHTML = '🛣️ Need Help Finding Us?';
    } else {
        routeSection.classList.add('active');
        toggleBtn.innerHTML = '❌ Close Route Help';
        // Smooth scroll to route section
        setTimeout(() => {
            routeSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }
}

// Navigation help contact
function callForHelp() {
    const helpText = "🏠 Hi! I'm coming to your Griha Pravesh ceremony on June 29th but need help with directions. Could you please guide me to Near Jasodhara Awas, Adi Sakti Nagar - 5th Lane Road, Lochapada?";
    
    // You can replace this with actual phone number
    const phoneNumber = ""; // Add your phone number here
    
    if (phoneNumber) {
        window.open(`tel:${phoneNumber}`, '_self');
    } else {
        // Alternative: Open WhatsApp with help message
        window.open(`https://wa.me/?text=${encodeURIComponent(helpText)}`, '_blank');
    }
}

// RSVP toggle functionality
function toggleRSVP() {
    const rsvpSection = document.getElementById('rsvpSection');
    const toggleBtn = document.querySelector('.rsvp-toggle-btn');
    
    if (rsvpSection.classList.contains('active')) {
        rsvpSection.classList.remove('active');
        toggleBtn.innerHTML = '📝 RSVP to Celebrate With Us';
    } else {
        rsvpSection.classList.add('active');
        toggleBtn.innerHTML = '❌ Close RSVP Form';
        // Smooth scroll to RSVP section
        setTimeout(() => {
            rsvpSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }
}

// RSVP functionality
function handleRSVP(event) {
    event.preventDefault();
    const name = event.target.querySelector('input[placeholder="Your Name"]').value;
    const guests = event.target.querySelector('input[placeholder="Number of Guests"]').value;
    const phone = event.target.querySelector('input[placeholder="Phone Number"]').value;
    
    // Create a beautiful success message
    const successMsg = document.createElement('div');
    successMsg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #8B4513, #CD853F);
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        box-shadow: 0 15px 35px rgba(0,0,0,0.3);
        z-index: 1000;
        text-align: center;
        font-family: inherit;
        animation: slideIn 0.5s ease;
    `;
    successMsg.innerHTML = `
        <h3 style="margin-bottom: 10px;">🎉 Thank You ${name}!</h3>
        <p>Your RSVP for ${guests} guest(s) has been received.</p>
        <p style="margin-top: 10px; font-size: 0.9rem; opacity: 0.9;">We'll contact you at ${phone} if needed.</p>
    `;
    
    document.body.appendChild(successMsg);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        successMsg.remove();
        toggleRSVP(); // Close RSVP form
    }, 3000);
    
    event.target.reset();
}

// Share functionality - WhatsApp only
function shareWhatsApp() {
    const text = "🏠 You're invited to our Griha Pravesh ceremony on June 29th! 🪔\n\nJoin us for:\n📿 Hanuman Chalisa at 9:00 AM\n🍽️ Lunch at 1:00 PM\n\nCan't wait to celebrate with you! ✨";
    const url = window.location.href;
    window.open(`https://wa.me/?text=${encodeURIComponent(text + '\n\n' + url)}`, '_blank');
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Animate diya icons
    const diyas = document.querySelectorAll('.diya-icon, .event-icon');
    diyas.forEach(diya => {
        diya.style.animation = 'glow 2s ease-in-out infinite alternate';
    });
    
    // Initialize slider
    updateSlider();
});

// Language toggle functionality
let isOdiaActive = false;

function toggleLanguage() {
    isOdiaActive = !isOdiaActive;
    const body = document.body;
    
    if (isOdiaActive) {
        body.classList.add('odia-active');
        updateTextContent('or');
    } else {
        body.classList.remove('odia-active');
        updateTextContent('en');
    }
}

function updateTextContent(lang) {
    const elementsWithData = document.querySelectorAll('[data-en][data-or]');
    
    elementsWithData.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
        }
    });
}

// Remove photo upload functionality (since we're using static images now)
// Keep only the slider functions

function updateSlider() {
    const slider = document.getElementById('gallerySlider');
    const currentSlideSpan = document.getElementById('currentSlide');
    
    slider.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    currentSlideSpan.textContent = currentSlideIndex + 1;
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    updateSlider();
}

function previousSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
}

// Auto-slide functionality (keep this)
setInterval(() => {
    nextSlide();
}, 6000); // Reduced to 6 seconds for better UX