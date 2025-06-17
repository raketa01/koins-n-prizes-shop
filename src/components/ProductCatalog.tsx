
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
      name: 'iPhone 15 Pro',
      description: 'Новейший смартфон Apple с титановым корпусом',
      coinPrice: 15000,
      originalPrice: 120000,
      image: '/placeholder.svg',
      category: 'electronics',
      rating: 4.9,
      available: true,
    },
    {
      id: 2,
      name: 'AirPods Pro',
      description: 'Беспроводные наушники с шумоподавлением',
      coinPrice: 4500,
      originalPrice: 35000,
      image: '/placeholder.svg',
      category: 'electronics',
      rating: 4.8,
      available: true,
    },
    {
      id: 3,
      name: 'MacBook Air M3',
      description: 'Легкий и мощный ноутбук для работы',
      coinPrice: 25000,
      originalPrice: 180000,
      image: '/placeholder.svg',
      category: 'electronics',
      rating: 4.9,
      available: false,
    },
    {
      id: 4,
      name: 'Сертификат Озон',
      description: 'Подарочный сертификат на 5000 рублей',
      coinPrice: 750,
      originalPrice: 5000,
      image: '/placeholder.svg',
      category: 'certificates',
      rating: 4.7,
      available: true,
    },
    {
      id: 5,
      name: 'Игровая консоль PS5',
      description: 'PlayStation 5 с геймпадом DualSense',
      coinPrice: 8500,
      originalPrice: 65000,
      image: '/placeholder.svg',
      category: 'electronics',
      rating: 4.8,
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
      available: true,
    },
  ];

  const categories = [
    { id: 'all', name: 'Все категории' },
    { id: 'electronics', name: 'Электроника' },
    { id: 'certificates', name: 'Сертификаты' },
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
