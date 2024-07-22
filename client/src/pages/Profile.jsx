
import React, { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../../firebase";


const Profile = () => {
  const currentUser = useSelector((state) => state.user)  
  const FileRef = useRef(null);
  const [file, setFile] = useState(undefined)
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploaderror, setFileUploadError] = useState(false);
  const [formdata, setFormData] = useState({});
  // console.log(filePercentage)
  
  useEffect(()=>{
    if(file){

      handleFileUpload(file);
    }
  },[file])


  const handleFileUpload = () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    // console.log(storageRef);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
            avatar: downloadURL
          });
        });
      }
    );
    
  }








  // console.log(file);
  return (
    <div className="max-w-lg m-auto ">
      <h1 className="text-3xl font-semibold text-center m-4">Profile</h1>
      <form className="flex flex-col gap-4">
        <input type="file" ref={FileRef} hidden accept="image/*" onChange={(e)=>setFile(e.target.files[0])} />
    <img src={formdata.avatar || currentUser.currentUser.avatar} onClick={()=>FileRef.current.click()} alt="avatar" className="w-24 cursor-pointer h-24 rounded-full object-cover object-top self-center mt-2 " />
     
     <p className="text-sm self-center">
     {fileUploaderror ? <span className="text-red-700">Error Uploading File</span>
     : filePercentage > 0 && filePercentage < 100 ? <span className="text-green-700">Uploading {filePercentage}%</span> : filePercentage === 100 ? <span className="text-green-700">File Uploaded</span> : null 
     }
     </p>
     
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