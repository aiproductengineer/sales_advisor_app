import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Home, Users, Package, CheckSquare, MessageSquare, LogOut } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Layout: React.FC = () => {
  const logout = useStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 safe-area-bottom">
        <div className="grid grid-cols-5 h-16">
          <NavItem to="/" icon={<Home className="w-6 h-6" />} label="Home" />
          <NavItem to="/customers" icon={<Users className="w-6 h-6" />} label="Customers" />
          <NavItem to="/products" icon={<Package className="w-6 h-6" />} label="Products" />
          <NavItem to="/tasks" icon={<CheckSquare className="w-6 h-6" />} label="Tasks" />
          <NavItem to="/communication" icon={<MessageSquare className="w-6 h-6" />} label="Messages" />
        </div>
      </nav>

      {/* Logout Button (Floating) */}
      <button
        onClick={handleLogout}
        className="fixed top-4 right-4 p-2 bg-white rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors z-50"
        title="Logout"
      >
        <LogOut className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center gap-1 transition-colors ${
          isActive
            ? 'text-primary-700 bg-primary-50'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
        }`
      }
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </NavLink>
  );
};
