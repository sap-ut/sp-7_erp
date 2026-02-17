import { 
  GlassTypes, 
  Customer, 
  Order, 
  Item, 
  User, 
  DayBookEntry, 
  LedgerAccount,
  SystemLog,
  Dispatch,
  Vehicle,
  Employee,
  Attendance,
  SystemSettings,
  Module
} from '@/types';

// ============================================
// GLASS TYPES DATA
// ============================================
export const glassTypesData: GlassTypes = {
  'C': {
    name: 'Clear Float Glass',
    items: [
      { code: 'C-3MM', name: 'Clear Float 3mm', rate: 45 },
      { code: 'C-4MM', name: 'Clear Float 4mm', rate: 55 },
      { code: 'C-5MM', name: 'Clear Float 5mm', rate: 65 },
      { code: 'C-6MM', name: 'Clear Float 6mm', rate: 75 },
      { code: 'C-8MM', name: 'Clear Float 8mm', rate: 95 },
      { code: 'C-10MM', name: 'Clear Float 10mm', rate: 125 },
      { code: 'C-12MM', name: 'Clear Float 12mm', rate: 155 }
    ]
  },
  'P': {
    name: 'Patterned Glass',
    items: [
      { code: 'P-4MM', name: 'Patterned 4mm', rate: 85 },
      { code: 'P-5MM', name: 'Patterned 5mm', rate: 95 },
      { code: 'P-6MM', name: 'Patterned 6mm', rate: 105 }
    ]
  },
  'F': {
    name: 'Frosted Glass',
    items: [
      { code: 'F-4MM', name: 'Frosted 4mm', rate: 110 },
      { code: 'F-5MM', name: 'Frosted 5mm', rate: 120 },
      { code: 'F-6MM', name: 'Frosted 6mm', rate: 130 }
    ]
  },
  'T': {
    name: 'Toughened Glass',
    items: [
      { code: 'T-5MM', name: 'Toughened 5mm', rate: 155 },
      { code: 'T-6MM', name: 'Toughened 6mm', rate: 175 },
      { code: 'T-8MM', name: 'Toughened 8mm', rate: 205 },
      { code: 'T-10MM', name: 'Toughened 10mm', rate: 245 },
      { code: 'T-12MM', name: 'Toughened 12mm', rate: 295 }
    ]
  },
  'L': {
    name: 'Laminated Glass',
    items: [
      { code: 'L-6.38', name: 'Laminated 6.38mm', rate: 225 },
      { code: 'L-8.38', name: 'Laminated 8.38mm', rate: 265 },
      { code: 'L-10.38', name: 'Laminated 10.38mm', rate: 315 }
    ]
  },
  'DG': {
    name: 'Double Glazed Unit',
    items: [
      { code: 'DG-24MM', name: 'DGU 24mm', rate: 385 },
      { code: 'DG-28MM', name: 'DGU 28mm', rate: 425 }
    ]
  },
  'W': {
    name: 'Wired Glass',
    items: [
      { code: 'W-6MM', name: 'Wired 6mm', rate: 140 },
      { code: 'W-8MM', name: 'Wired 8mm', rate: 160 }
    ]
  },
  'B': {
    name: 'Body Tinted Glass',
    items: [
      { code: 'B-5MM', name: 'Tinted 5mm Bronze', rate: 135 },
      { code: 'B-6MM', name: 'Tinted 6mm Green', rate: 145 },
      { code: 'B-8MM', name: 'Tinted 8mm Blue', rate: 165 },
      { code: 'B-10MM', name: 'Tinted 10mm Grey', rate: 185 }
    ]
  },
  'RD': {
    name: 'Reflective Glass',
    items: [
      { code: 'RD-6MM', name: 'Reflective 6mm Blue', rate: 195 },
      { code: 'RD-8MM', name: 'Reflective 8mm Silver', rate: 225 },
      { code: 'RD-DYE', name: 'Dyed Glass 6mm', rate: 185 }
    ]
  },
  'D': {
    name: 'Designer Glass',
    items: [
      { code: 'D-ETCH', name: 'Etched Designer', rate: 325 },
      { code: 'D-BACK', name: 'Backpainted Glass', rate: 285 },
      { code: 'D-PRINT', name: 'Digital Print Glass', rate: 450 }
    ]
  }
};

