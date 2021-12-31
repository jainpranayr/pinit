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
    setLoading(true)
    // fetch pins based on search term
    if (categoryId) {
      const query = searchQuery()

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
  }, [])

  // loading message
  if (loading) return <Spinner message='Hang on! fetching new Pins.' />

  return (
    <div>
      {/* display pins */}
      {pins?.length >= 1 ? (
        <MasonryLayout pins={pins} />
      ) : (
        // if no pins fetched
        <div className='flex flex-col justify-center items-center w-full h-full'>
          <AiOutlineMeh fontSize={40} />
          <p className="text-lg text-center px-2'">No pins to display!</p>
        </div>
      )}
    </div>
  )
}

export default Feed
