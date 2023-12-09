import { useNavigate, useParams } from "react-router-dom";
import { useTrainingList } from "../../hooks/useTrainingList";
import TrainingScheduler from "../../ui/Scheduler";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import styled from "styled-components";
import ExerciserData from "./ExerciserData";

// Styled Component

/**
 * Styled component for the container of the exerciser training list.
 * Applies styles for display, flex-direction, and gap.
 */
const StyledExerciserTrainingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

// Functional Component

/**
 * Component for displaying the training list of a specific exerciser.
 * Uses the `useParams` hook to extract the exerciserId from the URL.
 * Uses the `useTrainingList` hook to fetch the training data for the specific exerciser.
 * Displays a loading spinner while data is loading.
 * Renders the `ExerciserData` component to display additional exerciser information.
 * Renders the `TrainingScheduler` component to display the training schedule.
 * Provides a button to navigate back to the previous page.
 */
function ExerciserTrainingList() {
  // Use React Router hooks to navigate and extract parameters from the URL
  const navigate = useNavigate();
  const { exerciserId } = useParams();

  // Fetch training data for the specific exerciser using custom hook
  const { trainings, isLoading, startDayHour, endDayHour } = useTrainingList({
    exerciserId,
  });

  // Display loading spinner if data is still loading
  if (isLoading) return <Spinner />;

  // Render the training list components and a button to navigate back
  return (
    <StyledExerciserTrainingList>
      {/* Display additional exerciser data using the ExerciserData component */}
      <ExerciserData />

      {/* Display the training schedule using the TrainingScheduler component */}
      <TrainingScheduler
        trainings={trainings}
        startDayHour={startDayHour}
        endDayHour={endDayHour}
      />

      {/* Button to navigate back to the previous page */}
      <Button position="right" onClick={() => navigate(-1)}>
        Go back
      </Button>
    </StyledExerciserTrainingList>
  );
}

export default ExerciserTrainingList;
