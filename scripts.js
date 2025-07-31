// Properly ordered JavaScript
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Menu toggle functionality
menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active');
    setTimeout(updateContentMargin, 50); // Small delay for transition
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        updateContentMargin();
    }
});

// Dynamic content spacing
// Update the content margin function to handle project pages
function updateContentMargin() {
    const navHeader = document.querySelector('.nav-header');
    const navHeaderHeight = navHeader.offsetHeight;

    // For homepage
    const allProjects = document.querySelector('.all-projects');
    if (allProjects) {
        allProjects.style.marginTop = `${navHeaderHeight}px`;
    }

    // For project pages
    const projectMain = document.querySelector('.project-main');
    if (projectMain) {
        projectMain.style.paddingTop = `${navHeaderHeight + 40}px`;
    }
}

// Initial setup
updateContentMargin();
window.addEventListener('resize', updateContentMargin);

// Scroll functionality for project grids
document.querySelectorAll('.projects-container').forEach(container => {
    const scrollContainer = container.querySelector('.projects-grid');
    const leftButton = container.querySelector('.scroll-left');
    const rightButton = container.querySelector('.scroll-right');
    const scrollAmount = 320;

    function updateButtonStates() {
        leftButton.disabled = scrollContainer.scrollLeft <= 0;
        rightButton.disabled = scrollContainer.scrollLeft >=
            scrollContainer.scrollWidth - scrollContainer.clientWidth;
    }

    updateButtonStates();

    leftButton.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    rightButton.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    scrollContainer.addEventListener('scroll', updateButtonStates);
    window.addEventListener('resize', updateButtonStates);
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        navLinks.classList.remove('active');
    });
});