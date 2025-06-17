
import React, { useState } from 'react';
import { CoinBalance } from '../components/CoinBalance';
import { ProductCatalog } from '../components/ProductCatalog';
import { NotificationCenter } from '../components/NotificationCenter';
import { OrderHistory } from '../components/OrderHistory';
import { Navigation } from '../components/Navigation';
import { Cart } from '../components/Cart';

const Index = () => {
  const [activeTab, setActiveTab] = useState('catalog');
  const [cartItems, setCartItems] = useState([]);
  const [userCoins, setUserCoins] = useState(2840);

  const addToCart = (product) => {
    if (userCoins >= product.coinPrice) {
      setCartItems([...cartItems, { ...product, id: Date.now() }]);
      console.log('Added to cart:', product);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const purchaseItems = () => {
    const totalCost = cartItems.reduce((sum, item) => sum + item.coinPrice, 0);
    if (userCoins >= totalCost) {
      setUserCoins(userCoins - totalCost);
      setCartItems([]);
      console.log('Purchase completed!');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'catalog':
        return <ProductCatalog onAddToCart={addToCart} userCoins={userCoins} />;
      case 'notifications':
        return <NotificationCenter />;
      case 'orders':
        return <OrderHistory />;
      case 'cart':
        return (
          <Cart 
            items={cartItems} 
            onRemoveItem={removeFromCart}
            onPurchase={purchaseItems}
            userCoins={userCoins}
          />
        );
      default:
        return <ProductCatalog onAddToCart={addToCart} userCoins={userCoins} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Витрина Призов
          </h1>
          <p className="text-gray-600">
            Обменивайте заработанные койны на привлекательные призы
          </p>
        </div>

        {/* Coin Balance */}
        <CoinBalance balance={userCoins} />

        {/* Navigation */}
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} cartCount={cartItems.length} />

        {/* Main Content */}
        <div className="mt-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Index;
