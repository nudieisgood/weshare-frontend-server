import { useState } from "react";
import FormInput from "./FormInput";
import { FiEdit } from "react-icons/fi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { GrStatusGood } from "react-icons/gr";
import { useNavigation } from "react-router-dom";
import Spinner from "./Spinner";
import { useEffect } from "react";

const EditProfileFormRow = ({
  desc,
  type = "text",
  title,
  defaultValue,
  name,
  required,
  errors,
}) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [showEditForm, setShowEditForm] = useState(false);
  const [errorArr, setErrorArr] = useState(null);

  const isPhoneInputError =
    name === "phone" && errorArr?.includes("invalid phone");
  const isBirthInputError =
    name === "birth" && errorArr?.includes("invalid birth");

  useEffect(() => {
    setErrorArr(errors);
  }, [errors]);

  const handleCancel = () => {
    // if (isBirthInputError) {
    //   const updateErrorArr = errorArr?.filter((err) => err !== "invalid birth");
    //   setErrorArr(updateErrorArr);
    // }
    // if (isPhoneInputError) {
    //   const updateErrorArr = errorArr?.filter((err) => err !== "invalid phone");
    //   setErrorArr(updateErrorArr);
    // }
    setErrorArr([]);
    setShowEditForm(false);
  };

  return (
    <div className="border-b px-2 py-4 sm:px-4 sm:py-6">
      <div className="flex justify-between items-center">
        <div className="sm:flex gap-32 items-center">
          <p className="text-xl sm:text-2xl mb-2">{title}</p>
          {showEditForm ? (
            <div>
              <FormInput
                required={required}
                noTitle={true}
                name={name}
                defaultValue={defaultValue}
                type={type}
                inputError={isPhoneInputError || isBirthInputError}
              />
              {(isPhoneInputError || isBirthInputError) && (
                <p className="text-primary mt-1">輸入格式錯誤</p>
              )}
            </div>
          ) : (
            <p className="text-xl">{defaultValue || "未提供"}</p>
          )}
        </div>
        <div>
          {showEditForm ? (
            <div>
              <button
                disabled={isSubmitting}
                type="submit"
                className="rounded-lg px-4 py-2 hover:border flex items-center gap-1"
              >
                <GrStatusGood className="text-2xl" />
                {isSubmitting ? <Spinner /> : "儲存"}
              </button>
              <button
                disabled={isSubmitting}
                type="button"
                onClick={handleCancel}
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
