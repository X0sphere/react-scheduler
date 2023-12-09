import supabase from "./supabase";

/**
 * Retrieves a list of exercisers excluding the user with the specified userid.
 * @param {string} userid - The user ID to exclude from the results.
 * @returns {Array} - An array of exerciser data, including id, nickName, avatar, and userid.
 */
export async function getExercisers(userid) {
  const { data, error } = await supabase
    .from("users")
    .select("id, nickName, avatar,  userid")
    .neq("userid", userid);

  if (error) throw new Error(error.message);

  return data;
}

/**
 * Retrieves detailed data for a specific exerciser using their ID.
 * @param {string} id - The user ID for the exerciser.
 * @returns {Object} - Detailed data for the specified exerciser, including all available fields.
 */
export async function getExerciserData(id) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("userid", id)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

/**
 * Retrieves training data for a specific exerciser using their exerciserId.
 * @param {Object} params - Parameters for retrieving training data.
 * @param {string} params.exerciserId - The user ID for the exerciser whose training data is to be retrieved.
 * @returns {Array} - An array of training data for the specified exerciser, including all available fields.
 */
export async function getTraining({ exerciserId }) {
  const { data, error } = await supabase
    .from("trainings")
    .select("*")
    .eq("userid", exerciserId);

  if (error) throw new Error(error.message);

  return data;
}
