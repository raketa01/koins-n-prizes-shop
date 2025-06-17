import React, { useState } from 'react';
import { Search, Filter, Star, Coins } from 'lucide-react';
import { ProductCard } from './ProductCard';

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

interface ProductCatalogProps {
  onAddToCart: (product: Product) => void;
  userCoins: number;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ onAddToCart, userCoins }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products: Product[] = [
    {
      id: 1,
      name: 'Электрический чайник',
      description: 'Стильный чайник из нержавеющей стали на 1.7л',
      coinPrice: 850,
      originalPrice: 6500,
      image: '/placeholder.svg',
      category: 'appliances',
      rating: 4.7,
      available: true,
    },
    {
      id: 2,
      name: 'Кофе в зернах',
      description: 'Премиальный кофе арабика 500г',
      coinPrice: 320,
      originalPrice: 2500,
      image: '/placeholder.svg',
      category: 'food',
      rating: 4.8,
      available: true,
    },
    {
      id: 3,
      name: 'Мини-холодильник',
      description: 'Компактный холодильник для офиса 50л',
      coinPrice: 2200,
      originalPrice: 18000,
      image: '/placeholder.svg',
      category: 'appliances',
      rating: 4.5,
      available: true,
    },
    {
      id: 4,
      name: 'Набор кружек',
      description: 'Керамические кружки с логотипом компании 4шт',
      coinPrice: 450,
      originalPrice: 3500,
      image: '/placeholder.svg',
      category: 'accessories',
      rating: 4.6,
      available: true,
    },
    {
      id: 5,
      name: 'Тостер',
      description: 'Компактный тостер на 2 ломтика',
      coinPrice: 1100,
      originalPrice: 8500,
      image: '/placeholder.svg',
      category: 'appliances',
      rating: 4.4,
      available: true,
    },
    {
      id: 6,
      name: 'Фитнес-браслет',
      description: 'Умный браслет для отслеживания активности',
      coinPrice: 1200,
      originalPrice: 8000,
      image: '/placeholder.svg',
      category: 'accessories',
      rating: 4.5,
      available: false,
    },
  ];

  const categories = [
    { id: 'all', name: 'Все категории' },
    { id: 'appliances', name: 'Бытовая техника' },
    { id: 'food', name: 'Продукты' },
    { id: 'accessories', name: 'Аксессуары' },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            canAfford={userCoins >= product.coinPrice}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Товары не найдены</p>
          <p className="text-gray-400 mt-2">Попробуйте изменить критерии поиска</p>
        </div>
      )}
    </div>
  );
};
