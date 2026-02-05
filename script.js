// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-theme')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Load saved theme
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const icon = themeToggle.querySelector('i');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
});

// Menu item activation
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        menuItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

// Initialize Chart
const ctx = document.getElementById('revenueChart').getContext('2d');

// Check if Chart is available
if (typeof Chart !== 'undefined') {
    const revenueChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['जन', 'फर', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई'],
            datasets: [{
                label: 'राजस्व (हज़ार ₹)',
                data: [120, 150, 180, 200, 220, 240, 245],
                borderColor: '#4A6FA5',
                backgroundColor: 'rgba(74, 111, 165, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '₹' + value + 'k';
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
}

// Quick action buttons functionality
const actionButtons = document.querySelectorAll('.action-btn');
actionButtons.forEach(button => {
    button.addEventListener('click', function() {
        const actionText = this.querySelector('span').textContent;
        alert(`"${actionText}" कार्य शुरू किया गया!`);
    });
});

// View All button for orders
const viewAllBtn = document.querySelector('.view-all');
if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
        alert('सभी आदेश दिखाए जा रहे हैं...');
    });
}

// Search functionality
const searchInput = document.querySelector('.search-bar input');
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        if (this.value.trim()) {
            alert(`"${this.value}" के लिए खोज परिणाम दिखाए जा रहे हैं...`);
            this.value = '';
        }
    }
});

// Notification button click
const notificationBtn = document.querySelector('.notification-btn');
if (notificationBtn) {
    notificationBtn.addEventListener('click', () => {
        alert('आपके 3 नए नोटिफिकेशन हैं!');
    });
}
