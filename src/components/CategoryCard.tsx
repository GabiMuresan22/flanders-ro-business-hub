
import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  category: string;
  count: number;
  icon: React.ReactNode;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, count, icon }) => {
  // Convert category to slug (e.g., "Restaurant & Food" -> "restaurant-food")
  const categorySlug = category.toLowerCase()
    .replace(/&/g, '')  // Remove ampersands
    .replace(/\s+/g, '-')  // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, '');  // Remove other special characters
  
  return (
    <Link 
      to={`/category/${categorySlug}`} 
      className="block focus:outline-none focus:ring-2 focus:ring-romania-blue focus:ring-offset-2 rounded-lg"
      aria-label={`View ${count} ${category} businesses`}
    >
      <article className="bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-lg hover:border-romania-blue border-2 border-transparent">
        <div className="flex justify-center mb-4 text-romania-blue" aria-hidden="true">
          {icon}
        </div>
        <h3 className="text-xl font-playfair font-semibold text-center text-gray-800">{category}</h3>
        <p className="text-center text-gray-500 mt-2">
          <span className="sr-only">There are </span>
          {count} businesses
        </p>
      </article>
    </Link>
  );
};

export default CategoryCard;
