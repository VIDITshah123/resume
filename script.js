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

// Add print functionality
const addPrintButton = () => {
    const header = document.querySelector('header');
    const printButton = document.createElement('button');
    printButton.textContent = 'Print Resume';
    printButton.className = 'print-button';
    printButton.onclick = () => window.print();
    
    // Add styles for the print button
    const style = document.createElement('style');
    style.textContent = `
        .print-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--secondary-color);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
        }
        
        .print-button:hover {
            background-color: #2980b9;
            transform: translateY(-2px);
        }
        
        @media print {
            .print-button {
                display: none;
            }
            
            body {
                background-color: white;
            }
            
            .section {
                box-shadow: none;
                border: 1px solid #eee;
                page-break-inside: avoid;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(printButton);
};

// Initialize the print button when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    addPrintButton();
    
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

// Add a simple theme toggle
const addThemeToggle = () => {
    const style = document.createElement('style');
    style.id = 'dark-theme';
    style.textContent = `
        body.dark-theme {
            --primary-color: #3498db;
            --secondary-color: #2ecc71;
            --background-color: #1a1a2e;
            --text-color: #e6e6e6;
            --light-gray: #16213e;
        }
        
        body.dark-theme .section {
            background-color: #0f3460;
            color: #e6e6e6;
        }
        
        body.dark-theme .education-item h3,
        body.dark-theme .project h3,
        body.dark-theme .skill-category h3 {
            color: #e6e6e6;
        }
        
        body.dark-theme .education-item p {
            color: #b3b3b3;
        }
        
        body.dark-theme .skill-category {
            background-color: #16213e;
        }
    `;
    
    const toggleButton = document.createElement('button');
    toggleButton.id = 'theme-toggle';
    toggleButton.innerHTML = '🌙';
    toggleButton.title = 'Toggle Dark Mode';
    toggleButton.style.cssText = `
        position: fixed;
        bottom: 70px;
        right: 20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
    `;
    
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        toggleButton.innerHTML = isDark ? '☀️' : '🌙';
        localStorage.setItem('darkTheme', isDark);
    });
    
    // Check for saved theme preference
    if (localStorage.getItem('darkTheme') === 'true') {
        document.body.classList.add('dark-theme');
        toggleButton.innerHTML = '☀️';
    }
    
    document.head.appendChild(style);
    document.body.appendChild(toggleButton);
};

// Initialize theme toggle
document.addEventListener('DOMContentLoaded', addThemeToggle);
