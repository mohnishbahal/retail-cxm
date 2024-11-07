import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from 'lucide-react';
import { Users, Route, BarChart3, Settings, Building2 } from 'lucide-react';

export default function MobileNav() {
  const menuItems = [
    { icon: Users, label: 'Personas', path: '/personas' },
    { icon: Route, label: 'Journeys', path: '/journeys' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Building2, label: 'Brands', path: '/brands' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
          <Menu size={24} />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div className="px-2">
          <h2 className="text-xl font-bold mb-4">RetailCXM</h2>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.path}
                className="flex items-center px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <item.icon size={20} className="mr-3" />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}