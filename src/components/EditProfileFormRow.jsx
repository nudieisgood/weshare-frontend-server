import { useState } from "react";
import FormInput from "./FormInput";
import { FiEdit } from "react-icons/fi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { GrStatusGood } from "react-icons/gr";

const EditProfileFormRow = ({
  desc,
  type = "text",
  title,
  defaultValue = "未提供",
  name,
}) => {
  const [showEditForm, setShowEditForm] = useState(false);
  return (
    <div className="border-b px-2 py-4 sm:px-4 sm:py-6">
      <div className="flex justify-between items-center">
        <div className="sm:flex gap-32 items-center">
          <p className="text-xl sm:text-2xl mb-2">{title}</p>
          {showEditForm ? (
            <FormInput
              noTitle={true}
              name={name}
              defaultValue={defaultValue}
              type={type}
            />
          ) : (
            <p className="text-xl">{defaultValue}</p>
          )}
        </div>
        <div>
          {showEditForm ? (
            <div>
              <button
                type="submit"
                className="rounded-lg px-4 py-2 hover:border flex items-center gap-1"
              >
                <GrStatusGood className="text-2xl" />
                儲存
              </button>
              <button
                type="button"
                onClick={() => setShowEditForm(false)}
                className="rounded-lg px-4 py-2 hover:border flex items-center gap-1"
              >
                <AiOutlineCloseCircle className="text-2xl" />
                取消
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowEditForm(true)}
              className="rounded-lg px-4 py-2 hover:border flex items-center gap-1"
            >
              <FiEdit className="text-2xl" />
              編輯
            </button>
          )}
        </div>
      </div>
      <div className="text-gray-500 text-sm md:text-lg mt-4">{desc}</div>
    </div>
  );
};
export default EditProfileFormRow;
