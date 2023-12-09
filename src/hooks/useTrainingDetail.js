import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getTrainingDetail } from "../services/apiExercisers";

/**
 * useTrainingDetail is a custom hook that fetches detailed information about a training.
 * @returns {object} An object containing loading state, training details, and any potential error.
 */
export function useTrainingDetail() {
  // Extracts exerciserTrainingId and trainingId from the route parameters
  const { exerciserTrainingId, trainingId } = useParams();

  // Log the exerciserTrainingId for debugging purposes
  console.log(exerciserTrainingId);

  // Use the useQuery hook to fetch training details
  const {
    isLoading,          // Loading state of the query
    data: trainingDetail, // Fetched training details
    error,              // Potential error during the query
  } = useQuery({
    queryKey: ["trainingDetail", exerciserTrainingId || trainingId], // Query key based on the provided IDs
    queryFn: () =>
      getTrainingDetail({ trainingId: exerciserTrainingId || trainingId }), // Query function to fetch training details
  });

  // Return an object containing loading state, training details, and any potential error
  return { isLoading, trainingDetail, error };
}
