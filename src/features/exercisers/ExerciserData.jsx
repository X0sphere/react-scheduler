import styled, { css } from "styled-components";
import { useParams } from "react-router";

import { useExerciserData } from "../authentication/useExerciserData";
import Spinner from "../../ui/Spinner";
import { age, formatDMY } from "../../utils/helpers";
import mediaQueryManager from "../../styles/MediaQueryManager";

// Styled Components

/**
 * Container for displaying exerciser data with flex layout.
 * Adjusts padding for phones using media queries.
 */
const StyledExerciserData = styled.div`
  display: flex;
  justify-content: space-between;
  padding-inline: 3.2rem;
  gap: 0.8rem;

  ${mediaQueryManager.phone(
    css`
      padding-inline: 0;
    `
  )}
`;

/**
 * Content container for exerciser information with flex layout.
 */
const ExerciserContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

/**
 * Styled component for each list item displaying exerciser information.
 * Adjusts padding for phones using media queries.
 */
const ListItem = styled.p`
  color: var(--color-grey-600);
  font-weight: 500;
  background-color: var(--color-brand-100);
  border-radius: 0.4rem;
  padding: 0.8rem 2.4rem;

  span {
    font-weight: 700;
    color: var(--color-grey-700);
  }

  ${mediaQueryManager.phone(
    css`
      padding: 0.8rem 1.6rem;
    `
  )}
`;

/**
 * Styled component for displaying the exerciser's avatar image.
 * Includes height and border-radius styling.
 */
const Image = styled.img`
  height: 15rem;
  border-radius: 0.4rem;
`;

// Functional Component

/**
 * Component for displaying exerciser data, including nickname, age, birthdate, and avatar.
 */
function ExerciserData() {
  // Get exerciserId from route parameters
  const { exerciserId } = useParams();

  // Fetch exerciser data using custom hook
  const { isLoading, exerciserData: { nickName, birthDate, avatar } = {} } =
    useExerciserData(exerciserId);

  // Display loading spinner if data is still loading
  if (isLoading) return <Spinner />;

  // Render exerciser data
  return (
    <StyledExerciserData>
      {/* Display exerciser information */}
      <ExerciserContent>
        <ListItem>
          Nick name: <span>{nickName}</span>
        </ListItem>
        <ListItem>
          Age: <span>{age(birthDate)}</span>{" "}
          <span>({formatDMY(birthDate)})</span>
        </ListItem>
      </ExerciserContent>

      {/* Display exerciser avatar image with default image if not available */}
      <Image src={avatar || "/anonimos.png"} alt="Avatar" />
    </StyledExerciserData>
  );
}

export default ExerciserData;