// ============================================
// MODULES DATA
// ============================================
export const modulesData: Module[] = [
  { id: 'dashboard', name: 'Dashboard', icon: 'Home', description: 'Main overview', shortcut: 'Ctrl+Home', color: '#4CAF50' },
  { id: 'proforma', name: 'Proforma Invoice', icon: 'FileInvoiceDollar', description: 'Create PI with all features', shortcut: 'Ctrl+P', color: '#2196F3' },
  { id: 'quotation', name: 'Quotation', icon: 'FileText', description: 'Generate quotations', shortcut: 'Ctrl+Q', color: '#9C27B0' },
  { id: 'orders', name: 'Order Management', icon: 'ClipboardList', description: 'Create & track orders', shortcut: 'Ctrl+O', color: '#FF9800' },
  { id: 'customers', name: 'Customers', icon: 'Users', description: 'Manage customers', shortcut: 'Ctrl+C', color: '#00BCD4' },
  { id: 'accounting', name: 'Accounting', icon: 'Calculator', description: 'Accounts & ledger', shortcut: 'Ctrl+A', color: '#795548' },
  { id: 'items', name: 'Item Master', icon: 'Box', description: 'Manage products', shortcut: 'Ctrl+I', color: '#607D8B' },
  { id: 'users', name: 'User Management', icon: 'UserCog', description: 'Manage system users', shortcut: 'Ctrl+U', color: '#E91E63' },
  { id: 'admin', name: 'Admin Panel', icon: 'ShieldAlt', description: 'System administration', shortcut: '', color: '#F44336' },
  { id: 'reports', name: 'Reports', icon: 'ChartBar', description: 'View all reports', shortcut: 'Ctrl+R', color: '#3F51B5' },
  { id: 'settings', name: 'Settings', icon: 'Cog', description: 'System settings', shortcut: 'Ctrl+S', color: '#009688' },
  { id: 'gst-invoice', name: 'GST Invoice', icon: 'FileInvoice', description: 'Create GST invoices', shortcut: 'Ctrl+G', color: '#673AB7' },
  { id: 'dispatch', name: 'Dispatch Planner', icon: 'TruckLoading', description: 'Plan deliveries', shortcut: 'Ctrl+D', color: '#FF5722' },
  { id: 'attendance', name: 'Attendance', icon: 'CalendarCheck', description: 'Employee attendance', shortcut: '', color: '#8BC34A' },
  { id: 'glass-lines', name: 'Glass Lines', icon: 'ThLarge', description: 'All glass types', shortcut: 'Ctrl+L', color: '#CDDC39' },
  { id: 'optimization', name: 'Optimization', icon: 'Cube', description: 'Glass cutting optimization', shortcut: '', color: '#FFC107' },
  { id: 'custom-charges', name: 'Custom Charges', icon: 'Coins', description: 'Manage all charges', shortcut: '', color: '#FFEB3B' }
];

// ============================================
// SAMPLE CUSTOMERS
// ============================================
export const sampleCustomers: Customer[] = [
  { id: 1, name: 'Raj Glass House', city: 'Delhi', phone: '9876543210', gst: '07AABCU9603R1ZX', email: 'raj@example.com', address: '123 Main Road, Delhi' },
  { id: 2, name: 'Shyam Glass Works', city: 'Noida', phone: '9876543211', gst: '06ABCDE1234F1Z5', email: 'shyam@example.com', address: '456 Sector 15, Noida' },
  { id: 3, name: 'Mohan Glass Traders', city: 'Ghaziabad', phone: '9876543212', gst: '09ABCDE1234F1Z6', email: 'mohan@example.com', address: '789 Industrial Area, Ghaziabad' },
  { id: 4, name: 'Krishna Glass Center', city: 'Faridabad', phone: '9876543213', gst: '06FGHIJ5678K1Z7', email: 'krishna@example.com', address: '321 Sector 12, Faridabad' },
  { id: 5, name: 'Om Glass Suppliers', city: 'Gurgaon', phone: '9876543214', gst: '06KLMNO9012P1Z8', email: 'om@example.com', address: '654 DLF Phase 1, Gurgaon' }
];

