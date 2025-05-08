
import React from 'react';
import { Link } from 'react-router-dom';
import { BusinessCategory } from '../data/businessData';

interface CategoryCardProps {
  category: BusinessCategory;
  count: number;
  icon: React.ReactNode;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, count, icon }) => {
  const categorySlug = category.toLowerCase().replace(/ /g, '-');
  
  return (
    <Link to={`/category/${categorySlug}`} className="block">
      <div className="bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-lg hover:border-romania-blue border-2 border-transparent">
        <div className="flex justify-center mb-4 text-romania-blue">
          {icon}
        </div>
        <h3 className="text-xl font-playfair font-semibold text-center text-gray-800">{category}</h3>
        <p className="text-center text-gray-500 mt-2">{count} businesses</p>
      </div>
    </Link>
  );
};

export default CategoryCard;
