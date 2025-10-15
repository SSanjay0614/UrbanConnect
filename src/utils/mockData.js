export const mockProjects = [
  {
    id: 'p1',
    title: 'Safe Pedestrian Crossings',
    description: 'Add zebra crossings and signals near schools and markets.',
    budget: 2500000,
    status: 'Proposed',
    inclusivity: { accessibility: 4, safety: 5, equity: 4 },
    votes: 1234,
  },
  {
    id: 'p2',
    title: 'Neighborhood Green Corridors',
    description: 'Convert vacant lots into mini-parks and tree-lined paths.',
    budget: 4800000,
    status: 'In Progress',
    inclusivity: { accessibility: 3, safety: 4, equity: 5 },
    votes: 987,
  },
];

export const mockReports = [
  {
    id: 'r1',
    type: 'Pothole',
    location: { lat: 12.972, lng: 77.595 },
    description: 'Large pothole causing traffic jams during peak hours.',
    createdAt: Date.now() - 86400000,
  },
];

export const mockUserBadges = [
  { id: 'b1', name: 'First Feedback', points: 5 },
  { id: 'b2', name: 'Map Reporter', points: 20 },
];

