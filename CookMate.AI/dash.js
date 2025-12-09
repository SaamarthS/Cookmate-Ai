// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const logoutBtn = document.getElementById('logout');

    // Handle navigation button clicks
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const pageUrl = this.getAttribute('data-page');
            
            // Add active state animation
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Redirect to respective page
            if (pageUrl) {
                window.location.href = pageUrl;
            }
        });
    });

    // Handle logout functionality
    logoutBtn.addEventListener('click', function() {
        // Add logout animation
        this.style.transform = 'scale(0.95)';
        
        // Simulate logout process
        setTimeout(() => {
            alert('Logging out... Redirecting to login page.');
            window.location.href = 'login.html';
        }, 500);
    });

    // Add active state for current page (optional)
    function setActiveNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
        navButtons.forEach(btn => {
            if (btn.getAttribute('data-page') === currentPage) {
                btn.classList.add('active');
            }
        });
    }

    setActiveNav();
});

// Add active button styling (add this to CSS)
/*
.nav-btn.active {
    background: rgba(52,152,219,0.3);
    border-left-color: #3498db;
    font-weight: 600;
}
*/
