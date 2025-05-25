// Generate a random avatar based on name
export const generateRandomAvatar = (name: string): string => {
  // Using DiceBear API to generate avatars
  const encodedName = encodeURIComponent(name);
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodedName}`;
};

// Format date to relative time (e.g., "2 days ago")
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths === 1 ? '' : 's'} ago`;
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears === 1 ? '' : 's'} ago`;
}

// Get availability badge color based on status
export function getAvailabilityColor(availability: string | null): string {
  switch (availability) {
    case 'Open to Hire':
      return 'bg-green-500 text-white';
    case 'Open to Work':
      return 'bg-blue-500 text-white';
    case 'Collaboration':
      return 'bg-purple-500 text-white';
    case 'Not Available':
      return 'bg-gray-400 text-white';
    default:
      return 'bg-gray-300 text-gray-700';
  }
}

// Filter users by search term
export function filterUsers(users: any[], searchTerm: string) {
  if (!searchTerm.trim()) return users;
  
  const term = searchTerm.toLowerCase();
  return users.filter(user => 
    user.name.toLowerCase().includes(term) ||
    user.headline.toLowerCase().includes(term) ||
    user.location.toLowerCase().includes(term) ||
    user.role.toLowerCase().includes(term) ||
    user.skills.some((skill: string) => skill.toLowerCase().includes(term))
  );
}