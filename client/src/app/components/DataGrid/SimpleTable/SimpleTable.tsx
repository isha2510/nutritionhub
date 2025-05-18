import React from 'react';

export interface SimpleTableProps {
  data: any[];
  columns: {
    field: string;
    headerName: string;
    width?: number | string;
    flex?: number;
    type?: string;
  }[];
  className?: string;
  height?: string | number;
  pagination?: boolean;
  pageSize?: number;
}

/**
 * A simple table component to use until AG Grid integration is fixed
 */
const SimpleTable: React.FC<SimpleTableProps> = ({
  data = [],
  columns = [],
  className = '',
  height = '100%',
  pagination = false,
  pageSize = 5,
}) => {
  return (
    <div className={`w-full overflow-auto ${className}`} style={{ height }}>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 dark:bg-meta-4">
            {columns.map((column, index) => (
              <th 
                key={index} 
                className="px-3 py-3 text-left font-medium text-bodydark"
                style={{
                  width: column.width ? column.width : column.flex ? `${column.flex * 100}%` : 'auto'
                }}
              >
                {column.headerName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-stroke dark:border-strokedark">
              {columns.map((column, colIndex) => {
                const value = row[column.field];
                const isNumeric = column.type === 'numericColumn';
                
                return (
                  <td 
                    key={colIndex} 
                    className={`px-3 py-2.5 ${isNumeric ? 'text-right' : 'text-left'}`}
                  >
                    {value}
                    {isNumeric && (column.field === 'protein' || column.field === 'carbs' || column.field === 'fats') ? 'g' : ''}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      
      {data.length === 0 && (
        <div className="flex items-center justify-center py-8 text-gray-500 dark:text-gray-400">
          No data available
        </div>
      )}
    </div>
  );
};

export default SimpleTable; 