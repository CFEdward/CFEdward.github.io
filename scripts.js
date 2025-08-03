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
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');

    if (navLinks.classList.contains('active') &&
        !navLinks.contains(e.target) &&
        !menuToggle.contains(e.target)) {
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

    // For project pages
    const resumeContainer = document.querySelector('.resume-container');
    if (resumeContainer) {
        resumeContainer.style.paddingTop = `${navHeaderHeight}px`;
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
    const scrollAmount = 395;

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

document.querySelectorAll('.gallery-container').forEach(container => {
    const scrollContainer = container.querySelector('.gallery-grid');
    const leftButton = container.querySelector('.gallery-scroll-left');
    const rightButton = container.querySelector('.gallery-scroll-right');

    const scrollAmount = () => {
        if (!scrollContainer.children.length) return 350;
        const firstItem = scrollContainer.children[0];
        return firstItem.offsetWidth + parseInt(getComputedStyle(scrollContainer).gap);
    };

    function updateGalleryButtonStates() {
        if (!scrollContainer) return;
        leftButton.disabled = scrollContainer.scrollLeft <= 0;
        rightButton.disabled = scrollContainer.scrollLeft >=
            (scrollContainer.scrollWidth - scrollContainer.clientWidth - 1);
    }

    updateGalleryButtonStates();

    leftButton.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });

    rightButton.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });

    scrollContainer.addEventListener('scroll', updateGalleryButtonStates);
    window.addEventListener('resize', updateGalleryButtonStates);
});

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function () {
        // Create lightbox container
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${this.querySelector('img').src}" alt="${this.querySelector('img').alt}">
                <button class="lightbox-close">&times;</button>
            </div>
        `;

        // Add to document
        document.body.appendChild(lightbox);

        // Close functionality
        lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });

        // Close when clicking outside image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                document.body.removeChild(lightbox);
            }
        });
    });
});