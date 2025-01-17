import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userUpdateStart, userUpdateSuccess, userUpdateFailure ,deleteUserStart,deleteUserSuccess,deleteUserFailure , SignOutUserFailure,SignOutUserStart,SignOutUserSuccess } from "../../redux/user/UserSlice.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase";

const Profile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);
  const { loading , error } = currentUser;
  const FileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploaderror, setFileUploadError] = useState(false);
  const [datasuceess, setDataSuccess] = useState(false);
  const [deleteuserSuccess, setDeleteUserSuccess] = useState(false);
  const [formdata, setFormData] = useState({});
  // console.log(filePercentage)
  // console.log(formdata);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    // console.log(storageRef);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log('File available at', downloadURL);
          setFormData({
            ...formdata,
            avatar: downloadURL,
          });
        });
      }
    );
  };

  const onChangeHandler = (e) => {
    setFormData({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };

  const ProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(deleteUserStart());
      const res = await fetch(
        `/api/user/update/${currentUser.currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formdata),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data.message));
      setDeleteUserSuccess(data);
      console.log(data);

    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };


  // Delete User
  const DeleteUserHandle = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(
        `/api/user/delete/${currentUser.currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(userUpdateFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      // setDataSuccess(data);
      // console.log(data);

    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  // Sign Out
  const handleSignOut = async () => {
    dispatch(SignOutUserStart());
    try {
      const res = await fetch("/api/auth/signout", {
        method: "GET",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(SignOutUserFailure(data.message));
        return;
      }
      dispatch(SignOutUserSuccess(data));
      // setDataSuccess(data);
      // console.log(data);

    } catch (error) {
      dispatch(SignOutUserFailure(error.message));
    }
  }

  // console.log(file);
  return (
    <div className="max-w-lg m-auto ">
      <h1 className="text-3xl font-semibold text-center m-4">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={ProfileSubmit}>
        <input
          type="file"
          ref={FileRef}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          src={formdata.avatar || currentUser.currentUser.avatar}
          onClick={() => FileRef.current.click()}
          alt="avatar"
          className="w-24 cursor-pointer h-24 rounded-full object-cover object-top self-center mt-2 "
        />

        <p className="text-sm self-center">
          {fileUploaderror ? (
            <span className="text-red-700">Error Uploading File</span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className="text-green-700">Uploading {filePercentage}%</span>
          ) : filePercentage === 100 ? (
            <span className="text-green-700">File Uploaded</span>
          ) : null}
        </p>

        <input
          type="text"
          id="name"
          defaultValue={currentUser.currentUser.name}
          placeholder="username"
          onChange={onChangeHandler}
          className="p-3 rounded-lg border"
        />
        <input
          type="email"
          id="email"
          defaultValue={currentUser.currentUser.email}
          placeholder="email"
          onChange={onChangeHandler}
          className="p-3 rounded-lg border"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={onChangeHandler}
          className="p-3 rounded-lg border"
        />

        <button disabled={loading} className="p-4 rounded-lg text-white uppercase bg-slate-700 opacity-95 disabled:opacity-80 hover:opacity-100">
          {loading ? "Loading..." : "Update"}
        </button>
        <Link className="bg-green-700 text-center text-white uppercase font-semibold cursor-pointer p-3 rounded-lg hover:opacity-95 disabled:opacity-85" to={"/create-listing"}>
        Create Listing
        </Link>
      </form>
      <div className="flex flex-row justify-between ">
        <span className="text-red-700 mt-2 font-semibold cursor-pointer" onClick={DeleteUserHandle}>
          Delete Account
        </span>
        <span className="text-red-700 mt-2 font-semibold cursor-pointer" onClick={handleSignOut}>
          Sign Out
        </span>
      </div>
      {error ? <p className="text-red-700 mt-2 font-semibold text-center ">{error}</p> : ""}
          {datasuceess ? <p className="text-green-700 mt-2 font-semibold text-center ">Profile Update Successfully.</p> : ""}
          {deleteuserSuccess ? <p className="text-green-700 mt-2 font-semibold text-center ">User has been Deleted.</p> : ""}

  
    </div>
  );
};
export default Profile;
