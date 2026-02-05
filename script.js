// DOM Elements
const normalInterface = document.getElementById('normalInterface');
const excelModal = document.getElementById('excelModal');
const openPIBtns = document.querySelectorAll('#openPIMode, #openPIMode2');
const closeExcelBtn = document.getElementById('closeExcel');
const generateGridBtn = document.getElementById('generateGrid');
const saveDataBtn = document.getElementById('saveData');
const excelContainer = document.getElementById('excelContainer');
const rowCountInput = document.getElementById('rowCount');
const colCountInput = document.getElementById('colCount');
const cellCountSpan = document.getElementById('cellCount');

// Open Excel Grid Mode
openPIBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        normalInterface.style.display = 'none';
        excelModal.style.display = 'flex';
        generateGrid(); // Generate default grid
    });
});

// Close Excel Grid Mode
closeExcelBtn.addEventListener('click', function() {
    excelModal.style.display = 'none';
    normalInterface.style.display = 'flex';
});

// Generate Excel Grid
function generateGrid() {
    const rows = parseInt(rowCountInput.value) || 10;
    const cols = parseInt(colCountInput.value) || 8;
    
    // Clear previous grid
    excelContainer.innerHTML = '';
    
    // Create grid container
    const grid = document.createElement('div');
    grid.className = 'excel-grid';
    grid.id = 'excelGrid';
    
    // Create column headers (A, B, C...)
    const colHeaderRow = document.createElement('div');
    colHeaderRow.className = 'excel-row';
    
    // Empty corner cell
    const cornerCell = document.createElement('div');
    cornerCell.className = 'excel-col-header excel-row-header';
    cornerCell.style.width = '40px';
    colHeaderRow.appendChild(cornerCell);
    
    // Column headers
    for (let c = 0; c < cols; c++) {
        const colHeader = document.createElement('div');
        colHeader.className = 'excel-col-header';
        colHeader.textContent = String.fromCharCode(65 + c); // A, B, C...
        colHeader.style.width = '120px';
        colHeader.dataset.col = c;
        colHeaderRow.appendChild(colHeader);
    }
    
    grid.appendChild(colHeaderRow);
    
    // Create data rows
    for (let r = 0; r < rows; r++) {
        const row = document.createElement('div');
        row.className = 'excel-row';
        
        // Row header (1, 2, 3...)
        const rowHeader = document.createElement('div');
        rowHeader.className = 'excel-row-header';
        rowHeader.textContent = r + 1;
        rowHeader.style.width = '40px';
        rowHeader.dataset.row = r;
        row.appendChild(rowHeader);
        
        // Data cells
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('input');
            cell.className = 'excel-cell';
            cell.type = 'text';
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.dataset.address = `${String.fromCharCode(65 + c)}${r + 1}`;
            
            // Set default headers for first row
            if (r === 0) {
                cell.className = 'excel-cell header';
                cell.placeholder = 'Column ' + String.fromCharCode(65 + c);
                cell.value = getDefaultHeader(c);
            } else if (r === 1 && c === 0) {
                cell.value = 'Sample Data';
            }
            
            // Add event listeners
            cell.addEventListener('focus', handleCellFocus);
            cell.addEventListener('input', updateCellCount);
            
            row.appendChild(cell);
        }
        
        grid.appendChild(row);
    }
    
    excelContainer.appendChild(grid);
    updateCellCount();
    
    // Focus on first data cell
    const firstCell = document.querySelector('.excel-cell[data-row="1"][data-col="0"]');
    if (firstCell) firstCell.focus();
}

// Get default header names
function getDefaultHeader(colIndex) {
    const headers = [
        'Product ID',
        'Product Name',
        'Category',
        'Quantity',
        'Price',
        'Supplier',
        'Location',
        'Status'
    ];
    return headers[colIndex] || `Column ${String.fromCharCode(65 + colIndex)}`;
}

// Handle cell focus
function handleCellFocus(e) {
    const cell = e.target;
    const address = cell.dataset.address;
    const value = cell.value;
    
    // Update status bar
    const statusBar = document.querySelector('.excel-status span:first-child');
    if (statusBar) {
        statusBar.textContent = `Selected: ${address}`;
    }
    
    // Highlight row and column
    document.querySelectorAll('.excel-cell').forEach(c => {
        c.style.backgroundColor = '';
    });
    
    const row = cell.dataset.row;
    const col = cell.dataset.col;
    
    // Highlight entire row
    document.querySelectorAll(`.excel-cell[data-row="${row}"]`).forEach(c => {
        if (c !== cell) c.style.backgroundColor = '#f8f9fa';
    });
    
    // Highlight entire column
    document.querySelectorAll(`.excel-cell[data-col="${col}"]`).forEach(c => {
        if (c !== cell) c.style.backgroundColor = '#f8f9fa';
    });
}

// Update cell count
function updateCellCount() {
    const totalCells = document.querySelectorAll('.excel-cell').length;
    const filledCells = Array.from(document.querySelectorAll('.excel-cell'))
        .filter(cell => cell.value.trim() !== '').length;
    
    cellCountSpan.textContent = `Cells: ${filledCells}/${totalCells}`;
}

