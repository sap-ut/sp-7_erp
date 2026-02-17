// ============================================
// S.A.P.U.T. GLASS WORKS ERP - TYPES
// ============================================

// Glass Types
export type GlassTypeCode = 'C' | 'P' | 'F' | 'T' | 'L' | 'DG' | 'W' | 'B' | 'RD' | 'D';

export interface GlassItem {
  code: string;
  name: string;
  rate: number;
}

export interface GlassType {
  name: string;
  items: GlassItem[];
}

export type GlassTypes = Record<GlassTypeCode, GlassType>;

// Proforma Row
export interface ProformaRow {
  id: number;
  glassType: GlassTypeCode;
  itemCode: string;
  actualWidthInches: number;
  actualHeightInches: number;
  actualWidthMM: number;
  actualHeightMM: number;
  chargableWidth: number;
  chargableHeight: number;
  qty: number;
  holeQty: number;
  cutQty: number;
  area: number;
  rate: number;
  amount: number;
  remark: string;
}

// Proforma Invoice
export interface ProformaInvoice {
  id: string;
  piNumber: string;
  date: string;
  customerName: string;
  rows: ProformaRow[];
  basicSubtotal: number;
  holeCharges: number;
  cutCharges: number;
  docCharges: number;
  freightCharges: number;
  totalBeforeTax: number;
  cgst: number;
  sgst: number;
  grandTotal: number;
}

// Customer
export interface Customer {
  id: number;
  name: string;
  city: string;
  phone: string;
  gst: string;
  email?: string;
  address?: string;
}

// Order
export type OrderStatus = 'draft' | 'approved' | 'production' | 'dispatched' | 'completed' | 'cancelled';

export interface Order {
  id: number;
  orderNo: string;
  date: string;
  customer: string;
  customerId: number;
  glassTypes: string[];
  qty: number;
  amount: number;
  status: OrderStatus;
  expectedDelivery?: string;
  notes?: string;
}

// Item/Product
export interface Item {
  id: number;
  code: string;
  name: string;
  type: string;
  rate: number;
  stock: number;
  minStock?: number;
  unit?: string;
}

// User
export type UserRole = 'Admin' | 'Sales' | 'Account' | 'Production' | 'Viewer';
export type UserStatus = 'Active' | 'Inactive' | 'Suspended';

export interface User {
  id: number;
  name: string;
  username: string;
  password?: string;
  role: UserRole;
  status: UserStatus;
  lastLogin?: string;
}

// Accounting - Day Book Entry
export interface DayBookEntry {
  id: number;
  date: string;
  particulars: string;
  voucherType: string;
  voucherNo: string;
  debit: number;
  credit: number;
  balance: number;
}

// Ledger Entry
export interface LedgerEntry {
  id: number;
  date: string;
  particulars: string;
  voucherType: string;
  voucherNo: string;
  debit: number;
  credit: number;
}

// Ledger Account
export interface LedgerAccount {
  id: string;
  name: string;
  type: 'Asset' | 'Liability' | 'Income' | 'Expense';
  openingBalance: number;
  entries: LedgerEntry[];
}

// System Log
export interface SystemLog {
  id: number;
  timestamp: string;
  user: string;
  action: string;
  details?: string;
}

// Dispatch
export interface Dispatch {
  id: number;
  orderNo: string;
  customer: string;
  vehicleNo: string;
  driver: string;
  route: string;
  scheduledDate: string;
  status: 'pending' | 'scheduled' | 'in-transit' | 'delivered';
}

// Vehicle
export interface Vehicle {
  id: number;
  vehicleNo: string;
  driver: string;
  capacity: number;
  status: 'available' | 'busy' | 'maintenance';
}

// Attendance
export interface Attendance {
  id: number;
  employeeId: number;
  employeeName: string;
  date: string;
  status: 'present' | 'absent' | 'half-day' | 'leave';
  inTime?: string;
  outTime?: string;
  overtime?: number;
}

// Employee
export interface Employee {
  id: number;
  name: string;
  department: string;
  designation: string;
  phone: string;
  salary: number;
  joiningDate: string;
}

// Report Data
export interface SalesReportData {
  date: string;
  invoices: number;
  amount: number;
  tax: number;
  total: number;
}

export interface CustomerReportData {
  customerId: number;
  customerName: string;
  totalOrders: number;
  totalAmount: number;
  pendingAmount: number;
}

// System Settings
export interface SystemSettings {
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  gstNumber: string;
  defaultTaxRate: number;
  currency: string;
  holeChargeRate: number;
  cutChargeRate: number;
  docCharges: number;
  freightCharges: number;
  autoBackup: boolean;
  emailNotifications: boolean;
}

// Module Types
export type ModuleId = 
  | 'dashboard'
  | 'proforma'
  | 'quotation'
  | 'orders'
  | 'customers'
  | 'accounting'
  | 'items'
  | 'users'
  | 'admin'
  | 'reports'
  | 'settings'
  | 'gst-invoice'
  | 'dispatch'
  | 'attendance'
  | 'glass-lines'
  | 'optimization'
  | 'custom-charges';

export interface Module {
  id: ModuleId;
  name: string;
  icon: string;
  description: string;
  shortcut?: string;
  color: string;
}

// Notification
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timestamp: number;
}
