
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";


const SignUp = () => {
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setDataForm({
      ...dataForm, //it basically holds the previous state or the previous data when i change the input field
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),
      });
      const data = await response.json();
      if (data.success=== false) {
        setLoading(false);
        setError(data.message);
        // console.log(data);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");

    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-2xl font-semibold p-4">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          className="p-4 border rounded-lg"
          onChange={handleChange}
        />
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
          {loading ? "Loding...." : "SignUp"}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 p-2">
        <span>Have an account ?</span>
        <Link to={"/sign-in"}>
          <span className="font-semibold text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};
export default SignUp;