// Save PI Data
function savePIData() {
    const rows = parseInt(rowCountInput.value) || 10;
    const cols = parseInt(colCountInput.value) || 8;
    
    const data = [];
    const headers = [];
    
    // Get headers from first row
    for (let c = 0; c < cols; c++) {
        const headerCell = document.querySelector(`.excel-cell[data-row="0"][data-col="${c}"]`);
        headers.push(headerCell ? headerCell.value.trim() || `Column ${c+1}` : `Column ${c+1}`);
    }
    
    // Get data from remaining rows
    for (let r = 1; r < rows; r++) {
        const rowData = {};
        let hasData = false;
        
        for (let c = 0; c < cols; c++) {
            const cell = document.querySelector(`.excel-cell[data-row="${r}"][data-col="${c}"]`);
            const value = cell ? cell.value.trim() : '';
            
            if (value) hasData = true;
            rowData[headers[c]] = value;
        }
        
        if (hasData) {
            data.push(rowData);
        }
    }
    
    // Create download link
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `PI_Data_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert(`PI data saved! ${data.length} records exported.`);
    
    // Return to normal interface
    excelModal.style.display = 'none';
    normalInterface.style.display = 'flex';
}

// Export to Excel (CSV)
function exportToCSV() {
    const rows = parseInt(rowCountInput.value) || 10;
    const cols = parseInt(colCountInput.value) || 8;
    
    const csvData = [];
    
    // Get headers
    const headers = [];
    for (let c = 0; c < cols; c++) {
        const headerCell = document.querySelector(`.excel-cell[data-row="0"][data-col="${c}"]`);
        headers.push(headerCell ? headerCell.value.trim() || `Column${c+1}` : `Column${c+1}`);
    }
    csvData.push(headers.join(','));
    
    // Get data rows
    for (let r = 1; r < rows; r++) {
        const rowValues = [];
        let hasData = false;
        
        for (let c = 0; c < cols; c++) {
            const cell = document.querySelector(`.excel-cell[data-row="${r}"][data-col="${c}"]`);
            let value = cell ? cell.value.trim() : '';
            
            // Escape commas and quotes for CSV
            if (value.includes(',') || value.includes('"')) {
                value = `"${value.replace(/"/g, '""')}"`;
            }
            
            if (value) hasData = true;
            rowValues.push(value);
        }
        
        if (hasData) {
            csvData.push(rowValues.join(','));
        }
    }
    
    const csvContent = csvData.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `PI_Data_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (excelModal.style.display === 'flex') {
        // F2 to edit current cell
        if (e.key === 'F2') {
            e.preventDefault();
            const activeElement = document.activeElement;
            if (activeElement.classList.contains('excel-cell')) {
                activeElement.select();
            }
        }
        
        // Ctrl+S to save
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            savePIData();
        }
        
        // Ctrl+E to export CSV
        if (e.ctrlKey && e.key === 'e') {
            e.preventDefault();
            exportToCSV();
        }
        
        // Arrow key navigation
        const activeCell = document.activeElement;
        if (activeCell.classList.contains('excel-cell')) {
            const row = parseInt(activeCell.dataset.row);
            const col = parseInt(activeCell.dataset.col);
            const rows = parseInt(rowCountInput.value) || 10;
            const cols = parseInt(colCountInput.value) || 8;
            
            let nextCell = null;
            
            switch(e.key) {
                case 'ArrowUp':
                    if (row > 0) {
                        nextCell = document.querySelector(`.excel-cell[data-row="${row-1}"][data-col="${col}"]`);
                    }
                    break;
                case 'ArrowDown':
                    if (row < rows - 1) {
                        nextCell = document.querySelector(`.excel-cell[data-row="${row+1}"][data-col="${col}"]`);
                    }
                    break;
                case 'ArrowLeft':
                    if (col > 0) {
                        nextCell = document.querySelector(`.excel-cell[data-row="${row}"][data-col="${col-1}"]`);
                    }
                    break;
                case 'ArrowRight':
                    if (col < cols - 1) {
                        nextCell = document.querySelector(`.excel-cell[data-row="${row}"][data-col="${col+1}"]`);
                    }
                    break;
                case 'Tab':
                    e.preventDefault();
                    if (col < cols - 1) {
                        nextCell = document.querySelector(`.excel-cell[data-row="${row}"][data-col="${col+1}"]`);
                    } else if (row < rows - 1) {
                        nextCell = document.querySelector(`.excel-cell[data-row="${row+1}"][data-col="0"]`);
                    }
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (row < rows - 1) {
                        nextCell = document.querySelector(`.excel-cell[data-row="${row+1}"][data-col="${col}"]`);
                    }
                    break;
            }
            
            if (nextCell) {
                nextCell.focus();
                nextCell.select();
            }
        }
    }
});

// Event Listeners
generateGridBtn.addEventListener('click', generateGrid);
saveDataBtn.addEventListener('click', savePIData);

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Add export CSV button
    const exportBtn = document.createElement('button');
    exportBtn.className = 'save-btn';
    exportBtn.innerHTML = '<i class="fas fa-file-export"></i> Export CSV';
    exportBtn.addEventListener('click', exportToCSV);
    document.querySelector('.config-row').appendChild(exportBtn);
});
