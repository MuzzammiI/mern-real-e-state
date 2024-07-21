import React from "react"
import { useSelector } from "react-redux"


const Profile = () => {
  const currentUser = useSelector((state) => state.user)  
  return (
    <div className="max-w-lg m-auto ">
      <h1 className="text-3xl font-semibold text-center mt-4">Profile</h1>
      <form className="flex flex-col gap-4">
    <img src={currentUser.currentUser.avatar} alt="avatar" className="w-24 h-24 rounded-full self-center mt-2 " />
     <input type="text" id="username" placeholder={currentUser.currentUser.name} className="p-3 rounded-lg border" />
     <input type="email" id="email" placeholder={currentUser.currentUser.email} className="p-3 rounded-lg border" />
     <input type="text" placeholder="password" id="password" className="p-3 rounded-lg border" />

    <button className="p-4 rounded-lg text-white bg-slate-700 opacity-95 disabled:opacity-80 hover:opacity-100">Update</button>
      </form>
      <div className="flex flex-row justify-between ">
        <span className="text-red-700 mt-2 font-semibold cursor-pointer">Delete Account</span>
        <span className="text-red-700 mt-2 font-semibold cursor-pointer">Sign Out</span>

      </div>
    </div>
  )
}
export default Profile