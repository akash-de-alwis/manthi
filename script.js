// Global audio object
let audio;

document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    initMessages();
    initCountdown();
    initWishButton();
    initLoveLetter();
    initMusicPlayer();
    initPhotoGallery();
    initVideoPlayer(); // New function for video section
});

// Message Carousel
function initMessages() {
    const messages = [
        "Today is all about celebrating the amazing person you are. Thank you for bringing so much joy and love into my life. I'm so grateful to have you by my side.",
        "Your smile brightens my darkest days. Your laugh is my favorite sound. Your love is the greatest gift I've ever received. Every moment with you feels like pure magic.",
        "Every day with you is an adventure I cherish. Your kindness, strength, and beauty inspire me constantly. Happy Birthday to the most incredible woman I know!",
        "You're not just my girlfriend, you're my best friend, my confidant, and my favorite person in the world. I can't imagine life without your love and warmth."
    ];

    let currentMessage = 0;
    const messageElement = document.getElementById('birthday-message');
    const prevButton = document.getElementById('prevMessage');
    const nextButton = document.getElementById('nextMessage');
    const dots = document.querySelectorAll('.dot');
    
    messageElement.textContent = messages[currentMessage];
    
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentMessage);
        });
    }
    
    function showMessage(index) {
        messageElement.style.opacity = 0;
        setTimeout(() => {
            messageElement.textContent = messages[index];
            messageElement.style.opacity = 1;
            updateDots();
        }, 500);
    }
    
    nextButton.addEventListener('click', () => {
        currentMessage = (currentMessage + 1) % messages.length;
        showMessage(currentMessage);
    });
    
    prevButton.addEventListener('click', () => {
        currentMessage = (currentMessage - 1 + messages.length) % messages.length;
        showMessage(currentMessage);
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentMessage = index;
            showMessage(currentMessage);
        });
    });
    
    setInterval(() => {
        currentMessage = (currentMessage + 1) % messages.length;
        showMessage(currentMessage);
    }, 10000);
}

// Birthday Countdown - Adjusted for April 14
function initCountdown() {
    const now = new Date();
    let birthdayDate = new Date(now.getFullYear(), 3, 14); // April 14 (month is 0-based, so 3 = April)
    birthdayDate.setHours(0, 0, 0, 0); // Midnight on April 14
    
    // If today is past April 14 this year, set it to next year
    if (now > birthdayDate) {
        birthdayDate.setFullYear(now.getFullYear() + 1);
    }
    
    const hoursElement = document.getElementById('countdown-hours');
    const minutesElement = document.getElementById('countdown-minutes');
    const secondsElement = document.getElementById('countdown-seconds');
    
    function updateCountdown() {
        const now = new Date();
        const timeLeft = birthdayDate - now;
        
        if (timeLeft <= 0) {
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";
            document.body.classList.add('birthday-mode');
            if (now.getDate() === 14 && now.getMonth() === 3) {
                return;
            } else {
                birthdayDate.setFullYear(birthdayDate.getFullYear() + 1);
            }
        }
        
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        updateCountdownDigit(hoursElement, hours);
        updateCountdownDigit(minutesElement, minutes);
        updateCountdownDigit(secondsElement, seconds);
    }
    
    function updateCountdownDigit(element, value) {
        const formattedValue = value.toString().padStart(2, '0');
        if (element.textContent !== formattedValue) {
            element.textContent = formattedValue;
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Birthday Wish Button
function initWishButton() {
    const wishButton = document.getElementById('wishButton');
    const wishResult = document.getElementById('wishResult');
    const confettiContainer = document.getElementById('confetti');
    
    wishButton.addEventListener('click', () => {
        wishButton.disabled = true;
        wishButton.classList.add('pressed');
        setTimeout(() => wishButton.classList.remove('pressed'), 200);
        
        wishResult.classList.remove('hidden');
        createConfettiExplosion(50);
        
        startMusic();
        
        setTimeout(() => {
            wishButton.disabled = false;
            wishResult.classList.add('hidden');
            confettiContainer.innerHTML = '';
        }, 6000);
    });
    
    function createConfettiExplosion(count) {
        confettiContainer.innerHTML = '';
        for (let i = 0; i < count; i++) {
            createConfetti();
        }
    }
    
    function createConfetti() {
        const confetti = document.createElement('div');
        const size = Math.random() * 10 + 5;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.position = 'absolute';
        confetti.style.top = '50%';
        confetti.style.left = '50%';
        confetti.style.zIndex = '10';
        confetti.style.transform = 'translate(-50%, -50%)';
        confetti.style.animation = `confettiExplode ${1 + Math.random() * 2}s forwards`;
        
        const angle = Math.random() * 360;
        const distance = 50 + Math.random() * 100;
        confetti.style.setProperty('--angle', `${angle}deg`);
        confetti.style.setProperty('--distance', `${distance}px`);
        
        if (!document.getElementById('confettiKeyframes')) {
            const keyframes = document.createElement('style');
            keyframes.id = 'confettiKeyframes';
            keyframes.innerHTML = `
                @keyframes confettiExplode {
                    0% { transform: translate(-50%, -50%) rotate(0deg); opacity: 1; }
                    100% { transform: translate(-50%, -50%) translateY(20px) translateX(calc(cos(var(--angle)) * var(--distance))) rotate(360deg); opacity: 0; }
                }
            `;
            document.head.appendChild(keyframes);
        }
        
        confettiContainer.appendChild(confetti);
    }
    
    function getRandomColor() {
        const colors = ['#ff5e94', '#ff85ad', '#ffb7d1', '#ffd1e3', '#ffca28', '#64b5f6', '#ffffff'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
}

// Custom Smooth Scroll Function
function smoothScroll(target, duration) {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime = null;

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, start, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            smoothScroll(targetPosition, 1000);
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
    }
});

// Add animation class when elements come into view
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('animate-in');
        }
    });
}, { passive: true });

