import { useERP } from '@/store/ERPStore';
import { modulesData } from '@/store/data';
import { ModuleId } from '@/types';
import { 
  Home, FileInvoiceDollar, FileText, ClipboardList, Users, 
  Calculator, Box, UserCog, ShieldAlt, BarChart3, Settings,
  FileInvoice, Truck, CalendarCheck, ThLarge, BoxSelect, Coins
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

// ============================================
// DASHBOARD MODULE
// ============================================

const iconComponents: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  Home, FileInvoiceDollar, FileText, ClipboardList, Users,
  Calculator, Box, UserCog, ShieldAlt, BarChart3, Settings,
  FileInvoice, Truck, CalendarCheck, ThLarge, BoxSelect, Coins
};

function ModuleCard({ 
  id, 
  name, 
  icon, 
  description, 
  shortcut, 
  color,
  onClick 
}: { 
  id: ModuleId;
  name: string;
  icon: string;
  description: string;
  shortcut?: string;
  color: string;
  onClick: () => void;
}) {
  const IconComponent = iconComponents[icon] || Home;
  
  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-blue-400"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div 
            className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: `${color}20` }}
          >
            <IconComponent 
              className="w-7 h-7" 
              style={{ color }} 
            />
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">{name}</h3>
          <p className="text-xs text-gray-500 mb-2">{description}</p>
          {shortcut && (
            <Badge variant="outline" className="text-xs">
              {shortcut}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  color,
  trend 
}: { 
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  color: string;
  trend?: string;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {trend && (
              <p className="text-xs text-green-600 mt-1">{trend}</p>
            )}
          </div>
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon className="w-6 h-6" style={{ color }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const { 
    setCurrentModule, 
    customers, 
    orders, 
    items, 
    users,
    logout 
  } = useERP();
  
  const handleModuleClick = (moduleId: ModuleId) => {
    setCurrentModule(moduleId);
    toast.info(`Navigating to ${moduleId.replace('-', ' ').toUpperCase()}`);
  };
  
  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      toast.success('Logged out successfully!');
      window.location.reload();
    }
  };
  
  // Calculate stats
  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const pendingOrders = orders.filter(o => o.status === 'draft' || o.status === 'approved').length;
  const lowStockItems = items.filter(i => i.stock < (i.minStock || 100)).length;
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">S.A.P.U.T. Glass Works</h1>
                <p className="text-xs text-gray-500">Enterprise Resource Planning</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="hidden sm:flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                System Online
              </Badge>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <span className="hidden sm:inline mr-2">Logout</span>
                <span className="w-2 h-2 bg-red-500 rounded-full" />
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard 
            title="Total Customers"
            value={customers.length.toString()}
            icon={Users}
            color="#3B82F6"
            trend="+2 this month"
          />
          <StatCard 
            title="Total Orders"
            value={orders.length.toString()}
            icon={ClipboardList}
            color="#10B981"
            trend={`${pendingOrders} pending`}
          />
          <StatCard 
            title="Revenue"
            value={`₹${(totalRevenue / 1000).toFixed(1)}K`}
            icon={FileInvoiceDollar}
            color="#F59E0B"
          />
          <StatCard 
            title="Low Stock Items"
            value={lowStockItems.toString()}
            icon={Box}
            color={lowStockItems > 0 ? "#EF4444" : "#10B981"}
          />
        </div>
        
        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => handleModuleClick('proforma')}>
              <FileInvoiceDollar className="w-4 h-4 mr-2" />
              New Proforma
            </Button>
            <Button variant="outline" onClick={() => handleModuleClick('orders')}>
              <ClipboardList className="w-4 h-4 mr-2" />
              New Order
            </Button>
            <Button variant="outline" onClick={() => handleModuleClick('customers')}>
              <Users className="w-4 h-4 mr-2" />
              Add Customer
            </Button>
            <Button variant="outline" onClick={() => handleModuleClick('gst-invoice')}>
              <FileInvoice className="w-4 h-4 mr-2" />
              GST Invoice
            </Button>
          </div>
        </div>
        
        {/* Modules Grid */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">All Modules</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {modulesData.map((module) => (
              <ModuleCard
                key={module.id}
                id={module.id}
                name={module.name}
                icon={module.icon}
                description={module.description}
                shortcut={module.shortcut}
                color={module.color}
                onClick={() => handleModuleClick(module.id)}
              />
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <footer className="mt-12 pt-8 border-t text-center text-sm text-gray-500">
          <p>S.A.P.U.T. Glass Works Enterprise - Complete ERP System</p>
          <p className="mt-1">© 2024 All Rights Reserved</p>
          <div className="mt-4 flex justify-center gap-4 text-xs">
            <span>Keyboard Shortcuts:</span>
            <span className="bg-gray-100 px-2 py-1 rounded">Ctrl+P = Proforma</span>
            <span className="bg-gray-100 px-2 py-1 rounded">Ctrl+O = Orders</span>
            <span className="bg-gray-100 px-2 py-1 rounded">Ctrl+Home = Dashboard</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
