import { User, AnalyticsData } from '../types';
import { generateRandomAvatar } from '../utils/helpers';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Chase Aldridge',
    email: 'chase@example.com',
    avatar: generateRandomAvatar('Chase Aldridge'),
    headline: 'AI Consultant',
    location: 'San Francisco, CA',
    skills: ['Machine Learning', 'Python', 'TensorFlow'],
    availability: 'Open to Hire',
    role: 'AI Consulting',
    lastActive: '2023-10-15T14:48:00.000Z',
    services: [
      {
        id: 's1',
        title: 'AI Strategy Development',
        description: 'Develop a comprehensive AI strategy tailored to your business',
        price: 1500,
        priceUnit: 'fixed'
      },
      {
        id: 's2',
        title: 'LLM Implementation',
        description: 'Integrate large language models into your applications',
        price: 1000,
        priceUnit: 'monthly'
      }
    ],
    portfolio: [
      {
        id: 'p1',
        title: 'AI-Powered Customer Service',
        description: 'Implemented an LLM-based customer service solution',
        imageUrl: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg',
        link: 'https://example.com/portfolio/1'
      }
    ],
    testimonials: [
      {
        id: 't1',
        author: 'John Smith',
        role: 'CTO',
        company: 'TechCorp',
        content: 'Chase helped us transform our customer service with AI',
        rating: 5
      }
    ]
  },
  {
    id: '2',
    name: 'Frank Stein',
    email: 'frank@example.com',
    avatar: generateRandomAvatar('Frank Stein'),
    headline: 'AI Cosidant',
    location: 'Boston, MA',
    skills: ['NLP', 'Python', 'PyTorch'],
    availability: 'Open to Hire',
    role: 'AI Consulting',
    lastActive: '2023-10-12T09:30:00.000Z'
  },
  {
    id: '3',
    name: 'Jimmy Davidson',
    email: 'jimmy@example.com',
    avatar: generateRandomAvatar('Jimmy Davidson'),
    headline: 'Yourz',
    location: 'New York, NY',
    skills: ['Computer Vision', 'Python', 'TensorFlow'],
    availability: 'Open to Hire',
    role: 'AI Sales',
    lastActive: '2023-10-14T16:45:00.000Z'
  },
  {
    id: '4',
    name: 'Todd Zaboigo',
    email: 'todd@example.com',
    avatar: generateRandomAvatar('Todd Zaboigo'),
    headline: 'Tact AIming',
    location: 'Austin, TX',
    skills: ['LLMs', 'Python', 'HuggingFace'],
    availability: 'Open to Hire',
    role: 'Marketing',
    lastActive: '2023-10-13T11:20:00.000Z'
  },
  {
    id: '5',
    name: 'Vidhys Natchippan',
    email: 'vidhys@example.com',
    avatar: generateRandomAvatar('Vidhys Natchippan'),
    headline: 'Abaik Tatunda',
    location: 'Seattle, WA',
    skills: ['AI Ethics', 'Research', 'PyTorch'],
    availability: 'Open to Work',
    role: 'No-Code',
    lastActive: '2023-10-11T15:15:00.000Z'
  },
  {
    id: '6',
    name: 'Chales Stein',
    email: 'chales@example.com',
    avatar: generateRandomAvatar('Chales Stein'),
    headline: 'Skin Bikert',
    location: 'Chicago, IL',
    skills: ['Deep Learning', 'Python', 'TensorFlow'],
    availability: 'Not Available',
    role: 'AI Sales',
    lastActive: '2023-10-09T10:30:00.000Z'
  },
  {
    id: '7',
    name: 'Robert Tayler',
    email: 'robert@example.com',
    avatar: generateRandomAvatar('Robert Tayler'),
    headline: 'Open to-week',
    location: 'Miami, FL',
    skills: ['NLP', 'Python', 'SpaCy'],
    availability: 'Collaboration',
    role: 'Midjourney',
    lastActive: '2023-10-10T13:45:00.000Z'
  },
  {
    id: '8',
    name: 'Lisa Johnson',
    email: 'lisa@example.com',
    avatar: generateRandomAvatar('Lisa Johnson'),
    headline: 'AI Product Manager',
    location: 'Portland, OR',
    skills: ['Product Strategy', 'AI Product', 'UX Research'],
    availability: 'Open to Work',
    role: 'Product',
    lastActive: '2023-10-08T09:15:00.000Z'
  },
  {
    id: '9',
    name: 'Daniel Kim',
    email: 'daniel@example.com',
    avatar: generateRandomAvatar('Daniel Kim'),
    headline: 'ML Engineer',
    location: 'Toronto, CA',
    skills: ['Machine Learning', 'Python', 'Keras'],
    availability: 'Not Available',
    role: 'AI Consulting',
    lastActive: '2023-10-07T16:30:00.000Z'
  },
  {
    id: '10',
    name: 'Sophia Martinez',
    email: 'sophia@example.com',
    avatar: generateRandomAvatar('Sophia Martinez'),
    headline: 'AI Researcher',
    location: 'London, UK',
    skills: ['Research', 'Python', 'PyTorch'],
    availability: 'Open to Hire',
    role: 'AI Sales',
    lastActive: '2023-10-06T14:20:00.000Z'
  },
  {
    id: '11',
    name: 'James Wilson',
    email: 'james@example.com',
    avatar: generateRandomAvatar('James Wilson'),
    headline: 'AI Solutions Architect',
    location: 'Berlin, DE',
    skills: ['Architecture', 'Python', 'Cloud AI'],
    availability: 'Open to Work',
    role: 'Marketing',
    lastActive: '2023-10-05T11:10:00.000Z'
  },
  {
    id: '12',
    name: 'Emma Brown',
    email: 'emma@example.com',
    avatar: generateRandomAvatar('Emma Brown'),
    headline: 'AI Ethicist',
    location: 'Melbourne, AU',
    skills: ['AI Ethics', 'Philosophy', 'Policy'],
    availability: 'Open to Hire',
    role: 'No-Code',
    lastActive: '2023-10-04T10:05:00.000Z'
  }
];

