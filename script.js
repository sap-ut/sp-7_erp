// DOM Elements
const loginForm = document.getElementById('loginFormElement');
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const resetBtn = document.getElementById('resetBtn');
const activeCellIndicator = document.getElementById('activeCellIndicator');
const formulaInput = document.getElementById('formulaInput');
const connectionStatus = document.getElementById('connectionStatus');
const currentTime = document.getElementById('currentTime');

// Generate Excel grid cells
function generateGridCells() {
    const cellsGrid = document.querySelector('.cells-grid');
    
    for (let row = 1; row <= 10; row++) {
        for (let col = 1; col <= 10; col++) {
            const cell = document.createElement('div');
            cell.className = 'excel-cell';
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.dataset.ref = `${String.fromCharCode(64 + col)}${row}`;
            
            // Make the cell clickable and focusable
            cell.tabIndex = 0;
            
            // Add cell click handler
            cell.addEventListener('click', handleCellClick);
            cell.addEventListener('focus', handleCellFocus);
            
            cellsGrid.appendChild(cell);
        }
    }
}

// Handle cell click
function handleCellClick(e) {
    const cell = e.target;
    const ref = cell.dataset.ref;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    
    // Update active cell indicator position
    const cellWidth = 100 / 10; // Percentage
    const cellHeight = 100 / 10;
    
    activeCellIndicator.style.width = `${cellWidth}%`;
    activeCellIndicator.style.height = `${cellHeight}%`;
    activeCellIndicator.style.left = `${(col - 1) * cellWidth}%`;
    activeCellIndicator.style.top = `${(row - 1) * cellHeight}%`;
    
    // Update formula bar
    formulaInput.textContent = `Selected: ${ref}`;
    
    // Add active class to cell
    document.querySelectorAll('.excel-cell').forEach(c => c.classList.remove('active'));
    cell.classList.add('active');
}

// Handle cell focus
function handleCellFocus(e) {
    const cell = e.target;
    const ref = cell.dataset.ref;
    formulaInput.textContent = `Cell ${ref}: Enter value...`;
}

// Toggle password visibility
togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
});

// Form submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const company = document.getElementById('company').value;
    
    // Validation
    if (!username || !password || !company) {
        showStatus('Please fill in all required fields', 'error');
        return;
    }
    
    if (password.length < 8) {
        showStatus('Password must be at least 8 characters', 'error');
        return;
    }
    
    // Simulate login process
    showStatus('Logging in...', 'loading');
    
    // Simulate API call
    setTimeout(() => {
        showStatus('Login successful! Redirecting...', 'success');
        
        // In real app, redirect to dashboard
        // window.location.href = 'dashboard.html';
        
        // For demo, show success message
        alert(`Welcome ${username}! (Company: ${company})`);
        
        // Reset form after successful login
        setTimeout(() => {
            loginForm.reset();
            showStatus('Ready', 'connected');
        }, 2000);
        
    }, 1500);
});

// Reset form
resetBtn.addEventListener('click', function() {
    if (confirm('Clear all form fields?')) {
        loginForm.reset();
        showStatus('Form reset', 'info');
        
        // Reset active cell
        document.querySelectorAll('.excel-cell').forEach(c => c.classList.remove('active'));
        formulaInput.textContent = 'Select a cell to edit...';
        activeCellIndicator.style.width = '0';
        activeCellIndicator.style.height = '0';
    }
});

// Show status message
function showStatus(message, type = 'info') {
    const statusElem = document.querySelector('.status-content');
    
    // Update connection status
    let icon = 'fa-circle';
    let color = '#666';
    
    switch(type) {
        case 'success':
            icon = 'fa-check-circle';
            color = '#28A745';
            break;
        case 'error':
            icon = 'fa-times-circle';
            color = '#DC3545';
            break;
        case 'loading':
            icon = 'fa-spinner fa-spin';
            color = '#0078D4';
            break;
        case 'connected':
            icon = 'fa-circle';
            color = '#28A745';
            break;
        case 'info':
            icon = 'fa-info-circle';
            color = '#FFC107';
            break;
    }
    
    // Create temporary status
    const tempStatus = document.createElement('span');
    tempStatus.className = 'status-text';
    tempStatus.textContent = message;
    tempStatus.style.color = color;
    tempStatus.style.fontWeight = '500';
    
    // Add to status bar
    const statusBar = document.querySelector('.status-content');
    statusBar.appendChild(tempStatus);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (tempStatus.parentNode === statusBar) {
            statusBar.removeChild(tempStatus);
        }
    }, 3000);
    
    // Update connection status indicator
    if (type === 'connected') {
        connectionStatus.innerHTML = `<i class="fas ${icon}" style="color: ${color};"></i> Connected`;
    }
}

// Update current time
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    const dateString = now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });
    
    currentTime.textContent = `${dateString} ${timeString}`;
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // F1 for help
    if (e.key === 'F1') {
        e.preventDefault();
        alert('ERP Login Help:\n\n1. Use Tab to navigate\n2. Enter to submit\n3. Escape to cancel\n4. Ctrl+R to reset\n\nContact admin for support.');
    }
    
    // Escape to blur active element
    if (e.key === 'Escape') {
        document.activeElement.blur();
    }
    
    // Ctrl+R to reset form
    if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        resetBtn.click();
    }
    
    // Enter on form field (except textarea) triggers submit
    if (e.key === 'Enter' && 
        e.target.tagName !== 'TEXTAREA' && 
        e.target.type !== 'button' && 
        e.target.type !== 'submit' &&
        !e.target.classList.contains('excel-btn')) {
        e.preventDefault();
        const submitBtn = document.querySelector('.excel-btn-primary');
        if (submitBtn) submitBtn.click();
    }
});

// Tab navigation enhancement
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        // Add visual feedback for tab navigation
        const activeElement = document.activeElement;
        if (activeElement.classList.contains('excel-input') || 
            activeElement.classList.contains('excel-btn') ||
            activeElement.classList.contains('excel-cell')) {
            
            activeElement.style.boxShadow = '0 0 0 2px rgba(0, 120, 212, 0.3)';
            
            setTimeout(() => {
                activeElement.style.boxShadow = '';
            }, 300);
        }
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Generate grid cells
    generateGridCells();
    
    // Set initial time and update every second
    updateTime();
    setInterval(updateTime, 1000);
    
    // Focus on username field
    setTimeout(() => {
        document.getElementById('username').focus();
    }, 500);
    
    // Simulate initial connection
    setTimeout(() => {
        showStatus('System ready', 'connected');
    }, 1000);
});

// Window resize handler
window.addEventListener('resize', function() {
    // Update active cell indicator position if a cell is selected
    const activeCell = document.querySelector('.excel-cell.active');
    if (activeCell) {
        handleCellClick({ target: activeCell });
    }
});
