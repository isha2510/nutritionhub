import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useGetUserFavoriteIdsQuery } from './favoritesApi';

// This component prefetches the favorite IDs when the app starts and user is authenticated
const FavoritesInitializer = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  
  // Initialize the query but don't execute it if not authenticated
  const { refetch, data: favoriteIds } = useGetUserFavoriteIdsQuery(undefined, { 
    // Skip if not authenticated, but keep data in cache once loaded
    skip: !isAuthenticated || isLoading,
    // Cache aggressively
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: false
  });

  useEffect(() => {
    // Only attempt to prefetch data when authenticated and not loading
    if (isAuthenticated && !isLoading) {
      console.log('Prefetching favorite IDs for user');
      // Force a refetch to ensure we have the latest data
      refetch();
    }
  }, [isAuthenticated, isLoading, refetch]);

  // Log when we get the data
  useEffect(() => {
    if (favoriteIds) {
      console.log(`Loaded ${favoriteIds.favoriteIds.length} favorite IDs`);
    }
  }, [favoriteIds]);

  // This is a utility component, it doesn't render anything
  return null;
};

export default FavoritesInitializer; 