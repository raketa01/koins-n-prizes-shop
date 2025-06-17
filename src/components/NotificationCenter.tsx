
import React from 'react';
import { Bell, Gift, Truck, Clock, CheckCircle } from 'lucide-react';

interface Notification {
  id: number;
  type: 'reward' | 'delivery' | 'reminder' | 'success';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

export const NotificationCenter: React.FC = () => {
  const notifications: Notification[] = [
    {
      id: 1,
      type: 'reward',
      title: 'Новые койны начислены!',
      message: 'За отличную работу на этой неделе вы получили +240 койнов',
      time: '2 часа назад',
      isRead: false,
    },
    {
      id: 2,
      type: 'delivery',
      title: 'Заказ в пути',
      message: 'AirPods Pro будут доставлены в ваш магазин завтра до 16:00',
      time: '1 день назад',
      isRead: false,
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Срок получения заказа',
      message: 'Не забудьте забрать iPhone 15 Pro из офиса до 25 декабря',
      time: '2 дня назад',
      isRead: true,
    },
    {
      id: 4,
      type: 'success',
      title: 'Заказ получен',
      message: 'Сертификат Озон успешно активирован в вашем профиле',
      time: '3 дня назад',
      isRead: true,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'reward':
        return <Gift className="w-5 h-5 text-yellow-500" />;
      case 'delivery':
        return <Truck className="w-5 h-5 text-blue-500" />;
      case 'reminder':
        return <Clock className="w-5 h-5 text-orange-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getBackgroundColor = (type: string, isRead: boolean) => {
    if (isRead) return 'bg-gray-50';
    
    switch (type) {
      case 'reward':
        return 'bg-yellow-50 border-l-4 border-yellow-400';
      case 'delivery':
        return 'bg-blue-50 border-l-4 border-blue-400';
      case 'reminder':
        return 'bg-orange-50 border-l-4 border-orange-400';
      case 'success':
        return 'bg-green-50 border-l-4 border-green-400';
      default:
        return 'bg-white';
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <Bell className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-900">Уведомления</h2>
          <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full">
            {notifications.filter(n => !n.isRead).length}
          </span>
        </div>

        <div className="space-y-3">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg transition-all ${getBackgroundColor(notification.type, notification.isRead)}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className={`font-medium ${notification.isRead ? 'text-gray-600' : 'text-gray-900'}`}>
                      {notification.title}
                    </h3>
                    <span className="text-xs text-gray-500 ml-2">
                      {notification.time}
                    </span>
                  </div>
                  <p className={`text-sm mt-1 ${notification.isRead ? 'text-gray-500' : 'text-gray-700'}`}>
                    {notification.message}
                  </p>
                </div>
                {!notification.isRead && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
