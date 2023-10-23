import { useState } from "react";

const PerkCheckBox = ({ type, icon, perks }) => {
  const isChecked = perks?.includes(type);
  const [checked, setChecked] = useState(isChecked);

  const handleClick = () => {
    setChecked(!checked);
  };

  if (perks) {
    return (
      <label className="cursor-pointer border rounded-lg p-2 flex gap-2 items-center">
        <input
          type="checkbox"
          name={type}
          checked={checked}
          onChange={handleClick}
        />
        {icon}
        <span>{type}</span>
      </label>
    );
  }

  return (
    <label className="cursor-pointer border rounded-lg p-2 flex gap-2 items-center">
      <input type="checkbox" name={type} />
      {icon}
      <span>{type}</span>
    </label>
  );
};
export default PerkCheckBox;
