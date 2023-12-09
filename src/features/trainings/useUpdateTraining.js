import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTraining as updateTrainingApi } from "../../services/apiTrainings";
import toast from "react-hot-toast";

/**
 * useUpdateTraining is a custom hook for updating training records.
 * It utilizes React Query's useMutation for handling asynchronous updates.
 *
 * @param {string} userId - The ID of the user associated with the training records.
 * @returns {Object} An object containing the updateTraining function and a boolean flag (isUpdating).
 */
export function useUpdateTraining(userId) {
  // Access the React Query client for cache manipulation
  const queryClient = useQueryClient();

  // useMutation hook for handling the update of a training
  const { mutate: updateTraining, isLoading: isUpdating } = useMutation({
    mutationFn: updateTrainingApi, // The API function responsible for updating a training
    onSuccess: () => {
      // Display a success toast message upon successful update
      toast.success("Successfully updated training!");

      // Invalidate the relevant query to trigger a refetch
      queryClient.invalidateQueries({
        queryKey: ["exerciserTrainings", userId],
      });
    },
    onError: (err) => {
      // Display an error toast message if the mutation encounters an error
      toast.error(err.message);
    },
  });

  // Return the updateTraining function and the isUpdating flag
  return { updateTraining, isUpdating };
}
