import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { useState } from "react";

// Define types for our data structure
type ChartDataPoint = {
  date: string;
  weight: number;
};

type CardBadge = {
  text: string;
  color: string;
};

type SummaryCard = {
  id: string;
  title: string;
  value?: string;
  unit: string;
  badge?: CardBadge;
  getValue?: (data: ChartDataPoint[]) => string;
  getBadge?: (data: ChartDataPoint[]) => CardBadge;
};

type WeightDataConfig = {
  targetWeight: number;
  chartData: ChartDataPoint[];
  summaryCards: SummaryCard[];
  chartConfig: {
    lineColor: string;
    areaFillColor: string;
    fillOpacity: number;
    targetLineColor: string;
  };
};

// Structured data that could be replaced with API response
const weightDataConfig: WeightDataConfig = {
  targetWeight: 65,
  chartData: [
    { date: "Jan", weight: 74 },
    { date: "Feb", weight: 73 },
    { date: "Mar", weight: 72.5 },
    { date: "Apr", weight: 71.8 },
    { date: "May", weight: 70.5 },
    { date: "Jun", weight: 71.2 },
  ],
  summaryCards: [
    {
      id: 'target',
      title: 'Target Weight',
      value: '65',
      unit: 'kg',
      badge: { text: 'Goal', color: 'text-meta-3' }
    },
    {
      id: 'current',
      title: 'Current Weight',
      unit: 'kg',
      getValue: (data: ChartDataPoint[]) => data[data.length-1].weight.toString(),
      getBadge: (data: ChartDataPoint[]) => {
        const current = data[data.length-1].weight;
        const previous = data[data.length-2].weight;
        const diff = Math.abs(current - previous).toFixed(1);
        return {
          text: current > previous ? `+${diff}kg` : `-${diff}kg`,
          color: current > previous ? 'text-meta-1' : 'text-meta-3'
        };
      }
    }
  ],
  chartConfig: {
    lineColor: '#3C50E0',
    areaFillColor: '#3C50E0',
    fillOpacity: 0.2,
    targetLineColor: '#10B981'
  }
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-boxdark p-3 border border-stroke dark:border-strokedark rounded shadow-sm">
        <p className="text-sm">{`${label} : ${payload[0].value}kg`}</p>
      </div>
    );
  }
  return null;
};

const WeightChartCard = () => {
  const [chartType, setChartType] = useState<'line' | 'area'>('area');
  const { targetWeight, chartData, chartConfig } = weightDataConfig;
  const currentWeight = chartData[chartData.length - 1].weight;
  
  const toggleChartType = () => {
    setChartType(chartType === 'line' ? 'area' : 'line');
  };

  return (
    <div className="bg-white dark:bg-boxdark rounded-lg shadow-default border border-stroke dark:border-strokedark h-full">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-5 border-b border-stroke dark:border-strokedark">
          <h3 className="text-lg font-bold text-black dark:text-white">
            Weight Tracking
          </h3>
          
          <div className="flex items-center gap-2">
            <button
              onClick={toggleChartType}
              className="text-sm px-2 py-1 bg-bodydark2 bg-opacity-30 hover:bg-opacity-50 rounded transition-all"
              title="Change chart type"
            >
              {chartType === 'line' ? 'Area Chart' : 'Line Chart'}
            </button>
          </div>
        </div>
        
        <div className="p-5">
          <div className="grid grid-cols-2 gap-6 mb-6">
            {weightDataConfig.summaryCards.map((card) => (
              <div key={card.id} className="p-4 rounded-lg border border-stroke dark:border-strokedark bg-gray-50 dark:bg-meta-4">
                <p className="text-sm text-bodydark mb-1">{card.title}</p>
                <div className="flex items-end gap-2">
                  <p className="text-xl font-semibold text-black dark:text-white">
                    {card.getValue ? card.getValue(chartData) : card.value}{card.unit}
                  </p>
                  {card.badge && (
                    <span className={`text-xs ${card.badge.color} mb-0.5`}>
                      {card.badge.text}
                    </span>
                  )}
                  {card.getBadge && (
                    <span className={`text-xs ${card.getBadge(chartData).color} mb-0.5`}>
                      {card.getBadge(chartData).text}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'line' ? (
                <LineChart
                  data={chartData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    padding={{ left: 10, right: 10 }}
                  />
                  <YAxis
                    domain={[Math.min(targetWeight - 2, Math.min(...chartData.map((d) => d.weight)) - 2), 
                            Math.max(...chartData.map((d) => d.weight)) + 2]}
                    axisLine={false}
                    tickLine={false}
                    tickCount={6}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="weight"
                    stroke={chartConfig.lineColor}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  {/* Horizontal line for target weight */}
                  <Line 
                    type="monotone"
                    dataKey={() => targetWeight}
                    stroke={chartConfig.targetLineColor}
                    strokeWidth={1}
                    strokeDasharray="5 5"
                    dot={false}
                    name="Target"
                  />
                </LineChart>
              ) : (
                <AreaChart
                  data={chartData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    padding={{ left: 10, right: 10 }}
                  />
                  <YAxis
                    domain={[Math.min(targetWeight - 2, Math.min(...chartData.map((d) => d.weight)) - 2), 
                            Math.max(...chartData.map((d) => d.weight)) + 2]}
                    axisLine={false}
                    tickLine={false}
                    tickCount={6}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="weight"
                    stroke={chartConfig.lineColor}
                    fill={chartConfig.areaFillColor}
                    fillOpacity={chartConfig.fillOpacity}
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                  {/* Horizontal line for target weight */}
                  <Line 
                    type="monotone"
                    dataKey={() => targetWeight}
                    stroke={chartConfig.targetLineColor}
                    strokeWidth={1}
                    strokeDasharray="5 5"
                    dot={false}
                    name="Target"
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
          
          <div className="mt-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-bodydark">Remaining</p>
              <p className="text-lg font-bold text-black dark:text-white">
                {Math.abs(currentWeight - targetWeight).toFixed(1)}kg
              </p>
            </div>
            
            <button 
              className="inline-flex items-center text-white bg-primary hover:bg-opacity-90 focus:ring-4 focus:ring-primary/30 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={() => window.location.href = '/updateweight'}
            >
              Update Weight
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightChartCard; 