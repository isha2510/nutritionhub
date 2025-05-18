import React from 'react';
import { FaCheck, FaClock } from 'react-icons/fa';
import { Recipe } from '../types/state';

interface StatusBadgeProps {
  recipe: Recipe;
  currentUserEmail?: string;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  recipe, 
  currentUserEmail,
  className = ''
}) => {
  // Only show status badges for recipes owned by the current user
  if (recipe.user?.email !== currentUserEmail) {
    return null;
  }

  if (recipe.isApproved) {
    return (
      <span className={`bg-meta-3 bg-opacity-15 text-meta-3 py-1 px-2 rounded-full text-xs whitespace-nowrap flex items-center gap-1 ${className}`}>
        <FaCheck className="w-3 h-3" />
        Approved
      </span>
    );
  } else {
    return (
      <span className={`bg-meta-6 bg-opacity-15 text-meta-6 py-1 px-2 rounded-full text-xs whitespace-nowrap flex items-center gap-1 ${className}`}>
        <FaClock className="w-3 h-3" />
        Pending
      </span>
    );
  }
};

export default StatusBadge; 