import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { 
  Customer, Order, Item, User, DayBookEntry, LedgerAccount,
  SystemLog, Dispatch, Vehicle, Employee, Attendance, 
  SystemSettings, ProformaInvoice, Notification, ModuleId 
} from '@/types';
import {
  sampleCustomers, sampleOrders, sampleItems, sampleUsers,
  sampleDayBookEntries, sampleLedgerAccounts, sampleSystemLogs,
  sampleDispatches, sampleVehicles, sampleEmployees, sampleAttendance,
  defaultSystemSettings
} from './data';

// ============================================
// ERP STORE CONTEXT & PROVIDER
// ============================================

interface ERPState {
  // Data
  customers: Customer[];
  orders: Order[];
  items: Item[];
  users: User[];
  dayBookEntries: DayBookEntry[];
  ledgerAccounts: LedgerAccount[];
  systemLogs: SystemLog[];
  dispatches: Dispatch[];
  vehicles: Vehicle[];
  employees: Employee[];
  attendance: Attendance[];
  settings: SystemSettings;
  proformaInvoices: ProformaInvoice[];
  notifications: Notification[];
  
  // UI State
  currentModule: ModuleId;
  isSidebarOpen: boolean;
  isLoading: boolean;
  
  // Actions
  setCurrentModule: (module: ModuleId) => void;
  toggleSidebar: () => void;
  
  // Customer Actions
  addCustomer: (customer: Omit<Customer, 'id'>) => void;
  updateCustomer: (id: number, customer: Partial<Customer>) => void;
  deleteCustomer: (id: number) => void;
  
  // Order Actions
  addOrder: (order: Omit<Order, 'id' | 'orderNo'>) => void;
  updateOrder: (id: number, order: Partial<Order>) => void;
  deleteOrder: (id: number) => void;
  
  // Item Actions
  addItem: (item: Omit<Item, 'id'>) => void;
  updateItem: (id: number, item: Partial<Item>) => void;
  deleteItem: (id: number) => void;
  
  // User Actions
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: number, user: Partial<User>) => void;
  deleteUser: (id: number) => void;
  
  // Dispatch Actions
  addDispatch: (dispatch: Omit<Dispatch, 'id'>) => void;
  updateDispatch: (id: number, dispatch: Partial<Dispatch>) => void;
  deleteDispatch: (id: number) => void;
  
  // Employee Actions
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: number, employee: Partial<Employee>) => void;
  deleteEmployee: (id: number) => void;
  
  // Attendance Actions
  addAttendance: (attendance: Omit<Attendance, 'id'>) => void;
  updateAttendance: (id: number, attendance: Partial<Attendance>) => void;
  
  // Proforma Actions
  addProforma: (proforma: Omit<ProformaInvoice, 'id'>) => void;
  deleteProforma: (id: string) => void;
  
  // Settings Actions
  updateSettings: (settings: Partial<SystemSettings>) => void;
  
  // System Log Actions
  addSystemLog: (log: Omit<SystemLog, 'id' | 'timestamp'>) => void;
  
  // Notification Actions
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  
  // Utility
  generateOrderNumber: () => string;
  generatePINumber: () => string;
}

const ERPContext = createContext<ERPState | undefined>(undefined);

