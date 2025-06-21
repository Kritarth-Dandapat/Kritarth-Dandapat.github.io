// Blog functionality
class BlogManager {
    constructor() {
        this.posts = [];
        this.filteredPosts = [];
        this.currentPage = 1;
        this.postsPerPage = 6;
        this.currentFilters = {
            search: '',
            category: '',
            sort: 'newest'
        };

        this.init();
    }

    async init() {
        await this.loadPosts();
        this.setupEventListeners();
        this.renderPosts();
        this.updateStats();
        this.populateCategories();

        // Check for URL parameter to open specific post
        this.checkForPostParameter();
    }

    async loadPosts() {
        try {
            const response = await fetch('data.json');
            const data = await response.json();
            this.posts = data.posts;
            this.filteredPosts = [...this.posts];
        } catch (error) {
            console.error('Error loading posts:', error);
            this.showError('Failed to load blog posts. Please try again later.');
        }
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', (e) => {
            this.currentFilters.search = e.target.value;
            this.applyFilters();
        });

        // Category filter
        const categoryFilter = document.getElementById('category-filter');
        categoryFilter.addEventListener('change', (e) => {
            this.currentFilters.category = e.target.value;
            this.applyFilters();
        });

        // Sort filter
        const sortFilter = document.getElementById('sort-filter');
        sortFilter.addEventListener('change', (e) => {
            this.currentFilters.sort = e.target.value;
            this.applyFilters();
        });

        // Load more button
        const loadMoreBtn = document.getElementById('load-more-btn');
        loadMoreBtn.addEventListener('click', () => {
            this.loadMorePosts();
        });

        // Modal functionality
        this.setupModal();

        // Mobile menu
        this.setupMobileMenu();
    }

    applyFilters() {
        let filtered = [...this.posts];

        // Apply search filter
        if (this.currentFilters.search) {
            const searchTerm = this.currentFilters.search.toLowerCase();
            filtered = filtered.filter(post =>
                post.title.toLowerCase().includes(searchTerm) ||
                post.excerpt.toLowerCase().includes(searchTerm) ||
                post.content.toLowerCase().includes(searchTerm) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        }

        // Apply category filter
        if (this.currentFilters.category) {
            filtered = filtered.filter(post =>
                post.category === this.currentFilters.category
            );
        }

        // Apply sorting
        switch (this.currentFilters.sort) {
            case 'newest':
                filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'oldest':
                filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            case 'title':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
        }

        this.filteredPosts = filtered;
        this.currentPage = 1;
        this.renderPosts();
        this.updateStats();
    }

    renderPosts() {
        const blogGrid = document.getElementById('blog-grid');
        const noResults = document.getElementById('no-results');
        const loadMoreBtn = document.getElementById('load-more-btn');

        if (this.filteredPosts.length === 0) {
            blogGrid.innerHTML = '';
            noResults.style.display = 'block';
            loadMoreBtn.style.display = 'none';
            return;
        }

        noResults.style.display = 'none';
        loadMoreBtn.style.display = 'block';

        const startIndex = 0;
        const endIndex = this.currentPage * this.postsPerPage;
        const postsToShow = this.filteredPosts.slice(startIndex, endIndex);

        const postsHTML = postsToShow.map(post => this.createPostCard(post)).join('');
        blogGrid.innerHTML = postsHTML;

        // Show/hide load more button
        if (endIndex >= this.filteredPosts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }

        // Add click listeners to post cards
        this.addPostCardListeners();
    }

    createPostCard(post) {
        const tagsHTML = post.tags.map(tag =>
            `<span class="blog-card-tag">${tag}</span>`
        ).join('');

        const featuredImageHTML = post.featuredImage ?
            `<div class="blog-card-image">
                <img src="${post.featuredImage}" alt="${post.title}" loading="lazy">
                ${post.images && post.images.length > 1 ?
                `<div class="image-count">
                        <i class="fas fa-images"></i>
                        <span>${post.images.length} images</span>
                    </div>` : ''
            }
            </div>` : '';

        return `
            <div class="blog-card" data-post-id="${post.id}">
                ${featuredImageHTML}
                <div class="blog-card-header">
                    <span class="blog-card-category">${post.category}</span>
                    <h3 class="blog-card-title">${post.title}</h3>
                </div>
                <p class="blog-card-excerpt">${post.excerpt}</p>
                <div class="blog-card-meta">
                    <span class="blog-card-date">
                        <i class="fas fa-calendar"></i>
                        ${this.formatDate(post.date)}
                    </span>
                    <span class="blog-card-read-time">
                        <i class="fas fa-clock"></i>
                        ${post.readTime}
                    </span>
                </div>
                <div class="blog-card-tags">
                    ${tagsHTML}
                </div>
            </div>
        `;
    }

    addPostCardListeners() {
        const postCards = document.querySelectorAll('.blog-card');
        postCards.forEach(card => {
            card.addEventListener('click', () => {
                const postId = parseInt(card.dataset.postId);
                this.openPostModal(postId);
            });
        });
    }

    loadMorePosts() {
        this.currentPage++;
        this.renderPosts();
    }

    populateCategories() {
        const categoryFilter = document.getElementById('category-filter');
        const categories = [...new Set(this.posts.map(post => post.category))];

        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }

    updateStats() {
        const totalPosts = document.getElementById('total-posts');
        const totalCategories = document.getElementById('total-categories');

        totalPosts.textContent = this.posts.length;
        totalCategories.textContent = new Set(this.posts.map(post => post.category)).size;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    setupModal() {
        const modal = document.getElementById('post-modal');
        const closeBtn = document.querySelector('.close');

        // Close modal when clicking X
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }

    openPostModal(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (!post) return;

        const modal = document.getElementById('post-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalDate = document.getElementById('modal-date');
        const modalCategory = document.getElementById('modal-category');
        const modalReadTime = document.getElementById('modal-read-time');
        const modalContent = document.getElementById('modal-content');
        const modalTags = document.getElementById('modal-tags');
        const postGallery = document.getElementById('post-gallery');
        const galleryGrid = document.getElementById('gallery-grid');

        modalTitle.textContent = post.title;
        modalDate.innerHTML = `<i class="fas fa-calendar"></i> ${this.formatDate(post.date)}`;
        modalCategory.textContent = post.category;
        modalReadTime.innerHTML = `<i class="fas fa-clock"></i> ${post.readTime}`;
        modalContent.innerHTML = post.content;

        const tagsHTML = post.tags.map(tag =>
            `<span class="post-tag">${tag}</span>`
        ).join('');
        modalTags.innerHTML = tagsHTML;

        // Handle image gallery
        if (post.images && post.images.length > 1) {
            const galleryHTML = post.images.map((image, index) => `
                <div class="gallery-item" onclick="window.open('${image}', '_blank')">
                    <img src="${image}" alt="Image ${index + 1}" loading="lazy">
                    <div class="gallery-overlay">
                        <i class="fas fa-expand"></i>
                    </div>
                </div>
            `).join('');

            galleryGrid.innerHTML = galleryHTML;
            postGallery.style.display = 'block';

            // Add toggle button for gallery
            const toggleButton = document.createElement('button');
            toggleButton.className = 'btn btn-secondary gallery-toggle';
            toggleButton.innerHTML = '<i class="fas fa-images"></i> Toggle Image Gallery';
            toggleButton.onclick = () => {
                postGallery.style.display = postGallery.style.display === 'none' ? 'block' : 'none';
            };

            // Insert toggle button after post meta
            const postMeta = document.querySelector('.post-meta');
            if (postMeta && !document.querySelector('.gallery-toggle')) {
                postMeta.parentNode.insertBefore(toggleButton, postMeta.nextSibling);
            }
        } else {
            postGallery.style.display = 'none';
            const existingToggle = document.querySelector('.gallery-toggle');
            if (existingToggle) {
                existingToggle.remove();
            }
        }

        modal.style.display = 'block';
    }

    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    showError(message) {
        const blogGrid = document.getElementById('blog-grid');
        blogGrid.innerHTML = `
            <div class="error-message" style="text-align: center; padding: 2rem; color: var(--text-muted);">
                <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                <p>${message}</p>
            </div>
        `;
    }

    checkForPostParameter() {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('post');

        if (postId) {
            const postIdNum = parseInt(postId);
            const post = this.posts.find(p => p.id === postIdNum);
            if (post) {
                // Small delay to ensure modal is ready
                setTimeout(() => {
                    this.openPostModal(postIdNum);
                }, 100);
            }
        }
    }
}

// Initialize blog when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BlogManager();
});

// Smooth scrolling for navigation links
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

// Active navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.blog-card, .blog-header-content, .blog-controls');
    animateElements.forEach(el => observer.observe(el));
}); 