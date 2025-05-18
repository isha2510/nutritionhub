import React, { useMemo, useState, useCallback } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import ReactModal from 'react-modal';

// Set the app element for accessibility (screen readers)
if (typeof window !== 'undefined') {
  ReactModal.setAppElement('#root');
}

// Custom modal wrapper using Tailwind classes
const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ isOpen, onClose, title, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={title}
      className="outline-none fixed inset-0 flex items-center justify-center pointer-events-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
      portalClassName="pointer-events-auto"
      style={{}} // Required for TypeScript, but we'll use Tailwind classes
    >
      <div className="bg-white dark:bg-boxdark rounded-lg border border-stroke dark:border-strokedark shadow-default w-4/5 max-w-[900px] pointer-events-auto">
        <div className="border-b border-stroke dark:border-strokedark px-6 py-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-black dark:text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            aria-label="Close"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </ReactModal>
  );
};

// Data should ideally be moved to a separate file or fetched from an API
// Since this is outside the component, it won't re-create on each render
const nutritionData = {
  macros: [
    { name: 'Protein', value: 30, color: '#3C50E0' },
    { name: 'Carbs', value: 45, color: '#10B981' },
    { name: 'Fats', value: 25, color: '#F59E0B' }
  ],
  summary: {
    calories: {
      current: 1850,
      target: 2000,
      remaining: 150
    }
  },
  recentEntries: [
    { id: 1, food: 'Greek Yogurt', calories: 150, protein: 15, carbs: 6, fats: 4 },
    { id: 2, food: 'Chicken Salad', calories: 320, protein: 28, carbs: 12, fats: 18 },
    { id: 3, food: 'Protein Smoothie', calories: 240, protein: 24, carbs: 30, fats: 3 },
    { id: 4, food: 'Whole Grain Toast', calories: 180, protein: 5, carbs: 30, fats: 3 },
    { id: 5, food: 'Boiled Egg', calories: 78, protein: 6, carbs: 1, fats: 5 }
  ],
  summaryStats: [
    { id: 'calories', label: 'Calories', value: '1,850' },
    { id: 'target', label: 'Target', value: '2,000' },
    { id: 'remaining', label: 'Remaining', value: '150', isPositive: true }
  ]
};

// Extracted as a separate component to avoid re-creation on each render
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-boxdark p-3 border border-stroke dark:border-strokedark rounded shadow-sm">
        <p className="font-medium">{`${payload[0].name}: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

// Extracted as a separate component to avoid re-creation on each render
const CustomPieChartLabel = ({ cx, cy, midAngle, _innerRadius, outerRadius, percent, _index, name }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius * 0.8;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {`${name} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// AG Grid component that uses dynamic import and className for theming
const AgGridTable = ({ rowData, columnDefs }: { rowData: any[], columnDefs: any[] }) => {
  const [AgGridComponent, setAgGridComponent] = useState<any>(null);
  
  // AG Grid className for theming (we'll use this with Tailwind's dark mode context)
  const gridClassname = useMemo(() => "ag-theme-alpine dark:ag-theme-alpine-dark", []);
  
  React.useEffect(() => {
    // Dynamically import AG Grid to avoid TypeScript issues
    import('ag-grid-react').then((module) => {
      setAgGridComponent(() => module.AgGridReact);
    });
    
    // Also import the required CSS
    import('ag-grid-community/styles/ag-grid.css');
    import('ag-grid-community/styles/ag-theme-alpine.css');
  }, []);

  // Default column settings
  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true
  }), []);
  
  if (!AgGridComponent) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }
  
  const GridComponent = AgGridComponent;
  
  return (
    <div className={gridClassname} style={{ height: '100%', width: '100%' }}>
      <GridComponent
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        animateRows={true}
        rowSelection="single"
        suppressMovableColumns={true}
        pagination={true}
        paginationPageSize={5}
      />
    </div>
  );
};

const NutritionSummaryCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Move displayEntries to useMemo to prevent re-creation on each render
  const displayEntries = useMemo(() => 
    nutritionData.recentEntries.slice(0, 3),
    []  // Empty dependency array since nutritionData is static
  );
  
  // Table column definitions
  const columnDefs = useMemo(() => [
    { field: 'food', headerName: 'Food', flex: 1.5 },
    { field: 'calories', headerName: 'Calories', width: 100, type: 'numericColumn' },
    { field: 'protein', headerName: 'P (g)', width: 80, type: 'numericColumn' },
    { field: 'carbs', headerName: 'C (g)', width: 80, type: 'numericColumn' },
    { field: 'fats', headerName: 'F (g)', width: 80, type: 'numericColumn' }
  ], []);
  
  // Event handlers wrapped in useCallback to prevent re-creation on each render
  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);
  
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);
  
  const handleAddEntry = useCallback(() => {
    window.location.href = '/nutrition/log';
  }, []);

  return (
    <>
      <div className="bg-white dark:bg-boxdark rounded-lg shadow-default border border-stroke dark:border-strokedark h-full flex flex-col">
        <div className="p-5 border-b border-stroke dark:border-strokedark">
          <h3 className="text-lg font-bold text-black dark:text-white">
            Nutrition Overview
          </h3>
        </div>
        
        <div className="p-5 flex-grow grid md:grid-cols-2 gap-6">
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="font-medium mb-4">Today's Macro Distribution</h4>
              
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={nutritionData.macros}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      innerRadius={60}
                      dataKey="value"
                      label={CustomPieChartLabel}
                      paddingAngle={2}
                    >
                      {nutritionData.macros.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={1} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Summary Stats */}
            <div className="flex justify-between mt-4 bg-gray-50 dark:bg-meta-4 rounded-md p-4">
              {nutritionData.summaryStats.map(stat => (
                <div className="text-center" key={stat.id}>
                  <p className="text-sm text-bodydark mb-1">{stat.label}</p>
                  <p className={`font-bold text-lg ${stat.isPositive ? 'text-meta-3' : ''}`}>{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">Recent Entries</h4>
              <button 
                className="text-sm text-primary hover:underline"
                onClick={handleOpenModal}
              >
                View All
              </button>
            </div>
            
            {/* Recent Entries Summary */}
            <div className="flex-grow">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-meta-4">
                    <th className="px-3 py-2 text-left font-medium text-bodydark">Food</th>
                    <th className="px-3 py-2 text-right font-medium text-bodydark">Calories</th>
                  </tr>
                </thead>
                <tbody>
                  {displayEntries.map(entry => (
                    <tr key={entry.id} className="border-b border-stroke dark:border-strokedark">
                      <td className="px-3 py-3">{entry.food}</td>
                      <td className="px-3 py-3 text-right">{entry.calories}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div className="mt-6">
                {/* Stats cards */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gray-50 dark:bg-meta-4 rounded p-3 text-center">
                    <p className="text-sm text-bodydark mb-1">Today</p>
                    <p className="font-bold text-primary text-lg">{nutritionData.summary.calories.current}</p>
                    <p className="text-xs">calories</p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-meta-4 rounded p-3 text-center">
                    <p className="text-sm text-bodydark mb-1">Target</p>
                    <p className="font-bold text-lg">{nutritionData.summary.calories.target}</p>
                    <p className="text-xs">calories</p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-meta-4 rounded p-3 text-center">
                    <p className="text-sm text-bodydark mb-1">Remaining</p>
                    <p className="font-bold text-meta-3 text-lg">{nutritionData.summary.calories.remaining}</p>
                    <p className="text-xs">calories</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <button
                  className="w-full py-2 px-4 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-opacity-90 focus:ring-4 focus:ring-primary/30"
                  onClick={handleAddEntry}
                >
                  Add Food Entry
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom modal wrapper */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Nutrition Entries"
      >
        <div className="h-[400px]" style={{ width: '100%' }}>
          <AgGridTable 
            rowData={nutritionData.recentEntries} 
            columnDefs={columnDefs}
          />
        </div>
        
        <div className="mt-4 flex justify-end">
          <button
            className="py-2 px-4 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-opacity-90 focus:ring-4 focus:ring-primary/30 mr-2"
            onClick={handleAddEntry}
          >
            Log New Entry
          </button>
          <button
            className="py-2 px-4 text-sm font-medium text-center border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            onClick={handleCloseModal}
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};

export default NutritionSummaryCard; 