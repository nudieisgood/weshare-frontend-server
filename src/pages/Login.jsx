import { useState } from "react";
import { redirect, Link, useNavigate } from "react-router-dom";

import { FormInput, Spinner } from "../components";
import { useAppContext } from "../context/appContext";
import customFetch from "../utilits/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/login", data);
    return redirect("/");
  } catch (error) {
    return error;
  }
};

const Login = () => {
  const { changeUser } = useAppContext();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    try {
      const {
        data: { user },
      } = await customFetch.post("/auth/login", data);
      changeUser(user);
      navigate("/");
    } catch (error) {
      setError(error.response.data.msg);
    }
    setLoading(false);
  };

  return (
    <div className="grow flex items-center">
      <form
        onSubmit={handleSubmit}
        className="w-[30rem] mx-auto flex flex-col gap-2 border p-6 rounded-lg border-t-4 border-t-primary shadow-lg shadow-grey-300"
      >
        <div className="flex text-2xl justify-center items-center gap-2 mb-5">
          <div className="font-semibold text-primary text-2xl">WeShare</div>
        </div>
        <h2 className="text-3xl text-center mb-3">登入</h2>

        {error && (
          <p className="text-center text-xl text-primary">信箱或帳號錯誤</p>
        )}

        <FormInput inputError={error} type="email" name="email" />
        <FormInput
          inputError={error}
          type="password"
          name="password"
          labelText="密碼"
        />

        <button type="submit" className="primary" disabled={loading}>
          {loading ? <Spinner /> : "登入"}
        </button>

        <div className="text-center p-2 text-gray-400">
          還不是WeShare的會員嗎 ?
          <Link to="/register" className="text-primary ml-2 underline">
            立刻註冊
          </Link>
        </div>
      </form>
    </div>
  );
};
export default Login;
