import { Link } from "react-router-dom";


const SignUp = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-2xl font-semibold p-4">Sign Up</h1>
      <form className="flex flex-col gap-4">
      <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          className="p-4 border rounded-lg"
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="p-4 border rounded-lg"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="p-4 border rounded-lg"
        />

        <button type="submit" className="bg-slate-700 uppercase text-white p-4 rounded-lg hover:opacity-95">Sign Up</button>
      </form>
      <div className="flex gap-2 p-2"> 
      <span>Have an account ?</span>
    <Link to={"/sign-in"}>
    <span className="font-semibold text-blue-700">Sign in</span>
    </Link>
      </div>
    </div>
  );
};
export default SignUp;
