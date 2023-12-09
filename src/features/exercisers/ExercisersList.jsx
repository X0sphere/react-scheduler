import styled, { css } from "styled-components";

import ExerciserItem from "./ExerciserItem";
import Spinner from "../../ui/Spinner";
import mediaQueryManager from "../../styles/MediaQueryManager";

import { useExercisersList } from "./useExercisersList";

// Styled Components

/**
 * Styled component for the list of exercisers.
 * Applies styles for display, gap, and grid-template-columns.
 * Adjusts styles for phones using media queries.
 */
const List = styled.ul`
  display: grid;
  gap: 3.2rem;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));

  ${mediaQueryManager.phone(
    css`
      gap: 2.4rem;
      grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
    `
  )}
`;

// Functional Component

/**
 * Component for displaying a list of exercisers.
 * Uses the `useExercisersList` hook to fetch exerciser data.
 * Displays a loading spinner while data is loading.
 */
function ExercisersList() {
  // Fetch exerciser data using custom hook
  const { exercisers, isLoading } = useExercisersList();

  // Display loading spinner if data is still loading
  if (isLoading) return <Spinner />;

  // Render the list of exercisers using the ExerciserItem component
  return (
    <List>
      {exercisers?.map((exerciser) => (
        <ExerciserItem exerciser={exerciser} key={exerciser.id} />
      ))}
    </List>
  );
}

export default ExercisersList;
