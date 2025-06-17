
import React from 'react';
import { Package, Bell, History, ShoppingCart } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  cartCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange, cartCount }) => {
  const tabs = [
    { id: 'catalog', label: 'Каталог', icon: Package },
    { id: 'cart', label: 'Корзина', icon: ShoppingCart, badge: cartCount },
    { id: 'notifications', label: 'Уведомления', icon: Bell, badge: 3 },
    { id: 'orders', label: 'Мои заказы', icon: History },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-2 flex gap-2">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all relative ${
              isActive
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{tab.label}</span>
            {tab.badge && tab.badge > 0 && (
              <span className={`absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center ${
                isActive ? 'bg-yellow-400 text-blue-900' : 'bg-red-500 text-white'
              }`}>
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
