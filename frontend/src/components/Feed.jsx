import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AiOutlineMeh } from "react-icons/ai"

import { Spinner } from "../components"
import { client } from "../client"
import { feedQuery, searchQuery } from "../utils/data"
import MasonryLayout from "./MasonryLayout"

const Feed = () => {
  // loading state
  const [loading, setLoading] = useState(false)
  // pins state
  const [pins, setPins] = useState(null)
  // get category id from url
  const { categoryId } = useParams()

  // fetching pins
  useEffect(() => {
    // fetch pins based on search term
    if (categoryId) {
      setLoading(true)
      const query = searchQuery(categoryId)

      client.fetch(query).then(data => {
        setPins(data)
        setLoading(false)
      })
    } else {
      // fetch all the pins
      client.fetch(feedQuery).then(data => {
        setPins(data)
        setLoading(false)
      })
    }
  }, [categoryId])

  // loading message
  if (loading) return <Spinner message='Hang on! fetching new Pins.' />
  // if there are no pins available
  if (!pins?.length)
    return (
      <div className='flex flex-col justify-center items-center w-full h-full mt-9'>
        <AiOutlineMeh fontSize={40} />
        <p className="text-lg text-center px-2'">No pins to display!</p>
      </div>
    )

  return (
    <div>
      {/* display pins */}
      {pins?.length >= 1 && <MasonryLayout pins={pins} />}
    </div>
  )
}

export default Feed
