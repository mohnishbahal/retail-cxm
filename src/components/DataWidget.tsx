import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface DataWidgetProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

export default function DataWidget({ title, value, change, icon }: DataWidgetProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {icon}
      </div>
      <div className="flex items-baseline justify-between">
        <p className="text-2xl font-semibold">{value}</p>
        <span className={cn(
          "flex items-center text-sm",
          change > 0 ? "text-green-600" : "text-red-600"
        )}>
          {change > 0 ? (
            <ArrowUpIcon className="w-4 h-4 mr-1" />
          ) : (
            <ArrowDownIcon className="w-4 h-4 mr-1" />
          )}
          {Math.abs(change)}%
        </span>
      </div>
    </div>
  );
}