// ============================================
// SAMPLE ORDERS
// ============================================
export const sampleOrders: Order[] = [
  { id: 1, orderNo: 'ORD-2024-001', date: '2024-01-15', customer: 'Raj Glass House', customerId: 1, glassTypes: ['C', 'T'], qty: 150, amount: 45000, status: 'approved', expectedDelivery: '2024-01-20' },
  { id: 2, orderNo: 'ORD-2024-002', date: '2024-01-16', customer: 'Shyam Glass Works', customerId: 2, glassTypes: ['L', 'DG'], qty: 80, amount: 28000, status: 'production', expectedDelivery: '2024-01-22' },
  { id: 3, orderNo: 'ORD-2024-003', date: '2024-01-17', customer: 'Mohan Glass Traders', customerId: 3, glassTypes: ['T', 'B'], qty: 200, amount: 62000, status: 'dispatched', expectedDelivery: '2024-01-19' },
  { id: 4, orderNo: 'ORD-2024-004', date: '2024-01-18', customer: 'Krishna Glass Center', customerId: 4, glassTypes: ['C', 'F'], qty: 120, amount: 35000, status: 'draft', expectedDelivery: '2024-01-25' },
  { id: 5, orderNo: 'ORD-2024-005', date: '2024-01-19', customer: 'Om Glass Suppliers', customerId: 5, glassTypes: ['RD', 'D'], qty: 50, amount: 18000, status: 'completed', expectedDelivery: '2024-01-21' }
];

// ============================================
// SAMPLE ITEMS
// ============================================
export const sampleItems: Item[] = [
  { id: 1, code: 'GLASS-001', name: 'Clear Float 6mm', type: 'Clear', rate: 75, stock: 1000, minStock: 200, unit: 'sq.ft' },
  { id: 2, code: 'GLASS-002', name: 'Toughened 8mm', type: 'Toughened', rate: 205, stock: 500, minStock: 100, unit: 'sq.ft' },
  { id: 3, code: 'GLASS-003', name: 'Laminated 6.38mm', type: 'Laminated', rate: 225, stock: 300, minStock: 50, unit: 'sq.ft' },
  { id: 4, code: 'GLASS-004', name: 'Clear Float 4mm', type: 'Clear', rate: 55, stock: 800, minStock: 150, unit: 'sq.ft' },
  { id: 5, code: 'GLASS-005', name: 'Frosted 5mm', type: 'Frosted', rate: 120, stock: 400, minStock: 80, unit: 'sq.ft' },
  { id: 6, code: 'GLASS-006', name: 'Patterned 4mm', type: 'Patterned', rate: 85, stock: 600, minStock: 100, unit: 'sq.ft' },
  { id: 7, code: 'GLASS-007', name: 'Double Glazed 24mm', type: 'Double Glazed', rate: 385, stock: 200, minStock: 40, unit: 'sq.ft' },
  { id: 8, code: 'GLASS-008', name: 'Reflective 6mm Blue', type: 'Reflective', rate: 195, stock: 350, minStock: 70, unit: 'sq.ft' }
];

// ============================================
// SAMPLE USERS
// ============================================
export const sampleUsers: User[] = [
  { id: 1, name: 'Admin User', username: 'admin', role: 'Admin', status: 'Active', lastLogin: '2024-01-20 09:30:00' },
  { id: 2, name: 'Sales Manager', username: 'sales', role: 'Sales', status: 'Active', lastLogin: '2024-01-20 10:15:00' },
  { id: 3, name: 'Accountant', username: 'account', role: 'Account', status: 'Active', lastLogin: '2024-01-19 16:45:00' },
  { id: 4, name: 'Production Head', username: 'production', role: 'Production', status: 'Active', lastLogin: '2024-01-20 08:00:00' },
  { id: 5, name: 'Viewer User', username: 'viewer', role: 'Viewer', status: 'Inactive', lastLogin: '2024-01-15 11:20:00' }
];

