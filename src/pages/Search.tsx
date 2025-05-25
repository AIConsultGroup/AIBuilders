import React, { useState } from 'react';
import { Search as SearchIcon, Filter } from 'lucide-react';
import { mockUsers } from '../data/mockData';
import UserCard from '../components/common/UserCard';
import SearchBar from '../components/common/SearchBar';
import { filterUsers } from '../utils/helpers';

const Search: React.FC = () => {
  const [searchResults, setSearchResults] = useState<typeof mockUsers>([]);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [showFilters, setShowFilters] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  
  const locationOptions = ['San Francisco', 'New York', 'Boston', 'Austin', 'Seattle', 'Chicago', 'Miami', 'Portland', 'Toronto', 'London', 'Berlin', 'Melbourne'];
  const skillOptions = ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Python', 'TensorFlow', 'PyTorch', 'AI Ethics', 'Research', 'Product Strategy'];
  const availabilityOptions = ['Open to Hire', 'Open to Work', 'Collaboration', 'Not Available'];
  
  const handleSearch = (term: string) => {
    let results = filterUsers(mockUsers, term);
    
    // Apply filters if there are any
    if (Object.keys(selectedFilters).length > 0) {
      results = applyFilters(results);
    }
    
    setSearchResults(results);
    setHasSearched(true);
  };
  
  const toggleFilter = (category: string, value: string) => {
    setSelectedFilters(prevFilters => {
      const currentFilters = prevFilters[category] || [];
      const updatedFilters = currentFilters.includes(value)
        ? currentFilters.filter(v => v !== value)
        : [...currentFilters, value];
      
      if (updatedFilters.length === 0) {
        const newFilters = { ...prevFilters };
        delete newFilters[category];
        return newFilters;
      }
      
      return {
        ...prevFilters,
        [category]: updatedFilters
      };
    });
  };
  
  const applyFilters = (users: typeof mockUsers) => {
    return users.filter(user => {
      // Check location filter
      if (selectedFilters.location && selectedFilters.location.length > 0) {
        if (!selectedFilters.location.some(loc => user.location.includes(loc))) {
          return false;
        }
      }
      
      // Check skills filter
      if (selectedFilters.skills && selectedFilters.skills.length > 0) {
        if (!selectedFilters.skills.some(skill => user.skills.includes(skill))) {
          return false;
        }
      }
      
      // Check availability filter
      if (selectedFilters.availability && selectedFilters.availability.length > 0) {
        if (!selectedFilters.availability.includes(user.availability || '')) {
          return false;
        }
      }
      
      return true;
    });
  };
  
  const updateResults = () => {
    if (!hasSearched) return;
    
    let results = mockUsers;
    if (Object.keys(selectedFilters).length > 0) {
      results = applyFilters(results);
    }
    setSearchResults(results);
  };
  
  // Update results when filters change
  React.useEffect(() => {
    updateResults();
  }, [selectedFilters]);
  
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Filters sidebar - visible on larger screens or when toggled */}
      <div className={`lg:block ${showFilters ? 'block' : 'hidden'} lg:w-1/4`}>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-800 flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </h2>
            <button
              onClick={() => setShowFilters(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <span className="sr-only">Close filters</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Location</h3>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {locationOptions.map(location => (
                  <label key={location} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedFilters.location?.includes(location) || false}
                      onChange={() => toggleFilter('location', location)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">{location}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Skills</h3>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {skillOptions.map(skill => (
                  <label key={skill} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedFilters.skills?.includes(skill) || false}
                      onChange={() => toggleFilter('skills', skill)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">{skill}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Availability</h3>
              <div className="space-y-1">
                {availabilityOptions.map(availability => (
                  <label key={availability} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedFilters.availability?.includes(availability) || false}
                      onChange={() => toggleFilter('availability', availability)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">{availability}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <SearchIcon className="h-6 w-6 mr-2 text-blue-600" />
              Search
            </h1>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Filter className="h-4 w-4 mr-1.5" />
              Filters
            </button>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-center text-gray-800 mb-2">
              AI Builders Community
            </h2>
            <p className="text-center text-gray-600 mb-4">
              Connect with talented AI builders, mentors, and collaborators from across the industry.
            </p>
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="Search for skills, interests, or technologies..." 
              className="max-w-2xl mx-auto"
            />
            
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <button className="px-3 py-1.5 bg-white text-sm text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
                Location
              </button>
              <button className="px-3 py-1.5 bg-white text-sm text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
                Skills
              </button>
              <button className="px-3 py-1.5 bg-white text-sm text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
                Availability
              </button>
            </div>
          </div>
        </div>
        
        {hasSearched && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">
                {searchResults.length} 
                {searchResults.length === 1 ? ' result' : ' results'} found
              </h2>
              <div>
                <select 
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option>Sort by relevance</option>
                  <option>Sort by most recent</option>
                  <option>Sort by name</option>
                </select>
              </div>
            </div>
            
            {searchResults.length === 0 ? (
              <div className="text-center bg-white py-12 px-4 rounded-lg shadow">
                <SearchIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No results found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try different keywords or removing filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {searchResults.map(user => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;