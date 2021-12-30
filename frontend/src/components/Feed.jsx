import { useState } from "react"

import { Spinner } from "../components"

const Feed = () => {
  // loading state
  const [loading, setLoading] = useState(true)

  if (loading) return <Spinner message='Hang on! fetching new Pins.' />

  return <div></div>
}

export default Feed
