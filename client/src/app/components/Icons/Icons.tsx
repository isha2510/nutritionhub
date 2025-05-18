import React from 'react';
import { FaHeart, FaRegHeart, FaTrash, FaEdit } from 'react-icons/fa';

interface IconProps {
  className?: string;
  filled?: boolean;
  onClick?: () => void;
}

export const HeartIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', filled = false, onClick }) => {
  return filled ? (
    <FaHeart className={className} onClick={onClick} />
  ) : (
    <FaRegHeart className={className} onClick={onClick} />
  );
};

export const TrashIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', onClick }) => {
  return <FaTrash className={className} onClick={onClick} />;
};

export const EditIcon: React.FC<IconProps> = ({ className = 'w-6 h-6', onClick }) => {
  return <FaEdit className={className} onClick={onClick} />;
}; 