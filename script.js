// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// Add visible class when section is in view
const sections = document.querySelectorAll('.section');
const checkIfInView = () => {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 100) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
};

// Check on scroll and on load
window.addEventListener('scroll', checkIfInView);
window.addEventListener('load', checkIfInView);

// Add desktop mode notification
const showDesktopNotification = () => {
    // Only show on mobile devices
    if (window.innerWidth > 768) return;
    
    const notification = document.createElement('div');
    notification.id = 'desktop-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <p>For the best experience, please view this site in desktop mode.</p>
            <button id="close-notification" aria-label="Close notification">×</button>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        #desktop-notification {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(29, 6, 56, 0.9);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(224, 170, 255, 0.2);
            border-radius: 12px;
            padding: 12px 20px;
            color: #fff;
            font-size: 0.95rem;
            z-index: 9999;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            animation: slideUp 0.5s ease-out forwards;
            max-width: 90%;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        #close-notification {
            background: none;
            border: none;
            color: #fff;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0 0 0 10px;
            line-height: 1;
            opacity: 0.7;
            transition: opacity 0.2s;
        }
        
        #close-notification:hover {
            opacity: 1;
        }
        
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translate(-50%, 20px);
            }
            to {
                opacity: 1;
                transform: translate(-50%, 0);
            }
        }
        
        @keyframes fadeOut {
            to {
                opacity: 0;
                transform: translate(-50%, -10px);
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Add close functionality
    const closeButton = document.getElementById('close-notification');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            notification.style.animation = 'fadeOut 0.3s ease-out forwards';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
    }
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.animation = 'fadeOut 0.5s ease-out forwards';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }
    }, 10000);
};

// Add theme toggle with glass morphism
const addThemeToggle = () => {
    const style = document.createElement('style');
    style.id = 'light-theme';
    style.textContent = `
        body.light-theme {
            --primary-color: #7b2cbf;
            --secondary-color: #9d4edd;
            --background-color: #f8f9fa;
            --text-color: #343a40;
            --light-gray: #e9ecef;
            --glass-bg: rgba(255, 255, 255, 0.7);
            --glass-border: rgba(255, 255, 255, 0.8);
            --glass-blur: blur(12px);
        }
        
        body.light-theme {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }
        
        body.light-theme .section,
        body.light-theme header,
        body.light-theme footer {
            background: rgba(255, 255, 255, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.8);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
        }
        
        body.light-theme .skill-category,
        body.light-theme .project,
        body.light-theme .strengths li {
            background: rgba(123, 44, 191, 0.1);
            border: 1px solid rgba(123, 44, 191, 0.2);
        }
        
        body.light-theme .strengths li:hover {
            background: rgba(123, 44, 191, 0.2);
        }
        
        body.light-theme .strengths li:before {
            color: #7b2cbf;
        }
        
        @media (max-width: 768px) {
            body.light-theme {
                background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%) no-repeat fixed;
            }
        }
    `;
    
    const toggleButton = document.createElement('button');
    toggleButton.id = 'theme-toggle';
    toggleButton.innerHTML = '☀️';
    toggleButton.title = 'Toggle Light Mode';
    toggleButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background: var(--glass-bg);
        backdrop-filter: var(--glass-blur);
        -webkit-backdrop-filter: var(--glass-blur);
        border: 1px solid var(--glass-border);
        color: var(--text-color);
        font-size: 1.2rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    `;
    
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        toggleButton.innerHTML = isLight ? '🌙' : '☀️';
        toggleButton.title = isLight ? 'Toggle Dark Mode' : 'Toggle Light Mode';
        localStorage.setItem('lightTheme', isLight);
    });
    
    // Check for saved theme preference
    if (localStorage.getItem('lightTheme') === 'true') {
        document.body.classList.add('light-theme');
        toggleButton.innerHTML = '🌙';
        toggleButton.title = 'Toggle Dark Mode';
    }
    
    document.head.appendChild(style);
    document.body.appendChild(toggleButton);
};

// Initialize theme toggle and show desktop notification
document.addEventListener('DOMContentLoaded', () => {
    addThemeToggle();
    showDesktopNotification();
    
    // Add animation class to header
    const header = document.querySelector('header');
    header.style.opacity = '0';
    header.style.transform = 'translateY(-20px)';
    header.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    
    // Trigger the animation after a short delay
    setTimeout(() => {
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
    }, 100);
});

// Add desktop mode notification
// const showDesktopNotification = () => {
//     const notification = document.createElement('div');
//     notification.id = 'desktop-notification';
//     notification.innerHTML = `
//         <div class="notification-content">
//             <p>For the best experience, please view this site in desktop mode.</p>
//             <button id="close-notification" aria-label="Close notification">×</button>
//         </div>
//     `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        #desktop-notification {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(29, 6, 56, 0.9);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(224, 170, 255, 0.2);
            border-radius: 12px;
            padding: 12px 20px;
            color: #fff;
            font-size: 0.95rem;
            z-index: 9999;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            display: none;
            animation: slideUp 0.5s ease-out forwards;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        #close-notification {
            background: none;
            border: none;
            color: #fff;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0 0 0 10px;
            line-height: 1;
            opacity: 0.7;
            transition: opacity 0.2s;
        }
        
        #close-notification:hover {
            opacity: 1;
        }
        
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translate(-50%, 20px);
            }
            to {
                opacity: 1;
                transform: translate(-50%, 0);
            }
        }
        
        @media (max-width: 768px) {
            #desktop-notification {
                display: block;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Add close functionality
    const closeButton = document.getElementById('close-notification');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            notification.style.animation = 'fadeOut 0.3s ease-out forwards';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
    }
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.animation = 'fadeOut 0.5s ease-out forwards';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }
    }, 10000);
};
// Initialize theme toggle 
document.addEventListener('DOMContentLoaded', addThemeToggle);
