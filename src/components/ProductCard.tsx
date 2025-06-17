
import React from 'react';
import { Star, Coins, ShoppingCart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  coinPrice: number;
  originalPrice: number;
  image: string;
  category: string;
  rating: number;
  available: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  canAfford: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, canAfford }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {!product.available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-medium bg-red-500 px-3 py-1 rounded-full">
              Нет в наличии
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium">{product.rating}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-gray-900">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-yellow-600">
            <Coins className="w-5 h-5" />
            <span className="font-bold text-lg">{product.coinPrice.toLocaleString()}</span>
          </div>
          <div className="text-gray-400 text-sm line-through">
            ₽{product.originalPrice.toLocaleString()}
          </div>
        </div>
        
        <button
          onClick={() => onAddToCart(product)}
          disabled={!product.available || !canAfford}
          className={`w-full py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
            product.available && canAfford
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {!product.available ? 'Нет в наличии' : !canAfford ? 'Недостаточно койнов' : 'В корзину'}
        </button>
      </div>
    </div>
  );
};
