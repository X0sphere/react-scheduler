import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled Components

/**
 * Styled component for each exerciser item in the list.
 * Applies styles for border-radius, overflow, and max-width.
 */
const StyledExerciser = styled.li`
  position: relative;
  border-radius: 0.4rem;
  overflow: hidden;
  max-width: 20rem;
`;

/**
 * Styled component for displaying the exerciser's image.
 * Applies styles for cursor, background-image, background-size, aspect-ratio, and transition.
 * Utilizes a linear gradient and blur effect on hover.
 */
const Image = styled.div`
  cursor: pointer;
  width: 100%;
  background-image: linear-gradient(
      var(--gradient-brand-500),
      var(--gradient-brand-500)
    ),
    url(${(props) => props.image});
  background-size: cover;
  background-position: top;
  aspect-ratio: 9 / 16;
  transition: all 0.2s;
  filter: blur(0);

  &:hover {
    filter: blur(2px);
    background-image: linear-gradient(
        var(--gradient-brand-hover-500),
        var(--gradient-brand-hover-500)
      ),
      url(${(props) => props.image});
  }
`;

/**
 * Styled component for displaying the exerciser's name on hover.
 * Applies styles for font-size, font-weight, letter-spacing, color, position, and transformation.
 */
const ShowName = styled.span`
  pointer-events: none;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--color-grey-900);
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;
  transform: translate(-50%, -50%);
`;

// Functional Component

/**
 * Component representing an exerciser item in the list.
 * Displays exerciser information, including avatar and nickname.
 * Navigates to the exerciser's profile on click.
 */
function ExerciserItem({ exerciser }) {
  const { userid, nickName, avatar } = exerciser;
  const [isShown, setIsShown] = useState(false);
  const navigate = useNavigate();

  return (
    <StyledExerciser
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      onClick={() => navigate(`${userid}`)}
    >
      {/* Display exerciser name on hover */}
      {isShown && <ShowName>{nickName}</ShowName>}
      
      {/* Display exerciser image with hover effect */}
      <Image image={avatar || "/anonimous.png"} />
    </StyledExerciser>
  );
}

export default ExerciserItem;
