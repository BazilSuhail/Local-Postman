// Sidebar functionality
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const mainContent = document.getElementById('mainContent');
const toggleSidebar = document.getElementById('toggleSidebar');
const collapseSidebar = document.getElementById('collapseSidebar');
const sidebarTitle = document.getElementById('sidebarTitle');
const collapseIcon = document.getElementById('collapseIcon');

let sidebarCollapsed = false;

// Toggle sidebar (mobile)
toggleSidebar.addEventListener('click', () => {
    sidebar.classList.remove('-translate-x-full');
    sidebarOverlay.classList.remove('hidden');
});

// Close sidebar when clicking overlay
sidebarOverlay.addEventListener('click', () => {
    sidebar.classList.add('-translate-x-full');
    sidebarOverlay.classList.add('hidden');
});

// Collapse sidebar (desktop)
collapseSidebar.addEventListener('click', () => {
    if (sidebarCollapsed) {
        // Expand sidebar
        sidebar.classList.remove('sidebar-collapsed');
        sidebar.style.width = '16rem';
        mainContent.style.marginLeft = '16rem';
        sidebarTitle.style.opacity = '1';
        collapseIcon.style.transform = 'rotate(0deg)';
        sidebarCollapsed = false;
    } else {
        // Collapse sidebar
        sidebar.classList.add('sidebar-collapsed');
        sidebar.style.width = '4rem';
        mainContent.style.marginLeft = '4rem';
        sidebarTitle.style.opacity = '0';
        collapseIcon.style.transform = 'rotate(180deg)';
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

// Toggle sections functionality
const enableAuth = document.getElementById('enableAuth');
const authSection = document.getElementById('authSection');
const enableFile = document.getElementById('enableFile');
const fileSection = document.getElementById('fileSection');

// Auth section toggle
enableAuth.addEventListener('change', () => {
    if (enableAuth.checked) {
        authSection.classList.add('open');
    } else {
        authSection.classList.remove('open');
    }
});

// File section toggle
enableFile.addEventListener('change', () => {
    if (enableFile.checked) {
        fileSection.classList.add('open');
    } else {
        fileSection.classList.remove('open');
    }
});

// File input functionality
const fileInput = document.getElementById('file');
const fileText = document.getElementById('fileText');

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        const fileName = e.target.files[0].name;
        fileText.textContent = fileName;
        fileText.classList.remove('text-gray-500');
        fileText.classList.add('text-gray-900', 'font-medium');
    } else {
        fileText.textContent = 'Choose a file to upload';
        fileText.classList.remove('text-gray-900', 'font-medium');
        fileText.classList.add('text-gray-500');
    }
});

// API Form functionality
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
        copyTokenBtn.classList.add('bg-green-800');
        copyTokenBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
        setTimeout(() => {
            copyTokenBtn.textContent = 'Copy';
            copyTokenBtn.classList.remove('bg-green-800');
            copyTokenBtn.classList.add('bg-green-600', 'hover:bg-green-700');
        }, 2000);
    } catch (err) {
        alert('Failed to copy token to clipboard');
    }
});

// Update status badge
function updateStatus(status, statusText, isError = false) {
    statusBadge.classList.remove('hidden');
    statusBadge.textContent = `${status} ${statusText}`;
    
    // Remove all status classes
    statusBadge.classList.remove('bg-green-100', 'text-green-800', 'bg-red-100', 'text-red-800', 'bg-yellow-100', 'text-yellow-800');
    
    // Add appropriate classes based on status
    if (isError || status >= 400) {
        statusBadge.classList.add('bg-red-100', 'text-red-800');
    } else if (status >= 300) {
        statusBadge.classList.add('bg-yellow-100', 'text-yellow-800');
    } else {
        statusBadge.classList.add('bg-green-100', 'text-green-800');
    }
}

// Update response body display
function updateResponseBody(content, isError = false) {
    if (isError) {
        responseBody.innerHTML = `
            <div class="text-red-400">
                <div class="flex items-center mb-2">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span class="font-medium">Error</span>
                </div>
                <pre class="whitespace-pre-wrap text-sm">${content}</pre>
            </div>
        `;
    } else if (content === 'loading') {
        responseBody.innerHTML = `
            <div class="text-yellow-400 flex items-center justify-center h-full">
                <div class="text-center">
                    <div class="animate-spin w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full mx-auto mb-3"></div>
                    <p>Sending request...</p>
                </div>
            </div>
        `;
    } else {
        responseBody.innerHTML = `<pre class="whitespace-pre-wrap text-sm">${content}</pre>`;
    }
}

