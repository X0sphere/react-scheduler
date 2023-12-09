import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi, signup as signupApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

/**
 * Custom hook for handling user login and signup actions.
 * @param {boolean} isSignUp - A flag indicating whether it's a signup operation.
 * @returns {Object} An object containing the mutation function and loading state.
 */
export function useLoginSignup(isSignUp) {
  // Access the query client and navigation function
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Determine the mutation function based on the operation (login or signup)
  const mutation = isSignUp ? signupApi : loginApi;

  // UseMutation hook to handle the login or signup mutation
  const { mutate: loginSignup, isLoading } = useMutation({
    mutationFn: mutation, // The function that performs the login or signup
    onSuccess: (user) => {
      // On successful login or signup:
      // 1. Update the user data in the query client
      // 2. Navigate to the "/trainings" route
      // 3. Show a success toast message
      queryClient.setQueryData(["user"], user.user);
      navigate("/trainings", { replace: true });
      toast.success(
        isSignUp
          ? "Account successfully created! Please confirm your email address."
          : "Successfully logged in!"
      );
    },
    onError: (err) => {
      // On error, log the error and show an error toast message
      console.error("ERROR", err);
      toast.error(err.message);
    },
  });

  // Return the mutation function and loading state
  return { loginSignup, isLoading };
}
