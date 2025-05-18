import { useEffect } from 'react';
import StatisticCards from './StatisticCards';
import DashboardCard from './DashboardCard';
import WeightChartCard from './WeightChartCard';
import NutritionSummaryCard from './NutritionSummaryCard';
import ActivityProgressCard from './ActivityProgressCard';
import { cardsDetails } from "../utils/utils";
import Breadcrumb from "../../../app/components/Breadcrumb/Breadcrumb";

const Dashboard = () => {
  // Set document title when component mounts
  useEffect(() => {
    document.title = "NutritionHub - Dashboard";
  }, []);

  return (
    <div>
      <Breadcrumb pageName="Dashboard" prevPath={null} />
      
      {/* Stats Cards */}
      <StatisticCards />
      
      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5" style={{ minHeight: '500px' }}>
        {/* Weight Chart */}
        <div className="xl:col-span-1 flex">
          <div className="w-full">
            <WeightChartCard />
          </div>
        </div>
        
        {/* Nutrition Summary */}
        <div className="xl:col-span-1 flex">
          <div className="w-full">
            <NutritionSummaryCard />
          </div>
        </div>
        
        {/* Activity Progress */}
        <div className="xl:col-span-1 flex">
          <div className="w-full">
            <ActivityProgressCard />
          </div>
        </div>
      </div>
      
      {/* Quick Access Cards */}
      <h3 className="text-xl font-semibold mt-7.5 mb-3 text-black dark:text-white">
        Quick Access
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:gap-7.5">
        {cardsDetails.map((card, index) => (
          <DashboardCard
            key={index}
            title={card.title}
            description={card.description}
            buttonName={card.buttonName}
            buttonLink={card.buttonLink}
            image={card.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
