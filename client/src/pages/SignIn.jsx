
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart,signInFailure,signInSuccess } from "../../redux/user/UserSlice";


const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState({});
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const { error, loading } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setDataForm({
      ...dataForm, //it basically holds the previous state or the previous data when i change the input field
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const response = await fetch("api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),
      });
      const data = await response.json();
      if (data.success=== false) {
        dispatch(signInFailure(data.message));
        error(data.message);
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");

    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-2xl font-semibold p-4">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="p-4 border rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="p-4 border rounded-lg"
          onChange={handleChange}
        />

        <button
        disabled={loading}
          type="submit"
          className="bg-slate-700 uppercase text-white p-4 rounded-lg hover:opacity-95"
        >
          {loading ? "Loding...." : "SignIn"}
        </button>
      </form>
      <div className="flex gap-2 p-2">
        <span>Don't Have an account ?</span>
        <Link to={"/sign-up"}>
          <span className="font-semibold text-blue-700">Sign Up</span>
        </Link>
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};
export default SignIn;
