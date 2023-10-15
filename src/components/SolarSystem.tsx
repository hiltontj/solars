import React from "react";
import Planet from "./Planet";
import { PLANET_NAMES } from "../domain/planets";

type SolarSystemProps = {
  width: number;
  height: number;
};

const SolarSystem = ({ width, height }: SolarSystemProps) => {
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
      {PLANET_NAMES.map((pn, i) => (
        <Planet
          key={pn}
          name={pn}
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
