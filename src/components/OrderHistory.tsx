
import React from 'react';
import { Package, Clock, CheckCircle, Truck, Calendar } from 'lucide-react';

interface Order {
  id: string;
  productName: string;
  coinPrice: number;
  status: 'processing' | 'shipped' | 'delivered' | 'ready_pickup';
  orderDate: string;
  deliveryDate?: string;
  trackingNumber?: string;
}

export const OrderHistory: React.FC = () => {
  const orders: Order[] = [
    {
      id: 'ORD-001',
      productName: 'AirPods Pro',
      coinPrice: 4500,
      status: 'shipped',
      orderDate: '2024-12-15',
      deliveryDate: '2024-12-18',
      trackingNumber: 'TR123456789',
    },
    {
      id: 'ORD-002',
      productName: 'Сертификат Озон 5000₽',
      coinPrice: 750,
      status: 'delivered',
      orderDate: '2024-12-10',
      deliveryDate: '2024-12-12',
    },
    {
      id: 'ORD-003',
      productName: 'iPhone 15 Pro',
      coinPrice: 15000,
      status: 'ready_pickup',
      orderDate: '2024-12-08',
      deliveryDate: '2024-12-16',
    },
    {
      id: 'ORD-004',
      productName: 'Фитнес-браслет',
      coinPrice: 1200,
      status: 'processing',
      orderDate: '2024-12-16',
    },
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'processing':
        return {
          icon: <Clock className="w-5 h-5" />,
          text: 'Обрабатывается',
          color: 'text-yellow-600 bg-yellow-100',
        };
      case 'shipped':
        return {
          icon: <Truck className="w-5 h-5" />,
          text: 'В доставке',
          color: 'text-blue-600 bg-blue-100',
        };
      case 'ready_pickup':
        return {
          icon: <Package className="w-5 h-5" />,
          text: 'Готов к получению',
          color: 'text-purple-600 bg-purple-100',
        };
      case 'delivered':
        return {
          icon: <CheckCircle className="w-5 h-5" />,
          text: 'Получен',
          color: 'text-green-600 bg-green-100',
        };
      default:
        return {
          icon: <Clock className="w-5 h-5" />,
          text: 'Неизвестно',
          color: 'text-gray-600 bg-gray-100',
        };
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <Package className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-900">История заказов</h2>
        </div>

        <div className="space-y-4">
          {orders.map(order => {
            const statusInfo = getStatusInfo(order.status);
            
            return (
              <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-lg text-gray-900">{order.productName}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${statusInfo.color}`}>
                      {statusInfo.icon}
                      {statusInfo.text}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">ID: {order.id}</div>
                    <div className="font-medium text-yellow-600">{order.coinPrice.toLocaleString()} койнов</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Заказан: {new Date(order.orderDate).toLocaleDateString('ru-RU')}</span>
                  </div>
                  
                  {order.deliveryDate && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Truck className="w-4 h-4" />
                      <span>Доставка: {new Date(order.deliveryDate).toLocaleDateString('ru-RU')}</span>
                    </div>
                  )}
                  
                  {order.trackingNumber && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Package className="w-4 h-4" />
                      <span>Трек: {order.trackingNumber}</span>
                    </div>
                  )}
                </div>

                {order.status === 'ready_pickup' && (
                  <div className="mt-3 p-3 bg-purple-50 rounded-lg">
                    <p className="text-purple-800 font-medium">
                      🎉 Ваш заказ готов к получению! Пожалуйста, заберите его до 25 декабря.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
