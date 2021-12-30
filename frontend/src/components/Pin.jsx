import { urlFor } from "../client"

const Pin = ({ pin: { title, postedBy, image, _id, destination } }) => {
  return (
    <div>
      {/* rendering pin */}
      <img
        src={urlFor(image).width(250).url()}
        className='rounded-lg w-full'
        alt={title || "user posts"}
      />
    </div>
  )
}

export default Pin
