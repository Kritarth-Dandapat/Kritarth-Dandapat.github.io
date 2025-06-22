// Configuration
const CONFIG = {
    // File patterns to look for
    filePatterns: {
        worksheet: /worksheet|worksheet.*\.(pdf|docx?|pptx?)$/i,
        notes: /notes|session.*notes|session.*notes.*\.(pdf|docx?|pptx?)$/i,
        solution: /solution|solution.*\.(pdf|docx?|pptx?)$/i,
        general: /(z-?chart|t-?table|chi-?square|binomial|poisson)\.(pdf|docx?|pptx?)$/i
    },

    // Semester patterns
    semesterPatterns: {
        spring2025: /spring.*2025|2025.*spring/i,
        fall2024: /fall.*2024|2024.*fall/i
    },

    // Date patterns for session extraction
    datePatterns: [
        /(\w+)\s+(\d{1,2})(?:st|nd|rd|th)?\s*[-–]\s*(.+)/i,
        /(\w+)\s+(\d{1,2})(?:st|nd|rd|th)?\s*[-–]\s*(.+)/i,
        /(\d{1,2})\/(\d{1,2})\s*[-–]\s*(.+)/i,
        /(\w+)\s+(\d{1,2})\s*[-–]\s*(.+)/i
    ]
};

// File type icons
const FILE_ICONS = {
    pdf: 'fas fa-file-pdf',
    doc: 'fas fa-file-word',
    docx: 'fas fa-file-word',
    ppt: 'fas fa-file-powerpoint',
    pptx: 'fas fa-file-powerpoint',
    xls: 'fas fa-file-excel',
    xlsx: 'fas fa-file-excel',
    txt: 'fas fa-file-alt'
};

