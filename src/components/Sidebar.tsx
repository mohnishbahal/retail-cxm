import React from 'react';
import { Users, Route, BarChart3, Settings, Building2, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const menuItems = [
    { icon: Users, label: 'Personas', path: '/personas' },
    { icon: Route, label: 'Journeys', path: '/journeys' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Building2, label: 'Brands', path: '/brands' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-white border-r transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b">
        <h1 className={`font-bold text-xl transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          RetailCXM
        </h1>
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      <nav className="p-4">
        {menuItems.map((item) => (
          <a
            key={item.label}
            href={item.path}
            className={`flex items-center px-4 py-3 mb-2 hover:bg-gray-100 rounded-lg transition-colors ${
              isOpen ? '' : 'justify-center'
            }`}
          >
            <item.icon size={20} className={isOpen ? 'mr-3' : ''} />
            <span className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
              {item.label}
            </span>
          </a>
        ))}
      </nav>
    </aside>
  );
}