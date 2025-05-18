import { ReactNode } from 'react';
import { CaloriesIcon, RecipeIcon, WeightIcon, GoalIcon, TrendUpIcon, TrendDownIcon } from '../../../app/icons';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  bgColor?: string;
}

interface StatCardData {
  id: string;
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  bgColor?: string;
}

const StatCard = ({ title, value, icon, trend, bgColor }: StatCardProps) => {
  return (
    <div className={`rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark ${bgColor || ''}`}>
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {icon}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {value}
          </h4>
          <span className="text-sm font-medium">{title}</span>
        </div>

        {trend && (
          <span
            className={`flex items-center gap-1 text-sm font-medium ${
              trend.isPositive ? 'text-meta-3' : 'text-danger'
            }`}
          >
            {trend.value}%
            {trend.isPositive ? <TrendUpIcon /> : <TrendDownIcon />}
          </span>
        )}
      </div>
    </div>
  );
};

// Data structure that could be replaced by API response
const statisticsData: StatCardData[] = [
  {
    id: 'weekly-calories',
    title: "Weekly Calories",
    value: "12,500",
    icon: <CaloriesIcon />,
    trend: {
      value: 2.5,
      isPositive: true
    }
  },
  {
    id: 'recipe-count',
    title: "Recipe Count",
    value: "15",
    icon: <RecipeIcon />,
    trend: {
      value: 4.2,
      isPositive: true
    }
  },
  {
    id: 'weight',
    title: "Weight",
    value: "72.5 kg",
    icon: <WeightIcon />,
    trend: {
      value: 1.2,
      isPositive: false
    }
  },
  {
    id: 'daily-goal',
    title: "Daily Goal Progress",
    value: "85%",
    icon: <GoalIcon />,
    trend: {
      value: 3.5,
      isPositive: true
    }
  }
];

const StatisticCards = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 mb-8">
      {statisticsData.map((stat) => (
        <StatCard
          key={stat.id}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          trend={stat.trend}
          bgColor={stat.bgColor}
        />
      ))}
    </div>
  );
};

export default StatisticCards; 