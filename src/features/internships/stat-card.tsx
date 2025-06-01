import React from 'react';
import { Card } from '@/components/ui/card';

export const StatCard = React.memo<{
  title: string;
  value: string | number | undefined;
  icon: React.ElementType;
  gradient: string;
  textColor: string;
  bgColor: string;
}>(({ title, value, icon: Icon, gradient, textColor, bgColor }) => (
  <Card
    className={`relative overflow-hidden ${gradient} group transition-all duration-300 hover:scale-105 hover:shadow-lg`}
  >
    <div className={`absolute inset-0 ${bgColor}`}></div>
    <div className='relative p-6 text-center'>
      <div className='mb-3 flex items-center justify-center'>
        <div
          className={`p-3 ${textColor
            .split(' ')[0]
            .replace(
              'text-',
              'bg-',
            )} rounded-full ${textColor} group-hover:${textColor
            .split(' ')[0]
            .replace('text-', 'bg-')
            .replace('500', '600')} transition-colors`}
        >
          <Icon className='h-6 w-6' />
        </div>
      </div>
      <div className={`text-sm font-medium ${textColor} mb-1`}>{title}</div>
      {value && (
        <div
          className={`text-3xl font-bold ${textColor
            .replace('700', '900')
            .replace('300', '100')}`}
        >
          {value}
        </div>
      )}
    </div>
  </Card>
));

StatCard.displayName = 'StatCard';