// ============================================
// SAMPLE DAY BOOK ENTRIES
// ============================================
export const sampleDayBookEntries: DayBookEntry[] = [
  { id: 1, date: '2024-01-20', particulars: 'Raj Glass House - PI Payment', voucherType: 'Receipt', voucherNo: 'RCP-001', debit: 45000, credit: 0, balance: 45000 },
  { id: 2, date: '2024-01-20', particulars: 'Shyam Glass Works - Advance', voucherType: 'Receipt', voucherNo: 'RCP-002', debit: 28000, credit: 0, balance: 73000 },
  { id: 3, date: '2024-01-20', particulars: 'Material Purchase - Saint Gobain', voucherType: 'Payment', voucherNo: 'PAY-001', debit: 0, credit: 35000, balance: 38000 },
  { id: 4, date: '2024-01-19', particulars: 'Mohan Glass Traders - Order Payment', voucherType: 'Receipt', voucherNo: 'RCP-003', debit: 62000, credit: 0, balance: 100000 },
  { id: 5, date: '2024-01-19', particulars: 'Electricity Bill', voucherType: 'Payment', voucherNo: 'PAY-002', debit: 0, credit: 8500, balance: 91500 },
  { id: 6, date: '2024-01-18', particulars: 'Staff Salary', voucherType: 'Payment', voucherNo: 'PAY-003', debit: 0, credit: 45000, balance: 46500 }
];

// ============================================
// SAMPLE LEDGER ACCOUNTS
// ============================================
export const sampleLedgerAccounts: LedgerAccount[] = [
  {
    id: 'cash',
    name: 'Cash Account',
    type: 'Asset',
    openingBalance: 50000,
    entries: [
      { id: 1, date: '2024-01-20', particulars: 'Raj Glass House Payment', voucherType: 'Receipt', voucherNo: 'RCP-001', debit: 45000, credit: 0 },
      { id: 2, date: '2024-01-20', particulars: 'Material Purchase', voucherType: 'Payment', voucherNo: 'PAY-001', debit: 0, credit: 35000 }
    ]
  },
  {
    id: 'bank',
    name: 'Bank Account - SBI',
    type: 'Asset',
    openingBalance: 150000,
    entries: [
      { id: 1, date: '2024-01-19', particulars: 'Mohan Glass Traders', voucherType: 'Receipt', voucherNo: 'RCP-003', debit: 62000, credit: 0 },
      { id: 2, date: '2024-01-18', particulars: 'Salary Transfer', voucherType: 'Payment', voucherNo: 'PAY-003', debit: 0, credit: 45000 }
    ]
  },
  {
    id: 'sales',
    name: 'Sales Account',
    type: 'Income',
    openingBalance: 0,
    entries: [
      { id: 1, date: '2024-01-20', particulars: 'Sales - ORD-001', voucherType: 'Sales', voucherNo: 'INV-001', debit: 0, credit: 45000 },
      { id: 2, date: '2024-01-19', particulars: 'Sales - ORD-003', voucherType: 'Sales', voucherNo: 'INV-002', debit: 0, credit: 62000 }
    ]
  },
  {
    id: 'purchase',
    name: 'Purchase Account',
    type: 'Expense',
    openingBalance: 0,
    entries: [
      { id: 1, date: '2024-01-20', particulars: 'Glass Purchase', voucherType: 'Purchase', voucherNo: 'PUR-001', debit: 35000, credit: 0 }
    ]
  }
];

// ============================================
// SAMPLE SYSTEM LOGS
// ============================================
export const sampleSystemLogs: SystemLog[] = [
  { id: 1, timestamp: '2024-01-20 10:30:00', user: 'Admin', action: 'Logged in', details: 'IP: 192.168.1.100' },
  { id: 2, timestamp: '2024-01-20 10:35:00', user: 'Admin', action: 'Created Proforma', details: 'PI-2024-001' },
  { id: 3, timestamp: '2024-01-20 11:15:00', user: 'Sales', action: 'Added new customer', details: 'Krishna Glass Center' },
  { id: 4, timestamp: '2024-01-20 11:45:00', user: 'Admin', action: 'Backup completed', details: 'Size: 15.2 MB' },
  { id: 5, timestamp: '2024-01-20 12:00:00', user: 'Production', action: 'Updated order status', details: 'ORD-2024-002 to Production' },
  { id: 6, timestamp: '2024-01-20 14:20:00', user: 'Account', action: 'Generated GST Report', details: 'For January 2024' },
  { id: 7, timestamp: '2024-01-20 15:30:00', user: 'Sales', action: 'Created new order', details: 'ORD-2024-004' }
];