// Preload background images
function preloadImages() {
    const images = ['./img1.jpg', './img4.png']; /* Adjust path as needed */
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadImages();

// Love Letter Functionality
function initLoveLetter() {
    const openLetterBtn = document.getElementById('openLetterBtn');
    const envelope = document.querySelector('.envelope');
    const letter = document.getElementById('love-letter');
    const sparkleContainer = document.querySelector('.sparkle-container');

    openLetterBtn.addEventListener('click', () => {
        envelope.classList.toggle('open');
        setTimeout(() => {
            letter.classList.toggle('open');
            if (letter.classList.contains('open')) {
                createSparkles(20);
            }
        }, 400);

        if (letter.classList.contains('open')) {
            openLetterBtn.innerHTML = '<span>Close Letter</span><i class="fas fa-envelope"></i>';
        } else {
            openLetterBtn.innerHTML = '<span>Open My Letter</span><i class="fas fa-envelope-open"></i>';
            sparkleContainer.innerHTML = '';
        }
    });

    function createSparkles(count) {
        sparkleContainer.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            sparkle.style.setProperty('--x', `${x - 50}px`);
            sparkle.style.setProperty('--y', `${y - 50}px`);
            sparkle.style.left = '50%';
            sparkle.style.top = '50%';
            sparkle.style.animationDelay = `${Math.random() * 0.5}s`;
            sparkleContainer.appendChild(sparkle);
        }
    }
}

// Music Player Functionality
function initMusicPlayer() {
    audio = new Audio('mylove.mp3');
    audio.volume = 0.7;
    audio.loop = true;
    
    const playButton = document.getElementById('playButton');
    const pauseButton = document.getElementById('pauseButton');
    const volumeSlider = document.getElementById('volumeSlider');
    const visualizer = document.querySelector('.music-visualizer');
    const heroSection = document.querySelector('.hero-section');
    let hasPlayed = false;
    
    window.startMusic = function() {
        audio.play()
            .then(() => {
                console.log('Music started playing');
                playButton.classList.add('hidden');
                pauseButton.classList.remove('hidden');
                visualizer.classList.add('playing');
                hasPlayed = true;
            })
            .catch(error => {
                console.log('Music playback failed:', error);
            });
    }
    
    window.addEventListener('scroll', () => {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        if (heroBottom <= 0 && !hasPlayed) {
            startMusic();
        }
    }, { passive: true });
    
    playButton.addEventListener('click', () => {
        startMusic();
    });
    
    pauseButton.addEventListener('click', () => {
        audio.pause();
        pauseButton.classList.add('hidden');
        playButton.classList.remove('hidden');
        visualizer.classList.remove('playing');
    });
    
    volumeSlider.addEventListener('input', () => {
        audio.volume = volumeSlider.value / 100;
    });
    
    audio.addEventListener('ended', () => {
        pauseButton.classList.add('hidden');
        playButton.classList.remove('hidden');
        visualizer.classList.remove('playing');
    });
}

// Enhance Photo Gallery for Mobile
function initPhotoGallery() {
    const photos = document.querySelectorAll('.photo');
    
    photos.forEach(photo => {
        photo.addEventListener('click', (e) => {
            const overlay = photo.querySelector('.photo-overlay');
            if (!overlay.classList.contains('active') && window.innerWidth <= 768) {
                e.preventDefault();
                overlay.classList.add('active');
                setTimeout(() => overlay.classList.remove('active'), 2000);
            }
        });
    });
}

// Video Player Functionality
function initVideoPlayer() {
    const video = document.getElementById('memoryVideo');
    const playBtn = document.getElementById('playVideoBtn');
    const overlay = document.querySelector('.video-overlay');
    const pauseButton = document.getElementById('pauseButton');
    const playButton = document.getElementById('playButton');
    const visualizer = document.querySelector('.music-visualizer');

    // Ensure video starts muted and does not autoplay
    video.muted = true; // Default state is muted
    video.autoplay = false; // Explicitly disable autoplay

    // Play video with sound on button click
    playBtn.addEventListener('click', () => {
        video.muted = false; // Unmute when user plays
        video.play();
        overlay.classList.add('hidden');
        video.controls = true; // Show native controls after play
        stopMusic(); // Stop music when video starts
    });

    // Stop music when video starts playing (e.g., via native controls after initial play)
    video.addEventListener('play', () => {
        stopMusic();
    });

    // Show overlay when video ends or is paused
    video.addEventListener('ended', () => {
        overlay.classList.remove('hidden');
        video.controls = false;
    });

    video.addEventListener('pause', () => {
        if (!video.ended) {
            overlay.classList.remove('hidden');
        }
    });

    // Helper function to stop the music
    function stopMusic() {
        if (audio && !audio.paused) {
            audio.pause();
            pauseButton.classList.add('hidden');
            playButton.classList.remove('hidden');
            visualizer.classList.remove('playing');
        }
    }
}