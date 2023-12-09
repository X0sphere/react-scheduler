import supabase from "./supabase";

/**
 * Creates a new training entry in the Supabase "trainings" table.
 * @param {Object} newTraining - The data for the new training entry.
 * @returns {Object} - The created training data.
 * @throws Will throw an error if the training could not be created.
 */
export async function createTraining(newTraining) {
  const { data, error } = await supabase
    .from("trainings")
    .insert([newTraining])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Training could not be created");
  }

  return data;
}

/**
 * Updates an existing training entry in the Supabase "trainings" table.
 * @param {Object} params - Parameters for updating the training entry.
 * @param {string} params.trainingId - The ID of the training entry to be updated.
 * @param {Object} params.updatedFields - The fields to be updated in the training entry.
 * @returns {Object} - The updated training data.
 * @throws Will throw an error if the training could not be updated.
 */
export async function updateTraining({ trainingId, updatedFields }) {
  const { data, error } = await supabase
    .from("trainings")
    .update(updatedFields)
    .eq("id", trainingId)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Training could not be updated");
  }

  return data;
}

/**
 * Deletes an existing training entry from the Supabase "trainings" table.
 * @param {string} trainingId - The ID of the training entry to be deleted.
 * @throws Will throw an error if the training could not be deleted.
 */
export async function deleteTraining(trainingId) {
  const { error } = await supabase
    .from("trainings")
    .delete()
    .eq("id", trainingId);

  if (error) {
    console.error(error);
    throw new Error("Training could not be deleted");
  }
}
