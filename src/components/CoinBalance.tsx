
import React from 'react';
import { Coins, TrendingUp } from 'lucide-react';

interface CoinBalanceProps {
  balance: number;
}

export const CoinBalance: React.FC<CoinBalanceProps> = ({ balance }) => {
  return (
    <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-6 text-white shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Coins className="w-6 h-6" />
            <span className="text-lg font-medium">Баланс вашего магазина</span>
          </div>
          <div className="text-3xl font-bold">
            {balance.toLocaleString()} койнов
          </div>
          <div className="flex items-center gap-1 mt-2 text-yellow-100">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">+240 за эту неделю</span>
          </div>
        </div>
        <div className="text-6xl opacity-20">
          <Coins />
        </div>
      </div>
    </div>
  );
};
