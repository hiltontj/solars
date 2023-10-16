import { BiCog, BiX } from "react-icons/bi";
import {
  useDisplayOptions,
  useToggleDisplayOptions,
} from "../context/AppContext/hooks";
import React from "react";

const SettingsButton = () => {
  const toggle = useToggleDisplayOptions();
  const display = useDisplayOptions();

  const cn = React.useMemo(
    () =>
      display ? "settings-button-close settings-button" : "settings-button",
    [display],
  );

  return (
    <div className={cn} onClick={toggle}>
      {display ? <BiX size={24} /> : <BiCog size={24} />}
    </div>
  );
};

export default SettingsButton;
