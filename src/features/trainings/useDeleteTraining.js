import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTraining as deleteTrainingApi } from "../../services/apiTrainings";
import { useNavigate } from "react-router-dom";
import { useUser } from "../authentication/useUser";
import toast from "react-hot-toast";

/**
 * useDeleteTraining is a custom hook for deleting training records.
 * It utilizes React Query's useMutation for handling asynchronous deletions.
 *
 * @returns {Object} An object containing the deleteTraining function and a boolean flag (isDeleting).
 */
export function useDeleteTraining() {
  // Access the React Query client for cache manipulation
  const queryClient = useQueryClient();
  
  // Access the navigate function from React Router for navigation
  const navigate = useNavigate();
  
  // Access the current user information using the useUser hook
  const { user } = useUser();

  // useMutation hook for handling the deletion of a training
  const { mutate: deleteTraining, isLoading: isDeleting } = useMutation({
    mutationFn: deleteTrainingApi, // The API function responsible for deleting a training
    onSuccess: () => {
      // Display a success toast message upon successful deletion
      toast.success("Successfully deleted training.");

      // Invalidate the relevant query to trigger a refetch
      queryClient.invalidateQueries({
        queryKey: ["exerciserTrainings", user.id],
      });

      // Navigate to the "trainings" page after successful deletion
      navigate("/trainings");
    },
    onError: (err) => {
      // Display an error toast message if the mutation encounters an error
      toast.error(err.message);
    },
  });

  // Return the deleteTraining function and the isDeleting flag
  return { deleteTraining, isDeleting };
}
