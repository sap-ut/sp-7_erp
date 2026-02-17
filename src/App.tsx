import { Suspense, lazy, useEffect } from 'react';
import { ERPProvider, useERP } from '@/store/ERPStore';
import { ModuleId } from '@/types';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import './App.css';

// ============================================
// LAZY LOAD ALL MODULES (Factory Pattern)
// ============================================

// Core Modules
const DashboardModule = lazy(() => import('./modules/Dashboard'));
const ProformaModule = lazy(() => import('./modules/Proforma'));
const QuotationModule = lazy(() => import('./modules/Quotation'));
const OrdersModule = lazy(() => import('./modules/Orders'));
const CustomersModule = lazy(() => import('./modules/Customers'));
const AccountingModule = lazy(() => import('./modules/Accounting'));
const ItemsModule = lazy(() => import('./modules/Items'));
const UsersModule = lazy(() => import('./modules/Users'));
const AdminModule = lazy(() => import('./modules/A,dmin'));
const ReportsModule = lazy(() => import('./modules/Reports'));
const SettingsModule = lazy(() => import('./modules/Settings'));
const GSTInvoiceModule = lazy(() => import('./modules/GSTInvoice'));
const DispatchModule = lazy(() => import('./modules/Dispatch'));
const AttendanceModule = lazy(() => import('./modules/Attendance'));
const GlassLinesModule = lazy(() => import('./modules/GlassLines'));
const OptimizationModule = lazy(() => import('./modules/Optimization'));
const CustomChargesModule = lazy(() => import('./modules/CustomCharges'));

// ============================================
// MODULE COMPONENT MAPPER
// ============================================

const moduleComponents: Record<ModuleId, React.ComponentType> = {
  dashboard: DashboardModule,
  proforma: ProformaModule,
  quotation: QuotationModule,
  orders: OrdersModule,
  customers: CustomersModule,
  accounting: AccountingModule,
  items: ItemsModule,
  users: UsersModule,
  admin: AdminModule,
  reports: ReportsModule,
  settings: SettingsModule,
  'gst-invoice': GSTInvoiceModule,
  dispatch: DispatchModule,
  attendance: AttendanceModule,
  'glass-lines': GlassLinesModule,
  optimization: OptimizationModule,
  'custom-charges': CustomChargesModule
};

// ============================================
// LOADING COMPONENT
// ============================================

function ModuleLoader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500">Loading module...</p>
      </div>
    </div>
  );
}

// ============================================
// MAIN APP CONTENT
// ============================================

function AppContent() {
  const { currentModule, setCurrentModule, notifications, removeNotification } = useERP();
  
  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (e.target instanceof HTMLInputElement || 
          e.target instanceof HTMLTextAreaElement || 
          e.target instanceof HTMLSelectElement) {
        return;
      }
      
      // Ctrl + Key shortcuts
      if (e.ctrlKey && !e.altKey && !e.shiftKey) {
        const keyMap: Record<string, ModuleId> = {
          'Home': 'dashboard',
          'p': 'proforma',
          'P': 'proforma',
          'o': 'orders',
          'O': 'orders',
          'c': 'customers',
          'C': 'customers',
          'a': 'accounting',
          'A': 'accounting',
          'i': 'items',
          'I': 'items',
          'u': 'users',
          'U': 'users',
          'r': 'reports',
          'R': 'reports',
          's': 'settings',
          'S': 'settings',
          'g': 'gst-invoice',
          'G': 'gst-invoice',
          'd': 'dispatch',
          'D': 'dispatch',
          'q': 'quotation',
          'Q': 'quotation',
          'l': 'glass-lines',
          'L': 'glass-lines'
        };
        
        const moduleId = keyMap[e.key];
        if (moduleId) {
          e.preventDefault();
          setCurrentModule(moduleId);
          toast.info(`Switched to ${moduleId.replace('-', ' ').toUpperCase()}`);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setCurrentModule]);
  
  // Show notifications
  useEffect(() => {
    notifications.forEach(notification => {
      if (notification.type === 'success') {
        toast.success(notification.message);
      } else if (notification.type === 'error') {
        toast.error(notification.message);
      } else if (notification.type === 'warning') {
        toast.warning(notification.message);
      } else {
        toast.info(notification.message);
      }
      removeNotification(notification.id);
    });
  }, [notifications, removeNotification]);
  
  const CurrentModule = moduleComponents[currentModule];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<ModuleLoader />}>
        <CurrentModule />
      </Suspense>
      <Toaster position="top-right" richColors />
    </div>
  );
}

// ============================================
// MAIN APP
// ============================================

function App() {
  return (
    <ERPProvider>
      <AppContent />
    </ERPProvider>
  );
}

export default App;
