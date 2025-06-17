
import React from 'react';
import { ShoppingCart, Trash2, Coins } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  coinPrice: number;
  image: string;
}

interface CartProps {
  items: CartItem[];
  onRemoveItem: (itemId: number) => void;
  onPurchase: () => void;
  userCoins: number;
}

export const Cart: React.FC<CartProps> = ({ items, onRemoveItem, onPurchase, userCoins }) => {
  const totalCost = items.reduce((sum, item) => sum + item.coinPrice, 0);
  const canPurchase = items.length > 0 && userCoins >= totalCost;

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-sm text-center">
        <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Корзина пуста</h2>
        <p className="text-gray-600">Добавьте товары из каталога, чтобы они появились здесь</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <ShoppingCart className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-900">Корзина</h2>
          <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
            {items.length}
          </span>
        </div>

        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{item.name}</h3>
                <div className="flex items-center gap-1 text-yellow-600 mt-1">
                  <Coins className="w-4 h-4" />
                  <span className="font-medium">{item.coinPrice.toLocaleString()}</span>
                </div>
              </div>
              <button
                onClick={() => onRemoveItem(item.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Итого</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Товаров в корзине:</span>
            <span className="font-medium">{items.length}</span>
          </div>
          <div className="flex justify-between text-lg">
            <span className="text-gray-900">К оплате:</span>
            <div className="flex items-center gap-1 text-yellow-600">
              <Coins className="w-5 h-5" />
              <span className="font-bold">{totalCost.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Ваш баланс:</span>
            <div className="flex items-center gap-1 text-gray-700">
              <Coins className="w-4 h-4" />
              <span>{userCoins.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {!canPurchase && totalCost > userCoins && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4">
            Недостаточно койнов для покупки. Нужно еще {(totalCost - userCoins).toLocaleString()} койнов.
          </div>
        )}

        <button
          onClick={onPurchase}
          disabled={!canPurchase}
          className={`w-full py-3 px-4 rounded-lg font-bold text-lg transition-all ${
            canPurchase
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {canPurchase ? 'Оформить заказ' : 'Недостаточно койнов'}
        </button>
      </div>
    </div>
  );
};
