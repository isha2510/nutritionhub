import { useAuth0 } from "@auth0/auth0-react";

export const useHasAdminRole = () => {
  const { user } = useAuth0();
  
  // Auth0 stores roles in a custom namespace, check if user has admin role
  const roles = user?.['https://www.nutritionhub.com/roles'] as string[] || [];
  return roles.includes('admin');
}; 