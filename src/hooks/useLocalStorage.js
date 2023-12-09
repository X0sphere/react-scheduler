import { useState, useEffect } from "react";

/**
 * useLocalStorageState is a custom hook that synchronizes a state variable with the localStorage.
 * @param {*} initialState - The initial value of the state.
 * @param {string} key - The key under which the state is stored in the localStorage.
 * @returns {[*, function]} - Returns an array with the current state value and a function to update the state.
 */
export function useLocalStorageState(initialState, key) {
  // Retrieve the value from localStorage or use the provided initialState
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  // Use useEffect to update localStorage whenever the state changes
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  // Return the state value and the function to update the state
  return [value, setValue];
}
