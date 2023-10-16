import React from "react";
import Planet from "./Planet";
import { usePlanets } from "../context/AppContext/hooks";

type SolarSystemProps = {
  width: number;
  height: number;
};

const SolarSystem = ({ width, height }: SolarSystemProps) => {
  const planets = usePlanets();
  const centerX = React.useMemo(() => width / 2, [width]);
  const centerY = React.useMemo(() => height / 2, [height]);

  return (
    <svg
      preserveAspectRatio="xMidYMid meet"
      viewBox={`0 0 ${width} ${height}`}
      height="100%"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      {planets
        .filter((p) => p.show)
        .map((p, i) => (
          <Planet
            key={p.name}
            name={p.name}
            width={width}
            height={height}
            position={i + 1}
          />
        ))}
      <circle cx={centerX} cy={centerY} r="12" fill="yellow" />
    </svg>
  );
};

export default SolarSystem;
