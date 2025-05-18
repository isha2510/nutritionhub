import { WalkIcon, GymIcon, YogaIcon } from '../../../app/icons';

// Progress Circle Component
const ProgressCircle = ({ 
  percentage, 
  size = 120, 
  strokeWidth = 8, 
  color = '#3C50E0', 
  label, 
  value
}: { 
  percentage: number; 
  size?: number; 
  strokeWidth?: number; 
  color?: string; 
  label: string;
  value: string;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background Circle */}
        <svg width={size} height={size} className="absolute">
          <circle
            className="text-stroke dark:text-strokedark opacity-20"
            stroke="currentColor"
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
        </svg>
        
        {/* Progress Circle */}
        <svg width={size} height={size} className="absolute transform -rotate-90">
          <circle
            style={{ 
              stroke: color,
              strokeDasharray: circumference,
              strokeDashoffset: offset,
              transition: 'stroke-dashoffset 1s ease-in-out'
            }}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </svg>
        
        {/* Percentage Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-black dark:text-white">{value}</span>
        </div>
      </div>
      <span className="mt-2 text-sm text-bodydark font-medium">{label}</span>
    </div>
  );
};

// Structured data that could be replaced with API response
const activityData = {
  progressCircles: [
    { id: 'steps', label: 'Steps', value: '7,500', percentage: 75, color: '#3C50E0' },
    { id: 'calories', label: 'Calories', value: '1,850', percentage: 68, color: '#10B981' },
    { id: 'water', label: 'Water', value: '1.8L', percentage: 45, color: '#F59E0B' }
  ],
  activities: [
    { 
      id: 1, 
      name: 'Morning Walk', 
      time: '07:30 AM', 
      duration: '30 mins', 
      stats: '2,500 steps',
      icon: <WalkIcon className="fill-primary" />,
      iconBgColor: 'bg-primary'
    },
    { 
      id: 2, 
      name: 'Gym Workout', 
      time: '10:15 AM', 
      duration: '45 mins', 
      stats: '320 calories',
      icon: <GymIcon className="fill-meta-3" />,
      iconBgColor: 'bg-meta-3'
    },
    { 
      id: 3, 
      name: 'Evening Yoga', 
      time: '06:30 PM', 
      duration: '30 mins', 
      stats: '150 calories',
      icon: <YogaIcon className="fill-meta-6" />,
      iconBgColor: 'bg-meta-6'
    }
  ]
};

const ActivityProgressCard = () => {
  return (
    <div className="bg-white dark:bg-boxdark rounded-lg shadow-default border border-stroke dark:border-strokedark h-full">
      <div className="p-5 border-b border-stroke dark:border-strokedark">
        <h3 className="text-lg font-bold text-black dark:text-white">
          Daily Activity
        </h3>
      </div>
      
      <div className="p-5">
        <div className="flex flex-wrap justify-around mb-8">
          {activityData.progressCircles.map(circle => (
            <ProgressCircle 
              key={circle.id}
              percentage={circle.percentage} 
              color={circle.color} 
              label={circle.label} 
              value={circle.value} 
            />
          ))}
        </div>
        
        <div className="border-t border-stroke dark:border-strokedark pt-5">
          <h4 className="font-medium mb-4">Today's Activities</h4>
          
          <div className="space-y-4">
            {activityData.activities.map(activity => (
              <div className="flex items-center" key={activity.id}>
                <div className={`w-10 h-10 rounded-full ${activity.iconBgColor} bg-opacity-10 flex items-center justify-center mr-4`}>
                  {activity.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-medium text-black dark:text-white">{activity.name}</h5>
                    <span className="text-xs text-bodydark">{activity.time}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm">{activity.duration} · {activity.stats}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-5">
            <button className="w-full py-2 px-4 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-opacity-90 focus:ring-4 focus:ring-primary/30">
              Log New Activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityProgressCard; 