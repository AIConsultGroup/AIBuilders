import React from 'react';
import { Grid, List } from 'lucide-react';

interface ViewToggleProps {
  view: 'grid' | 'table';
  onViewChange: (view: 'grid' | 'table') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ view, onViewChange }) => {
  return (
    <div className="inline-flex rounded-md shadow-sm">
      <button
        type="button"
        onClick={() => onViewChange('grid')}
        className={`relative inline-flex items-center px-3 py-2 rounded-l-md border text-sm font-medium transition-colors ${
          view === 'grid' 
            ? 'bg-blue-600 border-blue-600 text-white' 
            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}
      >
        <Grid className="h-4 w-4 mr-2" />
        Grid
      </button>
      <button
        type="button"
        onClick={() => onViewChange('table')}
        className={`relative inline-flex items-center px-3 py-2 rounded-r-md border border-l-0 text-sm font-medium transition-colors ${
          view === 'table' 
            ? 'bg-blue-600 border-blue-600 text-white' 
            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}
      >
        <List className="h-4 w-4 mr-2" />
        Table
      </button>
    </div>
  );
};

export default ViewToggle;