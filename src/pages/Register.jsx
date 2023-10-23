import { redirect, Form, Link } from "react-router-dom";
import { FormInput } from "../components";
import customFetch from "../utilits/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/register", data);
    return redirect("/login");
  } catch (error) {
    return error;
  }
};

const Register = () => {
  return (
    <div className="grow flex items-center">
      <Form
        method="post"
        className="w-[30rem] mx-auto flex flex-col gap-2 border p-6 rounded-lg border-t-4 border-t-primary shadow-lg shadow-grey-300"
      >
        <div className="flex text-2xl justify-center items-center gap-2 mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 mr-1 text-primary"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"
            />
          </svg>
          <div className="font-semibold text-primary text-2xl">WeShare</div>
        </div>
        <h2 className="text-3xl text-center mb-3">Register</h2>
        <FormInput
          type="text"
          name="name"
          placeHolder="your name"
          labelText="名字"
        />
        <FormInput
          type="text"
          name="lastName"
          placeHolder="last name"
          labelText="姓氏"
        />
        <FormInput
          type="email"
          name="email"
          placeHolder="youreamil@email.com"
        />
        <FormInput
          type="password"
          name="password"
          placeHolder="password"
          labelText="密碼"
        />

        <button type="submit" className="primary">
          Register
        </button>

        <div className="text-center p-2 text-gray-400">
          已是WeShare的會員了嗎？
          <Link to="/login" className="text-primary ml-2 underline">
            登入
          </Link>
        </div>
      </Form>
    </div>
  );
};
export default Register;
