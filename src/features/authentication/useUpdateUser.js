import { useMutation } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

/**
 * Custom hook for updating user data.
 * @returns {Object} An object containing the mutation function and loading state.
 */
export function useUpdateUser() {
  // UseMutation hook to handle the updateUser mutation
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateUserApi, // The function that performs the user data update
    onSuccess: () => {
      // On successful update, show a success toast message
      toast.success("Successfully updated!");
    },
    onError: (err) => toast.error(err.message), // On error, show an error toast message
    enabled: true, // Enable the mutation by default
  });

  // Return the mutation function and loading state
  return { updateUser, isUpdating };
}
