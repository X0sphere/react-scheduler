import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * useBodyOverflow is a custom hook for managing body overflow based on route changes.
 * It sets the body overflow to "hidden" during route transitions and restores it to "auto" afterward.
 */
export default function useBodyOverflow() {
  // Access the current location using the useLocation hook from react-router-dom
  const location = useLocation();

  // useEffect is used to execute code on mount and clean up on unmount
  useEffect(() => {
    // Scroll the window to the top when the route changes
    window.scrollTo(0, 0);

    // Set the body overflow to "hidden" during route transitions
    document.body.style.overflow = "hidden";

    // Cleanup function to restore body overflow to "auto" after route transition
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [location.pathname]); // Re-run the effect when the pathname changes
}
