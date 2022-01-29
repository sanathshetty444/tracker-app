import { useContext } from "react";

import { Context as LocationContext } from "../context/Location";
import { Context as TrackContext } from "../context/Track";

export default () => {
  const { createTask } = useContext(TrackContext);
  const {
    state: { locations, name },
    reset,
  } = useContext(LocationContext);

  const saveTask = async () => {
    await createTask(name, locations);
    reset();
  };
  return [saveTask];
};
