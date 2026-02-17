// ============================================
// UTILITY FUNCTIONS
// ============================================

// Format currency
export function formatCurrency(amount: number, currency: string = '₹'): string {
  return `${currency}${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Format number
export function formatNumber(num: number, decimals: number = 2): string {
  return num.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

// Format date
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

// Format date time
export function formatDateTime(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleString('en-IN', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Get today's date in YYYY-MM-DD format
export function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

// Convert inches to mm
export function inchesToMM(inches: number): number {
  return Math.round(inches * 25.4);
}

// Convert mm to inches
export function mmToInches(mm: number): number {
  return parseFloat((mm / 25.4).toFixed(2));
}

// Calculate area in sq.ft from inches
export function calculateAreaSqFt(widthInches: number, heightInches: number): number {
  return parseFloat(((widthInches * heightInches) / 144).toFixed(2));
}

// Calculate chargable size (add 6mm to each dimension)
export function calculateChargableSize(widthMM: number, heightMM: number): { width: number; height: number } {
  return {
    width: widthMM + 6,
    height: heightMM + 6
  };
}

// Calculate amount
export function calculateAmount(area: number, rate: number, qty: number): number {
  return parseFloat((area * rate * qty).toFixed(2));
}

// Calculate GST
export function calculateGST(amount: number, rate: number = 18): { cgst: number; sgst: number; total: number } {
  const cgst = parseFloat((amount * (rate / 2) / 100).toFixed(2));
  const sgst = parseFloat((amount * (rate / 2) / 100).toFixed(2));
  return { cgst, sgst, total: cgst + sgst };
}

// Generate unique ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Debounce function
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Deep clone
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// Validate GST number (basic validation)
export function validateGST(gst: string): boolean {
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return gstRegex.test(gst);
}

// Validate phone number
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
}

// Validate email
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Get status color
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    'active': 'bg-green-500',
    'inactive': 'bg-gray-500',
    'suspended': 'bg-red-500',
    'pending': 'bg-yellow-500',
    'approved': 'bg-green-500',
    'production': 'bg-blue-500',
    'dispatched': 'bg-purple-500',
    'completed': 'bg-teal-500',
    'cancelled': 'bg-red-500',
    'draft': 'bg-gray-500',
    'present': 'bg-green-500',
    'absent': 'bg-red-500',
    'half-day': 'bg-yellow-500',
    'leave': 'bg-blue-500',
    'available': 'bg-green-500',
    'busy': 'bg-yellow-500',
    'maintenance': 'bg-red-500',
    'in-transit': 'bg-blue-500',
    'delivered': 'bg-green-500'
  };
  return colors[status.toLowerCase()] || 'bg-gray-500';
}

// Get status badge variant
export function getStatusBadgeVariant(status: string): 'default' | 'secondary' | 'destructive' | 'outline' {
  const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    'active': 'default',
    'approved': 'default',
    'completed': 'default',
    'present': 'default',
    'available': 'default',
    'delivered': 'default',
    'inactive': 'secondary',
    'draft': 'secondary',
    'pending': 'outline',
    'production': 'outline',
    'busy': 'outline',
    'suspended': 'destructive',
    'cancelled': 'destructive',
    'absent': 'destructive',
    'maintenance': 'destructive'
  };
  return variants[status.toLowerCase()] || 'secondary';
}

// Download data as JSON
export function downloadJSON(data: unknown, filename: string): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Read file as text
export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

// Parse CSV
export function parseCSV(csv: string): Record<string, string>[] {
  const lines = csv.split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const result: Record<string, string>[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const values = lines[i].split(',');
    const row: Record<string, string> = {};
    headers.forEach((header, index) => {
      row[header] = values[index]?.trim() || '';
    });
    result.push(row);
  }
  
  return result;
}

// Export to CSV
export function exportToCSV(data: Record<string, unknown>[], filename: string): void {
  if (data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(','),
    ...data.map(row => headers.map(h => row[h] || '').join(','))
  ].join('\n');
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Print element
export function printElement(elementId: string): void {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;
  
  printWindow.document.write(`
    <html>
      <head>
        <title>Print</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        ${element.innerHTML}
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
}

// Local storage helpers
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  set: <T>(key: string, value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove: (key: string): void => {
    localStorage.removeItem(key);
  },
  clear: (): void => {
    localStorage.clear();
  }
};
