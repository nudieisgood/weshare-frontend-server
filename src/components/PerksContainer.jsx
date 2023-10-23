import PerkCheckBox from "./PerkCheckBox";

const PerksContainer = ({ title, des, options, perks, labelText }) => {
  return (
    <>
      <h2 className="text-2xl capitalize">{labelText || title}</h2>
      <p className="text-sm text-gray-400">{des}</p>
      <div className="grid gap-1 grid-cols-3 md:grid-cols-4  ">
        {options.map((perk) => (
          <PerkCheckBox key={perk.type} {...perk} perks={perks} />
        ))}
      </div>
    </>
  );
};
export default PerksContainer;
