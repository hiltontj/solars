import React from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { useDate } from "../context/AppContext/hooks";

type Coordinates = {
  rotation: number;
}

const Planet = () => {
  const [degrees, setDegrees] = React.useState(0)
  const date = useDate();

  React.useEffect(() => {
    invoke<Coordinates>('rotation', { date })
    .then((res) => setDegrees(-1 * res.rotation))
    .catch((e) => console.error(e))
  }, [date])

  return (
    <svg viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg">
      <g transform={`rotate(${degrees}, 500, 250)`}>
        <circle cx="500" cy="250" r="125" fill="transparent" stroke="white" strokeWidth="1px" />
        <circle cx="500" cy="125" r="12" fill="white" />
      </g>
    </svg>
  )
}

export default Planet