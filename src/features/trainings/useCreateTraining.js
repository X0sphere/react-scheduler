import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTraining as createTrainingApi } from "../../services/apiTrainings";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

/**
 * useCreateTraining is a custom hook for creating new training records.
 * It utilizes React Query's useMutation for handling asynchronous mutations.
 *
 * @param {string} userId - The ID of the user for whom the training is created.
 * @returns {Object} An object containing the createTraining function and a boolean flag (isCreating).
 */
export function useCreateTraining(userId) {
  // Access the React Query client for cache manipulation
  const queryClient = useQueryClient();
  
  // Access the navigate function from React Router for navigation
  const navigate = useNavigate();

  // useMutation hook for handling the creation of new training
  const { mutate: createTraining, isLoading: isCreating } = useMutation({
    mutationFn: createTrainingApi, // The API function responsible for creating a new training
    onSuccess: () => {
      // Display a success toast message upon successful creation
      toast.success("Successfully added new training.");

      // Invalidate the relevant query to trigger a refetch
      queryClient.invalidateQueries({
        queryKey: ["exerciserTrainings", userId],
      });

      // Navigate to the "trainings" page after successful creation
      navigate("/trainings");
    },
    onError: (err) => {
      // Display an error toast message if the mutation encounters an error
      toast.error(err.message);
    },
  });

  // Return the createTraining function and the isCreating flag
  return { createTraining, isCreating };
}
