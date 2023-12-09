import { useQuery } from "@tanstack/react-query";
import { getExercisers } from "../../services/apiExercisers";
import { useUser } from "../authentication/useUser";

/**
 * Custom hook for fetching the list of exercisers.
 * Uses the useQuery hook from React Query to handle data fetching.
 * Retrieves the authenticated user using the useUser hook.
 * Fetches the list of exercisers using the getExercisers API function.
 * Provides loading status, exercisers data, and error information.
 *
 * @returns {Object} An object containing isLoading, exercisers, and error properties.
 */
export function useExercisersList() {
  // Retrieve the authenticated user using the useUser hook
  const { user } = useUser();

  // Use the useQuery hook to fetch the list of exercisers
  const {
    isLoading,  // Flag indicating whether data is still loading
    data: exercisers,  // Fetched exercisers data
    error,  // Error information, if any
  } = useQuery({
    queryKey: ["exercisers"],  // Unique query key for caching purposes
    queryFn: () => getExercisers(user.id),  // Function to fetch exercisers data
  });

  // Return an object containing loading status, exercisers data, and error information
  return { isLoading, exercisers, error };
}
