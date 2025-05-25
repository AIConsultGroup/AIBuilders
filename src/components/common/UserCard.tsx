import React from 'react';
import { Link } from 'react-router-dom';
import { User, Service } from '../../types';
import { getAvailabilityColor, formatRelativeTime } from '../../utils/helpers';
import { Clock, Calendar, MessageSquare } from 'lucide-react';

interface UserCardProps {
  user: User;
  detailed?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ user, detailed = false }) => {
  const formatPrice = (price: number, unit?: string) => {
    return `$${price.toLocaleString()}${unit ? ` / ${unit}` : ''}`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-100" 
            />
            <div className="ml-4">
              <h3 className="font-semibold text-gray-900 text-xl">{user.name}</h3>
              <p className="text-gray-600">{user.headline}</p>
              {user.availability && (
                <span className={`${getAvailabilityColor(user.availability)} text-xs px-2 py-1 rounded-full mt-2 inline-block`}>
                  {user.availability}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center text-sm text-gray-500 space-x-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            Last active {formatRelativeTime(user.lastActive)}
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {user.location}
          </div>
        </div>

        {detailed && user.services && (
          <div className="mt-6">
            <h4 className="text-lg font-medium text-gray-900 mb-3">Services</h4>
            <div className="space-y-4">
              {user.services.map((service: Service) => (
                <div key={service.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium text-gray-900">{service.title}</h5>
                      <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-blue-600">
                        {formatPrice(service.price, service.priceUnit)}
                      </p>
                      <button className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                        Book now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4">
          <p className="text-xs text-gray-500 mb-2">Skills</p>
          <div className="flex flex-wrap gap-1">
            {user.skills.map((skill, index) => (
              <span 
                key={index} 
                className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
          <Link 
            to={`/people/${user.id}`}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            View Profile
          </Link>
          <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <MessageSquare className="h-4 w-4 mr-1.5" />
            Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;