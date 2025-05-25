import React from 'react';

interface UserAvatarProps {
  src: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'online' | 'offline' | 'away';
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ 
  src, 
  name, 
  size = 'md', 
  status, 
  className = ''
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-14 w-14'
  };
  
  return (
    <div className={`relative ${className}`}>
      <img 
        src={src} 
        alt={name} 
        className={`${sizeClasses[size]} rounded-full object-cover border-2 border-gray-100`}
      />
      
      {status && (
        <span className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white ${
          status === 'online' ? 'bg-green-400' : 
          status === 'away' ? 'bg-yellow-400' : 'bg-gray-400'
        }`} />
      )}
    </div>
  );
};

export default UserAvatar;