import { Link } from "react-router-dom";

const DropDownLinkItem = ({ goTo, icon, name }) => {
  return (
    <Link
      className="flex w-full gap-2 items-center px-6 py-4 hover:bg-gray-200"
      to={goTo}
    >
      {icon}
      <p>{name}</p>
    </Link>
  );
};
export default DropDownLinkItem;
