import { perkOptions } from "../utilits/perkOptions";

const PerksModal = ({ perks }) => {
  return (
    <div className="text-start p-5">
      <h1 className="text-2xl mb-4">有提供的設備與服務</h1>
      <div className="grid grid-cols-1 gap-10">
        {perks.map((perk) => {
          const perkIcon = perkOptions.find((item) => item.type === perk).icon;
          return (
            <div
              className="flex items-center gap-2
          "
              key={perk}
            >
              {perkIcon}
              <div>{perk}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default PerksModal;