// ============================================
// SAMPLE DISPATCHES
// ============================================
export const sampleDispatches: Dispatch[] = [
  { id: 1, orderNo: 'ORD-2024-003', customer: 'Mohan Glass Traders', vehicleNo: 'DL01AB1234', driver: 'Ramesh', route: 'Delhi-Ghaziabad', scheduledDate: '2024-01-20', status: 'scheduled' },
  { id: 2, orderNo: 'ORD-2024-001', customer: 'Raj Glass House', vehicleNo: 'DL01CD5678', driver: 'Suresh', route: 'Delhi-Noida', scheduledDate: '2024-01-21', status: 'pending' },
  { id: 3, orderNo: 'ORD-2024-002', customer: 'Shyam Glass Works', vehicleNo: 'DL01EF9012', driver: 'Mahesh', route: 'Delhi-Faridabad', scheduledDate: '2024-01-22', status: 'pending' }
];

// ============================================
// SAMPLE VEHICLES
// ============================================
export const sampleVehicles: Vehicle[] = [
  { id: 1, vehicleNo: 'DL01AB1234', driver: 'Ramesh', capacity: 2000, status: 'busy' },
  { id: 2, vehicleNo: 'DL01CD5678', driver: 'Suresh', capacity: 3000, status: 'available' },
  { id: 3, vehicleNo: 'DL01EF9012', driver: 'Mahesh', capacity: 2500, status: 'available' },
  { id: 4, vehicleNo: 'DL01GH3456', driver: 'Dinesh', capacity: 4000, status: 'maintenance' }
];

// ============================================
// SAMPLE EMPLOYEES
// ============================================
export const sampleEmployees: Employee[] = [
  { id: 1, name: 'Ramesh Kumar', department: 'Production', designation: 'Supervisor', phone: '9876500001', salary: 25000, joiningDate: '2020-03-15' },
  { id: 2, name: 'Suresh Singh', department: 'Production', designation: 'Operator', phone: '9876500002', salary: 18000, joiningDate: '2021-06-20' },
  { id: 3, name: 'Mahesh Yadav', department: 'Dispatch', designation: 'Driver', phone: '9876500003', salary: 20000, joiningDate: '2019-01-10' },
  { id: 4, name: 'Dinesh Patel', department: 'Dispatch', designation: 'Driver', phone: '9876500004', salary: 20000, joiningDate: '2020-08-05' },
  { id: 5, name: 'Rajesh Sharma', department: 'Sales', designation: 'Executive', phone: '9876500005', salary: 22000, joiningDate: '2022-02-14' }
];

// ============================================
// SAMPLE ATTENDANCE
// ============================================
export const sampleAttendance: Attendance[] = [
  { id: 1, employeeId: 1, employeeName: 'Ramesh Kumar', date: '2024-01-20', status: 'present', inTime: '09:00', outTime: '18:00', overtime: 0 },
  { id: 2, employeeId: 2, employeeName: 'Suresh Singh', date: '2024-01-20', status: 'present', inTime: '09:15', outTime: '18:30', overtime: 0.5 },
  { id: 3, employeeId: 3, employeeName: 'Mahesh Yadav', date: '2024-01-20', status: 'present', inTime: '08:45', outTime: '19:00', overtime: 1 },
  { id: 4, employeeId: 4, employeeName: 'Dinesh Patel', date: '2024-01-20', status: 'absent' },
  { id: 5, employeeId: 5, employeeName: 'Rajesh Sharma', date: '2024-01-20', status: 'present', inTime: '09:30', outTime: '18:00', overtime: 0 }
];

// ============================================
// DEFAULT SYSTEM SETTINGS
// ============================================
export const defaultSystemSettings: SystemSettings = {
  companyName: 'S.A.P.U.T. Glass Works Enterprise',
  companyAddress: '123 Industrial Area, Delhi - 110001',
  companyPhone: '+91-11-12345678',
  companyEmail: 'info@saputglass.com',
  gstNumber: '27AABCU9603R1ZX',
  defaultTaxRate: 18,
  currency: 'Indian Rupee (₹)',
  holeChargeRate: 50,
  cutChargeRate: 100,
  docCharges: 500,
  freightCharges: 1000,
  autoBackup: true,
  emailNotifications: false
};
