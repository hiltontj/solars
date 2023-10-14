import React from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { useDate } from "../context/AppContext/hooks";
import { N_PLANETS, PlanetName } from "../domain/planets";

type Coordinates = {
  rotation: number;
}

type PlanetProps = {
  name: PlanetName;
  width: number;
  height: number;
  position: number;
}

const Planet = ({
  name,
  width,
  height,
  position,
}: PlanetProps) => {
  const date = useDate();
  const [degrees, setDegrees] = React.useState(0)
  const centerX = React.useMemo(() => width / 2, [width])
  const centerY = React.useMemo(() => height / 2, [height])
  const planetRadius = React.useMemo(() => height / 2 / (N_PLANETS + 1) * position, [height, position])
  const planetY = React.useMemo(() => height / 2 - planetRadius, [height, planetRadius])

  React.useEffect(() => {
    invoke<Coordinates>('rotation', { date, planet: name })
    .then((res) => setDegrees(-1 * res.rotation))
    .catch((e) => console.error(e))
  }, [date, name])

  return (
    <g transform={`rotate(${degrees}, ${centerX}, ${centerY})`}>
      <circle cx={centerX} cy={centerY} r={planetRadius} fill="transparent" stroke="#969696" strokeWidth="1px" />
      <circle cx={centerX} cy={planetY} r="8" fill="white" />
    </g>
  )
}

export default Planet