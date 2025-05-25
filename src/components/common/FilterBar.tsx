import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterCategory {
  name: string;
  options: FilterOption[];
}

interface FilterBarProps {
  categories: FilterCategory[];
  onFilterChange: (filters: Record<string, string[]>) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ categories, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  
  const handleFilterToggle = (category: string, value: string) => {
    setActiveFilters(prev => {
      const currentFilters = prev[category] || [];
      const updatedFilters = currentFilters.includes(value)
        ? currentFilters.filter(v => v !== value)
        : [...currentFilters, value];
      
      const newFilters = {
        ...prev,
        [category]: updatedFilters
      };
      
      // If category is empty, remove it
      if (newFilters[category].length === 0) {
        delete newFilters[category];
      }
      
      // Notify parent component
      onFilterChange(newFilters);
      
      return newFilters;
    });
  };
  
  const clearFilters = () => {
    setActiveFilters({});
    onFilterChange({});
  };
  
  const getActiveFiltersCount = () => {
    return Object.values(activeFilters).reduce((count, filters) => count + filters.length, 0);
  };
  
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {getActiveFiltersCount() > 0 && (
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {getActiveFiltersCount()}
            </span>
          )}
        </button>
        
        {getActiveFiltersCount() > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
          >
            <X className="h-3 w-3 mr-1" />
            Clear all
          </button>
        )}
      </div>
      
      {isOpen && (
        <div className="bg-white border border-gray-200 rounded-md shadow-sm p-4 mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div key={category.name} className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">{category.name}</h3>
              <div className="space-y-1">
                {category.options.map((option) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      id={`filter-${category.name}-${option.value}`}
                      name={`${category.name}[]`}
                      value={option.value}
                      type="checkbox"
                      checked={(activeFilters[category.name] || []).includes(option.value)}
                      onChange={() => handleFilterToggle(category.name, option.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`filter-${category.name}-${option.value}`}
                      className="ml-2 text-sm text-gray-600"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {getActiveFiltersCount() > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {Object.entries(activeFilters).map(([category, values]) =>
            values.map((value) => (
              <span 
                key={`${category}-${value}`} 
                className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm bg-blue-50 text-blue-700"
              >
                <span className="text-xs text-gray-500 mr-1">{category}:</span> {value}
                <button 
                  type="button"
                  onClick={() => handleFilterToggle(category, value)}
                  className="ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-400 hover:bg-blue-100 hover:text-blue-500 focus:outline-none focus:bg-blue-100 focus:text-blue-500"
                >
                  <span className="sr-only">Remove filter for {value}</span>
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default FilterBar;