// Main application class
class TutoringWebsite {
    constructor() {
        this.data = null;
        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.loadData();
        this.renderContent();
    }

    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.semester);
            });
        });

        // Search functionality
        const searchInput = document.getElementById('search-input');
        const clearSearchBtn = document.getElementById('clear-search');
        const sortSelect = document.getElementById('sort-select');

        searchInput.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
            this.toggleClearButton(e.target.value);
        });

        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            this.handleSearch('');
            this.toggleClearButton('');
            searchInput.focus();
        });

        sortSelect.addEventListener('change', (e) => {
            this.handleSort(e.target.value);
        });
    }

    async loadData() {
        try {
            const response = await fetch('data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.data = await response.json();
        } catch (error) {
            console.error('Error loading data:', error);
            this.showError('Failed to load data');
        }
    }

    renderContent() {
        if (!this.data) {
            this.showLoading();
            return;
        }

        this.renderGeneralResources();
        this.renderSessions();
    }

    renderGeneralResources() {
        const container = document.getElementById('general-resources');

        if (!this.data.generalResources || this.data.generalResources.length === 0) {
            container.innerHTML = '<div class="empty-state"><i class="fas fa-folder-open"></i><p>No general resources found</p></div>';
            return;
        }

        container.innerHTML = this.data.generalResources.map(resource => `
            <div class="resource-card" onclick="window.open('${resource.path}', '_blank')">
                <i class="${FILE_ICONS[resource.type] || 'fas fa-file'}"></i>
                <h3>${resource.displayName || this.getResourceDisplayName(resource.name)}</h3>
                <small>${resource.size}</small>
            </div>
        `).join('');
    }

    getResourceDisplayName(fileName) {
        return fileName
            .replace(/\.(pdf|docx?|pptx?)$/i, '')
            .replace(/-/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
    }

    renderSessions() {
        if (!this.data.sessions) return;

        Object.keys(this.data.sessions).forEach(semester => {
            const container = document.getElementById(`${semester}-sessions`);
            const sessions = this.data.sessions[semester];

            if (!sessions || sessions.length === 0) {
                container.innerHTML = '<div class="empty-state"><i class="fas fa-calendar-times"></i><p>No sessions found for this semester</p></div>';
                return;
            }

            container.innerHTML = sessions.map(session => this.renderSessionCard(session)).join('');
        });
    }

    renderSessionCard(session) {
        const date = new Date(session.date);
        const dateStr = date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        });

        const filesHtml = session.files.map(file => {
            const icon = FILE_ICONS[file.type] || 'fas fa-file';

            return `
                <a href="${file.path}" class="file-link" target="_blank" title="${file.name}">
                    <i class="${icon}"></i>
                    ${file.label || 'Download'}
                </a>
            `;
        }).join('');

        return `
            <div class="session-card">
                <div class="session-header">
                    <div class="session-date">${dateStr}</div>
                    <div class="session-title">${session.title}</div>
                    <div class="session-files">
                        ${filesHtml}
                    </div>
                </div>
            </div>
        `;
    }

    switchTab(semester) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-semester="${semester}"]`).classList.add('active');

        // Update panels
        document.querySelectorAll('.semester-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        document.getElementById(semester).classList.add('active');
    }

    showLoading() {
        const containers = ['general-resources', 'fall2025-sessions', 'spring2025-sessions'];
        containers.forEach(id => {
            const container = document.getElementById(id);
            if (container) {
                container.innerHTML = '<div class="loading">Loading...</div>';
            }
        });
    }

    showError(message) {
        console.error(message);
        const containers = ['general-resources', 'fall2025-sessions', 'spring2025-sessions'];
        containers.forEach(id => {
            const container = document.getElementById(id);
            if (container) {
                container.innerHTML = `<div class="empty-state"><i class="fas fa-exclamation-triangle"></i><p>${message}</p></div>`;
            }
        });
    }

    // Method to refresh content
    async refresh() {
        await this.loadData();
        this.renderContent();
    }

    handleSearch(searchTerm) {
        const searchResultsInfo = document.getElementById('search-results-info');
        const resultsCount = document.getElementById('results-count');

        if (!searchTerm.trim()) {
            this.renderSessions();
            searchResultsInfo.style.display = 'none';
            return;
        }

        const filteredSessions = this.filterSessions(searchTerm);
        this.renderFilteredSessions(filteredSessions);

        resultsCount.textContent = filteredSessions.length;
        searchResultsInfo.style.display = 'block';
    }

    filterSessions(searchTerm) {
        const term = searchTerm.toLowerCase();
        const allSessions = [];

        Object.keys(this.data.sessions).forEach(semester => {
            this.data.sessions[semester].forEach(session => {
                allSessions.push({ ...session, semester });
            });
        });

        return allSessions.filter(session => {
            const title = session.title.toLowerCase();
            const date = new Date(session.date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            }).toLowerCase();

            return title.includes(term) || date.includes(term);
        });
    }

    renderFilteredSessions(filteredSessions) {
        // Clear existing content
        document.querySelectorAll('.sessions-grid').forEach(container => {
            container.innerHTML = '';
        });

        if (filteredSessions.length === 0) {
            document.querySelectorAll('.sessions-grid').forEach(container => {
                container.innerHTML = '<div class="empty-state"><i class="fas fa-search"></i><p>No sessions found matching your search</p></div>';
            });
            return;
        }

        // Group by semester
        const groupedSessions = {};
        filteredSessions.forEach(session => {
            if (!groupedSessions[session.semester]) {
                groupedSessions[session.semester] = [];
            }
            groupedSessions[session.semester].push(session);
        });

        // Render each semester's sessions
        Object.keys(groupedSessions).forEach(semester => {
            const container = document.getElementById(`${semester}-sessions`);
            if (container) {
                container.innerHTML = groupedSessions[semester].map(session => this.renderSessionCard(session)).join('');
            }
        });
    }

    handleSort(sortOption) {
        Object.keys(this.data.sessions).forEach(semester => {
            const sessions = [...this.data.sessions[semester]];
            const sortedSessions = this.sortSessions(sessions, sortOption);
            this.data.sessions[semester] = sortedSessions;
        });

        // Re-render if there's no active search
        const searchInput = document.getElementById('search-input');
        if (!searchInput.value.trim()) {
            this.renderSessions();
        } else {
            this.handleSearch(searchInput.value);
        }
    }

    sortSessions(sessions, sortOption) {
        return sessions.sort((a, b) => {
            switch (sortOption) {
                case 'date-desc':
                    return new Date(b.date) - new Date(a.date);
                case 'date-asc':
                    return new Date(a.date) - new Date(b.date);
                case 'title-asc':
                    return a.title.localeCompare(b.title);
                case 'title-desc':
                    return b.title.localeCompare(a.title);
                default:
                    return 0;
            }
        });
    }

    toggleClearButton(value) {
        const clearBtn = document.getElementById('clear-search');
        if (value.trim()) {
            clearBtn.classList.add('show');
        } else {
            clearBtn.classList.remove('show');
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TutoringWebsite();
});

// Auto-refresh every 5 minutes (optional)
setInterval(() => {
    // Only refresh if the page is visible
    if (!document.hidden) {
        // Uncomment the line below if you want auto-refresh
        // window.tutoringWebsite?.refresh();
    }
}, 5 * 60 * 1000);

// Export for potential external use
window.TutoringWebsite = TutoringWebsite; 