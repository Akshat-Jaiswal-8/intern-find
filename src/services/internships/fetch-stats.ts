import type { StatsProps } from '@/types/internship';
import { Briefcase, MapPin, Star, Users, TrendingUp } from 'lucide-react';

export const fetchStats = (stats: StatsProps) => {
  return [
    {
      title: 'Total Internships',
      value: stats?.total,
      icon: Briefcase,
      gradient:
        'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800',
      textColor: 'text-blue-700 dark:text-blue-300',
      bgColor: 'bg-gradient-to-br from-blue-500/10 to-blue-600/20',
    },
    {
      title: 'Remote Work',
      value: stats?.remote,
      icon: MapPin,
      gradient:
        'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800',
      textColor: 'text-green-700 dark:text-green-300',
      bgColor: 'bg-gradient-to-br from-green-500/10 to-green-600/20',
    },
    {
      title: 'Premium',
      value: stats?.premium,
      icon: Star,
      gradient:
        'bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border-amber-200 dark:border-amber-800',
      textColor: 'text-amber-700 dark:text-amber-300',
      bgColor: 'bg-gradient-to-br from-amber-500/10 to-amber-600/20',
    },
    {
      title: 'Companies',
      value: stats?.companies,
      icon: Users,
      gradient:
        'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800',
      textColor: 'text-purple-700 dark:text-purple-300',
      bgColor: 'bg-gradient-to-br from-purple-500/10 to-purple-600/20',
    },
    {
      title: 'Locations',
      value: stats?.locations,
      icon: MapPin,
      gradient:
        'bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950 dark:to-indigo-900 border-indigo-200 dark:border-indigo-800',
      textColor: 'text-indigo-700 dark:text-indigo-300',
      bgColor: 'bg-gradient-to-br from-indigo-500/10 to-indigo-600/20',
    },
    {
      title: 'Avg Stipend',
      value: `₹${stats?.avgStipend.toLocaleString()}`,
      icon: TrendingUp,
      gradient:
        'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 border-emerald-200 dark:border-emerald-800',
      textColor: 'text-emerald-700 dark:text-emerald-300',
      bgColor: 'bg-gradient-to-br from-emerald-500/10 to-emerald-600/20',
    },
  ];
};
