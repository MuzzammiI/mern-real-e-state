import { useState } from "react";

import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";

const CreateListing = () => {
  const [images, setImages] = useState([]);
  const [formdata, setFormData] = useState({
    imageUrls: [],
  });
  // console.log(formdata);

  const [uploadImageerror, setUploadImageError] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleSubmitImages = () => {
    if (images.length > 0 && images.length + formdata.imageUrls.length < 7) {
      setUploading(true);
      const promises = [];

      for (let i = 0; i < images.length; i++) {
        promises.push(storeImage(images[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formdata,
            imageUrls: formdata.imageUrls.concat(urls),
          });
          setUploadImageError(false);
          setUploading(false);
        })
        .then((error) => {
          setUploadImageError(error);
          setUploading(false);
        });
    } else {
      setUploadImageError("You can upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (images) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + images.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, images);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log(`Upload is ${progress} done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formdata,
      imageUrls: formdata.imageUrls.filter((_, i) => i !== index),
    });
  };

  return (
    <main className="max-w-4xl mx-auto gap-4 p-3">
      <h1 className="text-3xl font-bold text-center my-6 ">Create Listing</h1>
      <form className=" flex flex-col sm:flex-row gap-4 ">
        <div className="flex flex-col gap-4 flex-1 ">
          <input
            type="text"
            placeholder="Name"
            id="name"
            className="p-3 rounded-lg border "
            maxLength={50}
            minLength={10}
          />
          <textarea
            type="text"
            placeholder="Description"
            id="description"
            className="p-3 rounded-lg border "
          />
          <input
            type="text"
            placeholder="Address"
            id="address"
            className="p-3 rounded-lg border "
          />
          <div className="flex-wrap flex gap-4">
            <div className=" gap-2 flex ">
              <input type="checkbox" className="w-5" id="sell" />
              <span>Sell</span>
            </div>
            <div className=" gap-2 flex">
              <input type="checkbox" className="w-5" id="rent" />
              <span>Rent</span>
            </div>
            <div className=" gap-2 flex">
              <input type="checkbox" className="w-5" id="parking-spot" />
              <span>Parking Spot</span>
            </div>
            <div className=" gap-2 flex">
              <input type="checkbox" className="w-5" id="furnished" />
              <span>Furnished</span>
            </div>
            <div className=" gap-2 flex">
              <input type="checkbox" className="w-5" id="offer" />
              <span>Offer</span>
            </div>
          </div>
          <div className=" flex gap-4 flex-wrap">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="bedrooms"
                min={1}
                max={10}
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <p>Beds</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="bedrooms"
                min={1}
                max={10}
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <p>Baths</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="regular-price"
                min={1}
                max={10}
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="">
                <p>Regular Price</p>
                <span className="font-thin text-center text-sm ">
                  ($/month)
                </span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="discounted-price"
                min={1}
                max={10}
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="">
                <p>Discounted Price</p>
                <span className="font-thin text-center text-sm ">
                  ($/month)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col gap-2">
            <p className="">
              <span className="font-semibold">Imgaes</span>:The first image will
              be cover(max 6){" "}
            </p>
            <div className="flex gap-2">
              <input
                type="file"
                id="images"
                accept="image/*"
                multiple
                className="p-3 rounded-lg border bg-gray-300 w-full border-gray-300"
                onChange={(e) => setImages(e.target.files)}
              />
              <button
                disabled={uploading}
                onClick={handleSubmitImages}
                type="button"
                className="bg-green-700 border rounded-lg border-gray-300 px-4 py-2 text-white"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
            {formdata.imageUrls.length > 0 &&
              formdata.imageUrls.map((url, index) => (
                <div key={url} className="flex items-center gap-2 justify-between p-2 border">
                  <img
                    src={url}
                    alt="image"
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="text-red-700 hover:underline hover:opacity-75 p-2 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              ))}
          </div>
          {uploadImageerror && (
            <div className="text-red-700 text-sm ">{uploadImageerror}</div>
          )}
          <button className="bg-blue-500 text-white p-3 rounded-lg disabled:opacity-85 hover:opacity-95">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};
export default CreateListing;