// Form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const url = document.getElementById('url').value.trim();
    const method = document.getElementById('method').value;
    const jwt = document.getElementById('jwt').value.trim();
    const includeAuth = document.getElementById('enableAuth').checked;
    const jsonBody = document.getElementById('jsonBody').value.trim();
    const includeBody = document.getElementById('includeBody').checked;
    const includeFile = document.getElementById('enableFile').checked;

    // Reset UI
    tokenSection.classList.add('hidden');
    statusBadge.classList.add('hidden');
    updateResponseBody('loading');

    // Validate localhost URL
    if (!url.startsWith('http://localhost') && !url.startsWith('https://localhost')) {
        updateResponseBody('Error: Only localhost URLs are allowed for security reasons.\n\nExample: http://localhost:3000/api/endpoint', true);
        updateStatus('400', 'Invalid URL', true);
        return;
    }

    // Prepare headers
    const headers = {};
    if (includeAuth && jwt) {
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
                    updateResponseBody(`JSON Parse Error: ${err.message}`, true);
                    updateStatus('400', 'Bad Request', true);
                    return;
                }
            }
        } else if (includeBody && jsonBody) {
            try {
                body = JSON.stringify(JSON.parse(jsonBody), null, 2);
                headers['Content-Type'] = 'application/json';
            } catch (err) {
                updateResponseBody(`JSON Parse Error: ${err.message}`, true);
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
            if (json.access_token || json.token || json.accessToken) {
                const token = json.access_token || json.token || json.accessToken;
                accessTokenField.value = token;
                tokenSection.classList.remove('hidden');
            }
        } else {
            responseText = await response.text();
        }

        // Display response with headers info
        const responseInfo = `Status: ${response.status} ${response.statusText}
Time: ${duration}ms
Content-Type: ${contentType}
Content-Length: ${response.headers.get('Content-Length') || 'N/A'}

${responseText}`;
        
        updateResponseBody(responseInfo);

    } catch (error) {
        const errorMessage = `Network Error: ${error.message}

Possible causes:
• Server is not running on the specified port
• CORS policy restriction (check server CORS settings)  
• Invalid URL or port number
• Network connectivity issue
• Firewall blocking the connection

Troubleshooting:
1. Verify the server is running: curl ${url}
2. Check if the port is open: netstat -an | grep :${url.split(':')[2]?.split('/')[0]}
3. Review browser console for additional errors`;

        updateResponseBody(errorMessage, true);
        updateStatus('ERR', 'Network Error', true);
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Set default focus
    document.getElementById('url').focus();
    
    // Initialize collapsed sections
    authSection.classList.remove('open');
    fileSection.classList.remove('open');
    
    console.log('LocalPostman Enhanced - Ready to test APIs! 🚀');
});
// // Sidebar functionality
// const sidebar = document.getElementById('sidebar');
// const sidebarOverlay = document.getElementById('sidebarOverlay');
// const mainContent = document.getElementById('mainContent');
// const toggleSidebar = document.getElementById('toggleSidebar');
// const collapseSidebar = document.getElementById('collapseSidebar');
// const closeSidebar = document.getElementById('closeSidebar');

// let sidebarCollapsed = false;

// // Toggle sidebar (mobile)
// toggleSidebar.addEventListener('click', () => {
//     sidebar.classList.remove('-translate-x-full');
//     sidebarOverlay.classList.remove('hidden');
// });

// // Close sidebar (mobile)
// closeSidebar.addEventListener('click', () => {
//     sidebar.classList.add('-translate-x-full');
//     sidebarOverlay.classList.add('hidden');
// });

// // Close sidebar when clicking overlay
// sidebarOverlay.addEventListener('click', () => {
//     sidebar.classList.add('-translate-x-full');
//     sidebarOverlay.classList.add('hidden');
// });

// // Collapse sidebar (desktop)
// collapseSidebar.addEventListener('click', () => {
//     if (sidebarCollapsed) {
//         sidebar.style.transform = 'translateX(0)';
//         mainContent.style.marginLeft = '16rem';
//         sidebarCollapsed = false;
//     } else {
//         sidebar.style.transform = 'translateX(-100%)';
//         mainContent.style.marginLeft = '0';
//         sidebarCollapsed = true;
//     }
// });

// // Navigation functionality
// const navItems = document.querySelectorAll('.nav-item');
// const contentSections = document.querySelectorAll('.content-section');

// navItems.forEach(item => {
//     item.addEventListener('click', (e) => {
//         e.preventDefault();

//         // Update active nav item
//         navItems.forEach(nav => nav.classList.remove('active'));
//         item.classList.add('active');

//         // Show corresponding content section
//         const sectionId = item.dataset.section + 'Section';
//         contentSections.forEach(section => section.classList.add('hidden'));
//         document.getElementById(sectionId).classList.remove('hidden');

//         // Close sidebar on mobile after navigation
//         if (window.innerWidth < 1024) {
//             sidebar.classList.add('-translate-x-full');
//             sidebarOverlay.classList.add('hidden');
//         }
//     });
// });

// // Responsive sidebar handling
// function handleResize() {
//     if (window.innerWidth >= 1024) {
//         sidebar.classList.remove('-translate-x-full');
//         sidebarOverlay.classList.add('hidden');
//         if (!sidebarCollapsed) {
//             mainContent.style.marginLeft = '16rem';
//         }
//     } else {
//         sidebar.classList.add('-translate-x-full');
//         mainContent.style.marginLeft = '0';
//     }
// }

// window.addEventListener('resize', handleResize);
// handleResize(); // Initial call

