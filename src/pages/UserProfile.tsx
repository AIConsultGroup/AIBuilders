import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Mail, Link as LinkIcon, MessageSquare } from 'lucide-react';
import { mockUsers } from '../data/mockData';
import { formatRelativeTime, getAvailabilityColor } from '../utils/helpers';

const UserProfile: React.FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  
  const user = mockUsers.find(u => u.id === userId);
  
  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">User not found</h2>
        <button
          onClick={() => navigate('/people')}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to People
        </button>
      </div>
    );
  }
  
  return (
    <div className="max-w-5xl mx-auto">
      <button
        onClick={() => navigate('/people')}
        className="mb-6 inline-flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to People
      </button>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-20 w-20 rounded-full object-cover border-2 border-gray-100"
              />
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-lg text-gray-600">{user.headline}</p>
                {user.availability && (
                  <span className={`${getAvailabilityColor(user.availability)} text-sm px-3 py-1 rounded-full mt-2 inline-block`}>
                    {user.availability}
                  </span>
                )}
              </div>
            </div>
            
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                <Calendar className="h-4 w-4 mr-2" />
                Book Intro Call
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </button>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 mr-2" />
              {user.location}
            </div>
            <div className="flex items-center text-gray-600">
              <Mail className="h-5 w-5 mr-2" />
              {user.email}
            </div>
          </div>
          
          {user.services && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Services</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {user.services.map(service => (
                  <div key={service.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{service.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-blue-600">
                          ${service.price.toLocaleString()}
                          {service.priceUnit && <span className="text-sm text-gray-500">/{service.priceUnit}</span>}
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
          
          {user.portfolio && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Portfolio</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {user.portfolio.map(item => (
                  <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-800"
                        >
                          <LinkIcon className="h-4 w-4 mr-1" />
                          View Project
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {user.testimonials && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Testimonials</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {user.testimonials.map(testimonial => (
                  <div key={testimonial.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-4">
                      <div>
                        <p className="font-medium text-gray-900">{testimonial.author}</p>
                        <p className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
                      </div>
                      <div className="ml-auto flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">{testimonial.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;