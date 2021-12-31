import { MdDownloadForOffline } from "react-icons/md"
import { AiTwotoneDelete } from "react-icons/ai"
import { BsFillArrowUpRightCircleFill } from "react-icons/bs"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { client, urlFor } from "../client"
import fetchUserFromLocalStorage from "../utils/fetchUserFromLocalStorage"
import { v4 } from "uuid"
import { Link } from "react-router-dom"

const Pin = ({ pin: { title, postedBy, image, _id, destination, save } }) => {
  // mouse hover state
  const [postHovered, setPostHovered] = useState(false)
  // navigation
  const navigate = useNavigate()

  // user details
  const user = fetchUserFromLocalStorage()
  // check if user has saved the pin
  const alreadySaved = !!save?.filter(
    item => item.postedBy._id === user.googleId
  )?.length

  // save pin logic
  const savePin = id => {
    if (!alreadySaved) {
      // patch the pin
      client
        .patch(id)
        // add new array
        .setIfMissing({ save: [] })
        // insert document
        .insert("after", "save[-1]", [
          {
            _key: v4(),
            userId: user?.googleId,
            postedBy: {
              _type: "postedBy",
              _ref: user?.googleId,
            },
          },
        ])
        // commit to sanity
        .commit()
        // refresh the page
        .then(() => window.location.reload())
    }
  }

  // delete pin logic
  const deletePin = id => {
    client.delete(id).then(() => window.location.reload())
  }

  return (
    <div className='m-2'>
      {/* rendering pin */}
      <div
        // setting up hover states
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
      >
        {/* actual image */}
        <img
          src={urlFor(image).width(250).url()}
          className='rounded-lg w-full'
          alt={title || "user posts"}
        />

        {/* render buttons on image hover */}
        {postHovered && (
          <div
            className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-40'
            style={{ height: "100%" }}
          >
            <div className='flex items-center justify-between'>
              <div className='flex gap-2'>
                {/* download button */}
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  // to stop page from redirecting to pin details page when clicked on download button
                  onClick={e => e.stopPropagation()}
                  className='btn bg-white w-9 h-9'
                >
                  <MdDownloadForOffline />
                </a>
              </div>

              {/* render saved or save button */}
              {alreadySaved ? (
                <button
                  type='button'
                  className='btn bg-red-500 text-white px-5 py-1'
                >
                  {save?.length} Saved
                </button>
              ) : (
                <button
                  type='button'
                  className='btn bg-red-500 text-white px-5 py-1'
                  onClick={e => {
                    e.stopPropagation()
                    savePin(_id)
                  }}
                >
                  Save
                </button>
              )}
            </div>

            {/* render destination url */}
            <div className='flex justify-between items-center gap-2 w-full'>
              {destination && (
                <a
                  href={destination}
                  target='_blank'
                  rel='noreferrer'
                  className=' btn bg-white gap-2 text-black p-2 pl-4'
                  onClick={e => e.stopPropagation()}
                >
                  <BsFillArrowUpRightCircleFill />
                  {destination.length > 20
                    ? // truncate url if length greater than 20
                      destination.slice(8, 20) + "..."
                    : destination.slice(8)}
                </a>
              )}

              {/* render delete button */}
              {postedBy?._id === user.googleId && (
                <button
                  type='button'
                  className='btn bg-white text-dark p-2'
                  onClick={e => {
                    e.stopPropagation()
                    deletePin(_id)
                  }}
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      {/* render user profile and link to user profile page */}
      <Link
        to={`user-profile/${user?._id}`}
        className='flex gap-2 mt-2 items-center'
      >
        <img
          className='w-8 h-8 rounded-full object-cover'
          src={postedBy?.image}
          alt={postedBy?.username || "user profile"}
        />
        <p className='font-semibold capitalize'>{postedBy?.username}</p>
      </Link>
    </div>
  )
}

export default Pin
