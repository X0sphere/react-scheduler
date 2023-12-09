import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

/**
 * Custom hook for fetching user data.
 * @returns {Object} An object containing loading state, user data, and isAuthenticated flag.
 */
export function useUser() {
  // UseQuery hook to fetch user data
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"], // Unique query key for caching purposes
    queryFn: getCurrentUser, // Function to perform the actual data fetching
  });

  // Return an object with loading state, user data, and isAuthenticated flag
  return {
    isLoading, // Flag indicating whether the data is currently being loaded
    user, // Fetched user data
    isAuthenticated: user?.role === "authenticated", // Flag indicating whether the user is authenticated
  };
}
