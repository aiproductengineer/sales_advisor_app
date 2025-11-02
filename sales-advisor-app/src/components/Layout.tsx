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
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto pb-20">
        <div className="max-w-screen-xl mx-auto">
          <Outlet />
        </div>
      </div>

      {/* Glass Bottom Navigation */}
      <nav className="glass-nav safe-area-bottom">
        <div className="grid grid-cols-5 h-20 max-w-screen-xl mx-auto">
          <NavItem to="/" icon={<Home className="w-6 h-6" />} label="Home" />
          <NavItem to="/customers" icon={<Users className="w-6 h-6" />} label="Customers" />
          <NavItem to="/products" icon={<Package className="w-6 h-6" />} label="Products" />
          <NavItem to="/tasks" icon={<CheckSquare className="w-6 h-6" />} label="Tasks" />
          <NavItem to="/communication" icon={<MessageSquare className="w-6 h-6" />} label="Messages" />
        </div>
      </nav>

      {/* Floating Logout Button */}
      <button
        onClick={handleLogout}
        className="fixed top-4 right-4 glass-card p-3 hover:bg-white/10 transition-all z-50 group"
        title="Logout"
      >
        <LogOut className="w-5 h-5 text-gray-400 group-hover:text-luxury-gold transition-colors" />
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
      end={to === '/'}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center gap-1.5 transition-all relative group ${
          isActive
            ? 'text-luxury-gold'
            : 'text-gray-400 hover:text-gray-200'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {/* Active indicator */}
          {isActive && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-transparent via-luxury-gold to-transparent rounded-full" />
          )}

          {/* Icon with glow effect when active */}
          <div className={`relative ${isActive ? 'animate-float' : ''}`}>
            {isActive && (
              <div className="absolute inset-0 bg-luxury-gold/30 blur-xl rounded-full" />
            )}
            <div className="relative">{icon}</div>
          </div>

          {/* Label */}
          <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
};
