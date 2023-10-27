import {
  redirect,
  Form,
  Link,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { FormInput, Spinner } from "../components";
import customFetch from "../utilits/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/register", data);
    return redirect("/login");
  } catch (error) {
    return error.response.data.msg;
  }
};

const Register = () => {
  const isSubmitting = useNavigation().state === "submitting";
  const errorData = useActionData();
  const errorArr = errorData?.split(",");

  return (
    <div className="grow flex items-center">
      <Form
        method="post"
        className="w-[30rem] mx-auto flex flex-col gap-2 border p-6 rounded-lg border-t-4 border-t-primary shadow-lg shadow-grey-300"
      >
        <div className="flex text-2xl justify-center items-center gap-2 mb-5">
          <div className="font-semibold text-primary text-2xl">WeShare</div>
        </div>
        <h2 className="text-3xl text-center mb-3">註冊</h2>

        <FormInput type="text" name="name" labelText="名字" />
        <FormInput type="text" name="lastName" labelText="姓氏" />
        <FormInput
          type="email"
          name="email"
          placeHolder="youreamil@email.com"
          inputError={
            errorArr?.includes("invalid email format.") ||
            errorArr?.includes("email already exists.")
          }
        />
        {errorArr?.includes("invalid email format.") && (
          <p className="text-primary">信箱格式錯誤</p>
        )}
        {errorArr?.includes("email already exists.") && (
          <p className="text-primary">此信箱已被使用</p>
        )}
        <FormInput
          type="password"
          name="password"
          placeHolder="密碼需大於8個字"
          labelText="密碼"
          inputError={errorArr?.includes(
            "password should longer than 8 characters."
          )}
        />
        {errorArr?.includes("password should longer than 8 characters.") && (
          <p className="text-primary">密碼需大於8個字</p>
        )}
        <button disabled={isSubmitting} type="submit" className="primary">
          {isSubmitting ? <Spinner /> : "提交"}
        </button>
        <div className="text-center p-2 text-gray-400">
          已是WeShare的會員了嗎?
          <Link to="/login" className="text-primary ml-2 underline">
            登入
          </Link>
        </div>
      </Form>
    </div>
  );
};
export default Register;
