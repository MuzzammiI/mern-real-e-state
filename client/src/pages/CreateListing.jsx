const CreateListing = () => {
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
            />
            <button className="bg-green-700 border rounded-lg border-gray-300 px-4 py-2 text-white">Upload</button>
            </div>
          </div>
          <button className="bg-blue-500 text-white p-3 rounded-lg disabled:opacity-85 hover:opacity-95">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};
export default CreateListing;
