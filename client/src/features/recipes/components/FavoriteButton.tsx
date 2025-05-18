import React, { useCallback, useState } from 'react';
import { useAddToFavoritesMutation, useRemoveFromFavoritesMutation, useGetUserFavoriteIdsQuery } from '../../favorites/api/favoritesApi';
import { HeartIcon } from '../../../app/components/Icons/Icons';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useDispatch } from 'react-redux';
import { setToken } from '../../../app/components/Header/slice/authSlice';
import { getAccessToken } from '../../../app/utils/auth0-helper';

interface FavoriteButtonProps {
  recipeId: string | number;
  className?: string;
  iconClassName?: string;
  showText?: boolean;
}

// Custom mini-loader for the favorite button
const MiniLoader = () => (
  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-indigo-500"></div>
);

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ 
  recipeId, 
  className = '', 
  iconClassName = 'w-5 h-5',
  showText = false
}) => {
  const stringId = String(recipeId);
  const dispatch = useDispatch();
  const [hasAuthError, setHasAuthError] = useState(false);
  
  // We only need to make ONE API call to get all favorite IDs
  const { data: favoriteIds, isLoading: isLoadingIds, refetch: refetchIds } = useGetUserFavoriteIdsQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: false,
    pollingInterval: 0
  });
  
  // Determine if this recipe is favorited based on the IDs we already have
  const isFavorited = favoriteIds?.favoriteIds?.includes(stringId) || false;
    
  const [addToFavorites, { isLoading: isAdding, error: addError }] = useAddToFavoritesMutation();
  const [removeFromFavorites, { isLoading: isRemoving, error: removeError }] = useRemoveFromFavoritesMutation();
  
  const isLoading = isLoadingIds || isAdding || isRemoving;
  const error = addError || removeError;

  // Function to refresh the token when needed
  const refreshToken = useCallback(async () => {
    try {
      const token = await getAccessToken();
      if (token) {
        dispatch(setToken(token));
        setHasAuthError(false);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      setHasAuthError(true);
      return false;
    }
  }, [dispatch]);
  
  const handleToggleFavorite = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent any parent click handlers from triggering
    e.preventDefault();
    
    if (isLoading) return;
    
    try {
      if (isFavorited) {
        await removeFromFavorites(stringId).unwrap();
      } else {
        await addToFavorites(stringId).unwrap();
      }
      
      // Success - force refetch favorites for UI consistency
      refetchIds();
    } catch (error) {
      console.error('Failed to toggle favorite status:', error);
      
      // Check if it's an authentication error
      const queryError = error as FetchBaseQueryError;
      if (queryError.status === 401) {
        // Get a fresh token and retry
        const success = await refreshToken();
        if (success) {
          // Retry the operation with the new token
          refetchIds();
        }
      }
    }
  }, [isLoading, isFavorited, addToFavorites, removeFromFavorites, stringId, refetchIds, refreshToken]);
  
  // If there's an auth error, show a specific error state
  if (hasAuthError) {
    return (
      <button 
        onClick={() => refreshToken().then(() => refetchIds())}
        className={`flex items-center gap-1 ${className}`}
        aria-label="Login required"
        title="Authentication error. Click to retry."
      >
        <HeartIcon 
          filled={false} 
          className={`${iconClassName} text-gray-400 hover:text-red-500`} 
        />
        {showText && <span className="text-sm text-gray-400">Login required</span>}
      </button>
    );
  }
  
  // If there's another error, show an error state
  if (error && !isLoading) {
    return (
      <button 
        onClick={handleToggleFavorite}
        className={`flex items-center gap-1 ${className}`}
        aria-label="Retry favorite action"
        title="Error occurred. Click to retry"
      >
        <HeartIcon 
          filled={false} 
          className={`${iconClassName} text-gray-400 hover:text-red-500`} 
        />
        {showText && <span className="text-sm text-gray-400">Retry</span>}
      </button>
    );
  }
  
  return (
    <button 
      onClick={handleToggleFavorite}
      className={`flex items-center gap-1 ${className}`}
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
      disabled={isLoading}
    >
      <div className="relative flex items-center justify-center">
        {/* Always render the heart icon to maintain layout stability */}
        <HeartIcon 
          filled={isFavorited} 
          className={`${iconClassName} ${isFavorited ? 'text-red-500' : 'text-gray-400 hover:text-red-500'} ${isLoading ? 'opacity-30' : ''}`} 
        />
        
        {/* Overlay a custom mini-loader when loading */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <MiniLoader />
          </div>
        )}
      </div>
      
      {showText && (
        <span className={`text-sm ${isFavorited ? 'text-red-500' : 'text-gray-500'}`}>
          {isFavorited ? 'Favorited' : 'Favorite'}
        </span>
      )}
    </button>
  );
};

export default FavoriteButton; 