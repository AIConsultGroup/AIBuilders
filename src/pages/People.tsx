import React, { useState, useEffect } from 'react';
import { Plus, User, Grid, List } from 'lucide-react';
import { mockUsers } from '../data/mockData';
import UserCard from '../components/common/UserCard';
import UserTable from '../components/common/UserTable';
import SearchBar from '../components/common/SearchBar';
import ViewToggle from '../components/common/ViewToggle';
import FilterBar from '../components/common/FilterBar';
import { filterUsers } from '../utils/helpers';

const People: React.FC = () => {
  const [view, setView] = useState<'grid' | 'table'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  
  const filterCategories = [
    {
      name: 'Location',
      options: [
        { value: 'San Francisco', label: 'San Francisco' },
        { value: 'New York', label: 'New York' },
        { value: 'Austin', label: 'Austin' },
        { value: 'Remote', label: 'Remote' },
      ]
    },
    {
      name: 'Skills',
      options: [
        { value: 'Machine Learning', label: 'Machine Learning' },
        { value: 'Python', label: 'Python' },
        { value: 'NLP', label: 'NLP' },
        { value: 'Computer Vision', label: 'Computer Vision' },
      ]
    },
    {
      name: 'Availability',
      options: [
        { value: 'Open to Hire', label: 'Open to Hire' },
        { value: 'Open to Work', label: 'Open to Work' },
        { value: 'Collaboration', label: 'Collaboration' },
        { value: 'Not Available', label: 'Not Available' },
      ]
    },
  ];
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };
  
  const handleFilterChange = (filters: Record<string, string[]>) => {
    setCurrentPage(1);
    
    if (Object.keys(filters).length === 0 && !searchTerm) {
      setFilteredUsers(mockUsers);
      return;
    }
    
    let result = searchTerm ? filterUsers(mockUsers, searchTerm) : [...mockUsers];
    
    Object.entries(filters).forEach(([category, values]) => {
      if (values.length === 0) return;
      
      result = result.filter(user => {
        if (category === 'Location') {
          return values.some(location => user.location.includes(location));
        } else if (category === 'Skills') {
          return values.some(skill => user.skills.includes(skill));
        } else if (category === 'Availability') {
          return values.includes(user.availability || '');
        }
        return true;
      });
    });
    
    setFilteredUsers(result);
  };
  
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <User className="h-6 w-6 mr-2 text-blue-600" />
          People Directory
        </h1>
        <div className="flex items-center space-x-3">
          <ViewToggle view={view} onViewChange={setView} />
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Plus className="h-4 w-4 mr-1.5" />
            Add Person
          </button>
        </div>
      </div>
      
      <div className="md:flex md:space-x-4">
        <div className="md:w-1/3 lg:w-1/4 mb-4 md:mb-0">
          <SearchBar onSearch={handleSearch} placeholder="Search people..." />
        </div>
        <div className="md:flex-1">
          <FilterBar categories={filterCategories} onFilterChange={handleFilterChange} />
        </div>
      </div>
      
      {filteredUsers.length === 0 ? (
        <div className="bg-white shadow rounded-lg py-12 px-4 text-center">
          <User className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No people found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      ) : (
        <>
          {view === 'grid' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {paginatedUsers.map(user => (
                <UserCard 
                  key={user.id} 
                  user={user} 
                  detailed={selectedUser === user.id}
                  onClick={() => setSelectedUser(user.id === selectedUser ? null : user.id)}
                />
              ))}
            </div>
          ) : (
            <UserTable users={paginatedUsers} />
          )}
          
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, filteredUsers.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredUsers.length}</span> results
                </p>
              </div>
              <nav className="flex items-center">
                <button
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === idx + 1
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default People;