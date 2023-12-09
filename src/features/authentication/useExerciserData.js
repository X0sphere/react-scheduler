import { useQuery } from "@tanstack/react-query";
import { getExerciserData } from "../../services/apiExercisers";
import { useState } from "react";

/**
 * Custom hook to fetch exerciser data for a specific user.
 * @param {string} userId - The ID of the user for whom to fetch exerciser data.
 * @returns {Object} An object containing loading state, exerciser data, and refetch function.
 */
export function useExerciserData(userId) {
  // State to track if fetching is in progress
  const [isFetching, setIsFetching] = useState(true);

  // UseQuery hook to fetch exerciser data
  const {
    isLoading, // Flag indicating whether the query is currently loading
    data: exerciserData, // The fetched exerciser data
    refetch, // Function to manually refetch the data
  } = useQuery({
    queryKey: ["exerciserData", userId], // Unique query key for caching purposes
    queryFn: () => getExerciserData(userId), // Function to perform the actual data fetching
    onError: () => setIsFetching(false), // Callback to handle errors and stop fetching
    enabled: isFetching, // Only enable the query when fetching is in progress
  });

  // Return the loading state, exerciser data, and refetch function
  return {
    isLoading, // Flag indicating whether the data is currently being loaded
    exerciserData, // Fetched exerciser data
    refetch, // Function to manually refetch the data
  };
}
