import { useEffect, useState } from "react"
import { MdDownloadForOffline } from "react-icons/md"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { v4 } from "uuid"
import { client, urlFor } from "../client"

import { Spinner } from "../components"
import { pinDetailMorePinQuery, pinDetailQuery } from "../utils/data"
import MasonryLayout from "./MasonryLayout"

const PinDetails = ({ user }) => {
  // pin state
  const [pin, setPin] = useState(null)
  // pin details state
  const [pinDetails, setPinDetails] = useState(null)
  // comment state
  const [comment, setComment] = useState("")
  // adding comment state
  const [addingComment, setAddingComment] = useState(false)
  // getting pin id from url
  const { pinId } = useParams()

  // adding comment to pin
  const addComment = () => {
    if (comment) {
      setAddingComment(true)

      // patch comment
      client
        .patch(pinId)
        // add comment array if not present
        .setIfMissing({ comments: [] })
        // push comment to array
        .insert("after", "comments[-1]", [
          {
            comment,
            _key: v4(),
            postedBy: { _type: "postedBy", _ref: user._id },
          },
        ])
        // commit to sanity
        .commit()
        // reset comment and addingComment state
        .then(() => {
          fetchPinDetails()
          setComment("")
          setAddingComment(false)
        })
    }
  }

  // fetching pin details from sanity
  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId)

    // fetched the pin from sanity
    if (query) {
      client.fetch(query).then(data => {
        setPinDetails(data[0])

        // fetching details about that pin
        if (data[0]) {
          query = pinDetailMorePinQuery(data[0])
          client.fetch(query).then(res => setPin(res))
        }
      })
    }
  }

  // fetch pin details on change of pin id
  useEffect(() => {
    fetchPinDetails()
  }, [pinId])

  // display loader if pins not fetched
  if (!pinDetails) return <Spinner message='Loading pin' />

  console.log(pin)

  return (
    <>
      <div className='flex xl:flex-row flex-col m-auto bg-white max-w[1500px] rounded-[32px]'>
        <div className='flex justify-center items-center md:items-start flex-initial'>
          {/* pin image */}
          <img
            src={pinDetails?.image && urlFor(pinDetails?.image).url()}
            alt={pinDetails?.title || "pin image"}
            className='rounded-t-3xl rounded-b-lg max-h-[50vh]'
          />
        </div>
        <div className='w-full p-5 flex-1 cl:min-w-620'>
          <div className='flex items-center justify-between'>
            <div className='flex gap-2 items-center'>
              {/* download button */}
              <a
                href={`${pinDetails?.image?.asset?.url}?dl=`}
                download
                // to stop page from redirecting to pin details page when clicked on download button
                onClick={e => e.stopPropagation()}
                className='btn bg-white w-9 h-9'
              >
                <MdDownloadForOffline />
              </a>
            </div>

            {/* destination url */}
            <a href={pinDetails?.destination} target='_blank' rel='noreferrer'>
              {" "}
              {pinDetails?.destination}
            </a>
          </div>

          {/* Pin title and about */}
          <div>
            <h1 className='text-4xl font-bold break-words mt-3'>
              {pinDetails?.title}
            </h1>
            <p className='mt-3'>{pinDetails?.about}</p>
          </div>

          {/*  user profile and link to user profile page */}
          <Link
            to={`/user-profile/${pinDetails?.postedBy?._id}`}
            className='flex gap-2 mt-5 items-center bg-white rounded-lg'
          >
            <img
              className='w-8 h-8 rounded-full object-cover'
              src={pinDetails?.postedBy?.image}
              alt={pinDetails?.postedBy?.username || "user profile"}
            />
            <p className='font-semibold capitalize'>
              {pinDetails?.postedBy?.username}
            </p>
          </Link>

          {/*display  comments */}
          <h2 className='mt-5 text-2xl'>Comments</h2>
          <div className='max-h-370 overflow-y-auto'>
            {pinDetails?.comments?.map((comment, idx) => (
              <div
                className='flex gap-2 mt-5 items-center bg-white rounded-lg'
                key={idx}
              >
                {/* user dp */}
                <Link to={`/user-profile/${pinDetails?.postedBy?._id}`}>
                  <img
                    src={comment?.postedBy?.image}
                    alt={comment?.postedBy?.username}
                    className='w-10 h-1- rounded-full cursor-pointer'
                  />
                </Link>

                {/* user name and comment */}
                <div className='flex flex-col'>
                  <p className='font-base'>{comment?.postedBy?.username}</p>
                  <p className='font-bold'>{comment?.comment}</p>
                </div>
              </div>
            ))}
          </div>

          {/* adding comments */}
          <div className='flex flex-wrap mt-6 gap-3 items-center'>
            {/* dp of user adding comment and profile link */}
            <Link to={`/user-profile/${pinDetails?.postedBy?._id}`}>
              <img
                className='w-8 h-8 rounded-full cursor-pointer'
                src={pinDetails?.postedBy?.image}
                alt={pinDetails?.postedBy?.username || "user profile"}
              />
            </Link>
            {/* comment input */}
            <input
              type='text'
              className='flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300'
              placeholder='add a comment'
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
            {/* submit button */}
            <button
              type='submit'
              className='bg-red-500 border-2 border-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none'
              onClick={addComment}
            >
              {addingComment ? "Posting..." : "Done"}
            </button>
          </div>
        </div>
      </div>

      {/* related pins */}
      {pin?.length > 0 ? (
        <>
          <h2 className='text-center font-bold text-2xl mt-8 mb-4'>
            Related Pins
          </h2>
          <MasonryLayout pins={pin} />
        </>
      ) : (
        <Spinner message='Loadng related pins' />
      )}
    </>
  )
}

export default PinDetails