export function ERPProvider({ children }: { children: ReactNode }) {
  // Data State
  const [customers, setCustomers] = useState<Customer[]>(sampleCustomers);
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [items, setItems] = useState<Item[]>(sampleItems);
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [dayBookEntries] = useState<DayBookEntry[]>(sampleDayBookEntries);
  const [ledgerAccounts] = useState<LedgerAccount[]>(sampleLedgerAccounts);
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>(sampleSystemLogs);
  const [dispatches, setDispatches] = useState<Dispatch[]>(sampleDispatches);
  const [vehicles] = useState<Vehicle[]>(sampleVehicles);
  const [employees, setEmployees] = useState<Employee[]>(sampleEmployees);
  const [attendance, setAttendance] = useState<Attendance[]>(sampleAttendance);
  const [settings, setSettings] = useState<SystemSettings>(defaultSystemSettings);
  const [proformaInvoices, setProformaInvoices] = useState<ProformaInvoice[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // UI State
  const [currentModule, setCurrentModule] = useState<ModuleId>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading] = useState(false);
  
  // Toggle Sidebar
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);
  
  // ============ CUSTOMER ACTIONS ============
  const addCustomer = useCallback((customer: Omit<Customer, 'id'>) => {
    const newCustomer = { ...customer, id: Date.now() };
    setCustomers(prev => [...prev, newCustomer]);
    addSystemLog({ user: 'Admin', action: 'Added customer', details: newCustomer.name });
  }, []);
  
  const updateCustomer = useCallback((id: number, customer: Partial<Customer>) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, ...customer } : c));
    addSystemLog({ user: 'Admin', action: 'Updated customer', details: `ID: ${id}` });
  }, []);
  
  const deleteCustomer = useCallback((id: number) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
    addSystemLog({ user: 'Admin', action: 'Deleted customer', details: `ID: ${id}` });
  }, []);
  
  // ============ ORDER ACTIONS ============
  const generateOrderNumber = useCallback(() => {
    const year = new Date().getFullYear();
    const count = orders.length + 1;
    return `ORD-${year}-${count.toString().padStart(3, '0')}`;
  }, [orders.length]);
  
  const addOrder = useCallback((order: Omit<Order, 'id' | 'orderNo'>) => {
    const newOrder = { 
      ...order, 
      id: Date.now(), 
      orderNo: generateOrderNumber() 
    };
    setOrders(prev => [...prev, newOrder]);
    addSystemLog({ user: 'Admin', action: 'Created order', details: newOrder.orderNo });
  }, [generateOrderNumber]);
  
  const updateOrder = useCallback((id: number, order: Partial<Order>) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, ...order } : o));
    addSystemLog({ user: 'Admin', action: 'Updated order', details: `ID: ${id}` });
  }, []);
  
  const deleteOrder = useCallback((id: number) => {
    setOrders(prev => prev.filter(o => o.id !== id));
    addSystemLog({ user: 'Admin', action: 'Deleted order', details: `ID: ${id}` });
  }, []);
  
  // ============ ITEM ACTIONS ============
  const addItem = useCallback((item: Omit<Item, 'id'>) => {
    const newItem = { ...item, id: Date.now() };
    setItems(prev => [...prev, newItem]);
    addSystemLog({ user: 'Admin', action: 'Added item', details: newItem.name });
  }, []);
  
  const updateItem = useCallback((id: number, item: Partial<Item>) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, ...item } : i));
    addSystemLog({ user: 'Admin', action: 'Updated item', details: `ID: ${id}` });
  }, []);
  
  const deleteItem = useCallback((id: number) => {
    setItems(prev => prev.filter(i => i.id !== id));
    addSystemLog({ user: 'Admin', action: 'Deleted item', details: `ID: ${id}` });
  }, []);
  
  // ============ USER ACTIONS ============
  const addUser = useCallback((user: Omit<User, 'id'>) => {
    const newUser = { ...user, id: Date.now() };
    setUsers(prev => [...prev, newUser]);
    addSystemLog({ user: 'Admin', action: 'Added user', details: newUser.username });
  }, []);
  
  const updateUser = useCallback((id: number, user: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...user } : u));
    addSystemLog({ user: 'Admin', action: 'Updated user', details: `ID: ${id}` });
  }, []);
  
  const deleteUser = useCallback((id: number) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    addSystemLog({ user: 'Admin', action: 'Deleted user', details: `ID: ${id}` });
  }, []);
  
  // ============ DISPATCH ACTIONS ============
  const addDispatch = useCallback((dispatch: Omit<Dispatch, 'id'>) => {
    const newDispatch = { ...dispatch, id: Date.now() };
    setDispatches(prev => [...prev, newDispatch]);
    addSystemLog({ user: 'Admin', action: 'Added dispatch', details: newDispatch.orderNo });
  }, []);
  
  const updateDispatch = useCallback((id: number, dispatch: Partial<Dispatch>) => {
    setDispatches(prev => prev.map(d => d.id === id ? { ...d, ...dispatch } : d));
    addSystemLog({ user: 'Admin', action: 'Updated dispatch', details: `ID: ${id}` });
  }, []);
  
  const deleteDispatch = useCallback((id: number) => {
    setDispatches(prev => prev.filter(d => d.id !== id));
    addSystemLog({ user: 'Admin', action: 'Deleted dispatch', details: `ID: ${id}` });
  }, []);
  
  // ============ EMPLOYEE ACTIONS ============
  const addEmployee = useCallback((employee: Omit<Employee, 'id'>) => {
    const newEmployee = { ...employee, id: Date.now() };
    setEmployees(prev => [...prev, newEmployee]);
    addSystemLog({ user: 'Admin', action: 'Added employee', details: newEmployee.name });
  }, []);
  
  const updateEmployee = useCallback((id: number, employee: Partial<Employee>) => {
    setEmployees(prev => prev.map(e => e.id === id ? { ...e, ...employee } : e));
    addSystemLog({ user: 'Admin', action: 'Updated employee', details: `ID: ${id}` });
  }, []);
  
  const deleteEmployee = useCallback((id: number) => {
    setEmployees(prev => prev.filter(e => e.id !== id));
    addSystemLog({ user: 'Admin', action: 'Deleted employee', details: `ID: ${id}` });
  }, []);
  
  // ============ ATTENDANCE ACTIONS ============
  const addAttendance = useCallback((attendanceData: Omit<Attendance, 'id'>) => {
    const newAttendance = { ...attendanceData, id: Date.now() };
    setAttendance(prev => [...prev, newAttendance]);
  }, []);
  
  const updateAttendance = useCallback((id: number, attendanceData: Partial<Attendance>) => {
    setAttendance(prev => prev.map(a => a.id === id ? { ...a, ...attendanceData } : a));
  }, []);
  
  // ============ PROFORMA ACTIONS ============
  const generatePINumber = useCallback(() => {
    const year = new Date().getFullYear();
    const count = proformaInvoices.length + 1;
    return `PI-${year}-${count.toString().padStart(3, '0')}`;
  }, [proformaInvoices.length]);
  
  const addProforma = useCallback((proforma: Omit<ProformaInvoice, 'id'>) => {
    const newProforma = { ...proforma, id: Date.now().toString() };
    setProformaInvoices(prev => [...prev, newProforma]);
    addSystemLog({ user: 'Admin', action: 'Created proforma', details: newProforma.piNumber });
  }, []);
  
  const deleteProforma = useCallback((id: string) => {
    setProformaInvoices(prev => prev.filter(p => p.id !== id));
    addSystemLog({ user: 'Admin', action: 'Deleted proforma', details: `ID: ${id}` });
  }, []);
  
  // ============ SETTINGS ACTIONS ============
  const updateSettings = useCallback((newSettings: Partial<SystemSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    addSystemLog({ user: 'Admin', action: 'Updated settings' });
  }, []);
  
  // ============ SYSTEM LOG ACTIONS ============
  const addSystemLog = useCallback((log: Omit<SystemLog, 'id' | 'timestamp'>) => {
    const newLog = { 
      ...log, 
      id: Date.now(), 
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    setSystemLogs(prev => [newLog, ...prev].slice(0, 100)); // Keep last 100 logs
  }, []);
  
  // ============ NOTIFICATION ACTIONS ============
  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification = { 
      ...notification, 
      id: Date.now().toString(), 
      timestamp: Date.now() 
    };
    setNotifications(prev => [newNotification, ...prev].slice(0, 5)); // Keep last 5
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  }, []);
  
  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);
  
  const value: ERPState = {
    customers, orders, items, users, dayBookEntries, ledgerAccounts,
    systemLogs, dispatches, vehicles, employees, attendance, settings,
    proformaInvoices, notifications, currentModule, isSidebarOpen, isLoading,
    setCurrentModule, toggleSidebar,
    addCustomer, updateCustomer, deleteCustomer,
    addOrder, updateOrder, deleteOrder,
    addItem, updateItem, deleteItem,
    addUser, updateUser, deleteUser,
    addDispatch, updateDispatch, deleteDispatch,
    addEmployee, updateEmployee, deleteEmployee,
    addAttendance, updateAttendance,
    addProforma, deleteProforma,
    updateSettings, addSystemLog, addNotification, removeNotification,
    generateOrderNumber, generatePINumber
  };
  
  return (
    <ERPContext.Provider value={value}>
      {children}
    </ERPContext.Provider>
  );
}

export function useERP() {
  const context = useContext(ERPContext);
  if (context === undefined) {
    throw new Error('useERP must be used within an ERPProvider');
  }
  return context;
}
