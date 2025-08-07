// Sidebar functionality
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const mainContent = document.getElementById('mainContent');
const toggleSidebar = document.getElementById('toggleSidebar');
const collapseSidebar = document.getElementById('collapseSidebar');
const closeSidebar = document.getElementById('closeSidebar');

let sidebarCollapsed = false;

// Toggle sidebar (mobile)
toggleSidebar.addEventListener('click', () => {
    sidebar.classList.remove('-translate-x-full');
    sidebarOverlay.classList.remove('hidden');
});

// Close sidebar (mobile)
closeSidebar.addEventListener('click', () => {
    sidebar.classList.add('-translate-x-full');
    sidebarOverlay.classList.add('hidden');
});

// Close sidebar when clicking overlay
sidebarOverlay.addEventListener('click', () => {
    sidebar.classList.add('-translate-x-full');
    sidebarOverlay.classList.add('hidden');
});

// Collapse sidebar (desktop)
collapseSidebar.addEventListener('click', () => {
    if (sidebarCollapsed) {
        sidebar.style.transform = 'translateX(0)';
        mainContent.style.marginLeft = '16rem';
        sidebarCollapsed = false;
    } else {
        sidebar.style.transform = 'translateX(-100%)';
        mainContent.style.marginLeft = '0';
        sidebarCollapsed = true;
    }
});

// Navigation functionality
const navItems = document.querySelectorAll('.nav-item');
const contentSections = document.querySelectorAll('.content-section');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        // Update active nav item
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');

        // Show corresponding content section
        const sectionId = item.dataset.section + 'Section';
        contentSections.forEach(section => section.classList.add('hidden'));
        document.getElementById(sectionId).classList.remove('hidden');

        // Close sidebar on mobile after navigation
        if (window.innerWidth < 1024) {
            sidebar.classList.add('-translate-x-full');
            sidebarOverlay.classList.add('hidden');
        }
    });
});

// Responsive sidebar handling
function handleResize() {
    if (window.innerWidth >= 1024) {
        sidebar.classList.remove('-translate-x-full');
        sidebarOverlay.classList.add('hidden');
        if (!sidebarCollapsed) {
            mainContent.style.marginLeft = '16rem';
        }
    } else {
        sidebar.classList.add('-translate-x-full');
        mainContent.style.marginLeft = '0';
    }
}

window.addEventListener('resize', handleResize);
handleResize(); // Initial call

// API Form functionality (existing code)
const form = document.getElementById('apiForm');
const responseBody = document.getElementById('responseBody');
const statusBadge = document.getElementById('statusBadge');
const tokenSection = document.getElementById('tokenSection');
const accessTokenField = document.getElementById('accessToken');
const copyTokenBtn = document.getElementById('copyTokenBtn');

// Copy token functionality
copyTokenBtn.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(accessTokenField.value);
        copyTokenBtn.textContent = 'Copied!';
        copyTokenBtn.classList.add('bg-green-500', 'text-white');
        copyTokenBtn.classList.remove('bg-gray-100', 'hover:bg-gray-200', 'text-gray-700');
        setTimeout(() => {
            copyTokenBtn.textContent = 'Copy';
            copyTokenBtn.classList.remove('bg-green-500', 'text-white');
            copyTokenBtn.classList.add('bg-gray-100', 'hover:bg-gray-200', 'text-gray-700');
        }, 2000);
    } catch (err) {
        alert('Failed to copy token to clipboard');
    }
});

// Update status badge
function updateStatus(status, statusText, isError = false) {
    statusBadge.classList.remove('hidden');
    statusBadge.textContent = `${status} ${statusText}`;
    statusBadge.className = `px-2 py-1 text-xs font-semibold rounded ${isError ? 'method-delete' : 'method-get'}`;
}

// Form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const url = document.getElementById('url').value.trim();
    const method = document.getElementById('method').value;
    const jwt = document.getElementById('jwt').value.trim();
    const includeJwt = document.getElementById('includeJwt').checked;
    const fileInput = document.getElementById('file');
    const includeFile = document.getElementById('includeFile').checked;
    const jsonBody = document.getElementById('jsonBody').value.trim();
    const includeBody = document.getElementById('includeBody').checked;

    // Reset UI
    tokenSection.classList.add('hidden');
    statusBadge.classList.add('hidden');
    responseBody.textContent = 'Sending request...';

    // Validate localhost URL
    if (!url.startsWith('http://localhost') && !url.startsWith('https://localhost')) {
        responseBody.textContent = 'Error: Only localhost URLs are allowed for security reasons.\n\nExample: http://localhost:3000/api/endpoint';
        updateStatus('400', 'Invalid URL', true);
        return;
    }

    // Prepare headers
    const headers = {};
    if (includeJwt && jwt) {
        headers['Authorization'] = jwt.startsWith('Bearer ') ? jwt : `Bearer ${jwt}`;
    }

    // Prepare body
    let body = null;
    const isFormData = includeFile && fileInput.files.length > 0;

    if (['POST', 'PUT'].includes(method)) {
        if (isFormData) {
            body = new FormData();
            body.append('file', fileInput.files[0]);

            if (includeBody && jsonBody) {
                try {
                    const json = JSON.parse(jsonBody);
                    Object.keys(json).forEach(key => {
                        body.append(key, json[key]);
                    });
                } catch (err) {
                    responseBody.textContent = `JSON Parse Error: ${err.message}`;
                    updateStatus('400', 'Bad Request', true);
                    return;
                }
            }
        } else if (includeBody && jsonBody) {
            try {
                body = JSON.stringify(JSON.parse(jsonBody), null, 2);
                headers['Content-Type'] = 'application/json';
            } catch (err) {
                responseBody.textContent = `JSON Parse Error: ${err.message}`;
                updateStatus('400', 'Bad Request', true);
                return;
            }
        }
    }

    try {
        const startTime = Date.now();
        const response = await fetch(url, {
            method,
            headers,
            body
        });

        const endTime = Date.now();
        const duration = endTime - startTime;

        // Update status
        updateStatus(response.status, response.statusText, !response.ok);

        // Parse response
        const contentType = response.headers.get('Content-Type') || '';
        let responseText = '';

        if (contentType.includes('application/json')) {
            const json = await response.json();
            responseText = JSON.stringify(json, null, 2);

            // Check for access token
            if (json.access_token) {
                accessTokenField.value = json.access_token;
                tokenSection.classList.remove('hidden');
            }
        } else {
            responseText = await response.text();
        }

        // Display response
        const responseInfo = `Status: ${response.status} ${response.statusText}\nTime: ${duration}ms\nContent-Type: ${contentType}\n\n${responseText}`;
        responseBody.textContent = responseInfo;

    } catch (error) {
        responseBody.textContent = `Network Error: ${error.message}\n\nPossible causes:\n• Server is not running\n• CORS policy restriction\n• Invalid URL or port\n• Network connectivity issue`;
        updateStatus('ERR', 'Network Error', true);
    }
});