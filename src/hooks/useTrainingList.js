import { useQuery } from "@tanstack/react-query";
import { getTraining } from "../services/apiExercisers";

/**
 * useTrainingList is a custom hook that fetches a list of trainings for a specific exerciser.
 * It also calculates the start and end hours for the training day.
 * @param {object} options - Options for fetching trainings.
 * @param {string} options.exerciserId - The ID of the exerciser for whom to fetch trainings.
 * @returns {object} An object containing loading state, trainings, start day hour, end day hour, and any potential error.
 */
export function useTrainingList({ exerciserId }) {
  // Use the useQuery hook to fetch trainings for the specified exerciser
  const {
    isLoading,            // Loading state of the query
    data: trainings = [], // Fetched list of trainings
    error,                // Potential error during the query
  } = useQuery({
    queryKey: ["exerciserTrainings", exerciserId], // Query key based on the exerciser ID
    queryFn: () => getTraining({ exerciserId }),   // Query function to fetch trainings
  });

  // Function to extract hours from a date string
  function getHoursFromDate(dateString) {
    return new Date(dateString).getHours();
  }

  // Map trainings to an array of start and end hours
  const hoursArray = trainings?.map((training) => ({
    startHour: getHoursFromDate(training.startDate),
    endHour: getHoursFromDate(training.endDate),
  }));

  // Calculate the start and end hours for the training day
  const startDayHour = Math.min(...hoursArray.map((item) => item.startHour));
  const endDayHour = Math.max(...hoursArray.map((item) => item.endHour));

  // Return an object containing loading state, trainings, start day hour, end day hour, and any potential error
  return { isLoading, trainings, startDayHour, endDayHour, error };
}
