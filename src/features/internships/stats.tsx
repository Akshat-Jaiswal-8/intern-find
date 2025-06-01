import type { StatsProps } from '@/types/internship';
import { fetchStats } from '@/services/internships/fetch-stats';

import { StatCard } from './stat-card';

const Stats = ({ stats }: { stats: StatsProps }) => {
  const statsData = fetchStats(stats);
  return (
    <div className='smd:grid-cols-2 grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-6'>
      {statsData.map((statCardProps, index) => (
        <StatCard key={index} {...statCardProps} />
      ))}
    </div>
  );
};

export default Stats;
