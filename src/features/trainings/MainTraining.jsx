import React from "react";
import TrainingScheduler from "../../ui/Scheduler";
import Spinner from "../../ui/Spinner";

import { useUser } from "../authentication/useUser";
import { useTrainingList } from "../../hooks/useTrainingList";
import { useCreateTraining } from "./useCreateTraining";
import { useDeleteTraining } from "./useDeleteTraining";
import { useUpdateTraining } from "./useUpdateTraining";
import { formatDate } from "../../utils/helpers";

/**
 * MainTraining component displays the TrainingScheduler with user-specific training data.
 * It uses various custom hooks for handling user authentication, fetching training data,
 * and managing training CRUD operations.
 *
 * @returns {JSX.Element} The rendered MainTraining component.
 */
function MainTraining() {
  // Retrieve the authenticated user using the useUser hook
  const { user } = useUser();

  // Fetch training data for the authenticated user using the useTrainingList hook
  const { isLoading, trainings, startDayHour, endDayHour } = useTrainingList({
    exerciserId: user.id,
  });

  // Custom hooks for training CRUD operations
  const { createTraining, isCreating } = useCreateTraining(user.id);
  const { deleteTraining, isDeleting } = useDeleteTraining();
  const { updateTraining, isUpdating } = useUpdateTraining(user.id);

  // Handle changes to the training schedule (add, update, delete)
  function handleCommitChanges({ added: addTraining, changed, deleted }) {
    if (addTraining && addTraining.title) {
      // Create a new training object for addition
      const newTraining = {
        title: addTraining.title,
        startDate: formatDate(addTraining.startDate),
        endDate: formatDate(addTraining.endDate),
        numPullUp: addTraining.numPullUp,
        numDip: addTraining.numDip,
        numPushUp: addTraining.numPushUp,
        description: addTraining.description,
        trainingStrength: addTraining.trainingStrength,
        userid: user.id,
      };
      createTraining(newTraining);
    }

    if (changed && Object.values(changed)[0].title !== "") {
      // Update existing training if the title is not empty
      const [trainingId] = Object.keys(changed);
      const updatedFields = Object.values(changed)[0];
      updateTraining({ trainingId, updatedFields });
    }

    if (deleted !== undefined) {
      // Delete the specified training
      deleteTraining(deleted);
    }
  }

  // Render the TrainingScheduler component with the fetched training data
  return (
    <React.Fragment>
      {isLoading || isCreating || isDeleting || isUpdating ? (
        // Display a spinner while data is loading or CRUD operations are in progress
        <Spinner />
      ) : (
        // Render the TrainingScheduler when data is loaded and ready
        <TrainingScheduler
          trainings={trainings}
          startDayHour={startDayHour}
          endDayHour={endDayHour}
          onCommitChanges={handleCommitChanges}
        />
      )}
    </React.Fragment>
  );
}

export default MainTraining;
