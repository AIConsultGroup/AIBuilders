import React, { useState } from 'react';
import { Users, Search as SearchIcon, Layers } from 'lucide-react';
import SearchBar from '../components/common/SearchBar';
import UserAvatar from '../components/common/UserAvatar';
import { mockUsers } from '../data/mockData';
import { filterUsers } from '../utils/helpers';

const Dashboard: React.FC = () => {
  const [searchResults, setSearchResults] = useState<typeof mockUsers>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  const handleSearch = (term: string) => {
    const results = filterUsers(mockUsers, term);
    setSearchResults(results);
    setHasSearched(true);
  };

  const clearSearch = () => {
    setSearchResults([]);
    setHasSearched(false);
  };
  
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-3 flex items-center justify-center">
            <Layers className="h-8 w-8 mr-2" /> 
            AI Builders Community
          </h1>
          <p className="text-blue-100 mb-6">
            Connect with talented AI builders, mentors, and collaborators from across the industry
          </p>
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Search for people by name, skill, location, or role..." 
            className="max-w-2xl mx-auto"
          />
        </div>
      </div>

      {hasSearched ? (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Search Results
              <span className="ml-2 text-sm font-normal text-gray-500">
                {searchResults.length} {searchResults.length === 1 ? 'member' : 'members'} found
              </span>
            </h2>
            <button
              onClick={clearSearch}
              className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-md"
            >
              Clear Search
            </button>
          </div>
          
          {searchResults.length === 0 ? (
            <div className="text-center py-12">
              <SearchIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900">No results found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.slice(0, 6).map(user => (
                <div key={user.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    <UserAvatar src={user.avatar} name={user.name} />
                    <div>
                      <h3 className="text-base font-medium text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-500">{user.headline}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-1">Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {user.skills.map((skill, i) => (
                        <span 
                          key={i} 
                          className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {searchResults.length > 6 && (
            <div className="mt-4 text-center">
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                View all {searchResults.length} results
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-600" />
              Active Community Members
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {mockUsers.slice(0, 12).map(user => (
                <div key={user.id} className="text-center hover:scale-105 transition-transform">
                  <UserAvatar 
                    src={user.avatar} 
                    name={user.name} 
                    size="lg" 
                    className="mx-auto mb-2" 
                  />
                  <p className="text-sm font-medium text-gray-800 truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.headline}</p>
                </div>
              ))}
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Filters</h2>
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors">
                Location
              </button>
              <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors">
                Role
              </button>
              <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors">
                Skill
              </button>
              <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors">
                Tool
              </button>
              <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors">
                Availability
              </button>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Community Stats</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <p className="text-sm text-gray-500">Total Members</p>
                <p className="text-2xl font-bold text-gray-900">547</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <p className="text-sm text-gray-500">Open to Hire</p>
                <p className="text-2xl font-bold text-green-600">132</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <p className="text-sm text-gray-500">Open to Work</p>
                <p className="text-2xl font-bold text-blue-600">94</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <p className="text-sm text-gray-500">New This Week</p>
                <p className="text-2xl font-bold text-purple-600">23</p>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Dashboard;