export const mockAnalyticsData: AnalyticsData = {
  totalMembers: 1250,
  openToHire: 24,
  openToWork: 58,
  activeLast7Days: 250,
  timeZones: [
    { zone: 'UTC-8', count: 6 },
    { zone: 'UTC', count: 8 },
    { zone: 'UTC+1', count: 7 },
    { zone: 'UTC+2', count: 9 },
    { zone: 'UTC+3', count: 8 },
    { zone: 'UTC+4', count: 8 },
    { zone: 'UTC+5', count: 7 },
    { zone: 'UTC+8', count: 7 },
    { zone: 'UTC+9', count: 8 },
    { zone: 'UTC+10', count: 7 },
    { zone: 'UTC+12', count: 8 }
  ],
  roles: [
    { role: 'Consultants', percentage: 33 },
    { role: 'Engineering', percentage: 26 },
    { role: 'Sales', percentage: 18 },
    { role: 'Marketing', percentage: 12 },
    { role: 'Other', percentage: 7 }
  ],
  tools: [
    'ChatGPT',
    'Hugging Face',
    'AWS',
    'Docker',
    'PyTorch',
    'Tableau',
    'PostgreSQL',
    'Zapier',
    'Midjourney'
  ],
  topSkills: [
    { skill: 'Python', count: 450 },
    { skill: 'Machine Learning', count: 380 },
    { skill: 'Data Analysis', count: 320 },
    { skill: 'NLP', count: 280 },
    { skill: 'Deep Learning', count: 250 },
    { skill: 'TensorFlow', count: 220 },
    { skill: 'AI', count: 200 }
  ],
  openProjects: {
    count: 120,
    trend: [80, 85, 82, 88, 85, 90, 95, 92, 98, 100, 110, 120]
  },
  averagePrice: 150
};