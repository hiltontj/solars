import React from "react";

export interface ToggleProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Toggle = (props: ToggleProps) => {
  return (
    <>
      <div className={props.className} onClick={props.onClick}>
        {props.checked ? <On /> : <Off />}
      </div>
      <input type="checkbox" style={{ display: "none" }} {...props} />
    </>
  );
};

const Off = () => (
  <svg
    width="32"
    height="18"
    viewBox="0 0 32 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0.5"
      y="3.5"
      width="31"
      height="11"
      rx="5.5"
      fill="#343434"
      stroke="#454545"
    />
    <circle cx="9" cy="9" r="9" fill="#D9D9D9" />
  </svg>
);

const On = () => (
  <svg
    width="32"
    height="18"
    viewBox="0 0 32 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0.5"
      y="3.5"
      width="31"
      height="11"
      rx="5.5"
      fill="#F29950"
      stroke="#454545"
    />
    <circle cx="23" cy="9" r="9" fill="#D9D9D9" />
  </svg>
);

export default Toggle;
