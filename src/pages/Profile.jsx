import {
  useNavigate,
  Form,
  redirect,
  useOutletContext,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { useAppContext } from "../context/appContext";
import customFetch from "../utilits/customFetch";
import {
  EditProfileFormRow,
  ModalContainer,
  RenderAvatar,
  Spinner,
} from "../components";
import { BiLogOutCircle } from "react-icons/bi";
import { AiOutlineCloudUpload, AiOutlineEdit } from "react-icons/ai";
import { useEffect, useState, useMemo } from "react";
import { backendBaseURL } from "../utilits/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();

  try {
    await customFetch.patch("/user/update-user", formData);
    return redirect("/account");
  } catch (error) {
    return error?.response?.data?.msg;
  }
};

export const loader = () => {
  return null;
};

const Profile = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const errorData = useActionData();

  const errors = errorData?.split(",");

  const [showModal, setShowModal] = useState(false);
  const [photos, setPhotos] = useState([]);

  const navigate = useNavigate();

  const { changeUser, logout } = useAppContext();
  const user = useOutletContext();

  useEffect(() => {
    changeUser(user);
  }, [user]);

  useEffect(() => {
    setPhotos([]);
  }, [showModal]);

  const uploadPhoto = async (e) => {
    const files = e.target.files;

    const formData = new FormData();
    formData.append("avatar", files[0]);
    try {
      const res = await customFetch.post("/upload-avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { data } = res.data;

      setPhotos(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      method="post"
      encType="multipart/form-data"
      className="flex flex-col gap-2 "
    >
      {showModal && (
        <ModalContainer setShowModal={setShowModal}>
          <div className="flex flex-col items-center gap-4">
            <div className="flex overflow-hidden bg-gray-200 w-24 h-24 md:w-32 md:h-32 rounded-full">
              {photos.length ? (
                <RenderAvatar src={`${backendBaseURL}/${photos[0]}`} />
              ) : (
                <RenderAvatar src={user.avatar} />
              )}
            </div>
            <div className="flex items-center gap-2">
              <p>請選擇圖片上傳</p>
              <div>
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex gap-2 items-center p-2">
                    <AiOutlineCloudUpload className="text-4xl text-gray-500" />
                  </div>

                  <input
                    accept="image/*"
                    name="avatar"
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={uploadPhoto}
                  />
                </label>
              </div>
            </div>
            <button
              disabled={isSubmitting}
              className="flex gap-1 items-center bg-gray-100 px-3 py-1 rounded-lg hover:bg-gray-400 hover:text-white"
              type="submit"
            >
              {isSubmitting ? <Spinner /> : "儲存"}
            </button>
          </div>
        </ModalContainer>
      )}
      <div>
        <div className="flex items-center justify-between border-b pb-6 mt-4">
          <div>
            <p className="text-2xl sm:text-3xl font-semibold mb-3">個人資訊</p>
            <p className="text-sm sm:text-lg">
              更新個人資訊並查看我們如何使用這些資訊。
            </p>
          </div>
          <div className="flex flex-col items-center gap-6">
            <div
              className="bg-gray-200 w-24 h-24 md:w-32 md:h-32 rounded-full hover:cursor-pointer relative"
              onClick={() => {
                setShowModal(true);
              }}
            >
              {user.avatar && (
                <div className="bg-gray-200 w-24 h-24 md:w-32 md:h-32 rounded-full flex overflow-hidden">
                  <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent opacity-0 hover:opacity-100 p-10">
                    <AiOutlineEdit className="text-4xl text-white" />
                  </button>

                  <RenderAvatar src={user.avatar} />
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={async () => {
                await logout();
                navigate("/");
              }}
              className="flex gap-1 items-center bg-gray-100 px-3 py-1 rounded-lg hover:bg-gray-400 hover:text-white"
            >
              <BiLogOutCircle className="text-xl" />
              <p className="hidden sm:block">登出</p>
            </button>
          </div>
        </div>
        <EditProfileFormRow
          title="名字"
          defaultValue={user?.name}
          type="text"
          name="name"
        />
        <EditProfileFormRow
          title="姓氏"
          defaultValue={user?.lastName}
          type="text"
          name="lastName"
        />
        <EditProfileFormRow
          required={false}
          title="暱稱"
          defaultValue={user?.nickName}
          type="text"
          name="nickName"
          desc="會以暱稱作為您的顯示名稱，若無提供則會使用您的姓名。"
        />
        <EditProfileFormRow
          required={false}
          title="生日"
          defaultValue={user?.birth}
          type="text"
          name="birth"
          desc="請依西元年月日輸入正確8碼格式 ex:19950523"
          errors={errors}
        />
        <EditProfileFormRow
          required={false}
          title="手機"
          defaultValue={user?.phone}
          type="text"
          name="phone"
          desc="若有需要，您預訂的住宿或景點會使用此號碼聯繫您。"
          errors={errors}
        />
        <EditProfileFormRow
          required={false}
          title="地址"
          defaultValue={user?.address}
          type="text"
          name="address"
        />
        <div className="border-b px-2 py-4 sm:px-4 sm:py-6">
          <div className="gap-32 sm:flex items-center">
            <p className="text-2xl">信箱</p>
            <p className="text-xl">{user.email}</p>
          </div>
          <p className="text-gray-500 text-sm md:text-lg mt-4">
            若有需要，您預訂的住宿或景點會使用此信箱聯繫您。
          </p>
        </div>
      </div>
    </Form>
  );
};
export default Profile;