// // API Form functionality (existing code)
// const form = document.getElementById('apiForm');
// const responseBody = document.getElementById('responseBody');
// const statusBadge = document.getElementById('statusBadge');
// const tokenSection = document.getElementById('tokenSection');
// const accessTokenField = document.getElementById('accessToken');
// const copyTokenBtn = document.getElementById('copyTokenBtn');

// // Copy token functionality
// copyTokenBtn.addEventListener('click', async () => {
//     try {
//         await navigator.clipboard.writeText(accessTokenField.value);
//         copyTokenBtn.textContent = 'Copied!';
//         copyTokenBtn.classList.add('bg-green-500', 'text-white');
//         copyTokenBtn.classList.remove('bg-gray-100', 'hover:bg-gray-200', 'text-gray-700');
//         setTimeout(() => {
//             copyTokenBtn.textContent = 'Copy';
//             copyTokenBtn.classList.remove('bg-green-500', 'text-white');
//             copyTokenBtn.classList.add('bg-gray-100', 'hover:bg-gray-200', 'text-gray-700');
//         }, 2000);
//     } catch (err) {
//         alert('Failed to copy token to clipboard');
//     }
// });

// // Update status badge
// function updateStatus(status, statusText, isError = false) {
//     statusBadge.classList.remove('hidden');
//     statusBadge.textContent = `${status} ${statusText}`;
//     statusBadge.className = `px-2 py-1 text-xs font-semibold rounded ${isError ? 'method-delete' : 'method-get'}`;
// }

// // Form submission
// form.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const url = document.getElementById('url').value.trim();
//     const method = document.getElementById('method').value;
//     const jwt = document.getElementById('jwt').value.trim();
//     const includeJwt = document.getElementById('includeJwt').checked;
//     const fileInput = document.getElementById('file');
//     const includeFile = document.getElementById('includeFile').checked;
//     const jsonBody = document.getElementById('jsonBody').value.trim();
//     const includeBody = document.getElementById('includeBody').checked;

//     // Reset UI
//     tokenSection.classList.add('hidden');
//     statusBadge.classList.add('hidden');
//     responseBody.textContent = 'Sending request...';

//     // Validate localhost URL
//     if (!url.startsWith('http://localhost') && !url.startsWith('https://localhost')) {
//         responseBody.textContent = 'Error: Only localhost URLs are allowed for security reasons.\n\nExample: http://localhost:3000/api/endpoint';
//         updateStatus('400', 'Invalid URL', true);
//         return;
//     }

//     // Prepare headers
//     const headers = {};
//     if (includeJwt && jwt) {
//         headers['Authorization'] = jwt.startsWith('Bearer ') ? jwt : `Bearer ${jwt}`;
//     }

//     // Prepare body
//     let body = null;
//     const isFormData = includeFile && fileInput.files.length > 0;

//     if (['POST', 'PUT'].includes(method)) {
//         if (isFormData) {
//             body = new FormData();
//             body.append('file', fileInput.files[0]);

//             if (includeBody && jsonBody) {
//                 try {
//                     const json = JSON.parse(jsonBody);
//                     Object.keys(json).forEach(key => {
//                         body.append(key, json[key]);
//                     });
//                 } catch (err) {
//                     responseBody.textContent = `JSON Parse Error: ${err.message}`;
//                     updateStatus('400', 'Bad Request', true);
//                     return;
//                 }
//             }
//         } else if (includeBody && jsonBody) {
//             try {
//                 body = JSON.stringify(JSON.parse(jsonBody), null, 2);
//                 headers['Content-Type'] = 'application/json';
//             } catch (err) {
//                 responseBody.textContent = `JSON Parse Error: ${err.message}`;
//                 updateStatus('400', 'Bad Request', true);
//                 return;
//             }
//         }
//     }

//     try {
//         const startTime = Date.now();
//         const response = await fetch(url, {
//             method,
//             headers,
//             body
//         });

//         const endTime = Date.now();
//         const duration = endTime - startTime;

//         // Update status
//         updateStatus(response.status, response.statusText, !response.ok);

//         // Parse response
//         const contentType = response.headers.get('Content-Type') || '';
//         let responseText = '';

//         if (contentType.includes('application/json')) {
//             const json = await response.json();
//             responseText = JSON.stringify(json, null, 2);

//             // Check for access token
//             if (json.access_token) {
//                 accessTokenField.value = json.access_token;
//                 tokenSection.classList.remove('hidden');
//             }
//         } else {
//             responseText = await response.text();
//         }

//         // Display response
//         const responseInfo = `Status: ${response.status} ${response.statusText}\nTime: ${duration}ms\nContent-Type: ${contentType}\n\n${responseText}`;
//         responseBody.textContent = responseInfo;

//     } catch (error) {
//         responseBody.textContent = `Network Error: ${error.message}\n\nPossible causes:\n• Server is not running\n• CORS policy restriction\n• Invalid URL or port\n• Network connectivity issue`;
//         updateStatus('ERR', 'Network Error', true);
//     }
// });