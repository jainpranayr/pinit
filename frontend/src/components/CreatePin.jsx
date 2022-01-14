import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AiOutlineCloudUpload } from "react-icons/ai"
import { MdDelete } from "react-icons/md"

import { Spinner } from "../components"
import { client } from "../client"
import { categories } from "../utils/data"

const CreatePin = ({ user }) => {
  // title of pin
  const [title, setTitle] = useState("")
  // about the pin
  const [about, setAbout] = useState("")
  // destination url of pin
  const [destination, setDestination] = useState("")
  // page loading state
  const [loading, setLoading] = useState(false)
  // all the fields of form
  const [fields, setFields] = useState(false)
  // category of pin
  const [category, setCategory] = useState(null)
  // image url
  const [imageAsset, setImageAsset] = useState(false)
  // if image is of wrong type
  const [wrongImageType, setWrongImageType] = useState(false)
  // setup navigate
  const navigate = useNavigate()

  // uploading image to sanity database
  const uploadImage = e => {
    const { type, name } = e.target.files[0]
    // check for wrong file types
    if (
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/jpeg" ||
      type === "image/gif" ||
      type === "image/tiff"
    ) {
      setWrongImageType(false)
      setLoading(true)

      // upload image to sanity
      client.assets
        .upload("image", e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then(doc => {
          setImageAsset(doc)
          setLoading(false)
        })
        .catch(err => console.error("Image Upload error", err))
    } else {
      setWrongImageType(true)
    }
  }

  // Saving pin to database
  const savePin = () => {
    // checking all fields
    if (title && about && destination && imageAsset?._id && category) {
      // creating document
      const doc = {
        _type: "pin",
        title,
        about,
        destination,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset?._id,
          },
        },
        userId: user?._id,
        postedBy: {
          _type: "postedBy",
          _ref: user?._id,
        },
        category,
      }

      // adding document to sanity
      client.create(doc).then(() => navigate("/"))
    } else {
      setFields(true)
      // if fields are not filled showing error for 2s
      setTimeout(() => {
        setFields(false)
      }, 2000)
    }
  }

  return (
    <div className='flex justify-center items-center flex-col mt-5 lg:h-4/5'>
      {/* check if all fields are filled correctly */}
      {fields && (
        <p className='text-red-500 mb-5 text-xl transition-all duration-150 ease-in'>
          Please fill in all the fields
        </p>
      )}
      <div className='flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full'>
        <div className='bg-secondaryColor p-3 flex flex-0.7 w-full'>
          <div className='flex justify-center items-center flex-col border-dotted border-2 border-gray-300 p-3 w-full h-420'>
            {/* if loading show spinner */}
            {loading && <Spinner />}

            {/* if wrong image type show error  */}
            {wrongImageType && <p className='text-red-500'>Wrong Image Type</p>}

            {/* file upload area */}
            {!imageAsset ? (
              <label>
                <div className='flex justify-center items-center h-full'>
                  <div className='flex flex-col justify-center items-center'>
                    <p className='font-bold text-2xl'>
                      <AiOutlineCloudUpload />
                    </p>
                    <p className='text-lg'>Click to upload</p>
                  </div>
                </div>
                <input
                  type='file'
                  name='upload-image'
                  className='w-0 h-0'
                  onChange={uploadImage}
                />
              </label>
            ) : (
              <div className='relative h-full'>
                {/* render uploaded image */}
                <img
                  src={imageAsset?.url}
                  alt={imageAsset?.originalFilename || "pin image"}
                  className='h-full w-full'
                />

                {/* delete button */}
                <button
                  type='button'
                  className='absolute bottom-3 right-2 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'
                  onClick={() => setImageAsset(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Add pin form */}
        <div className='flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full'>
          {/* user profile */}
          {user && (
            <div className='flex gap-2 my-2 items-center bg-white rounded-lg'>
              <img
                src={user?.image}
                alt={user?.username || "user profile"}
                className='w-10 h-10 rounded-full'
              />
              <p className='font-bold'>{user?.username}</p>
            </div>
          )}

          {/* Pin title */}
          <input
            type='text'
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder='Add Pin title'
            className='outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2'
          />

          {/* pin details */}
          <input
            type='text'
            value={about}
            onChange={e => setAbout(e.target.value)}
            placeholder='Add Pin details'
            className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'
          />

          {/* destination orl */}
          <input
            type='text'
            value={destination}
            onChange={e =>
              setDestination(
                e.target.value.startsWith("https://www.")
                  ? e.target.value
                  : "https://www." + e.target.value
              )
            }
            placeholder='Add link related to pin'
            className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'
          />

          {/* categories dropdown  menu */}
          <div className='flex flex-col'>
            <div>
              <select
                onChange={e => setCategory(e.target.value)}
                className='outline-none w-full lg:w-5/12 text-base border-gray-200 p-2 rounded-md cursor-pointer'
              >
                <option value='other' className='bg-white'>
                  Select Category
                </option>

                {/* Mapping categories array to options */}
                {categories.map(category => (
                  <option
                    key={category?.name}
                    value={category?.name}
                    className='text-base border-0 outline-none capitalize bg-white text-black p-1'
                  >
                    {category?.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Save pin button */}
            <div className='flex mt-5'>
              <button
                type='submit'
                onClick={savePin}
                className='bg-red-500 text-white font-bold p-2 w-full lg:w-28 rounded-md outline-none '
              >
                Save Pin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePin
