import React from 'react';

interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const categories: Category[] = [
  {
    id: 'saudi',
    name: 'السعودية',
    icon: '🏰',
    description: 'أسئلة عن المملكة العربية السعودية'
  },
  {
    id: 'islamic',
    name: 'إسلامي',
    icon: '🕌',
    description: 'أسئلة دينية وإسلامية'
  },
  {
    id: 'geography',
    name: 'جغرافيا',
    icon: '🌍',
    description: 'أسئلة عن جغرافيا العالم'
  },
  // Add more categories...
];

const CategorySelection = ({ onSelect }: { onSelect: (category: string) => void }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect(category.id)}
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 opacity-0 group-hover:opacity-10 transition-opacity" />
          <div className="text-4xl mb-4">{category.icon}</div>
          <h3 className="text-xl font-bold mb-2">{category.name}</h3>
          <p className="text-gray-600 text-sm">{category.description}</p>
        </button>
      ))}
    </div>
  );
};

export default CategorySelection; 