import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

/**
 * Custom hook for handling user logout.
 * @returns {Object} An object containing the mutation function and loading state.
 */
export function useLogout() {
  // Access the query client and navigation function
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // UseMutation hook to handle the logout mutation
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi, // The function that performs the logout
    onSuccess: () => {
      // On successful logout:
      // 1. Remove all queries from the query client
      // 2. Navigate to the "/login" route
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError: (err) => toast.error(err.message), // On error, show an error toast message
  });

  // Return the mutation function and loading state
  return { logout, isLoading };
}
