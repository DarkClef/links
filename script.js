// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);

// Update theme toggle icon
function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (body.getAttribute('data-theme') === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

updateThemeIcon();

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
});

// Live streaming status check (simulated)
function checkStreamingStatus() {
    // Bu fonksiyon gerçek API'ler ile entegre edilebilir
    // Şimdilik rastgele durum simülasyonu yapıyoruz
    
    const kickLive = document.getElementById('kickLive');
    
    // Simulated live status (gerçek uygulamada API çağrıları yapılacak)
    const isKickLive = Math.random() > 0.7; // %30 şans
    
    if (isKickLive) {
        kickLive.classList.add('active');
    }
}

// YouTube latest video fetch (simulated)
function fetchLatestYouTubeVideo() {
    const thumbnail = document.getElementById('latestVideoThumbnail');
    const title = document.getElementById('latestVideoTitle');
    const date = document.getElementById('latestVideoDate');
    
    // Simulated video data (gerçek uygulamada YouTube API kullanılacak)
    const videoData = {
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
        title: 'Son Yüklenen Video - Müzik Prodüksiyonu',
        publishedAt: '2 gün önce'
    };
    
    thumbnail.src = videoData.thumbnail;
    thumbnail.alt = videoData.title;
    title.textContent = videoData.title;
    date.textContent = videoData.publishedAt;
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation
function addLoadingAnimation() {
    const links = document.querySelectorAll('.link-btn');
    
    links.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            link.style.transition = 'all 0.5s ease';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Initialize functions when page loads
document.addEventListener('DOMContentLoaded', () => {
    addLoadingAnimation();
    checkStreamingStatus();
    fetchLatestYouTubeVideo();
    
    // Check streaming status every 5 minutes
    setInterval(checkStreamingStatus, 5 * 60 * 1000);
});

// Add click analytics (optional)
document.querySelectorAll('.link-btn').forEach(link => {
    link.addEventListener('click', (e) => {
        const platform = e.currentTarget.querySelector('span').textContent;
        console.log(`Link clicked: ${platform}`);
        
        // Burada analytics servisi entegrasyonu yapılabilir
        // örn: gtag('event', 'click', { event_category: 'social_link', event_label: platform });
    });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Add hover sound effect (optional)
function addHoverSounds() {
    const links = document.querySelectorAll('.link-btn');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            // Burada hover ses efekti eklenebilir
            // const audio = new Audio('hover-sound.mp3');
            // audio.volume = 0.1;
            // audio.play();
        });
    });
}

// Performance optimization: Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if supported
if ('IntersectionObserver' in window) {
    lazyLoadImages();
}
