import { useEffect, useRef } from "react";

/**
 * useOutsideClick is a custom hook that triggers a callback when a click occurs outside a specified ref element.
 * @param {function} handler - The callback function to be triggered when a click occurs outside the ref element.
 * @param {boolean} listenCapturing - Indicates whether the event listener should be in the capturing phase.
 * @returns {object} ref - A ref object that should be assigned to the element whose clicks you want to detect.
 */
export function useOutsideClick(handler, listenCapturing = true) {
  // Create a ref that will be assigned to the target element
  const ref = useRef();

  // Log the ref for debugging purposes
  console.log(ref);

  // Attach event listener to detect clicks outside the ref element
  useEffect(
    function () {
      function handleClick(e) {
        // Check if the clicked element is outside the ref element
        if (ref.current && !ref.current.contains(e.target)) {
          // Trigger the provided callback
          handler();
        }
      }

      // Add click event listener
      document.addEventListener("click", handleClick, listenCapturing);

      // Remove event listener when the component is unmounted
      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  // Return the ref object to be assigned to the target element
  return ref;
}
