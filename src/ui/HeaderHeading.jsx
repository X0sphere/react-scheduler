import { useLocation, useParams } from "react-router-dom";
import Heading from "./Heading";

const Headings = {
  "/trainings": "Calendar Schedule",
  "/trainings/new": "New Appointment ",
  "/exercisers": "Support trainers",
  "/profile": "Profile settings",
  trainingDetail: "Training detail",
};

function HeaderHeading() {
  const location = useLocation();
  const { trainingId, exerciserId } = useParams();

  // console.log(Number.isFinite(+location.pathname.split("/")[2]));

  let heading = Headings[location.pathname];
  if (heading === undefined && trainingId) {
    heading = `Training detail`;
  } else if (heading === undefined && exerciserId) {
    heading = `Exerciser: `;
  }

  return <Heading as="h2">{heading}</Heading>;
}

export default HeaderHeading;
